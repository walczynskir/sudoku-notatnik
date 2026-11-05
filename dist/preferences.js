/* Preferences reuse the board, library and progress controllers as their sources of truth. */
(function(root){
'use strict';
const $=id=>document.getElementById(id),dialog=$('preferences-dialog');let opener;
function notice(){ $('preferences-status').textContent='Nie udało się zapisać ustawień. Działają tylko w tej sesji.'; }
function showCustom(custom,value){$('preference-custom').hidden=!custom;$('preference-custom-label').hidden=!custom;if(custom)$('preference-custom').value=String(value);}
function syncGoal(){const target=root.SudokuProgress?.getDailyGoal?.(),available=Number.isInteger(target);$('preference-goal').disabled=!available;$('preference-goal-unavailable').hidden=available;if(!available){showCustom(false);return;}const custom=![0,1,3,5].includes(target);$('preference-goal').value=custom?'custom':String(target);showCustom(custom,target);}
function setGoal(target){if(!Number.isInteger(target)||target<0||target>99||!root.SudokuProgress?.setDailyGoal?.(target)){$('preference-goal-error').textContent='Wpisz liczbę całkowitą od 1 do 99.';return false;}$('preference-goal-error').textContent='';if(root.SudokuProgress?.storageAvailable===false)notice();syncGoal();return true;}
$('open-preferences').onclick=()=>{opener=document.activeElement;$('preference-notes').checked=root.SudokuLibrary?.getAutoNotes?.()===true;$('preference-goal-error').textContent='';syncGoal();dialog.showModal();dialog.scrollTop=0;};
$('preference-notes').onchange=()=>{if(root.SudokuLibrary?.setAutoNotes?.($('preference-notes').checked)===false)notice();};
$('preference-goal').onchange=()=>{if($('preference-goal').value==='custom'){showCustom(true,root.SudokuProgress?.getDailyGoal?.()||3);$('preference-custom').focus();return;}setGoal(Number($('preference-goal').value));};
$('preference-custom').onchange=()=>{const value=Number($('preference-custom').value);if(value<1){$('preference-goal-error').textContent='Wpisz liczbę całkowitą od 1 do 99.';return;}setGoal(value);};
document.addEventListener('sudoku-library-notes-change',()=>{$('preference-notes').checked=root.SudokuLibrary?.getAutoNotes?.()===true;});
document.addEventListener('sudoku-goal-change',()=>{if(dialog.open)syncGoal();});
dialog.addEventListener('close',()=>opener?.focus());
})(globalThis);
