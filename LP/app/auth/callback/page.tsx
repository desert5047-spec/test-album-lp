'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState('');

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) {
      setError('認証コードが見つかりません。');
      return;
    }

    const exchange = async () => {
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(
        code
      );
      if (exchangeError) {
        setError(`認証に失敗しました: ${exchangeError.message}`);
        return;
      }

      router.replace('/');
    };

    void exchange();
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
