import { Container } from "@/components/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | テストアルバム",
  description: "テストアルバムのプライバシーポリシーをご確認ください。",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Container>
        <div className="py-12 sm:py-16 max-w-4xl mx-auto space-y-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            トップに戻る
          </Link>

          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              プライバシーポリシー
            </h1>
            <p className="text-gray-600">
              テストアルバム（以下「本サービス」）は、ユーザーの個人情報を大切に扱います。
              このプライバシーポリシーでは、本サービスがどのような情報を取得し、どのように利用するかを説明します。
            </p>
            <p className="text-sm text-gray-500">最終更新日：2026年2月</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>1. 取得する情報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>本サービスは、以下の情報を取得します：</p>
                <div className="space-y-3 ml-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      （1）ユーザーが入力する情報
                    </h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>メールアドレス（アカウント登録時）</li>
                      <li>テストの写真</li>
                      <li>教科名、日付、点数などの入力情報</li>
                      <li>タグやメモなどの任意入力情報</li>
                    </ul>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      （2）自動的に取得される情報
                    </h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>
                        利用状況に関する情報（アクセス日時、利用機能など）
                      </li>
                      <li>端末情報（OS、ブラウザの種類など）</li>
                      <li>
                        広告識別子（AdMobなどの広告サービス利用時）
                      </li>
                      <li>
                        Cookieおよび類似の技術による情報
                      </li>
                    </ul>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      （3）将来取得する可能性のある情報
                    </h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>お問い合わせ内容</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. 情報の利用目的</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>取得した情報は、以下の目的で利用します：</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>本サービスの提供・運営</li>
                  <li>ユーザーサポート</li>
                  <li>サービスの改善・新機能の開発</li>
                  <li>利用状況の分析</li>
                  <li>不正利用の防止</li>
                  <li>広告の配信および効果測定</li>
                  <li>お知らせやキャンペーン情報の配信</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. 広告・分析サービスについて</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      （1）広告配信サービス
                    </h4>
                    <p>
                      本サービスでは、将来的にGoogle AdMobなどの広告配信サービスを利用する場合があります。
                      広告配信サービスを利用する場合、広告識別子やCookie等を使用して、ユーザーの興味・関心に基づいた広告を配信することがあります。
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      （2）アクセス解析サービス
                    </h4>
                    <p>
                      本サービスでは、Google Analyticsなどのアクセス解析サービスを利用する場合があります。
                      これらのサービスは、Cookieを使用してユーザーの利用状況を分析します。
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      （3）広告識別子について
                    </h4>
                    <p>
                      スマートフォンアプリにおいて広告配信サービスを利用する場合、各OSが提供する広告識別子（iOSではIDFA、AndroidではAdvertising
                      ID）を利用することがあります。
                      これらの識別子は、端末の設定から無効化または初期化できます。
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      （4）Cookieについて
                    </h4>
                    <p>
                    Cookieは、ウェブサイトやアプリにおいて、利用状況を把握するために端末に保存される小さなデータファイルです。
                      ブラウザの設定でCookieを無効にできますが、一部の機能が利用できなくなる場合があります。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. 第三者への提供</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  運営者は、以下の場合を除き、ユーザーの個人情報を第三者に提供しません。
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>ユーザーの同意がある場合</li>
                  <li>法令に基づく場合</li>
                  <li>
                    人の生命、身体または財産の保護のために必要がある場合
                  </li>
                  <li>
                    国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合
                  </li>
                </ul>
                <p>
                  なお、本サービスでは、サービスの提供および改善、広告配信等の目的のため、以下の第三者サービスを利用する場合があります。
                  これらのサービスにおいては、各提供者のプライバシーポリシーに基づき、情報が管理されます。
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Google AdMob（広告配信）</li>
                  <li>Google Analytics（利用状況の分析）</li>
                </ul>
               </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. 情報の安全管理</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  本サービスでは、ユーザー認証および取得したデータの保存・管理に、第三者のクラウドサービス（Supabase）を利用しています。
                  これらのサービスは、適切なセキュリティ対策を講じた環境で運用されています。
                </p>
                <p>
                  運営者は、ユーザーの個人情報について、不正アクセス、紛失、破壊、改ざん、漏洩などの防止に努め、合理的な安全対策を講じます。
                  ただし、通信環境やシステム障害、誤操作等により、個人情報や登録データが消失または破損する可能性があり、その完全な安全性および保存・復元を保証するものではありません。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. ユーザーの権利</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>ユーザーは、以下の権利を有します。</p>
                <div className="space-y-3 ml-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      （1）データの削除
                    </h4>
                    <p>
                      本サービス内で、ユーザーが保存したデータをいつでも削除できます。
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      （2）開示・訂正・利用停止の請求
                    </h4>
                    <p>
                      ユーザーは、自己の個人情報について、開示、訂正、利用停止を請求することができます。
                      お問い合わせ窓口までご連絡ください。
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      （3）アカウントの削除
                    </h4>
                    <p>
                      ユーザーは、アカウントの削除を希望する場合、本サービスの「アカウント削除（退会）ページ」から削除依頼を送信することができます。
                      削除依頼の送信後、登録メールアドレス宛に削除確認メールをお送りします。
                      なりすまし防止のため、当該メールへの返信をもって削除依頼を確定いたします。
                      <br />
                      <br />
                      削除確認メールは、事業主による申請内容の確認後に順次送信するため、確認メールの送信までお時間をいただく場合があります。
                      返信が確認でき次第、アカウントおよび関連データを削除いたします。
                      <br />
                      <br />
                      削除対象には、アカウント情報、アップロードされた写真、および関連する登録データが含まれます。
                    </p>
                    <p className="mt-3">
                      アカウント削除ページ：
                      <a
                        href="https://www.test-album.jp/delete-account"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline ml-1"
                      >
                        https://www.test-album.jp/delete-account
                      </a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. お子さまの個人情報について</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  本サービスは、主に保護者の方が利用することを想定しています。
                  未成年者が利用する場合は、保護者の同意を得た上でご利用ください。
                </p>
                <p>
                  保護者の方は、お子さまが本サービスに投稿した情報を確認し、削除を求める権利があります。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. プライバシーポリシーの変更</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  運営者は、必要に応じて本プライバシーポリシーを変更することがあります。
                  変更後のプライバシーポリシーは、本サービス上に掲載した時点で効力を生じます。
                </p>
                <p>
                  重要な変更がある場合は、本サービス内でお知らせします。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. お問い合わせ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  本プライバシーポリシーに関するご質問や、個人情報の取り扱いについてのお問い合わせは、以下までご連絡ください。
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="font-semibold text-gray-900">
                    お問い合わせ先
                  </p>
                  <p className="text-gray-700 mt-2">
                    運営者：テストアルバム運営チーム
                  </p>
                  <p className="text-gray-700 mt-2">
                    お問い合わせフォーム：
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSeNQjw8CRwEPbCD9JfvAY3dbWTdDNlyXBV8UOk4zdtGQLTOTg/viewform?usp=publish-editor"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline ml-1"
                    >
                      こちらからお問い合わせください
                    </a>
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    ※ 回答までに数日かかる場合があります
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="pt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              トップに戻る
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
