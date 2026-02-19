const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseRef = (() => {
  try {
    const hostname = new URL(supabaseUrl).hostname;
    return hostname.split('.')[0] ?? 'unknown';
  } catch {
    return 'unknown';
  }
})();

const env = process.env.NODE_ENV ?? 'unknown';
const buildTime = process.env.NEXT_PUBLIC_BUILD_TIME;

export default function HealthPage() {
  return (
    <main className="mx-auto w-full max-w-md px-6 py-12 space-y-2">
      <h1 className="text-2xl font-bold">health</h1>
      <p>status: ok</p>
      <p>env: {env}</p>
      <p>supabaseRef: {supabaseRef}</p>
      {buildTime && <p>buildTime: {buildTime}</p>}
    </main>
  );
}
