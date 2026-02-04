import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export function Pricing() {
  const plans = [
    {
      name: "無料プラン",
      price: "¥0",
      period: "今すぐ始められます",
      description: "基本機能はずっと無料でお使いいただけます",
      features: [
        "写真でテスト保存",
        "教科・日付・点数の記録",
        "月ごとのふりかえり",
        "広告あり",
      ],
      cta: "今日から始める",
      popular: false,
    },
    {
      name: "Plusプラン",
      price: "¥0",
      period: "準備中",
      description: "より便利な機能を追加予定",
      features: [
        "無料プランの全機能",
        "広告なし",
      ],
      cta: "近日公開",
      popular: true,
      comingSoon: true,
    },
  ];

  return (
    <section id="pricing" className="py-16 sm:py-20 lg:py-24 bg-white scroll-mt-20">
      <Container>
        <SectionTitle
          title="料金プラン"
          subtitle="まずは無料プランで、じっくり試せます。"
        />

        <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative border-2 ${
                plan.popular
                  ? "border-blue-600 shadow-xl"
                  : "border-gray-200 shadow-sm"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1">
                    準備中
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center space-y-4 pb-8 pt-8">
                <h3 className="text-2xl font-bold text-gray-900">
                  {plan.name}
                </h3>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </div>
                  <div className="text-sm text-gray-600">{plan.period}</div>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start gap-3"
                    >
                      <Check className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild={!plan.comingSoon}
                  disabled={plan.comingSoon}
                  className={`w-full ${
                    plan.popular
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-900 hover:bg-gray-800"
                  }`}
                  size="lg"
                >
                  {plan.comingSoon ? (
                    <span>{plan.cta}</span>
                  ) : (
                    <a href="#cta">{plan.cta}</a>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 max-w-2xl mx-auto">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 space-y-3">
            <h4 className="font-semibold text-gray-900 text-center">料金について</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                • 基本機能（写真保存・記録・振り返り）はずっと無料です
              </p>
              <p>
                • 将来的に便利な機能を追加する可能性がありますが、今お使いの機能は変わりません
              </p>
              <p>
                • 有料プランを導入する場合は、事前にお知らせし、十分な移行期間を設けます
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
