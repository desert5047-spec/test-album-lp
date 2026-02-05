import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // 変更理由: 独自ドメイン対応のため、デフォルトURLを本番URLに変更
  // 本番: https://www.test-album.jp
  // ローカル: http://localhost:3000 (環境変数で設定)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.test-album.jp';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
