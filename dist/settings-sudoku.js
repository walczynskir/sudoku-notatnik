/* Shared settings presentation; Sudoku keeps its existing controllers and keys. */
(() => {
 const localStorage=globalThis.SudokuBackupStorage?.storage||globalThis.localStorage;
 const dialog=document.getElementById('preferences-dialog');
 const get=id=>document.getElementById(id);
 const error=get('settings-save-error');
 const status=get('preferences-status');
 function renderSettings(){
  const strings=settingsDialogStrings[document.documentElement.lang]||settingsDialogStrings.en;
  for(const [id,key] of [['settings-autosave','autosave'],['settings-display-heading','display'],['settings-save-error-text','error'],['settings-save-retry','retry']]){
   if(get(id).textContent!==strings[key])get(id).textContent=strings[key];
  }
  for(const node of dialog.querySelectorAll('[data-setting-applies]'))node.textContent=strings[node.dataset.settingApplies];
  for(const button of dialog.querySelectorAll('.setting-info')){
   const name=button.closest('.setting-item').querySelector('.setting-name').textContent;
   const label=strings.about+name;if(button.getAttribute('aria-label')!==label)button.setAttribute('aria-label',label);
  }
 }
 new MutationObserver(renderSettings).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 // Existing handlers report storage failures here; keep their signal and reveal a retry.
 new MutationObserver(()=>{
  const failed=Boolean(status.textContent.trim());
  error.hidden=!failed;
  if(failed)dialog.querySelector('.settings-body').scrollTop=0;
 }).observe(status,{childList:true,characterData:true,subtree:true});
 get('settings-save-retry').onclick=()=>{
  let saved=true;
  try{
   for(const [key,id] of [['sudoku-check-entries','check-entries'],['sudoku-library-notes','preference-notes'],['sudoku-show-history','preference-history']])localStorage.setItem(key,String(get(id).checked));
  }catch{saved=false;}
  if(globalThis.SudokuProgress?.retrySave?.()===false)saved=false;
  if(saved){status.textContent='';error.hidden=true;}
 };
 get('open-preferences').addEventListener('click',()=>{renderSettings();dialog.querySelector('.settings-body').scrollTop=0;});
 renderSettings();
})();
