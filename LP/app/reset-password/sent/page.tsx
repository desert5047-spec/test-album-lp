'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { sanitizeReturnTo } from '@/lib/sanitizeReturnTo';

export default function ResetPasswordSentPage() {
  const sp = useSearchParams();
  const email = sp.get('email') ?? '';
  const safeReturn = useMemo(
    () => sanitizeReturnTo(sp.get('returnTo')),
    [sp]
  );
  const backHref = safeReturn
    ? `/invite-auth?returnTo=${encodeURIComponent(safeReturn)}`
    : '/signup';

  return (
    <main className="mx-auto w-full max-w-md px-6 py-12">
      <h1 className="text-2xl font-bold">メールを送信しました</h1>

      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
        {email ? (
          <>
            <span className="font-medium text-foreground">{email}</span> 宛に、再設定メールを送信しました。
          </>
        ) : (
          <>再設定メールを送信しました。</>
        )}
        <br />
        （登録されている場合）
        <br />
        <br />
        メールを確認し、本文内の
        <span className="font-medium text-foreground">
          「パスワードを再設定する」
        </span>
        ボタンを押してください。
        <br />
        <br />
        届かない場合は、迷惑メールフォルダをご確認ください。
        <br />
        また、入力したメールアドレスをご確認のうえ、もう一度お試しください。
      </p>

      <p className="mt-6 text-sm">
        <Link href={backHref} className="text-blue-600 hover:underline">
          ログイン・新規登録に戻る
        </Link>
      </p>
    </main>
  );
}
