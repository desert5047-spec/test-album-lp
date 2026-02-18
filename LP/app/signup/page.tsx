'use client';

import { useState } from 'react';
import Link from 'next/link';

const cooldownKey = 'signupCooldown';

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

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password) {
      setError('メールアドレスとパスワードを入力してください。');
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
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail, password }),
      });

      if (!response.ok) {
        throw new Error('request failed');
      }
    } catch {
      setSubmitting(false);
      setError('送信に失敗しました。時間をおいて再度お試しください。');
      return;
    }
    setSubmitting(false);

    setSuccess(
      '確認メールを送信しました。届かない場合は迷惑メールをご確認ください。登録済みの場合はログイン、またはパスワードリセットをお試しください。'
    );
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(
        cooldownKey,
        JSON.stringify({ email: normalizedEmail, ts: Date.now() })
      );
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
