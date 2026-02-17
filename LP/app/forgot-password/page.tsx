'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('');
    setError('');

    if (!email.trim()) {
      setError('メールアドレスを入力してください。');
      return;
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';
    const redirectTo = siteUrl
      ? `${siteUrl}/auth/callback`
      : `${window.location.origin}/auth/callback`;

    setSubmitting(true);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email.trim(),
      { redirectTo }
    );
    setSubmitting(false);

    if (resetError) {
      setError(`送信に失敗しました: ${resetError.message}`);
      return;
    }

    setMessage('再設定リンクをメール送信しました。');
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">パスワード再設定</h1>

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

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-blue-600 py-2.5 text-white font-semibold hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            再設定リンクを送る
          </button>
        </form>

        {message && (
          <div className="rounded-md bg-green-50 p-3 text-sm text-green-700">
            {message}
          </div>
        )}
        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
            {error}
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
