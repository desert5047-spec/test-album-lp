import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
const fallbackSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';

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
      return Response.json({ ok: true });
    }

    if (!email || !password) {
      return Response.json({ ok: true });
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
      return NextResponse.json(
        { ok: false, message: 'このメールアドレスは既に登録されています' },
        { status: 400 }
      );
    }
    if (error) {
      console.error('[API][SIGNUP]', error);
    }
  } catch {
    // no-op: always return same response
    console.error('[API][SIGNUP]', 'unexpected error');
  }

  return Response.json({ ok: true });
}
