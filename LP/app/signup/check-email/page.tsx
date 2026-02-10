import Link from 'next/link';

export default function CheckEmailPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">確認メールを送信しました</h1>
        <p className="text-sm text-gray-700 leading-relaxed">
          ご登録のメールアドレスに確認メールを送信しました。
          メール内のリンクを開いて、登録を完了してください。
        </p>
        <p className="text-sm text-gray-600">
          届かない場合は、迷惑メールフォルダをご確認ください。
        </p>
        <div className="pt-2">
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            トップへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
