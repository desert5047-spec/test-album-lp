'use client';

import { useEffect, useState } from 'react';

interface CallbackParams {
  href: string;
  hash: string;
  search: string;
  type: 'hash' | 'query' | 'none'; // パラメータの由来（デバッグ用）
  source: 'token' | 'code' | 'none'; // deepLink用のsource
  supabaseType: string | null; // Supabaseのtype（recovery/signupなど）
  deepLink: string;
  error?: string;
}

export default function AuthCallbackPage() {
  const [params, setParams] = useState<CallbackParams | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // URLパラメータとハッシュを解析
    const hash = window.location.hash.substring(1); // #を除去
    const search = window.location.search.substring(1); // ?を除去
    const href = window.location.href;

    // ハッシュからパラメータを取得（#access_token=...&type=...）
    const hashParams = new URLSearchParams(hash);
    // クエリパラメータを取得（?code=...&type=...）
    const queryParams = new URLSearchParams(search);

    let type: 'hash' | 'query' | 'none' = 'none'; // デバッグ用のパラメータ由来
    let source: 'token' | 'code' | 'none' = 'none'; // deepLink用のsource
    let supabaseType: string | null = null; // Supabaseのtype（recovery/signupなど）
    let deepLinkParams = new URLSearchParams();
    let accessToken: string | null = null;
    let refreshToken: string | null = null;
    let code: string | null = null;

    // ハッシュパラメータを優先（Supabaseの標準的な形式）
    if (hashParams.has('access_token') || hashParams.has('type')) {
      type = 'hash';
      source = 'token';
      // ハッシュから必要なパラメータを取得
      accessToken = hashParams.get('access_token');
      supabaseType = hashParams.get('type'); // Supabaseのtypeを取得
      const expiresIn = hashParams.get('expires_in');
      refreshToken = hashParams.get('refresh_token');

      // access_tokenとrefresh_tokenは必ず含める（存在する場合）
      if (accessToken) deepLinkParams.set('access_token', accessToken);
      if (refreshToken) deepLinkParams.set('refresh_token', refreshToken);
      // Supabaseのtypeを優先的に含める
      if (supabaseType) deepLinkParams.set('type', supabaseType);
      // sourceを設定（hash由来なので'token'）
      deepLinkParams.set('source', 'token');
      if (expiresIn) deepLinkParams.set('expires_in', expiresIn);
    }
    // クエリパラメータを確認（?code=...形式）
    else if (queryParams.has('code') || queryParams.has('type')) {
      type = 'query';
      source = 'code';
      code = queryParams.get('code');
      supabaseType = queryParams.get('type'); // Supabaseのtypeを取得
      refreshToken = queryParams.get('refresh_token');
      accessToken = queryParams.get('access_token');

      // codeまたはaccess_tokenを優先
      if (code) deepLinkParams.set('code', code);
      if (accessToken) deepLinkParams.set('access_token', accessToken);
      // refresh_tokenは必ず含める（存在する場合）
      if (refreshToken) deepLinkParams.set('refresh_token', refreshToken);
      // Supabaseのtypeを優先的に含める
      if (supabaseType) deepLinkParams.set('type', supabaseType);
      // sourceを設定（query由来なので'code'）
      deepLinkParams.set('source', 'code');
    }

    // deepLinkを生成
    const deepLinkQuery = new URLSearchParams({
      access_token: accessToken ? encodeURIComponent(accessToken) : '',
      refresh_token: refreshToken ? encodeURIComponent(refreshToken) : '',
      code: code ? encodeURIComponent(code) : '',
      type: supabaseType ?? '',
      source,
    }).toString();
    const deepLink = deepLinkQuery
      ? `testalbum://auth-callback?${deepLinkQuery}`
      : 'testalbum://auth-callback';

    setParams({
      href,
      hash,
      search,
      type,
      source,
      supabaseType,
      deepLink,
    });

    // 500ms後に自動でdeepLinkに遷移
    if (type !== 'none') {
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

  const hasError = params.type === 'none' && !params.hash && !params.search;

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
                  <span className="text-gray-600">hash:</span>
                  <div className="text-gray-900 break-all mt-1">
                    {params.hash || '(なし)'}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">search:</span>
                  <div className="text-gray-900 break-all mt-1">
                    {params.search || '(なし)'}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">type:</span>
                  <div className="text-gray-900 mt-1">{params.type}</div>
                </div>
                <div>
                  <span className="text-gray-600">source:</span>
                  <div className="text-gray-900 mt-1">{params.source}</div>
                </div>
                <div>
                  <span className="text-gray-600">supabaseType:</span>
                  <div className="text-gray-900 mt-1">{params.supabaseType || '(なし)'}</div>
                </div>
                <div>
                  <span className="text-gray-600">deepLink:</span>
                  <div className="text-blue-600 break-all mt-1">{params.deepLink}</div>
                </div>
              </div>
            </div>
          </div>

          {/* アプリを開くボタン */}
          <div className="space-y-4">
            <a
              href={params.deepLink}
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md text-center transition-colors"
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
