'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase/browser';

export default function InviteAcceptPage() {
  const supabase = useMemo(() => createBrowserClient(), []);
  const router = useRouter();
  const params = useSearchParams();

  const token = params.get('token') ?? '';
  const [status, setStatus] = useState('確認中...');
  const [done, setDone] = useState(false);

  useEffect(() => {
    const run = async () => {
      if (!token) {
        setStatus('トークンがありません');
        return;
      }

      const { data: s } = await supabase.auth.getSession();
      if (!s.session) {
        const returnTo = `/invite/accept?token=${encodeURIComponent(token)}`;
        router.replace(`/login?returnTo=${encodeURIComponent(returnTo)}`);
        return;
      }

      try {
        const { error } = await supabase.rpc('accept_invite_single_family', {
          invite_token: token,
        });
        if (error) throw error;

        setDone(true);
        setStatus('参加が完了しました');
      } catch (e: any) {
        const msg = e?.message ?? 'エラー';

        if (msg.includes('already_in_family')) {
          setStatus('既に別の家族に参加しています（複数所属不可）');
        } else {
          setStatus(msg);
        }
      }
    };

    run();
  }, [router, supabase, token]);

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: 16 }}>
      <h1>家族招待</h1>
      <p>{status}</p>
      {done && <p>アプリを開いて確認してください。</p>}
    </main>
  );
}
