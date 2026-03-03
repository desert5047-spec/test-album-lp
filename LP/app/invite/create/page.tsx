'use client';

import { useMemo, useState } from 'react';
import { createBrowserClient } from '@/lib/supabase/browser';

export default function InviteCreatePage() {
  const supabase = useMemo(() => createBrowserClient(), []);
  const [token, setToken] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (typeof window !== 'undefined' ? window.location.origin : '');

  const inviteUrl = token
    ? `${siteUrl}/invite/accept?token=${encodeURIComponent(token)}`
    : '';

  const onCreate = async () => {
    setStatus('');
    setToken('');
    setLoading(true);

    try {
      const { data: s } = await supabase.auth.getSession();
      if (!s.session) {
        setStatus('ログインが必要です。');
        return;
      }

      const { data, error } = await supabase.rpc('create_invite_link');
      if (error) throw error;

      let t = '';
      if (typeof data === 'string') t = data;
      else if (data?.token) t = data.token;
      else if (Array.isArray(data) && data[0]?.token) t = data[0].token;

      if (!t) {
        setStatus('token取得失敗（RPC戻り値確認）');
        return;
      }

      setToken(t);
      setStatus('招待リンクを作成しました');
    } catch (e: any) {
      setStatus(e?.message ?? 'エラー');
    } finally {
      setLoading(false);
    }
  };

  const onCopy = async () => {
    if (!inviteUrl) return;
    await navigator.clipboard.writeText(inviteUrl);
    setStatus('コピーしました');
  };

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: 16 }}>
      <h1>家族を招待</h1>

      <button onClick={onCreate} disabled={loading}>
        {loading ? '作成中...' : '招待リンクを作成'}
      </button>

      {token && (
        <div>
          <p>{inviteUrl}</p>
          <button onClick={onCopy}>コピー</button>
        </div>
      )}

      {status && <p>{status}</p>}
    </main>
  );
}
