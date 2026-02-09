import Link from "next/link";

const contactUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSeNQjw8CRwEPbCD9JfvAY3dbWTdDNlyXBV8UOk4zdtGQLTOTg/viewform?usp=publish-editor";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">パスワード再設定</h1>

        <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
          <p>
            パスワードの再設定は、Webから行えます。メールに記載された案内に沿って、
            手続きを進めてください。
          </p>
          <p className="text-gray-600">
            メールが届かない場合は、迷惑メールフォルダをご確認のうえ、
            少し時間を置いてから再度お試しください。
          </p>
          <p className="text-gray-600">
            それでも解決しない場合は、
            <a
              href={contactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline ml-1"
            >
              お問い合わせ
            </a>
            ください。
          </p>
        </div>

        <div className="pt-2">
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            トップへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
