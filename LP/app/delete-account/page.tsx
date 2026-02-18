'use client';

import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'アカウント削除（退会）について | テストアルバム',
  description: 'テストアルバムのアカウント削除（退会）についてのご案内です。',
};

const deleteFormUrl = 'https://forms.gle/c52ykeo14HgXz8Z69';

export default function DeleteAccountPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto w-full max-w-3xl space-y-8 rounded-lg bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">アカウント削除（退会）について</h1>

        <p className="text-gray-700">
          テストアルバムのアカウント削除をご希望の場合は、以下をご確認ください。
        </p>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">
            写真・記録などのデータ削除（アプリで可能）
          </h2>
          <p className="text-gray-700">
            写真・子ども情報・記録データは、アプリ内「設定」→「データ初期化」から削除できます。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">
            アカウント削除（退会）は依頼制です
          </h2>
          <p className="text-gray-700">
            アカウント削除をご希望の場合は、下記フォームより削除依頼を送信してください。
            送信後、入力された登録メールアドレス宛に削除確認メールをお送りします。
            なりすまし防止のため、そのメールへの返信をもって削除依頼を確定いたします。
          </p>
          <p className="text-gray-700">
            削除確認メールは、事業主による申請内容の確認後に順次送信しております。
            通常、数日以内にご連絡いたしますが、状況によりお時間をいただく場合がございます。
            返信が確認でき次第、アカウントおよび関連データを削除いたします。
          </p>
          <p className="text-gray-700">
            ※ 確認メールが届かない場合は、迷惑メールフォルダもご確認ください。
          </p>

          <a
            href={deleteFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
          >
            アカウント削除を依頼する（フォームを開く）
          </a>
          <p className="text-sm text-gray-600">
            ※ フォームには「アプリに登録したメールアドレス」をご入力ください。
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-900">削除されるデータ</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>点数・科目などの登録データ</li>
            <li>アップロードしたテスト画像</li>
            <li>アカウント情報（メールアドレス等）</li>
          </ul>
        </section>

        <div className="pt-2">
          <Link href="/privacy" className="text-sm text-blue-600 hover:underline">
            プライバシーポリシー
          </Link>
        </div>
      </div>
    </div>
  );
}
