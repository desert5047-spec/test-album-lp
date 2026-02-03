import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  FileText,
  TrendingUp,
  Users,
} from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Camera,
      title: "写真で保存",
      description:
        "スマホで撮るだけ。プリントを探す手間がなくなります。",
      available: true,
    },
    {
      icon: FileText,
      title: "教科・日付・点数",
      description:
        "記録したいときだけ入力できます。全部埋めなくても大丈夫。",
      available: true,
    },
    {
      icon: TrendingUp,
      title: "月のふりかえり",
      description:
        "平均点や推移を確認。成長を実感できます。",
      available: true,
    },
    {
      icon: Users,
      title: "複数のお子さま対応",
      description:
        "兄弟姉妹のテストも、それぞれ別々に管理できます。",
      available: true,
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-20 lg:py-24 bg-white scroll-mt-20">
      <Container>
        <SectionTitle
          title="シンプルだから、続けられる"
          subtitle="必要な機能だけを、使いやすく。無理なく続けられる工夫があります。"
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`border-gray-200 hover:shadow-lg transition-all duration-300 ${
                !feature.available ? "bg-gray-50" : "bg-white"
              }`}
            >
              <CardContent className="p-6 sm:p-8 space-y-4">
                <div className="flex items-start justify-between">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      feature.available
                        ? "bg-blue-50"
                        : "bg-gray-200"
                    }`}
                  >
                    <feature.icon
                      className={`h-6 w-6 ${
                        feature.available
                          ? "text-blue-600"
                          : "text-gray-500"
                      }`}
                    />
                  </div>
                  {feature.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  )}
                </div>
                <h3
                  className={`text-xl font-semibold ${
                    feature.available
                      ? "text-gray-900"
                      : "text-gray-600"
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`leading-relaxed ${
                    feature.available
                      ? "text-gray-600"
                      : "text-gray-500"
                  }`}
                >
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
