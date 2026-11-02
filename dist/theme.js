(function(root){
'use strict';
const themes=['sage','ink','contrast'],key='sudoku-theme',sizeKey='sudoku-large-text';
let current='ink',largeText=false;
function apply(value){current=themes.includes(value)?value:'ink';document.documentElement.dataset.theme=current;const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content={ink:'#f5f0e5',sage:'#f6f5f0',contrast:'#ffffff'}[current];const select=document.getElementById('theme-select');if(select)select.value=current;return current;}
function applySize(value){largeText=value;document.documentElement.dataset.textSize=largeText?'large':'normal';const input=document.getElementById('large-text');if(input)input.checked=largeText;}
try{current=localStorage.getItem(key)||'ink';}catch{}
try{largeText=localStorage.getItem(sizeKey)==='true';}catch{}
apply(current);applySize(largeText);
const api={themes,get current(){return current;},get largeText(){return largeText;},set(value){if(!themes.includes(value))return false;apply(value);try{localStorage.setItem(key,current);}catch{}return true;},setLargeText(value){if(typeof value!=='boolean')return false;applySize(value);try{localStorage.setItem(sizeKey,String(value));}catch{}return true;}};
root.SudokuTheme=api;if(typeof module!=='undefined')module.exports=api;
document.addEventListener('DOMContentLoaded',()=>{const select=document.getElementById('theme-select');if(select){select.value=current;select.addEventListener('change',()=>api.set(select.value));}const input=document.getElementById('large-text');if(input){input.checked=largeText;input.addEventListener('change',()=>api.setLargeText(input.checked));}});
})(globalThis);
