'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { sanitizeReturnTo } from '@/lib/sanitizeReturnTo';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState('');

  useEffect(() => {
    const safeNext = sanitizeReturnTo(searchParams.get('next'));

    const code = searchParams.get('code');
    if (code) {
      const exchange = async () => {
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(
          code
        );
        if (exchangeError) {
          setError(`認証に失敗しました: ${exchangeError.message}`);
          return;
        }

        router.replace(safeNext ?? '/');
      };

      void exchange();
      return;
    }

    const hash =
      typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';
    const hashParams = new URLSearchParams(hash);
    const accessToken = hashParams.get('access_token');
    const refreshToken = hashParams.get('refresh_token');
    const type = hashParams.get('type');

    if (accessToken && refreshToken) {
      const setSession = async () => {
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        if (sessionError) {
          setError(`認証に失敗しました: ${sessionError.message}`);
          return;
        }

        if (type === 'recovery') {
          router.replace('/update-password');
          return;
        }
        router.replace(safeNext ?? '/auth/confirmed');
      };

      void setSession();
      return;
    }

    setError('認証コードが見つかりません。');
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-gray-900">認証中...</h1>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}
