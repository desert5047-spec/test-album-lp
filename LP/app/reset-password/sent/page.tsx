export default function ResetPasswordSentPage() {
  return (
    <main className="mx-auto w-full max-w-md px-6 py-12">
      <h1 className="text-2xl font-bold">メールを送信しました</h1>
      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
        メールを確認し、本文内の
        <span className="font-medium text-foreground">
          「パスワードを再設定する」
        </span>
        ボタンを押してください。
        <br />
        <br />
        届かない場合は、迷惑メールフォルダをご確認ください。
      </p>
    </main>
  );
}
