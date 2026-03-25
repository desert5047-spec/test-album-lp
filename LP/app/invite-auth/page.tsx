'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { sanitizeReturnTo } from '@/lib/sanitizeReturnTo';

const cooldownKey = 'signupCooldown';

type AuthMode = 'login' | 'signup';

export default function InviteAuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const safeReturn = useMemo(
    () => sanitizeReturnTo(searchParams.get('returnTo')),
    [searchParams]
  );
  const invitedEmail = searchParams.get('email') ?? '';

  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState(invitedEmail);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const resetHref = safeReturn
    ? `/reset-password?returnTo=${encodeURIComponent(safeReturn)}`
    : '/reset-password';

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setAlreadyRegistered(false);

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password) {
      setError('メールアドレスとパスワードを入力してください。');
      return;
    }

    setSubmitting(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });
      if (signInError) {
        setError(
          signInError.message.includes('Invalid login credentials')
            ? 'メールアドレスまたはパスワードが正しくありません。'
            : 'ログインに失敗しました。時間をおいて再度お試しください。'
        );
        return;
      }
      router.replace(safeReturn ?? '/');
    } catch {
      setError('通信に失敗しました。時間をおいて再度お試しください。');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setAlreadyRegistered(false);

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password || !confirmPassword) {
      setError('メールアドレスとパスワードを入力してください。');
      return;
    }

    if (password !== confirmPassword) {
      setError('パスワードが一致しません。');
      return;
    }

    if (!agreed) {
      setError('利用規約とプライバシーポリシーへの同意が必要です');
      return;
    }

    const cooldownRaw =
      typeof window !== 'undefined' ? window.localStorage.getItem(cooldownKey) : null;
    if (cooldownRaw) {
      try {
        const parsed = JSON.parse(cooldownRaw) as { email?: string; ts?: number };
        if (
          parsed.email === normalizedEmail &&
          typeof parsed.ts === 'number' &&
          Date.now() - parsed.ts < 60_000
        ) {
          setError('同じメールアドレスでの送信は60秒空けてください。');
          return;
        }
      } catch {
        // ignore
      }
    }

    setSubmitting(true);
    const isStgHost =
      typeof window !== 'undefined' &&
      window.location.hostname === 'stg.test-album.jp';

    try {
      if (isStgHost) {
        const callbackUrl = new URL(`${window.location.origin}/auth/callback`);
        if (safeReturn) callbackUrl.searchParams.set('next', safeReturn);

        const { data, error: signUpError } = await supabase.auth.signUp({
          email: normalizedEmail,
          password,
          options: { emailRedirectTo: callbackUrl.toString() },
        });

        const identities = data?.user?.identities;
        const isIdentityMissing =
          !signUpError && Array.isArray(identities) && identities.length === 0;

        if (isIdentityMissing) {
          setError(
            'このメールアドレスは既に登録されています。「ログイン」タブからログインしてください。'
          );
          setAlreadyRegistered(true);
          return;
        }

        if (signUpError) {
          setError('エラーが発生しました。時間をおいて再度お試しください。');
          return;
        }

        if (typeof window !== 'undefined') {
          window.localStorage.setItem(
            cooldownKey,
            JSON.stringify({ email: normalizedEmail, ts: Date.now() })
          );
        }
        const sentQs = new URLSearchParams({ email });
        if (safeReturn) sentQs.set('returnTo', safeReturn);
        router.push(`/signup/sent?${sentQs.toString()}`);
        return;
      }

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: normalizedEmail,
          password,
          ...(safeReturn ? { returnTo: safeReturn } : {}),
        }),
      });
      const body = await response.json().catch(() => null);

      if (!response.ok) {
        const errorCode = body?.errorCode ?? 'SIGNUP_FAILED';
        const msg =
          errorCode === 'ALREADY_REGISTERED'
            ? '既に登録済みです。「ログイン」タブからお試しください。'
            : 'エラーが発生しました。時間をおいて再度お試しください。';
        setError(msg);
        return;
      }

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(
          cooldownKey,
          JSON.stringify({ email: normalizedEmail, ts: Date.now() })
        );
      }
      const sentQs = new URLSearchParams({ email });
      if (safeReturn) sentQs.set('returnTo', safeReturn);
      router.push(`/signup/sent?${sentQs.toString()}`);
    } catch {
      setError('通信に失敗しました。時間をおいて再度お試しください。');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">
          家族に参加するためのログイン / 新規登録
        </h1>
        <p className="text-sm text-gray-600">
          {invitedEmail
            ? `この招待は ${invitedEmail} 宛てです。同じメールアドレスでログインまたは新規登録してください。`
            : '招待されたメールアドレスでログインまたは新規登録してください。'}
        </p>

        <div className="flex rounded-lg border border-gray-200 p-1 text-sm font-medium">
          <button
            type="button"
            className={`flex-1 rounded-md py-2 transition-colors ${
              mode === 'login'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => {
              setMode('login');
              setError('');
              setAlreadyRegistered(false);
            }}
          >
            ログイン
          </button>
          <button
            type="button"
            className={`flex-1 rounded-md py-2 transition-colors ${
              mode === 'signup'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => {
              setMode('signup');
              setError('');
              setAlreadyRegistered(false);
            }}
          >
            新規登録
          </button>
        </div>

        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              メールアドレス
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:border-blue-500 focus:outline-none"
                placeholder="example@email.com"
                autoComplete="email"
                required
              />
            </label>

            <label className="block text-sm font-medium text-gray-700">
              パスワード
              <div className="relative mt-2">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-base focus:border-blue-500 focus:outline-none"
                  placeholder="パスワード"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? 'パスワードを非表示' : 'パスワードを表示'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            <div className="text-right">
              <Link href={resetHref} className="text-sm text-blue-600 hover:underline">
                パスワードを忘れた方はこちら
              </Link>
            </div>

            <button
              type="submit"
              disabled={submitting || !email.trim() || !password}
              className="w-full rounded-md bg-blue-600 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? 'ログイン中…' : 'ログインして続ける'}
            </button>
          </form>
        )}

        {mode === 'signup' && (
          <form onSubmit={handleSignup} className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              メールアドレス
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:border-blue-500 focus:outline-none"
                placeholder="example@email.com"
                autoComplete="email"
                required
              />
            </label>

            <label className="block text-sm font-medium text-gray-700">
              パスワード
              <div className="relative mt-2">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-base focus:border-blue-500 focus:outline-none"
                  placeholder="8文字以上"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? 'パスワードを非表示' : 'パスワードを表示'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            <label className="block text-sm font-medium text-gray-700">
              パスワード（確認）
              <div className="relative mt-2">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-base focus:border-blue-500 focus:outline-none"
                  placeholder="もう一度入力"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((p) => !p)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label={
                    showConfirmPassword ? '確認用パスワードを非表示' : '確認用パスワードを表示'
                  }
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            <label className="flex items-start gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  プライバシーポリシー
                </a>
                と
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 text-blue-600 hover:underline"
                >
                  利用規約
                </a>
                に同意する
              </span>
            </label>

            <div className="text-right">
              <Link href={resetHref} className="text-sm text-blue-600 hover:underline">
                パスワードを忘れた方はこちら
              </Link>
            </div>

            <button
              type="submit"
              disabled={
                submitting || !agreed || !email.trim() || !password || !confirmPassword
              }
              className="w-full rounded-md bg-blue-600 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? '送信中…' : '新規登録して続ける'}
            </button>
          </form>
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}

        {alreadyRegistered && (
          <p className="text-sm text-gray-600">
            上の「ログイン」タブから同じメールアドレスでログインできます。
          </p>
        )}

        <div className="text-sm text-gray-600">
          <Link href="/privacy-policy" className="text-blue-600 hover:underline">
            プライバシーポリシー
          </Link>
          <span className="mx-1">/</span>
          <Link href="/terms" className="text-blue-600 hover:underline">
            利用規約
          </Link>
        </div>
      </div>
    </div>
  );
}
