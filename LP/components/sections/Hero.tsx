'use client';

import { motion } from 'framer-motion';
import { HeroVisual } from '../hero/HeroVisual';
import { Button } from '../ui/button';
import { Camera, BookOpen } from 'lucide-react';
import { Container } from '../Container';

export function Hero() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-blue-50/50 via-white to-white overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-1 text-center lg:text-left pt-6 pb-4 lg:pt-0 lg:pb-0"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-normal mb-4 sm:mb-6 px-4 lg:px-0">
              子供のテスト、
              <br />
              捨てる前に<span className="text-blue-600">1枚。</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8 px-4 lg:px-0">
              写真で残して、あとで「がんばり」が見える。
              <br />
              入力は必要なときだけで大丈夫。
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-4 lg:px-0">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-6 text-base shadow-lg hover:shadow-xl transition-all"
              >
                <a href="#cta">
                  <Camera className="w-5 h-5 mr-2" />
                  今日のテストから、記録を始める
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-6 text-base"
              >
                <a href="#how-it-works">
                  <BookOpen className="w-5 h-5 mr-2" />
                  使い方を見る
                </a>
              </Button>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6 px-4 lg:px-0">
              ※点数の記録は任意です。写真だけでも大丈夫。
            </p>

            <div className="flex flex-col items-center lg:items-start gap-2 pt-4 px-4 lg:px-0">
              <div className="flex items-center justify-center lg:justify-start gap-4 flex-wrap">
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
          </motion.div>

          <div className="order-2 lg:order-2">
            <HeroVisual />
          </div>
        </div>
      </Container>

      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl -z-10"></div>
    </section>
  );
}
