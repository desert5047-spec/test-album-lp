'use client';

import { useEffect, useState } from 'react';

interface CallbackParams {
  href: string;
  search: string;
  hash: string;
  mode: 'query' | 'token' | 'none';
  accessLen: number;
  refreshLen: number;
  supabaseType: string; // Supabaseのtype（recovery/signupなど）
  deepLink: string | null;
  debugValue: string;
}

export default function AuthCallbackPage() {
  const [params, setParams] = useState<CallbackParams | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    setMounted(true);

    const parseAndSet = () => {
      // URLクエリとハッシュを解析
      const search = window.location.search; // 先頭の?付き
      const hash = window.location.hash; // 先頭の#付き
      const href = window.location.href;

      // クエリパラメータを取得（?code=...&type=...）
      const queryParams = new URLSearchParams(search);
      // ハッシュパラメータを取得（#access_token=...&type=...）
      const hashParams = new URLSearchParams(hash.startsWith('#') ? hash.slice(1) : hash);

      const queryAccessToken = queryParams.get('access_token') ?? '';
      const queryRefreshToken = queryParams.get('refresh_token') ?? '';
      const queryType = queryParams.get('type');
      const queryDebug = queryParams.get('debug');
      const hashAccessToken = hashParams.get('access_token') ?? '';
      const hashRefreshToken = hashParams.get('refresh_token') ?? '';
      const hashType = hashParams.get('type');
      const hashDebug = hashParams.get('debug');
      const debugValue = queryDebug || hashDebug || '';

      let mode: 'query' | 'token' | 'none' = 'none';
      let deepLink: string | null = null;
      let supabaseType = 'recovery';
      let accessLen = 0;
      let refreshLen = 0;

      // query優先。なければhash(access_token)を確認。
      if (queryAccessToken || queryRefreshToken || queryType) {
        mode = 'query';
        supabaseType = queryType && queryType.length > 0 ? queryType : 'recovery';
        accessLen = queryAccessToken.length;
        refreshLen = queryRefreshToken.length;
        const dl = new URLSearchParams();
        dl.set('access_token', queryAccessToken);
        dl.set('refresh_token', queryRefreshToken);
        dl.set('type', supabaseType);
      if (debugValue) {
        dl.set('debug', debugValue);
      }
        deepLink = `testalbum:///auth-callback?${dl.toString()}`;
      } else if (hashAccessToken || hashRefreshToken || hashType) {
        // hash側はaccess_tokenが空でもtype/refresh_tokenがあればtokenモード
        mode = 'token';
        supabaseType = hashType && hashType.length > 0 ? hashType : 'recovery';
        accessLen = hashAccessToken.length;
        refreshLen = hashRefreshToken.length;
        const dl = new URLSearchParams();
        dl.set('access_token', hashAccessToken);
        dl.set('refresh_token', hashRefreshToken);
        dl.set('type', supabaseType);
      if (debugValue) {
        dl.set('debug', debugValue);
      }
        deepLink = `testalbum:///auth-callback?${dl.toString()}`;
      }

    setParams({
        href,
        search,
        hash,
        mode,
        accessLen,
        refreshLen,
        supabaseType,
        deepLink,
      debugValue,
      });

      return { mode, accessLen, refreshLen };
    };

    const initial = parseAndSet();

    // 初回解析後、mode=none or accessLen=0の場合は再解析
    if (initial.mode === 'none' || initial.accessLen === 0) {
      setIsRetrying(true);
      let attempts = 0;
      const interval = setInterval(() => {
        attempts += 1;
        const result = parseAndSet();

        if (
          (result.mode !== 'none' && result.accessLen > 0) ||
          attempts >= 10
        ) {
          clearInterval(interval);
          setIsRetrying(false);
        }
      }, 200);

      return () => clearInterval(interval);
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

  const hasError = params.mode === 'none' && !isRetrying;

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
                このリンクは期限切れです。アプリから再度メール送信してください
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
                  <span className="text-gray-600">hash:</span>
                  <div className="text-gray-900 mt-1">
                    {params.hash || '(なし)'}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">mode:</span>
                  <div className="text-gray-900 mt-1">{params.mode}</div>
                </div>
                <div>
                  <span className="text-gray-600">accessLen:</span>
                  <div className="text-gray-900 mt-1">{params.accessLen}</div>
                </div>
                <div>
                  <span className="text-gray-600">refreshLen:</span>
                  <div className="text-gray-900 mt-1">{params.refreshLen}</div>
                </div>
                <div>
                  <span className="text-gray-600">type:</span>
                  <div className="text-gray-900 mt-1">{params.supabaseType}</div>
                </div>
                <div>
                  <span className="text-gray-600">debug:</span>
                  <div className="text-gray-900 mt-1">
                    {params.debugValue || '(なし)'}
                  </div>
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
            <a
              href={params.deepLink ?? '#'}
              aria-disabled={!params.deepLink}
              className={`block w-full font-semibold py-3 px-6 rounded-md text-center transition-colors ${
                params.deepLink
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-200 text-gray-500 pointer-events-none'
              }`}
            >
              アプリを開く
            </a>
            <p className="text-xs text-gray-500 text-center">
              ボタンをタップしてアプリを起動してください
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
