# Vercel Environment Variables (Web)

Web は `NEXT_PUBLIC_*` の env のみを使用します。`EXPO_PUBLIC_*` は使用しません。

## Production (www.test-album.jp)
- `NEXT_PUBLIC_SUPABASE_URL` = `https://cwwzaknsitnaqqafbrsc.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = PROD の `sb_publishable_...`

## Preview (Vercel preview deployments)
- `NEXT_PUBLIC_SUPABASE_URL` = `https://dzqzkwoxfciuhikvnlmg.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = STG の `sb_publishable_...`
