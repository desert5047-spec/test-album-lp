/**
 * オープンリダイレクト防止のため、内部パスのみ許可する。
 * 招待フロー用に /invite?token=... を主対象とする。
 */
export function sanitizeReturnTo(raw: string | null | undefined): string | null {
  if (raw == null || raw === '') return null;
  let decoded: string;
  try {
    decoded = decodeURIComponent(raw.trim());
  } catch {
    return null;
  }
  if (!decoded.startsWith('/')) return null;
  if (decoded.startsWith('//')) return null;
  if (decoded.includes('..')) return null;

  const q = decoded.indexOf('?');
  const path = q >= 0 ? decoded.slice(0, q) : decoded;
  const search = q >= 0 ? decoded.slice(q) : '';

  if (path !== '/invite') return null;

  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : '');
  const token = params.get('token');
  if (!token || token.length > 512) return null;
  // クエリや空白を含まないことのみ検証（形式はバックエンドに委ねる）
  if (/[&#\s?]/.test(token)) return null;

  return `/invite?token=${encodeURIComponent(token)}`;
}
