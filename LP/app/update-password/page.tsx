'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

type Status = 'loading' | 'ready' | 'expired' | 'success';

export default function UpdatePasswordPage() {
  const [status, setStatus] = useState<Status>('loading');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !data.session) {
        setStatus('expired');
        setHasSession(false);
        return;
      }
      setHasSession(true);
      setStatus('ready');
    };

    void checkSession();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!password || !confirmPassword) {
      setError('パスワードを入力してください。');
      return;
    }

    if (password !== confirmPassword) {
      setError('パスワードが一致しません。');
      return;
    }

    if (!hasSession) {
      setError('リンクが期限切れです。再度リセットしてください。');
      setStatus('expired');
      return;
    }

    setSubmitting(true);
    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });
    setSubmitting(false);

    if (updateError) {
      setError(`更新に失敗しました: ${updateError.message}`);
      return;
    }

    setStatus('success');
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">パスワード再設定</h1>

        {status === 'expired' && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
            リンクが期限切れです。再度リセットしてください。
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4">
            <div className="rounded-md bg-green-50 p-3 text-sm text-green-700">
              更新しました。
            </div>
            <a
              href="testalbum://login"
              className="inline-block text-sm text-blue-600 hover:underline"
            >
              アプリに戻る
            </a>
          </div>
        )}

        {status === 'ready' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              新しいパスワード
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

            <label className="block text-sm font-medium text-gray-700">
              新しいパスワード（確認）
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:border-blue-500 focus:outline-none"
                placeholder="もう一度入力"
                autoComplete="new-password"
                required
              />
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-md bg-blue-600 py-2.5 text-white font-semibold hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              更新
            </button>

            {error && <p className="text-sm text-red-600">{error}</p>}
          </form>
        )}

        {status === 'loading' && (
          <p className="text-sm text-gray-600">認証中...</p>
        )}
      </div>
    </div>
  );
}
