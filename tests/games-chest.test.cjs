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
  function element() {
    const children = [];
    const selectors = new Map();
    return {
      children,
      querySelector(selector) {
        if (!selectors.has(selector)) selectors.set(selector, element());
        return selectors.get(selector);
      },
      replaceChildren(...items) { children.splice(0, children.length, ...items); },
      append(item) { children.push(item); },
      setAttribute() {},
      addEventListener() {},
      dispatchEvent() {}
    };
  }
  const nodes = element();
  const document = {
    currentScript: { src: 'https://rsudoku.pl/games-chest-menu.js', dataset: { game: 'sudoku' } },
    documentElement: { lang: 'pl' },
    querySelector: nodes.querySelector,
    createElement: element
  };
  const ids = ['sudoku', 'domino', 'eight-aces', 'garibaldka', 'piec-w-rzedzie'];
  const catalog = ids.map(id => ({
    id, url: 'https://games-chest.com/' + id, icon: id + '.svg', en: id, pl: 'Gra ' + id
  }));
  vm.runInNewContext(readFileSync(require.resolve('../dist/games-chest-menu.js'), 'utf8'), {
    document, URL, URLSearchParams, Event, performance,
    location: { search: '?gc-recent=' + ids.join(',') },
    MutationObserver: class { observe() {} },
    fetch: async () => ({ ok: true, json: async () => catalog })
  });
  await new Promise(resolve => setImmediate(resolve));
  const menu = document.querySelector('.games-chest-menu');
  const footer = menu.querySelector('.recent-games');
  const links = footer.querySelector('.recent-games-icons').children;
  assert.equal(menu.querySelector('.all-games').textContent, 'Wszystkie gry');
  assert.equal(footer.hidden, false);
  assert.deepEqual(links.map(link => new URL(link.href).pathname), ['/domino', '/eight-aces', '/garibaldka']);
  for (const link of links) {
    assert.equal(link.target, undefined);
    assert.equal(link.children[0].alt, 'Gra ' + new URL(link.href).pathname.slice(1));
  }
  const picker = document.querySelector('#game-picker');
  const remaining = picker.querySelector('#game-picker-list').children;
  assert.equal(remaining.length, 1);
  assert.equal(new URL(remaining[0].children[0].href).pathname, '/piec-w-rzedzie');
});
