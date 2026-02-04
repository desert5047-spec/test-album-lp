import { Container } from "@/components/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約 | テストアルバム",
  description: "テストアルバムの利用規約をご確認ください。",
};

export default function TermsPage() {
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
              利用規約
            </h1>
            <p className="text-gray-600">
              この利用規約（以下「本規約」）は、テストアルバム（以下「本サービス」）の利用条件を定めるものです。
              本サービスをご利用になる前に、必ずお読みください。
            </p>
            <p className="text-sm text-gray-500">最終更新日：2026年2月</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>第1条（適用）</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  本規約は、本サービスの利用に関する条件を、本サービスを利用するすべてのユーザーと当サービス運営者との間で定めるものです。
                </p>
                <p>
                  本サービスを利用することにより、ユーザーは本規約に同意したものとみなされます。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>第2条（サービス内容）</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>本サービスは、以下の機能を提供します。</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>テストの写真を保存する機能</li>
                  <li>教科、日付、点数などの情報を記録する機能（任意）</li>
                  <li>月ごとの振り返りや推移を確認する機能</li>
                  <li>タグによる整理機能</li>
                </ul>
                <p>本サービスでは、広告が表示される場合があります。また、将来的に一部機能を有料で提供する場合があります。
                </p>
                <p className="text-sm text-gray-600 mt-4">
                  ※ サービス内容は予告なく変更される場合があります。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>第3条（利用条件）</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>ユーザーは、以下の条件を満たすものとします。</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>本規約に同意すること</li>
                  <li>
                    未成年者の場合は、保護者の同意を得た上で利用すること
                  </li>
                  <li>
                    本サービスを個人的な用途に限り使用すること
                  </li>
                </ul>
                <p>ユーザーは、自己の責任においてアカウント情報を管理するものとし、第三者による不正利用について、運営者は責任を負いません。
                </p>

              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>第4条（禁止事項）</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>ユーザーは、以下の行為を行ってはなりません。</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>法令または公序良俗に違反する行為</li>
                  <li>犯罪行為に関連する行為</li>
                  <li>他者の権利を侵害する行為</li>
                  <li>
                    本サービスの運営を妨害する行為
                  </li>
                  <li>本サービスの信用を損なう行為</li>
                  <li>
                    不正アクセスその他の方法により、本サービスまたは他のユーザーに損害を与える行為
                  </li>
                  <li>その他、運営者が不適切と判断する行為</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>第5条（サービスの変更・停止）</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  運営者は、ユーザーへの事前通知なく、本サービスの内容を変更、または提供を中断・停止することができます。
                </p>
                <p>
                  メンテナンス、システム障害、その他やむを得ない事情により、サービスが一時的に利用できなくなる場合があります。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>第6条（免責事項）</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      1. 成績向上の保証について
                    </h4>
                    <p>
                      本サービスは、学習記録を支援するツールであり、成績の向上を保証するものではありません。
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      2. データの正確性について
                    </h4>
                    <p>
                      運営者は、本サービスで提供される情報（平均点、推移グラフなど）の正確性、完全性、有用性について保証しません。
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      3. データの保存について
                    </h4>
                    <p>
                      運営者は、技術的な問題、システム障害、その他の理由により、ユーザーが保存したデータが消失または破損した場合、一切の責任を負いません。
                      大切なデータは、定期的にバックアップすることを推奨します。
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      4. 損害賠償の制限
                    </h4>
                    <p>
                    本サービスの利用に起因してユーザーに生じた損害について、運営者は、運営者の故意または重大な過失による場合を除き、責任を負わないものとします。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>第7条（著作権）</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  本サービスおよび本サービスに関連するすべてのコンテンツ（デザイン、テキスト、画像、プログラムなど）の著作権は、運営者または正当な権利者に帰属します。
                </p>
                <p>
                  ユーザーが本サービスにアップロードした写真やデータの著作権は、ユーザーに帰属します。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>第8条（個人情報の取り扱い）</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  運営者は、ユーザーの個人情報を適切に取り扱います。詳細は
                  <Link
                    href="/privacy"
                    className="text-blue-600 hover:underline"
                  >
                    プライバシーポリシー
                  </Link>
                  をご確認ください。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>第9条（規約の変更）</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  運営者は、必要に応じて本規約を変更することができます。
                  変更後の規約は、本サービス上に掲載した時点で効力を生じるものとします。
                </p>
                <p>
                  変更後もサービスを継続して利用する場合、変更後の規約に同意したものとみなされます。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>第10条（準拠法・管轄裁判所）</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>本規約の解釈および適用は、日本法に準拠します。</p>
                <p>
                  本サービスに関連する紛争については、運営者の所在地を管轄する裁判所を専属的合意管轄裁判所とします。
                </p>
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
