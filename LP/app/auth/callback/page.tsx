'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // MVP: パラメータを受け取ったら確認画面へ遷移
    router.replace('/auth/confirmed');
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-600">確認中...</div>
    </div>
  );
}
