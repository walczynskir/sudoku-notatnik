(() => {
  const button = document.getElementById('fullscreen');
  const root = document.documentElement;
  const panel = document.querySelector('.board-panel');
  const boardScroll = panel.querySelector('.board-scroll');
  const entry = document.getElementById('entry-controls');
  const shortcuts = document.getElementById('fullscreen-shortcuts');
  const hintResult = document.getElementById('hint-result');
  const hintReveal = document.getElementById('hint-reveal');
  const compact = () => document.body.classList.contains('sudoku-fullscreen');
  let previousScroll = 0;

  function fitBoard() {
    if (!compact()) return;
    const main = document.querySelector('main');
    const padding = getComputedStyle(main);
    const landscape = matchMedia('(orientation: landscape) and (max-height: 600px)').matches;
    const availableHeight = innerHeight - (boardScroll.getBoundingClientRect().top + scrollY) -
      parseFloat(padding.paddingBottom);
    const boardWidth = Math.min(560, main.clientWidth -
      parseFloat(padding.paddingLeft) - parseFloat(padding.paddingRight));

    shortcuts.hidden = root.dataset.textSize === 'large';
    if (!shortcuts.hidden) {
      const requiredHeight = entry.offsetHeight + (landscape ? 0 : boardWidth + 12);
      shortcuts.hidden = requiredHeight > availableHeight;
    }

    const controlsHeight = landscape ? 0 : entry.offsetHeight + 12;
    const available = availableHeight - controlsHeight;
    panel.style.setProperty('--fullscreen-board-size', Math.max(270, Math.floor(available)) + 'px');
  }

  function setLayout(open) {
    if (compact() === open) return;
    if (open) previousScroll = scrollY;
    document.body.classList.toggle('sudoku-fullscreen', open);
    positionEntryControls();
    document.getElementById(open ? 'fullscreen-hint' : 'hint-home').append(hintResult);
    hintReveal.textContent = open ? 'Pokaż pola' : 'Pokaż pola i wyjaśnienie ruchu';
    const label = open ? 'Wyjdź z pełnego ekranu' : 'Pełny ekran';
    button.querySelector('.fullscreen-label').textContent = label;
    button.setAttribute('aria-label', label);
    button.title = label;
    button.setAttribute('aria-pressed', String(open));
    window.scrollTo(0, open ? 0 : previousScroll);
    if (open) fitBoard();
    else {
      shortcuts.hidden = true;
      panel.style.removeProperty('--fullscreen-board-size');
    }
  }

  button.addEventListener('click', async () => {
    if (compact()) {
      if (document.fullscreenElement === root) {
        try { await document.exitFullscreen(); } catch {}
      }
      setLayout(false);
      return;
    }
    setLayout(true);
    try { await root.requestFullscreen?.(); } catch {
      // The compact layout also works when the browser disallows native fullscreen.
    }
  });
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) setLayout(false);
    else fitBoard();
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || event.defaultPrevented || document.fullscreenElement ||
        !compact() || document.querySelector('dialog[open]')) return;
    event.preventDefault();
    setLayout(false);
    button.focus();
  });
  window.addEventListener('resize', fitBoard);
  const observer = new ResizeObserver(fitBoard);
  for (const selector of ['.game-actions', '.quick-toolbar', '.board-top', '#clue-controls', '.library-context', '#entry-controls']) {
    observer.observe(document.querySelector(selector));
  }
})();
