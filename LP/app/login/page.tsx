'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase/browser';

export default function LoginPage() {
  const supabase = useMemo(() => createBrowserClient(), []);
  const router = useRouter();
  const params = useSearchParams();

  const returnTo = params.get('returnTo') || '';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>('');

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('');
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      // 招待から来た人は returnTo に戻す（最重要）
      if (returnTo) {
        router.replace(returnTo);
      } else {
        // 通常導線は想定しないが、迷子防止でトップへ
        router.replace('/');
      }
    } catch (e: any) {
      // 具体的なユーザー存在の列挙を避ける（ソフトに）
      setStatus('ログインに失敗しました。メールアドレス/パスワードをご確認ください。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: 520, margin: '0 auto', padding: 16 }}>
      {/* 招待専用であることを明確に */}
      <h1 style={{ fontSize: 22, fontWeight: 700 }}>招待を受け取るためのログイン</h1>
      <p style={{ marginTop: 8, opacity: 0.8, lineHeight: 1.6 }}>
        テストアルバムは<strong>アプリが本体</strong>です。
        <br />
        このページは、家族招待リンクの参加処理を完了するために利用します。
      </p>

      <form onSubmit={onLogin} style={{ marginTop: 16, display: 'grid', gap: 10 }}>
        <label style={{ display: 'grid', gap: 6 }}>
          <span>メールアドレス</span>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: 10, borderRadius: 10, border: '1px solid #ddd' }}
          />
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          <span>パスワード</span>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: 10, borderRadius: 10, border: '1px solid #ddd' }}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{ padding: '10px 14px', borderRadius: 10, border: '1px solid #ddd' }}
        >
          {loading ? 'ログイン中…' : 'ログインして招待を完了する'}
        </button>

        {status && <p style={{ marginTop: 4 }}>{status}</p>}
      </form>

      <div style={{ marginTop: 16, display: 'grid', gap: 8 }}>
        <Link href="/signup" style={{ textDecoration: 'underline' }}>
          はじめての方（新規登録）
        </Link>
        <Link href="/reset-password" style={{ textDecoration: 'underline' }}>
          パスワードを忘れた方
        </Link>

        {/* deep link が決まったらここを差し替え */}
        <a href="/" style={{ opacity: 0.8, textDecoration: 'underline' }}>
          アプリをご利用の方はこちら（案内）
        </a>
      </div>
    </main>
  );
}
