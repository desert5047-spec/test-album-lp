export default function DeleteAccountPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">アカウント削除（退会）について</h1>
      <p className="mt-4 leading-7">
        テストアルバムのアカウント削除をご希望の場合は、以下の手順をご確認ください。
      </p>

      <section className="mt-8 rounded-xl border p-6">
        <h2 className="text-xl font-semibold">アプリから退会手続きを行う</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5">
          <li>アプリを開き、ログインします</li>
          <li>「設定」→「アカウント削除（退会）」を開きます</li>
          <li>案内に従って退会手続きを進めます</li>
        </ol>
        <p className="mt-4 text-sm text-gray-600">
          ※現在のバージョンでアプリ内の退会が未実装の場合は、下記「削除依頼」をご利用ください。
        </p>
      </section>

      <section className="mt-8 rounded-xl border p-6">
        <h2 className="text-xl font-semibold">アプリ内で退会できない場合（削除依頼）</h2>
        <p className="mt-4 leading-7">
          登録メールアドレスを記載のうえ、下記宛に「アカウント削除依頼」をお送りください。
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>記載内容：登録メールアドレス</li>
          <li>対応目安：数日以内</li>
        </ul>
        <div className="mt-6">
          <a
            className="inline-flex items-center rounded-lg border px-4 py-2"
            href="mailto:yoshimi.ui@aba-lab.com?subject=【テストアルバム】アカウント削除依頼"
          >
            メールで削除依頼する
          </a>
        </div>
      </section>

      <section className="mt-8 rounded-xl border p-6">
        <h2 className="text-xl font-semibold">削除されるデータ</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>アカウント情報（メールアドレス等）</li>
          <li>アップロードしたテスト画像</li>
          <li>点数・科目などの登録データ</li>
        </ul>
      </section>

      <p className="mt-8 text-sm text-gray-600">
        プライバシーポリシー：{" "}
        <a className="underline" href="/privacy">/privacy</a>
      </p>
    </main>
  );
}
