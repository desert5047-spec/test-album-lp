import './globals.css';
import type { Metadata } from 'next';
import { Inter, Noto_Sans_JP } from 'next/font/google';
import Script from 'next/script';

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

// サイトのベースURL（環境変数から取得）
// 本番: https://www.test-album.jp
// ローカル: http://localhost:3000
// 変更理由: 独自ドメイン対応のため、デフォルト値を本番URLに設定
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.test-album.jp';

// Google Analytics ID（環境変数から取得）
// 変更理由: Google Analytics導入のため、環境変数でGA IDを管理
// 本番環境（NODE_ENV === "production"）でのみ有効
// セキュリティ: GA IDの形式を検証してXSSを防止
const rawGaId = process.env.NEXT_PUBLIC_GA_ID;
const isProduction = process.env.NODE_ENV === 'production';

// GA IDの形式検証（G-で始まる英数字のみ許可）
const isValidGaId = (id: string | undefined): id is string => {
  if (!id) return false;
  // GA4の測定IDは G- で始まり、英数字とハイフンのみ
  return /^G-[A-Z0-9]+$/i.test(id);
};

const gaId = isValidGaId(rawGaId) ? rawGaId : undefined;

export const metadata: Metadata = {
  // 変更理由: 独自ドメイン対応のため、metadataBaseを本番URLに設定
  metadataBase: new URL(siteUrl),
  title: {
    default: 'テストアルバム - 子どものがんばりを、やさしく見守るアルバム',
    template: '%s | テストアルバム',
  },
  description: '子どものテストを写真で保存。教科・日付・点数は任意入力で、月ごとの振り返りで成長を実感。競争しない、責めない、やさしい記録ツールです。',
  keywords: ['テスト', '記録', '学習', '子ども', '成績管理', 'アルバム', '保護者'],
  authors: [{ name: 'テストアルバム運営チーム' }],
  creator: 'テストアルバム運営チーム',
  publisher: 'テストアルバム運営チーム',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // 変更理由: canonical URLを設定してSEOを強化
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    // 変更理由: 独自ドメイン対応のため、OG URLを本番URLに設定
    url: siteUrl,
    siteName: 'テストアルバム',
    title: 'テストアルバム - 子どものがんばりを、やさしく見守るアルバム',
    description: '子どものテストを写真で保存。教科・日付・点数は任意入力で、月ごとの振り返りで成長を実感。',
    // 変更理由: OGP画像をog.pngを優先し、存在しない場合はog-image.pngを使用
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: 'テストアルバム',
      },
      // フォールバック: og.pngが存在しない場合の代替画像
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'テストアルバム',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'テストアルバム - 子どものがんばりを、やさしく見守るアルバム',
    description: '子どものテストを写真で保存。やさしく見守る記録ツール。',
    // 変更理由: Twitter card画像も本番URLを参照
    images: [`${siteUrl}/og.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Google Search Console用
    // 変更理由: Google Search ConsoleのHTML確認タグを追加
    google: 'hzCgkMqhiiv9Li4sS7iSz0vV_RAApUvn5xX-axY0aIA',
  },
  // 変更理由: faviconを設定するため、iconsメタデータを追加
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        {/* 変更理由: Google Analytics 4導入のため、Google tag (gtag.js)を<head>に明示的に配置 */}
        {/* 本番環境かつGA IDが設定されている場合のみ読み込む */}
        {/* シンプルな実装で確実に動作するようにgtag('config')のみに変更 */}
        {isProduction && gaId && (
          <>
            {/* Google tag (gtag.js) - スクリプトの読み込み */}
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            {/* Google tag (gtag.js) - 初期化スクリプト（シンプル版） */}
            {/* セキュリティ: gaIdは検証済みのため、XSSリスクは低い */}
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className={`${inter.variable} ${notoSansJP.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
