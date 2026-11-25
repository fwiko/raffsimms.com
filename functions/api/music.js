import { json, requireSyncKey } from '../_shared.js';

const lastPlayedKey = 'last-played';

function catalogSong(song) {
  if (song === null) return null;
  const id = Number.isSafeInteger(song?.id) ? String(song.id) : song?.id;
  if (typeof id !== 'string' || !/^[1-9]\d*$/.test(id)) return undefined;
  if (typeof song.storefront !== 'string' || !/^[a-z]{2}$/i.test(song.storefront)) return undefined;
  return { id, storefront: song.storefront.toLowerCase() };
}

export async function onRequest({ request, env }) {
  if (request.method !== 'GET' && request.method !== 'PUT') {
    return json({ error: 'Method not allowed' }, 405, { Allow: 'GET, PUT' });
  }

  let song;
  if (request.method === 'PUT') {
    const denied = requireSyncKey(request, env);
    if (denied) return denied;
    const body = await request.json().catch(() => null);
    song = catalogSong(body?.song);
    if (song === undefined) return json({ error: 'Expected a catalog song or null' }, 400);
  }

  const state = env.MUSIC_STATE;
  if (!state) return json({ error: 'Music storage is unavailable' }, 503);
  try {
    const stored = await state.get(lastPlayedKey);
    if (request.method === 'GET') {
      song = catalogSong(stored === null ? null : JSON.parse(stored));
      if (song === undefined) return json({ error: 'Invalid stored song' }, 503);
    } else {
      const value = song === null ? null : JSON.stringify(song);
      if (value !== stored) {
        if (value === null) await state.delete(lastPlayedKey);
        else await state.put(lastPlayedKey, value);
      }
    }
    return json({ song });
  } catch {
    return json({ error: 'Music storage is unavailable' }, 503);
  }
}
