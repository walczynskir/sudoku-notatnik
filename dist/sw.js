const cachePrefix = 'sudoku-offline-';
const cacheName = cachePrefix + '1.35.13';
const scope = self.registration.scope;
const assetNames = [
  "shared-footer.css",
  "shared-footer.js",
  "games-chest/domino-icon.png",

  "statistics-reset.js",
  "progress-summary.css",
  "backup-recovery.js",
  "shared-preferences.js",
  "shared-progress-backup.js",
  "progress-backup.js",
  "preferences-strings.js",
  "backup-strings.js",
  "backup-ui.js",
  "backup.css",

  "accessibility.css",
  "app.js",
  "apple-touch-icon.png",
  "aurora.css",
  "camera.js",
  "credits.html",
  "difficulty.js",
  "energy.css",
  "favicon.ico",
  "favicon.svg",
  "forma.css",
  "games-chest-menu.css",
  "games-chest/games.json",
  "games-chest/sudoku-logo.svg",
  "games-chest/domino-logo.svg",
  "games-chest/eightaces-icon.png",
  "games-chest/garibaldka-icon.png",
  "games-chest/gomoku-icon.png",
  "games-chest-menu.js",
  "shared-settings.css",
  "settings-strings.js",
  "settings-sudoku.css",
  "settings-sudoku.js",
  "toolbar.css",
  "toolbar.js",
  "fullscreen.css",
  "fullscreen.js",
  "help.css",
  "help.js",
  "hints.js",
  "i18n.js",
  "icon-192.png",
  "icon-512.png",
  "icon-maskable.png",
  "index.html",
  "install.js",
  "library.js",
  "licenses/buffer-LICENSE.txt",
  "licenses/core-LICENSE.txt",
  "licenses/dist_tesseract.min.js.LICENSE.txt",
  "licenses/dist_worker.min.js.LICENSE.txt",
  "licenses/dm-sans-OFL.txt",
  "licenses/eng-data-LICENSE.txt",
  "licenses/idb-keyval-LICENSE.txt",
  "licenses/ieee754-LICENSE.txt",
  "licenses/manrope-OFL.txt",
  "licenses/native-giflib-COPYING.txt",
  "licenses/native-leptonica-leptonica-license_txt.txt",
  "licenses/native-libjpeg-README.txt",
  "licenses/native-libpng-LICENSE.txt",
  "licenses/native-libtiff-COPYRIGHT.txt",
  "licenses/native-libwebp-COPYING.txt",
  "licenses/native-libwebp-PATENTS.txt",
  "licenses/native-openlibm-LICENSE_md.txt",
  "licenses/native-tesseract-LICENSE.txt",
  "licenses/native-zlib-README.txt",
  "licenses/regenerator-LICENSE.txt",
  "licenses/sudoku-exchange-LICENSE.txt",
  "licenses/tesseract-js-LICENSE.txt",
  "licenses/wasm-feature-detect-LICENSE.txt",
  "licenses/zlibjs-LICENSE.txt",
  "locales.js",
  "logic.js",
  "manifest.webmanifest",
  "ocr.js",
  "palette-themes.css",
  "porcelain.css",
  "preferences.js",
  "progress.css",
  "progress.js",
  "puzzles/LICENSE.txt",
  "puzzles/easy-1.json",
  "puzzles/easy-2.json",
  "puzzles/easy-3.json",
  "puzzles/easy-4.json",
  "puzzles/easy-5.json",
  "puzzles/expert-1.json",
  "puzzles/expert-2.json",
  "puzzles/expert-3.json",
  "puzzles/expert-4.json",
  "puzzles/expert-5.json",
  "puzzles/hard-1.json",
  "puzzles/hard-2.json",
  "puzzles/hard-3.json",
  "puzzles/hard-4.json",
  "puzzles/hard-5.json",
  "puzzles/manifest.json",
  "puzzles/medium-1.json",
  "puzzles/medium-2.json",
  "puzzles/medium-3.json",
  "puzzles/medium-4.json",
  "puzzles/medium-5.json",
  "puzzles/technique-levels.json",
  "settings-gear.svg",
  "shared-game.css",
  "shared-palettes.css",
  "shared-victory.css",
  "shared-victory.js",
  "studio.css",
  "style.css",
  "tangerine.css",
  "technique-rewards.css",
  "technique-rewards.js",
  "theme.js",
  "themes.css",
  "ukraine.css"
];
const assets = new Set(assetNames.map(name => new URL(name, scope).href));

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    await cache.addAll([...assets].map(url => new Request(url, { cache: 'reload' })));
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith(cachePrefix) && key !== cacheName)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  url.search = '';
  url.hash = '';
  const key = url.href === scope ? new URL('index.html', scope).href : url.href;
  // Serve a consistent release, including versioned asset URLs and gallery queries.
  if (!assets.has(key)) return;
  event.respondWith((async () => {
    const cache = await caches.open(cacheName);
    return await cache.match(key) ?? fetch(event.request);
  })());
});
