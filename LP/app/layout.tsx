import './globals.css';
import type { Metadata } from 'next';
import { Inter, Noto_Sans_JP } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'テストアルバム - 子どものがんばりを、やさしく見守るアルバム',
  description: '子どものテストを写真で保存。教科・日付・点数は任意入力で、月ごとの振り返りで成長を実感。競争しない、責めない、やさしい記録ツールです。',
  keywords: ['テスト', '記録', '学習', '子ども', '成績管理', 'アルバム', '保護者'],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    title: 'テストアルバム - 子どものがんばりを、やさしく見守るアルバム',
    description: '子どものテストを写真で保存。教科・日付・点数は任意入力で、月ごとの振り返りで成長を実感。',
    siteName: 'テストアルバム',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'テストアルバム',
    description: '子どものテストを写真で保存。やさしく見守る記録ツール。',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${inter.variable} ${notoSansJP.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
