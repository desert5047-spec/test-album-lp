const FORM_URL = "https://forms.gle/c52ykeo14HgXz8Z69";

export default function DeleteAccountPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">アカウント削除（退会）について</h1>

      <p className="mt-4 leading-7">
        テストアルバムのアカウント削除をご希望の場合は、以下をご確認ください。
      </p>

      <section className="mt-8 rounded-xl border p-6">
        <h2 className="text-xl font-semibold">写真・記録などのデータ削除（アプリで可能）</h2>
        <p className="mt-4 leading-7">
          写真・子ども情報・記録データは、アプリ内
          <span className="font-semibold">「設定」→「データ初期化」</span>
          から削除できます。
        </p>
      </section>

      <section className="mt-8 rounded-xl border p-6">
        <h2 className="text-xl font-semibold">アカウント削除（退会）は依頼制です</h2>
        <p className="mt-4 leading-7">
          アカウント削除をご希望の場合は、下記フォームより削除依頼を送信してください。
          <br />
          送信後、入力された<span className="font-semibold">登録メールアドレス宛に確認メール</span>をお送りします。
          <br />
          確認が取れ次第、アカウントおよび関連データを削除いたします。
        </p>

        <div className="mt-6">
          <a
            href={FORM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-lg border px-4 py-2 font-semibold"
          >
            アカウント削除を依頼する（フォームを開く）
          </a>
        </div>

        <p className="mt-4 text-sm text-gray-600">
          ※ フォームには「アプリに登録したメールアドレス」をご入力ください。
        </p>
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
        <a className="underline" href="/privacy">
          https://www.test-album.jp/privacy
        </a>
      </p>
    </main>
  );
}
