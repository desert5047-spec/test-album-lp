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
    const password = typeof body?.password === 'string' ? body.password : '';

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ ok: true, requestId: getRequestId() });
    }

    if (!email || !password) {
      return NextResponse.json({ ok: true, requestId: getRequestId() });
    }

    const baseUrl = getBaseUrl(request);
    const emailRedirectTo = baseUrl ? `${baseUrl}/auth/callback` : undefined;

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: emailRedirectTo ? { emailRedirectTo } : undefined,
    });
    const identities = data?.user?.identities;
    const isIdentityMissing =
      !error && Array.isArray(identities) && identities.length === 0;
    if (isIdentityMissing) {
      const requestId = getRequestId();
      return NextResponse.json(
        { ok: false, errorCode: 'ALREADY_REGISTERED', requestId },
        { status: 400 }
      );
    }
    if (error) {
      const requestId = logError('[API][SIGNUP]', 'SIGNUP_FAILED', error);
      return NextResponse.json(
        { ok: false, errorCode: 'SIGNUP_FAILED', requestId },
        { status: 500 }
      );
    }
  } catch {
    const requestId = logError('[API][SIGNUP]', 'SIGNUP_FAILED');
    return NextResponse.json(
      { ok: false, errorCode: 'SIGNUP_FAILED', requestId },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, requestId: getRequestId() });
}
