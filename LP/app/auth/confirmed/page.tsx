export default function AuthConfirmedPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">メール確認が完了しました</h1>
        <p className="text-sm text-gray-700 leading-relaxed">
          ご登録ありがとうございます。アプリに戻ってログインしてください。
        </p>
        <a
          href="testalbum://login"
          className="block w-full rounded-md bg-blue-600 py-2.5 text-white font-semibold text-center hover:bg-blue-700"
        >
          アプリに戻る
        </a>
        <p className="text-xs text-gray-500">
          ボタンをタップしてアプリを開けない場合は、アプリを手動で起動してください。
        </p>
      </div>
    </div>
  );
}
