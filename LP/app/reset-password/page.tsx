'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Info } from 'lucide-react';

const cooldownKey = 'forgotPasswordCooldown';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('');
    setError('');

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      setError('メールアドレスを入力してください。');
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
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail }),
      });
      if (!response.ok) {
        const msg = 'エラーが発生しました。時間をおいて再度お試しください。';
        setSubmitting(false);
        setError(msg);
        return;
      }
    } catch {
      setSubmitting(false);
      setError('通信に失敗しました。時間をおいて再度お試しください。');
      return;
    }
    setSubmitting(false);

    setMessage('メールを送信しました。届かない場合は迷惑メールをご確認ください。');
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(
        cooldownKey,
        JSON.stringify({ email: normalizedEmail, ts: Date.now() })
      );
    }
    router.push(`/reset-password/sent?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">パスワード再設定</h1>
        <div className="flex items-start gap-2 text-sm text-gray-600">
          <Info className="mt-0.5 h-4 w-4 text-gray-500" />
          <p>
            パスワードが分からない場合は、登録メールアドレスを入力して再設定リンクを送ってください。
          </p>
        </div>

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
