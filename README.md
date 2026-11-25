# Apple Music last played

The Music window shows Apple's player for the most recent **catalog song** in your Apple Music history. Visitors can listen without connecting to your account. Apple supplies listening history without a playback timestamp or live status. [Apple's history endpoint](https://developer.apple.com/documentation/applemusicapi/get-v1-me-recent-played-tracks)

Your desktop browser reads your history on the owner sync page and publishes the song ID and storefront to Cloudflare. Keep that tab running for updates. If the tab sleeps or closes, visitors continue to see the last song it published. Your personal Music User Token stays on the device where you authorized MusicKit. [Apple's authentication model](https://developer.apple.com/videos/play/wwdc2022/10148/?time=1038)

## Configure Cloudflare Pages

Use the **Preview** environment to try this branch. The existing Pages project can serve it from the repository root with no build command.

1. In the Cloudflare dashboard, open **Workers KV** and create a namespace for the last song. In your Pages project's **Settings → Bindings**, add a **KV namespace** binding named `MUSIC_STATE` and select that namespace.
2. In **Settings → Variables and Secrets**, add two **encrypted** values. Set `APPLE_MUSIC_DEVELOPER_TOKEN` to the signed token described below. Set `MUSIC_SYNC_KEY` to a random secret you generate, for example with `openssl rand -hex 32`. Keep the sync key for the owner sign-in.
3. Redeploy the `apple-music-last-played` branch so the bindings take effect. Open its stable branch preview URL with `/music-sync` appended, enter your sync key, then authorize your Apple Music account. Leave the page open on a computer that stays awake.
4. Open the Music window in another browser to see the public result. To switch the live site later, configure the same bindings for **Production**, include the production origin in the Apple token, then select `apple-music-last-played` in **Settings → Builds & deployments → Configure Production deployments** and deploy. Selecting `main` again restores the ListenBrainz version. [Pages bindings](https://developers.cloudflare.com/pages/functions/bindings/) · [Branch deployment controls](https://developers.cloudflare.com/pages/configuration/branch-build-controls/)

## Generate the Apple developer token

This requires Apple Developer Program membership. Register a MusicKit media identifier, create its Media Services private key, and download the `.p8` file to your own computer. You need its key ID and your Apple Developer Team ID. [Create a media identifier and key](https://developer.apple.com/help/account/capabilities/create-a-media-identifier-and-private-key/) · [Apple's developer token instructions](https://developer.apple.com/documentation/applemusicapi/generating-developer-tokens)

Run this locally with Node.js, substituting your values and the exact origin where you'll open the sync page. You can list both your branch preview and production origins, with no trailing slash. The command prints the value for `APPLE_MUSIC_DEVELOPER_TOKEN`. Keep the signing key outside the site repository.

```sh
node --input-type=module - /path/to/AuthKey.p8 TEAM_ID KEY_ID https://YOUR-BRANCH.YOUR-PROJECT.pages.dev https://raffsimms.com <<'JS'
import { sign } from 'node:crypto';
import { readFileSync } from 'node:fs';
const [keyPath, team, keyId, ...origins] = process.argv.slice(2);
const encode = value => Buffer.from(JSON.stringify(value)).toString('base64url');
const now = Math.floor(Date.now() / 1000);
const header = encode({ alg: 'ES256', kid: keyId });
const claims = encode({ iss: team, iat: now, exp: now + 90 * 86400, origin: origins });
const message = header + '.' + claims;
const signature = sign('sha256', Buffer.from(message), {
  key: readFileSync(keyPath),
  dsaEncoding: 'ieee-p1363'
});
console.log(message + '.' + signature.toString('base64url'));
JS
```

This token lasts 90 days. To renew it, generate another, replace the encrypted value, redeploy, and reconnect the sync page. Visitors only need the public site.
