if (window === window.top && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(error => console.warn('Sudoku offline setup failed', error));
}
