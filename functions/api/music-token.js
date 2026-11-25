import { json, requireSyncKey } from '../_shared.js';

export function onRequest({ request, env }) {
  if (request.method !== 'GET') return json({ error: 'Method not allowed' }, 405, { Allow: 'GET' });
  const denied = requireSyncKey(request, env);
  if (denied) return denied;
  if (!env.APPLE_MUSIC_DEVELOPER_TOKEN) return json({ error: 'Music authorization is unavailable' }, 503);
  return json({ developerToken: env.APPLE_MUSIC_DEVELOPER_TOKEN });
}
