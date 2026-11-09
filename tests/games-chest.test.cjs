const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { test } = require('node:test');
const vm = require('node:vm');

const html = readFileSync(require.resolve('../dist/index.html'), 'utf8');

test('the release retains the Games Chest link and the Sudoku analytics tag', () => {
  const link = html.match(/<a\b[^>]*class="all-games"[^>]*>/)?.[0];
  assert.match(link, /href="https:\/\/games-chest\.com\/"/);
  assert.doesNotMatch(link, /target="_blank"/);
  const tracker = html.match(/<script\b[^>]*src="https:\/\/cloud\.umami\.is\/script\.js"[^>]*>/)?.[0];
  assert.match(tracker, /data-website-id="a4d24ffd-fa55-44e7-8c3b-dc5a5e42a2f2"/);
  assert.match(tracker, /data-tag="sudoku"/);
  assert.match(tracker, /data-domains="rsudoku\.pl"/);
});

test('recent games omit Sudoku and render at most three localized same-tab links', async () => {
  const heading = {};
  const allGames = {};
  const icons = { links: [], replaceChildren() { this.links = []; }, append(link) { this.links.push(link); } };
  const recent = { querySelector: selector => selector === 'span' ? heading : icons };
  const menu = { querySelector: selector => selector === '.recent-games' ? recent : allGames };
  const document = {
    currentScript: { dataset: { game: 'sudoku' } },
    documentElement: { lang: 'pl' },
    querySelector: () => menu,
    createElement: () => ({ append(icon) { this.icon = icon; } })
  };
  const ids = ['sudoku', 'domino', 'eight-aces', 'other'];
  const catalog = ids.map(id => ({
    id, url: 'https://games-chest.com/' + id, icon: id + '.svg', en: id, pl: 'Gra ' + id
  }));
  vm.runInNewContext(readFileSync(require.resolve('../dist/games-chest-menu.js'), 'utf8'), {
    document, URL, URLSearchParams, location: { search: '?gc-recent=' + ids.join(',') },
    MutationObserver: class { observe() {} },
    fetch: async () => ({ ok: true, json: async () => catalog })
  });
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(allGames.textContent, 'Wszystkie gry');
  assert.equal(recent.hidden, false);
  assert.deepEqual(icons.links.map(link => new URL(link.href).pathname), ['/domino', '/eight-aces', '/other']);
  for (const link of icons.links) {
    assert.equal(link.target, undefined);
    assert.equal(link.icon.alt, 'Gra ' + new URL(link.href).pathname.slice(1));
  }
});
