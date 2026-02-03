import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section id="cta" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-50 to-blue-100/50 scroll-mt-20">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
              完璧じゃなくても、
              <br />
              大丈夫。
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
              今日の1枚から、子どもの&quot;がんばり&quot;を
              <br />
              残していきませんか？
            </p>
            <p className="text-base text-gray-600 leading-relaxed pt-2">
              撮るだけで、あとから振り返れる安心感。
              <br className="hidden sm:block" />
              できる日だけで、ちゃんと積み重なっていきます。
            </p>
          </div>

          <Button
            asChild
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-lg px-10 py-7"
          >
            <a
              href="https://example.com/app"
              className="flex items-center gap-2"
            >
              今日から記録を始める
              <ArrowRight className="h-5 w-5" />
            </a>
          </Button>

          <p className="text-sm text-gray-600">
            ※ 会員登録やアプリのダウンロードは不要です
            <br />
            ※ いつでも削除できます
          </p>
        </div>
      </Container>
    </section>
  );
}
