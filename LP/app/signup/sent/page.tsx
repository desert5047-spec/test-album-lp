'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { sanitizeReturnTo } from '@/lib/sanitizeReturnTo';

export default function SignupSentPage() {
  const sp = useSearchParams();
  const email = sp.get('email') ?? '';
  const safeReturn = useMemo(
    () => sanitizeReturnTo(sp.get('returnTo')),
    [sp]
  );

  return (
    <main className="mx-auto w-full max-w-md px-6 py-12">
      <h1 className="text-2xl font-bold">メールを送信しました</h1>

      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
        {email ? (
          <>
            <span className="font-medium text-foreground">{email}</span> 宛に、確認メールを送信しました。
          </>
        ) : (
          <>確認メールを送信しました。</>
        )}
        <br />
        （登録されている場合）
        <br />
        <br />
        メールを確認し、本文内の
        <span className="font-medium text-foreground">
          「メールアドレスを確認する」
        </span>
        ボタンを押してください。
        <br />
        <br />
        届かない場合は、迷惑メールフォルダをご確認ください。
        <br />
        また、入力したメールアドレスをご確認のうえ、もう一度お試しください。
      </p>

      {safeReturn && (
        <p className="mt-6 text-sm text-muted-foreground">
          メール内のリンクを押すと、元のページ（家族招待など）に戻ります。
          <br />
          <Link href={safeReturn} className="mt-2 inline-block text-blue-600 hover:underline">
            すでに確認済みの場合はこちら
          </Link>
        </p>
      )}
    </main>
  );
}
