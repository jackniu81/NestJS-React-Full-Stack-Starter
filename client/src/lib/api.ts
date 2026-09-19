export interface ApiVersion {
  name: string;
  version: string;
  node: string;
  timestamp: string;
}

// In dev, Vite proxies /api to the NestJS server (see vite.config.ts).
// In prod, the same origin serves both, so a relative base works for both.
const API_BASE = import.meta.env.VITE_API_BASE ?? '/api';

export async function fetchVersion(): Promise<ApiVersion> {
  const res = await fetch(`${API_BASE}/version`, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    throw new Error(`API responded with ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as ApiVersion;
}
