(function(root){
'use strict';
const themes=['sage','ink','contrast','studio','forma'],key='sudoku-theme',sizeKey='sudoku-large-text';
let current='ink',largeText=false;
function apply(value){current=themes.includes(value)?value:'ink';document.documentElement.dataset.theme=current;const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content={ink:'#f5f0e5',sage:'#f6f5f0',contrast:'#ffffff',studio:'#ffffff',forma:'#ffffff'}[current];const select=document.getElementById('theme-select');if(select)select.value=current;positionStudioAction();return current;}
function positionStudioAction(){const button=document.getElementById('open-library'),toolbar=document.querySelector('.quick-toolbar'),launch=document.getElementById('play-launch');if(!button||!toolbar||!launch)return;if(['studio','forma'].includes(current))toolbar.prepend(button);else launch.append(button);}
function applySize(value){largeText=value;document.documentElement.dataset.textSize=largeText?'large':'normal';const input=document.getElementById('large-text');if(input)input.checked=largeText;}
try{current=localStorage.getItem(key)||'ink';}catch{}
try{largeText=localStorage.getItem(sizeKey)==='true';}catch{}
// Local preview convenience only; this is not access control.
try{if(['localhost','127.0.0.1','[::1]'].includes(root.location?.hostname)&&new URLSearchParams(root.location.search).get('preview')==='forma')current='forma';}catch{}
apply(current);applySize(largeText);
const api={themes,get current(){return current;},get largeText(){return largeText;},set(value){if(!themes.includes(value))return false;apply(value);try{localStorage.setItem(key,current);}catch{}return true;},setLargeText(value){if(typeof value!=='boolean')return false;applySize(value);try{localStorage.setItem(sizeKey,String(value));}catch{}return true;}};
root.SudokuTheme=api;if(typeof module!=='undefined')module.exports=api;
document.addEventListener('DOMContentLoaded',()=>{positionStudioAction();const select=document.getElementById('theme-select');if(select){select.value=current;select.addEventListener('change',()=>api.set(select.value));}const input=document.getElementById('large-text');if(input){input.checked=largeText;input.addEventListener('change',()=>api.setLargeText(input.checked));}});
})(globalThis);
