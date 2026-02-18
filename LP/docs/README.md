# Vercel Environment Variables (Web)

Web は `NEXT_PUBLIC_*` の env のみを使用します。`EXPO_PUBLIC_*` は使用しません。
`NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` を
All Environments に置くのは禁止です（環境ブレの原因）。

## Production (www.test-album.jp)
- `NEXT_PUBLIC_SUPABASE_URL` = `https://cwwzaknsitnaqqafbrsc.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = PROD の `sb_publishable_...`
- `NEXT_PUBLIC_SITE_URL` = `https://www.test-album.jp`

## Preview (stg.test-album.jp)
- `NEXT_PUBLIC_SUPABASE_URL` = `https://dzqzkwoxfciuhikvnlmg.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = STG の `sb_publishable_...`
- `NEXT_PUBLIC_SITE_URL` = `https://stg.test-album.jp`

## Web URL 運用ルール
- 本番: `https://www.test-album.jp`（PROD Supabase 固定）
- STG: `https://stg.test-album.jp`（STG Supabase 固定）

## /signup の重複判定について
「このメールアドレスは既に登録されています」は、その環境の Auth に
既に存在するという意味です。PROD Web なら PROD 側、STG Web なら STG 側で判定されます。

## DNS 設定（stg.test-album.jp）
- お名前.com 等の DNS に、Vercel が指示するレコードを追加
  - A / CNAME のどちらか（Vercel 表示に従う）
- 反映後、Vercel Domains で "Valid" になることを確認

## STG Supabase（設定メモ）
- Authentication > Site URL = `https://stg.test-album.jp`
- Authentication > Redirect URLs に `https://stg.test-album.jp/auth/callback` を追加