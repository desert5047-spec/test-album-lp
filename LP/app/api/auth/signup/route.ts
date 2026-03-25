import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { log } from '@/lib/logger';
import { sanitizeReturnTo } from '@/lib/sanitizeReturnTo';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
const fallbackSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';

const getRequestId = () => (globalThis.crypto?.randomUUID?.() ?? `${Date.now()}`);

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
    const returnToRaw =
      typeof body?.returnTo === 'string' ? body.returnTo : undefined;
    const safeReturn = sanitizeReturnTo(returnToRaw ?? null);

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ ok: true, requestId: getRequestId() });
    }

    if (!email || !password) {
      return NextResponse.json({ ok: true, requestId: getRequestId() });
    }

    const baseUrl = getBaseUrl(request);
    const emailRedirectTo = baseUrl
      ? `${baseUrl}/auth/callback${safeReturn ? `?next=${encodeURIComponent(safeReturn)}` : ''}`
      : undefined;

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
      const requestId = getRequestId();
      log('error', '[API][SIGNUP] failed', {
        requestId,
        errorCode: 'SIGNUP_FAILED',
        error,
      });
      return NextResponse.json(
        { ok: false, errorCode: 'SIGNUP_FAILED', requestId },
        { status: 500 }
      );
    }
  } catch (error) {
    const requestId = getRequestId();
    log('error', '[API][SIGNUP] failed', {
      requestId,
      errorCode: 'SIGNUP_FAILED',
      error,
    });
    return NextResponse.json(
      { ok: false, errorCode: 'SIGNUP_FAILED', requestId },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, requestId: getRequestId() });
}
