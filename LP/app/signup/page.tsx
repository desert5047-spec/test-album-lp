'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim() || !password) {
      setError('メールアドレスとパスワードを入力してください。');
      return;
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';
    const emailRedirectTo = siteUrl
      ? `${siteUrl}/auth/callback`
      : `${window.location.origin}/auth/callback`;

    setSubmitting(true);
    const { error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo,
      },
    });
    setSubmitting(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    setSuccess('確認メールを送信しました。メールをご確認ください。');
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
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:border-blue-500 focus:outline-none"
              placeholder="8文字以上"
              autoComplete="new-password"
              required
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-blue-600 py-2.5 text-white font-semibold hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            登録する
          </button>
        </form>

        {success && (
          <p className="text-sm text-green-700 bg-green-50 rounded p-2">{success}</p>
        )}
        {error && <p className="text-sm text-red-600">{error}</p>}

        <p className="text-xs text-gray-500">
          「このメールアドレスは既に登録されています」は、その環境のAuthに既に存在するという意味です。
          PROD WebではPROD側、STG WebではSTG側で判定されます。
        </p>

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
