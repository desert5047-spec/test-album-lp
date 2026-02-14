'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { createSupabaseClient } from "@/lib/supabaseClient";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!password || !confirmPassword) {
      setError("パスワードを入力してください。");
      return;
    }

    if (password !== confirmPassword) {
      setError("パスワードが一致しません。");
      return;
    }

    setSubmitting(true);
    const supabase = createSupabaseClient();
    if (!supabase) {
      setError("設定エラーが発生しました。");
      setSubmitting(false);
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });
    setSubmitting(false);

    if (updateError) {
      console.error("[UPDATE_PASSWORD]", updateError);
      setError(`更新に失敗しました: ${updateError.message}`);
      return;
    }

    setMessage("更新完了。アプリに戻ってログインしてください。");
    setPassword("");
    setConfirmPassword("");
  };

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      window.location.href = "/";
    }, 10000);

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">パスワード再設定</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            新しいパスワード
            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:border-blue-500 focus:outline-none pr-16"
                placeholder="新しいパスワード"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-blue-600 hover:underline"
              >
                {showPassword ? "非表示" : "表示"}
              </button>
            </div>
          </label>

          <label className="block text-sm font-medium text-gray-700">
            新しいパスワード（確認）
            <div className="relative mt-2">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:border-blue-500 focus:outline-none pr-16"
                placeholder="もう一度入力"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-blue-600 hover:underline"
              >
                {showConfirmPassword ? "非表示" : "表示"}
              </button>
            </div>
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-blue-600 py-2.5 text-white font-semibold hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            更新
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

        <div className="pt-2">
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            トップへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
