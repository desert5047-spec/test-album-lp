const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseRef = (() => {
  try {
    const hostname = new URL(supabaseUrl).hostname;
    return hostname.split('.')[0] ?? 'unknown';
  } catch {
    return 'unknown';
  }
})();

import { BUILD_TIME } from '@/lib/build-info';

const env = process.env.NODE_ENV ?? 'unknown';

export default function HealthPage() {
  return (
    <main className="mx-auto w-full max-w-md px-6 py-12 space-y-2">
      <h1 className="text-2xl font-bold">health</h1>
      <p>status: ok</p>
      <p>env: {env}</p>
      <p>supabaseRef: {supabaseRef}</p>
      <p>buildTime: {BUILD_TIME}</p>
    </main>
  );
}
