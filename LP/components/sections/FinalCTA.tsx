import { Container } from "@/components/Container";

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

          <div className="flex flex-col items-center gap-2 pt-4">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80 h-10 flex items-center"
                aria-label="App Store でダウンロード"
              >
                <img
                  src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/ja-jp?size=250x83&releaseDate=1276560000"
                  alt="App Store でダウンロード"
                  className="h-full w-auto"
                />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80 h-10 flex items-center"
                aria-label="Google Play ストアでダウンロード"
              >
                <img
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/ja_badge_web_generic.png"
                  alt="Google Play で手に入れよう"
                  className="h-full w-auto"
                />
              </a>
            </div>
            <p className="text-xs sm:text-sm text-gray-500">
              アプリは近日公開予定
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
