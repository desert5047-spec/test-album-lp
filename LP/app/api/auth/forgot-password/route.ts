import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
const fallbackSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';

const isProduction = process.env.NODE_ENV === 'production';
const getRequestId = () => (globalThis.crypto?.randomUUID?.() ?? `${Date.now()}`);

const logError = (label: string, errorCode: string, error?: unknown) => {
  const requestId = getRequestId();
  if (isProduction) {
    console.error(label, { requestId, errorCode });
    return requestId;
  }
  console.error(label, { requestId, errorCode, error });
  return requestId;
};

const getBaseUrl = (request: Request) => {
  const proto = request.headers.get('x-forwarded-proto') ?? 'https';
  const rawHost =
    request.headers.get('x-forwarded-host') ?? request.headers.get('host');

  if (!rawHost) return fallbackSiteUrl;
  const host = rawHost.split(',')[0]?.trim().replace(/:\d+$/, '');
  return host ? `${proto}://${host}` : fallbackSiteUrl;
};

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const email = typeof body?.email === 'string' ? body.email.trim() : '';

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ ok: true, requestId: getRequestId() });
    }

    if (!email) {
      return NextResponse.json({ ok: true, requestId: getRequestId() });
    }

    const baseUrl = getBaseUrl(request);
    const redirectTo = baseUrl ? `${baseUrl}/auth/callback` : undefined;

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });
    if (error) {
      const requestId = logError('[API][FORGOT_PASSWORD]', 'FORGOT_PASSWORD_FAILED', error);
      return NextResponse.json(
        { ok: false, errorCode: 'FORGOT_PASSWORD_FAILED', requestId },
        { status: 500 }
      );
    }
  } catch (e) {
    const requestId = logError('[API][FORGOT_PASSWORD]', 'FORGOT_PASSWORD_FAILED', e);
    return NextResponse.json(
      { ok: false, errorCode: 'FORGOT_PASSWORD_FAILED', requestId },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, requestId: getRequestId() });
}
