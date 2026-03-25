'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

type Preview = {
  status: string;
  invited_email: string | null;
};

type StatusCode =
  | 'loading'
  | 'invalid_token'
  | 'expired'
  | 'used'
  | 'email_mismatch'
  | 'already_in_other_family'
  | 'unauthorized'
  | 'unknown'
  | 'valid'
  | 'joined';

type MessageConfig = {
  title: string;
  body: string;
  primaryLabel?: string;
  secondaryLabel?: string;
};

export default function InvitePage() {
  const router = useRouter();
  const params = useSearchParams();

  const token = params.get('token') ?? '';
  const [status, setStatus] = useState<StatusCode>('loading');
  const [preview, setPreview] = useState<Preview | null>(null);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const appDeeplink = process.env.NEXT_PUBLIC_APP_DEEPLINK ?? '';
  const appStoreUrl = process.env.NEXT_PUBLIC_APP_STORE_URL ?? '';
  const playStoreUrl = process.env.NEXT_PUBLIC_PLAY_STORE_URL ?? '';

  const signupHref = useMemo(() => {
    if (!token) return '/signup';
    const returnPath = `/invite?token=${encodeURIComponent(token)}`;
    return `/signup?returnTo=${encodeURIComponent(returnPath)}`;
  }, [token]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!token) {
        if (!cancelled) setStatus('invalid_token');
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!cancelled) setIsLoggedIn(!!session);

      const { data, error } = await supabase.rpc('get_invite_preview', { token });
      if (cancelled) return;
      if (error) {
        setStatus('unknown');
        return;
      }

      const row = Array.isArray(data) ? data[0] : data;
      setPreview(row ?? null);
      setStatus((row?.status as StatusCode) ?? 'unknown');
    };

    void load();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void load();
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [token]);

  const handleSwitchAccount = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      router.push(signupHref);
    } finally {
      setLoading(false);
    }
  };

  const onJoin = async () => {
    if (loading || status === 'joined') return;
    setLoading(true);
    try {
      const { data: s } = await supabase.auth.getSession();
      if (!s.session) {
        setStatus('unauthorized');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.rpc('accept_invite', { token });
      if (error) throw error;

      const row = Array.isArray(data) ? data[0] : data;
      if (!row?.ok) {
        const code = (row?.code as StatusCode) ?? 'unknown';
        setStatus(code);
        return;
      }

      setStatus('joined');
    } catch {
      setStatus('unknown');
    } finally {
      setLoading(false);
    }
  };

  const invitedEmail = preview?.invited_email ?? '';
  const COPY: Record<StatusCode, MessageConfig> = {
    loading: {
      title: '確認中...',
      body: '招待情報を確認しています。',
    },
    valid: {
      title: '家族に参加できます',
      body: `この招待は ${invitedEmail || '指定のメールアドレス'} 宛てです。メールアドレスでログインまたは新規登録のうえ、参加を確定してください。`,
    },
    unauthorized: {
      title: 'ログインが必要です',
      body: '招待の参加には、メールアドレスとパスワードでのログイン（または新規登録）が必要です。',
    },
    email_mismatch: {
      title: 'ログイン中のアカウントが一致しません',
      body: `この招待は ${invitedEmail || '別のメールアドレス'} 宛てです。招待先のメールアドレスでログインするか、別アカウントでお試しください。`,
      primaryLabel: '別アカウントでログインまたは新規登録',
    },
    already_in_other_family: {
      title: '既に別の家族に参加しています',
      body: 'このアカウントは既に別の家族に参加しているため、この招待には参加できません。別アカウントでログインまたは新規登録してください。',
      primaryLabel: '別アカウントでログインまたは新規登録',
    },
    expired: {
      title: '招待リンクの期限が切れています',
      body: 'お手数ですが、招待した人に再発行を依頼してください。',
    },
    used: {
      title: 'この招待リンクは使用済みです',
      body: '既に参加が完了している可能性があります。アプリでログインして家族が見えるか確認してください。',
    },
    invalid_token: {
      title: '招待リンクが無効です',
      body: 'URLが正しいか確認してください。',
    },
    unknown: {
      title: '参加処理に失敗しました',
      body: '時間をおいて再度お試しください。',
    },
    joined: {
      title: '参加が完了しました',
      body: 'アプリを開くと家族共有が反映されます。',
      primaryLabel: 'アプリを開く',
      secondaryLabel: 'ストアへ',
    },
  };

  const message = COPY[status] ?? COPY.unknown;
  const showJoinButton = status === 'valid' && isLoggedIn;
  const showAuthCta =
    (status === 'valid' && !isLoggedIn) || status === 'unauthorized';
  const showSwitchAccount =
    status === 'email_mismatch' || status === 'already_in_other_family';

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: 16 }}>
      <h1>家族招待</h1>
      <h2 style={{ marginTop: 12 }}>{message.title}</h2>
      <p style={{ marginTop: 8, whiteSpace: 'pre-line' }}>{message.body}</p>

      {showJoinButton && (
        <button type="button" onClick={onJoin} disabled={loading} style={{ marginTop: 16 }}>
          {loading ? '処理中...' : '参加を確定する'}
        </button>
      )}

      {showAuthCta && (
        <button
          type="button"
          onClick={() => router.push(signupHref)}
          disabled={loading}
          style={{ marginTop: 16 }}
        >
          メールアドレスでログインまたは新規登録して参加
        </button>
      )}

      {showSwitchAccount && (
        <button type="button" onClick={handleSwitchAccount} disabled={loading} style={{ marginTop: 16 }}>
          {loading ? '処理中...' : message.primaryLabel ?? '別アカウントで続行'}
        </button>
      )}

      {status === 'joined' && (
        <div style={{ marginTop: 12, display: 'grid', gap: 8 }}>
          {appDeeplink && (
            <a href={appDeeplink}>{message.primaryLabel ?? 'アプリを開く'}</a>
          )}
          {(appStoreUrl || playStoreUrl) && (
            <>
              {appStoreUrl && (
                <a href={appStoreUrl} target="_blank" rel="noreferrer">
                  アプリをインストール（App Store）
                </a>
              )}
              {playStoreUrl && (
                <a href={playStoreUrl} target="_blank" rel="noreferrer">
                  アプリをインストール（Google Play）
                </a>
              )}
            </>
          )}
          <button
            type="button"
            onClick={() => {
              window.close();
              if (!document.hidden) {
                router.replace('/');
              }
            }}
          >
            閉じる
          </button>
        </div>
      )}
    </main>
  );
}
