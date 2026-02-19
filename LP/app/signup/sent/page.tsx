'use client';

import { useSearchParams } from 'next/navigation';

export default function SignupSentPage() {
  const sp = useSearchParams();
  const email = sp.get('email') ?? '';

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
    </main>
  );
}
