'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

const cooldownKey = 'signupCooldown';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
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
        // ignore malformed cache
      }
    }

    setSubmitting(true);
    const isStgHost =
      typeof window !== 'undefined' &&
      window.location.hostname === 'stg.test-album.jp';

    try {
      if (isStgHost) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: normalizedEmail,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        const identities = data?.user?.identities;
        const isIdentityMissing =
          !signUpError && Array.isArray(identities) && identities.length === 0;

        if (isIdentityMissing) {
          setError(
            'このメールアドレスは既に登録されています。アプリに戻ってログインしてください。'
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
        router.push('/signup/sent');
        return;
      }

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail, password }),
      });
      const body = await response.json().catch(() => null);

      if (!response.ok) {
        const errorCode = body?.errorCode ?? 'SIGNUP_FAILED';
        const msg =
          errorCode === 'ALREADY_REGISTERED'
            ? '既に登録済みの可能性があります。ログインをお試しください。'
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
      router.push('/signup/sent');
    } catch {
      setError('通信に失敗しました。時間をおいて再度お試しください。');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">新規登録</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            メールアドレス
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:border-blue-500 focus:outline-none pr-10"
                placeholder="8文字以上"
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
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
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:border-blue-500 focus:outline-none pr-10"
                placeholder="もう一度入力"
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
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
              onChange={(event) => setAgreed(event.target.checked)}
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
                className="text-blue-600 hover:underline ml-1"
              >
                利用規約
              </a>
              に同意する
            </span>
          </label>

          <button
            type="submit"
            disabled={
              submitting || !agreed || !email.trim() || !password || !confirmPassword
            }
            className="w-full rounded-md bg-blue-600 py-2.5 text-white font-semibold hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? '送信中…' : '登録する'}
          </button>
        </form>

        {error && <p className="text-sm text-red-600">{error}</p>}

        {alreadyRegistered && (
          <div className="pt-2 space-y-2">
            <a
              href="testalbum://login"
              className="inline-block text-sm text-blue-600 hover:underline"
            >
              アプリを開く
            </a>
            <p className="text-xs text-gray-500">
              ボタンで開けない場合は、アプリを手動で起動してください。
            </p>
          </div>
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
