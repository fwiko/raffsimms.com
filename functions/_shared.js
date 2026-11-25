export function json(body, status = 200, headers = {}) {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store', ...headers }
  });
}

export function requireSyncKey(request, env) {
  if (!env.MUSIC_SYNC_KEY) return json({ error: 'Music sync is unavailable' }, 503);
  const match = /^Bearer (\S+)$/i.exec(request.headers.get('Authorization') || '');
  if (!match || match[1] !== env.MUSIC_SYNC_KEY) {
    return json({ error: 'Unauthorized' }, 401, { 'WWW-Authenticate': 'Bearer' });
  }
}
