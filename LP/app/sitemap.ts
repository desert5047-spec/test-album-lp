import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // 変更理由: 独自ドメイン対応のため、デフォルトURLを本番URLに変更
  // 本番: https://www.test-album.jp
  // ローカル: http://localhost:3000 (環境変数で設定)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.test-album.jp';

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}
