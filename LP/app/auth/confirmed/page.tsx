export default function AuthConfirmedPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">メール確認が完了しました</h1>
        <p className="text-sm text-gray-700 leading-relaxed">
          ご登録ありがとうございます。
          <br />
          アプリを起動してログインしてください。
        </p>
      </div>
    </div>
  );
}
