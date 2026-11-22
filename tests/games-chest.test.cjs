const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { test } = require('node:test');
const vm = require('node:vm');

const html = readFileSync(require.resolve('../dist/index.html'), 'utf8');

test('the game picker retains the Games Chest link and the Sudoku analytics tag', () => {
  const picker = html.match(/<dialog id="game-picker"[^>]*>[\s\S]*?<\/dialog>/)?.[0];
  const link = picker.match(/<a\b[^>]*class="all-games game-picker-link"[^>]*>/)?.[0];
  assert.match(link, /href="https:\/\/games-chest\.com\/"/);
  assert.doesNotMatch(link, /target="_blank"/);
  const footer = html.match(/<footer\b[^>]*>[\s\S]*?<\/footer>/)?.[0];
  assert.doesNotMatch(footer, /class="all-games"|recent-games/);
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
  const picker = document.querySelector('#game-picker');
  const recent = picker.querySelector('#game-picker-recent');
  const links = recent.querySelector('ul').children.map(item => item.children[0]);
  assert.equal(recent.hidden, false);
  assert.deepEqual(links.map(link => new URL(link.href).pathname), ['/domino', '/eight-aces', '/garibaldka']);
  for (const link of links) {
    assert.equal(link.target, undefined);
    assert.equal(link.children[1].textContent, 'Gra ' + new URL(link.href).pathname.slice(1));
  }
  assert.equal(picker.querySelector('.all-games').textContent, 'Wszystkie gry');
  const remaining = picker.querySelector('#game-picker-list').children;
  assert.equal(remaining.length, 1);
  assert.equal(new URL(remaining[0].children[0].href).pathname, '/piec-w-rzedzie');
});
