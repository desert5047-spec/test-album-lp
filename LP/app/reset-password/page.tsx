'use client';

import Link from "next/link";
import { useState } from "react";
import { createSupabaseClient } from "@/lib/supabaseClient";

const contactUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSeNQjw8CRwEPbCD9JfvAY3dbWTdDNlyXBV8UOk4zdtGQLTOTg/viewform?usp=publish-editor";

const redirectTo = "https://www.test-album.jp/update-password";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("メールアドレスを入力してください。");
      return;
    }

    setSubmitting(true);
    const supabase = createSupabaseClient();
    if (!supabase) {
      const configError = new Error("Supabaseの設定が未設定です。");
      console.error("[RESET_PASSWORD]", configError);
      setError(`送信に失敗しました: ${configError.message}`);
      setSubmitting(false);
      return;
    }

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email.trim(),
      { redirectTo }
    );
    setSubmitting(false);

    if (resetError) {
      console.error("[RESET_PASSWORD]", resetError);
      setError(`送信に失敗しました: ${resetError.message}`);
      return;
    }

    setMessage("再設定リンクを送信しました。迷惑メールもご確認ください。");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">パスワード再設定</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            メールアドレス
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:border-blue-500 focus:outline-none"
              placeholder="example@email.com"
              autoComplete="email"
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-blue-600 py-2.5 text-white font-semibold hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            再設定リンクを送る
          </button>
        </form>

        {message && (
          <div className="rounded-md bg-green-50 p-3 text-sm text-green-700">
            {message}
          </div>
        )}
        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
          <p>
            メールが届かない場合は、迷惑メールフォルダをご確認のうえ、
            少し時間を置いてから再度お試しください。
          </p>
          <p className="text-gray-600">
            それでも解決しない場合は、
            <a
              href={contactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline ml-1"
            >
              お問い合わせ
            </a>
            ください。
          </p>
        </div>

        <div className="pt-2">
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            トップへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
