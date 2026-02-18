import Link from 'next/link';

export default function AuthConfirmedPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">認証が完了しました</h1>
        <p className="text-sm text-gray-700">
          アプリに戻ってログインしてください。
        </p>
        <a
          href="testalbum://login"
          className="inline-block text-sm text-blue-600 hover:underline"
        >
          アプリに戻る
        </a>
        <div className="pt-2">
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            トップへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
