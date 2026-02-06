'use client';

import { useEffect, useState } from 'react';

interface CallbackParams {
  href: string;
  search: string;
  hasCode: boolean;
  supabaseType: string | null; // Supabaseのtype（recovery/signupなど）
  deepLink: string | null;
}

export default function AuthCallbackPage() {
  const [params, setParams] = useState<CallbackParams | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // URLクエリのみ解析（PKCE専用）
    const search = window.location.search; // 先頭の?付き
    const href = window.location.href;

    // クエリパラメータを取得（?code=...&type=...）
    const queryParams = new URLSearchParams(search);

    const code = queryParams.get('code') ?? '';
    const rawType = queryParams.get('type');
    const supabaseType = rawType && rawType.length > 0 ? rawType : 'recovery';
    const hasCode = Boolean(code);

    // deepLinkを生成（codeがある場合のみ）
    const deepLink = hasCode
      ? `testalbum://auth-callback?${new URLSearchParams({
          code,
          type: supabaseType, // 必ず入れる（デフォルト: recovery）
        }).toString()}`
      : null;

    setParams({
      href,
      search,
      hasCode,
      supabaseType,
      deepLink,
    });

    // 500ms後に自動でdeepLinkに遷移
    if (deepLink) {
      const timer = setTimeout(() => {
        window.location.href = deepLink;
      }, 500);

      return () => clearTimeout(timer);
    }
  }, []);

  // ハイドレーションエラーを防ぐため、マウント後に表示
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">読み込み中...</div>
      </div>
    );
  }

  if (!params) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">パラメータを解析中...</div>
      </div>
    );
  }

  const hasError = !params.hasCode;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            認証コールバック
          </h1>

          {/* エラー表示 */}
          {hasError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 font-semibold">エラー</p>
              <p className="text-red-600 text-sm mt-1">
                認証パラメータが見つかりませんでした。
              </p>
            </div>
          )}

          {/* デバッグ情報 */}
          <div className="mb-6 space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-700 mb-2">デバッグ情報</h2>
              <div className="bg-gray-50 rounded-md p-4 space-y-2 text-sm font-mono">
                <div>
                  <span className="text-gray-600">href:</span>
                  <div className="text-gray-900 break-all mt-1">{params.href}</div>
                </div>
                <div>
                  <span className="text-gray-600">search:</span>
                  <div className="text-gray-900 break-all mt-1">
                    {params.search || '(なし)'}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">code有無:</span>
                  <div className="text-gray-900 mt-1">
                    {params.hasCode ? 'あり' : 'なし'}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">type:</span>
                  <div className="text-gray-900 mt-1">{params.supabaseType || '(なし)'}</div>
                </div>
                <div>
                  <span className="text-gray-600">deepLink:</span>
                  <div className="text-blue-600 break-all mt-1">
                    {params.deepLink || '(未生成)'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* アプリを開くボタン */}
          <div className="space-y-4">
            {params.deepLink ? (
              <a
                href={params.deepLink}
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md text-center transition-colors"
              >
                アプリを開く
              </a>
            ) : (
              <div className="block w-full bg-gray-200 text-gray-500 font-semibold py-3 px-6 rounded-md text-center">
                アプリを開く
              </div>
            )}
            <p className="text-xs text-gray-500 text-center">
              ボタンをタップしてアプリを起動してください
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
