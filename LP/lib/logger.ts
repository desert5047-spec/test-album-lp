type LogLevel = 'error' | 'warn' | 'info' | 'debug';
type LogMeta = Record<string, unknown>;

const isProduction = process.env.NODE_ENV === 'production';
const isSilentProd = process.env.LOG_SILENT_PROD === '1';
const DEDUPE_WINDOW_MS = 30_000;
const recent = new Map<string, number>();
const sensitiveKeyPattern = /(token|access_token|refresh_token|email|code)/i;

const sanitizeMeta = (meta?: LogMeta) => {
  if (!meta) return undefined;
  const sanitized: LogMeta = {};
  for (const [key, value] of Object.entries(meta)) {
    if (sensitiveKeyPattern.test(key)) continue;
    sanitized[key] = value;
  }
  return sanitized;
};

const shouldDedupe = (message: string, errorCode?: string) => {
  const key = `${message}::${errorCode ?? ''}`;
  const now = Date.now();
  const last = recent.get(key);
  if (last && now - last < DEDUPE_WINDOW_MS) {
    return true;
  }
  recent.set(key, now);
  return false;
};

export function log(level: LogLevel, message: string, meta?: LogMeta) {
  if (isProduction) {
    if (isSilentProd) return;
    if (level !== 'error') return;
  }

  const errorCode =
    meta && typeof meta.errorCode === 'string' ? meta.errorCode : undefined;
  if (level === 'error' && shouldDedupe(message, errorCode)) return;

  if (isProduction) {
    const requestId =
      meta && typeof meta.requestId === 'string' ? meta.requestId : undefined;
    console.error(message, { requestId, errorCode });
    return;
  }

  const safeMeta = sanitizeMeta(meta);
  const payload = safeMeta ? [message, safeMeta] : [message];
  // eslint-disable-next-line no-console
  console[level](...payload);
}
