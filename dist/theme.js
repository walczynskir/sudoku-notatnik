(function(root){
'use strict';
const themes=['sage','ink'],key='sudoku-theme';
let current='ink';
function apply(value){current=themes.includes(value)?value:'ink';document.documentElement.dataset.theme=current;const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=current==='ink'?'#f5f0e5':'#f6f5f0';const select=document.getElementById('theme-select');if(select)select.value=current;return current;}
try{current=localStorage.getItem(key)||'ink';}catch{}
apply(current);
const api={themes,get current(){return current;},set(value){if(!themes.includes(value))return false;apply(value);try{localStorage.setItem(key,current);}catch{}return true;}};
root.SudokuTheme=api;if(typeof module!=='undefined')module.exports=api;
document.addEventListener('DOMContentLoaded',()=>{const select=document.getElementById('theme-select');if(select){select.value=current;select.addEventListener('change',()=>api.set(select.value));}});
})(globalThis);
