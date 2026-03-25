'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { CheckCircle2, AlertTriangle, Users } from 'lucide-react';

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
  icon?: 'success' | 'warning' | 'invite';
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
      icon: 'invite',
    },
    unauthorized: {
      title: '家族に招待されています',
      body: `参加するには、招待されたメールアドレス${invitedEmail ? `（${invitedEmail}）` : ''}でログインまたは新規登録してください。`,
      icon: 'invite',
    },
    email_mismatch: {
      title: 'ログイン中のアカウントが一致しません',
      body: `この招待は ${invitedEmail || '別のメールアドレス'} 宛てです。招待先のメールアドレスでログインしてください。`,
      icon: 'warning',
    },
    already_in_other_family: {
      title: '既に別の家族に参加しています',
      body: 'このアカウントは既に別の家族に参加しているため、この招待には参加できません。別アカウントでお試しください。',
      icon: 'warning',
    },
    expired: {
      title: '招待リンクの期限が切れています',
      body: 'お手数ですが、招待した人に再発行を依頼してください。',
      icon: 'warning',
    },
    used: {
      title: 'この招待リンクは使用済みです',
      body: '既に参加が完了している可能性があります。アプリでログインして家族が見えるか確認してください。',
      icon: 'warning',
    },
    invalid_token: {
      title: '招待リンクが無効です',
      body: 'URLが正しいか確認してください。',
      icon: 'warning',
    },
    unknown: {
      title: '参加処理に失敗しました',
      body: '時間をおいて再度お試しください。',
      icon: 'warning',
    },
    joined: {
      title: '家族への参加が完了しました',
      body: 'アプリを開くと家族共有が反映されます。',
      icon: 'success',
    },
  };

  const message = COPY[status] ?? COPY.unknown;
  const showJoinButton = status === 'valid' && isLoggedIn;
  const showAuthCta =
    (status === 'valid' && !isLoggedIn) || status === 'unauthorized';
  const showSwitchAccount =
    status === 'email_mismatch' || status === 'already_in_other_family';

  const iconEl =
    message.icon === 'success' ? (
      <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
    ) : message.icon === 'warning' ? (
      <AlertTriangle className="mx-auto h-12 w-12 text-amber-500" />
    ) : message.icon === 'invite' ? (
      <Users className="mx-auto h-12 w-12 text-blue-500" />
    ) : null;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-sm">
        {status === 'loading' ? (
          <div className="py-8 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
            <p className="mt-4 text-sm text-gray-500">{message.body}</p>
          </div>
        ) : (
          <>
            {iconEl && <div className="pt-2">{iconEl}</div>}

            <h1 className="text-2xl font-bold text-gray-900 text-center">
              {message.title}
            </h1>
            <p className="text-sm text-gray-600 text-center leading-relaxed">
              {message.body}
            </p>

            {showJoinButton && (
              <button
                type="button"
                onClick={onJoin}
                disabled={loading}
                className="w-full rounded-md bg-blue-600 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? '処理中...' : '参加を確定する'}
              </button>
            )}

            {showAuthCta && (
              <button
                type="button"
                onClick={() => router.push(inviteAuthHref)}
                disabled={loading}
                className="w-full rounded-md bg-blue-600 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                ログイン / 新規登録して続ける
              </button>
            )}

            {showSwitchAccount && (
              <button
                type="button"
                onClick={handleSwitchAccount}
                disabled={loading}
                className="w-full rounded-md border-2 border-blue-600 py-2.5 font-semibold text-blue-600 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? '処理中...' : '別アカウントでログイン / 新規登録'}
              </button>
            )}

            {status === 'joined' && (
              <div className="space-y-3 pt-2">
                {appDeeplink && (
                  <a
                    href={appDeeplink}
                    className="block w-full rounded-md bg-blue-600 py-2.5 text-center font-semibold text-white hover:bg-blue-700"
                  >
                    アプリを開く
                  </a>
                )}
                {appStoreUrl && (
                  <a
                    href={appStoreUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full rounded-md border border-gray-300 py-2.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    アプリをインストール（App Store）
                  </a>
                )}
                {playStoreUrl && (
                  <a
                    href={playStoreUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full rounded-md border border-gray-300 py-2.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    アプリをインストール（Google Play）
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => {
                    window.close();
                    if (!document.hidden) {
                      router.replace('/');
                    }
                  }}
                  className="w-full rounded-md border border-gray-300 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  閉じる
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
