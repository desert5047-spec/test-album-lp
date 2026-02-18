import Link from 'next/link';

export default function SignupCheckEmailPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">確認メールを送信しました</h1>
        <p className="text-sm text-gray-700">
          受信ボックスをご確認ください。届かない場合は迷惑メールをご確認ください。
        </p>
        <Link href="/" className="inline-block text-sm text-blue-600 hover:underline">
          トップへ戻る
        </Link>
      </div>
    </div>
  );
}
