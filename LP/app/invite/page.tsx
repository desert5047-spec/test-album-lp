'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
};

export default function InvitePage() {
  const router = useRouter();
  const params = useSearchParams();

  const token = params.get('token') ?? '';
  const [status, setStatus] = useState<StatusCode>('loading');
  const [preview, setPreview] = useState<Preview | null>(null);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const joinedRef = useRef(false);

  const appDeeplink = process.env.NEXT_PUBLIC_APP_DEEPLINK ?? '';
  const appStoreUrl = process.env.NEXT_PUBLIC_APP_STORE_URL ?? '';
  const playStoreUrl = process.env.NEXT_PUBLIC_PLAY_STORE_URL ?? '';

  const inviteAuthHref = useMemo(() => {
    const returnPath = token
      ? `/invite?token=${encodeURIComponent(token)}`
      : '';
    const qs = new URLSearchParams();
    if (returnPath) qs.set('returnTo', returnPath);
    if (preview?.invited_email) qs.set('email', preview.invited_email);
    const qsStr = qs.toString();
    return `/invite-auth${qsStr ? `?${qsStr}` : ''}`;
  }, [token, preview?.invited_email]);

  const loadPreview = useCallback(async () => {
    if (!token) {
      setStatus('invalid_token');
      return;
    }

    if (joinedRef.current) return;

    const {
      data: { session },
    } = await supabase.auth.getSession();
    setIsLoggedIn(!!session);

    const { data, error } = await supabase.rpc('get_invite_preview', { token });

    if (joinedRef.current) return;

    if (error) {
      console.error('[invite] get_invite_preview error', error.message);
      setStatus('unknown');
      return;
    }

    const row = Array.isArray(data) ? data[0] : data;
    setPreview(row ?? null);
    setStatus((row?.status as StatusCode) ?? 'unknown');
  }, [token]);

  useEffect(() => {
    void loadPreview();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      if (!joinedRef.current) {
        void loadPreview();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [loadPreview]);

  const handleSwitchAccount = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      router.push(inviteAuthHref);
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

      const { data, error } = await supabase.rpc('accept_invite', { invite_token: token });

      if (error) {
        console.error('[invite] accept_invite error', error.message);
        throw error;
      }

      const row = Array.isArray(data) ? data[0] : data;

      if (row != null && typeof row === 'object' && 'ok' in row && !row.ok) {
        const code = (row?.code as StatusCode) ?? 'unknown';
        setStatus(code);
        return;
      }

      joinedRef.current = true;
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
      title: isLoggedIn
        ? '家族に参加できます'
        : '家族に招待されています',
      body: isLoggedIn
        ? '下のボタンを押すと参加が完了します。'
        : `参加するには、招待されたメールアドレス${invitedEmail ? `（${invitedEmail}）` : ''}でログインまたは新規登録してください。`,
    },
    unauthorized: {
      title: '家族に招待されています',
      body: `参加するには、招待されたメールアドレス${invitedEmail ? `（${invitedEmail}）` : ''}でログインまたは新規登録してください。`,
    },
    email_mismatch: {
      title: 'ログイン中のアカウントが一致しません',
      body: `この招待は ${invitedEmail || '別のメールアドレス'} 宛てです。招待先のメールアドレスでログインしてください。`,
    },
    already_in_other_family: {
      title: '既に別の家族に参加しています',
      body: 'このアカウントは既に別の家族に参加しているため、この招待には参加できません。別アカウントでお試しください。',
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
      title: '家族への参加が完了しました',
      body: 'アプリを開くと家族共有が反映されます。',
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
          onClick={() => router.push(inviteAuthHref)}
          disabled={loading}
          style={{ marginTop: 16 }}
        >
          ログインまたは新規登録して参加する
        </button>
      )}

      {showSwitchAccount && (
        <button type="button" onClick={handleSwitchAccount} disabled={loading} style={{ marginTop: 16 }}>
          {loading ? '処理中...' : '別アカウントでログインまたは新規登録'}
        </button>
      )}

      {status === 'joined' && (
        <div style={{ marginTop: 12, display: 'grid', gap: 8 }}>
          {appDeeplink && (
            <a href={appDeeplink}>アプリを開く</a>
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
