'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createSupabaseClient } from '@/lib/supabaseClient';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setAlreadyRegistered(false);

    if (!email.trim() || !password) {
      setError('メールアドレスとパスワードを入力してください。');
      return;
    }

    if (!agreed) {
      setError('利用規約とプライバシーポリシーへの同意が必要です');
      return;
    }

    const supabase = createSupabaseClient();
    if (!supabase) {
      setError('送信に失敗しました: Supabaseの設定が未設定です。');
      return;
    }

    setSubmitting(true);
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setSubmitting(false);

    const isIdentityMissing =
      !signUpError && Array.isArray(data?.user?.identities) && data.user.identities.length === 0;

    if (isIdentityMissing) {
      setError(
        'このメールアドレスは既に登録されています。アプリに戻ってログインしてください。'
      );
      setAlreadyRegistered(true);
      return;
    }

    if (signUpError) {
      const message = signUpError.message?.toLowerCase() ?? '';
      const isAlreadyRegistered =
        message.includes('already') ||
        message.includes('registered') ||
        signUpError.status === 400 ||
        signUpError.status === 422;

      if (isAlreadyRegistered) {
        setError(
          'このメールアドレスは既に登録されています。アプリに戻ってログインしてください。'
        );
        setAlreadyRegistered(true);
      } else {
        setError(signUpError.message);
      }
      return;
    }

    router.push('/signup/check-email');
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
            />
          </label>

          <label className="block text-sm font-medium text-gray-700">
            パスワード
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:border-blue-500 focus:outline-none"
              placeholder="8文字以上"
              autoComplete="new-password"
            />
          </label>

          <button
            type="submit"
            disabled={submitting || !agreed}
            className="w-full rounded-md bg-blue-600 py-2.5 text-white font-semibold hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            登録する
          </button>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
        </form>

        <label className="flex items-start gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(event) => setAgreed(event.target.checked)}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span>
            <a
              href="/privacy"
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
            に同意します
          </span>
        </label>

        <div className="pt-2 space-y-2">
          {alreadyRegistered && (
            <>
              <p className="text-sm text-gray-700">
                アプリに戻ってログインしてください。
              </p>
              <a
                href="testalbum://login"
                className="inline-block text-sm text-blue-600 hover:underline"
              >
                アプリを開く
              </a>
              <p className="text-xs text-gray-500">
                ボタンで開けない場合は、アプリを手動で起動してください。
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
