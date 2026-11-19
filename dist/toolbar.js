/* Fit translated labels to actual space, following Garibaldka fitToolbar. */
(() => {
 const localStorage=globalThis.SudokuBackupStorage?.storage||globalThis.localStorage;
 const bar=document.getElementById('play-launch');
 const preference=document.getElementById('preference-history');
 let showHistory=true;
 try { showHistory=localStorage.getItem('sudoku-show-history')!=='false'; } catch {}
 function applyHistory(){
  preference.checked=showHistory;
  for(const id of ['undo','redo'])document.getElementById(id).hidden=!showHistory;
  schedule();
 }
 preference.addEventListener('change',()=>{
  showHistory=preference.checked;
  try{localStorage.setItem('sudoku-show-history',String(showHistory));}catch{document.getElementById('preferences-status').textContent='Nie udało się zapisać ustawień. Działają tylko w tej sesji.';}
  applyHistory();
 });
 // The preference disables shortcut activation as well as hiding its controls.
 for(const id of ['undo','redo'])document.getElementById(id).addEventListener('click',event=>{if(!showHistory){event.preventDefault();event.stopImmediatePropagation();}},true);

 globalThis.SudokuHistoryPreference={get:()=>showHistory,restore(value){showHistory=value;applyHistory();}};
 let queued=false;
 function fit(){
  queued=false;
  bar.classList.remove('toolbar-compact','toolbar-icons','toolbar-new-icon');
  const css=getComputedStyle(bar);
  const available=bar.clientWidth-parseFloat(css.paddingLeft)-parseFloat(css.paddingRight);
  const required=()=>Math.ceil(document.getElementById('open-library').getBoundingClientRect().width+bar.querySelector('.game-secondary').getBoundingClientRect().width+parseFloat(css.columnGap));
  for(const mode of ['toolbar-compact','toolbar-icons','toolbar-new-icon']) if(required()>available)bar.classList.add(mode);
 }
 const schedule=()=>{if(!queued){queued=true;requestAnimationFrame(fit)}};
 new ResizeObserver(schedule).observe(bar);
 new MutationObserver(schedule).observe(bar,{subtree:true,childList:true,characterData:true});
 new MutationObserver(schedule).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir','data-text-size','data-theme']});
 window.addEventListener('resize',schedule);
 document.fonts.ready.then(schedule);applyHistory();
})();
