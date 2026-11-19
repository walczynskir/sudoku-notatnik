/* Portable Sudoku configuration and durable progress, without replacing an attempt. */
(() => {
 'use strict';
 const localStorage=globalThis.SudokuBackupStorage?.storage||globalThis.localStorage;
 const A=SudokuProgressBackup,B=GamesChestBackup,$=id=>document.getElementById(id);
 const preview=globalThis.SudokuDifficulty?.isPreview(location)===true;
 const keys={library:preview?'sudoku-library-technique-preview-v1':'sudoku-library-v1',progress:'sudoku-progress-preview-v1',technique:preview?'sudoku-technique-achievements-preview-v1':'sudoku-technique-achievements-v1',theme:preview?'sudoku-technique-theme-preview':'sudoku-theme',previous:preview?'sudoku-technique-previous-theme-preview':'sudoku-previous-theme'};
 const strings=()=>sudokuBackupStrings[SudokuI18n.language]||sudokuBackupStrings.en;
 const errors=()=>preferencesTransferStrings[SudokuI18n.language]||preferencesTransferStrings.en;
 const schema={game:'sudoku',languages:SudokuI18n.languages,options:{checkEntries:v=>typeof v==='boolean',autoNotes:v=>typeof v==='boolean',showHistory:v=>typeof v==='boolean',dailyTarget:A.target,weeklyTarget:A.weekly},validProgress:A.validProgress,readLegacy:A.readLegacy};
 const read=(key,fallback={})=>JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback));
 function local(){
  const library=SudokuLibrary.backupData?.()||read(keys.library);
  const progress=globalThis.SudokuProgress?.backupData?.()||read(keys.progress);
  const technique=SudokuTechniqueRewards.backupData?.()||read(keys.technique);
  const durable=A.snapshot(library,progress,technique,read('sudoku-unlocked-themes-v1',[]));
  if(!A.validProgress(durable))throw Error('invalid');
  return {library,progress,technique,durable};
 }
 function preferences(){const data=globalThis.SudokuProgress?.backupData?.()||read(keys.progress);return {
  language:SudokuI18n.language,theme:SudokuTheme.baseTheme,large:SudokuTheme.largeText,contrast:SudokuTheme.current==='contrast',
  checkEntries:SudokuAttemptPreferences.get().configured,autoNotes:SudokuLibrary.getAutoNotes(),showHistory:SudokuHistoryPreference.get(),dailyTarget:data.dailyTarget??3,weeklyTarget:data.weeklyTarget??5};}
 const dialog=$('backup-confirm'),status=$('backup-status');let pending=null,busy=false;
 function updateAttemptNotice(){const option=SudokuAttemptPreferences.get();$('backup-active-note').hidden=option.active===option.configured;$('backup-active-note').textContent=strings()[14];}
 function copy(){const t=strings();for(const [id,n] of [['backup-heading',0],['backup-export',1],['backup-import',2],['backup-scope',3],['backup-title',4],['backup-merge',5],['backup-limits',6],['backup-accept',11],['backup-deferred',14]])$(id).textContent=t[n];
  if(preview){$('backup-export').disabled=$('backup-import').disabled=true;$('backup-scope').textContent=t[15];}
  $('backup-cancel').textContent=SudokuI18n.text('Anuluj');$('backup-dismiss').setAttribute('aria-label',SudokuI18n.text('Zamknij'));updateAttemptNotice();
 }
 function plan(candidate){
  const source=local(),merged=A.merge(source.durable,candidate.progress);
  const p=GamesChestPreferences.resolveTheme(candidate.preferences,preferences().theme,
   id=>['sage','ink','studio','forma','energy','tangerine','porcelain','ukraine',...A.rewardIds].includes(id),
   id=>!A.rewardIds.includes(id)||(SudokuTheme.rewardsEnabled&&merged.unlockedThemes.includes(id)));
  const data={...source.progress};for(const k of ['records','goals','awards','dailyGoals','dailyAwards','badges','unlockedThemes'])data[k]=structuredClone(merged[k]);
  data.dailyTarget=p.preferences.dailyTarget;data.weeklyTarget=p.preferences.weeklyTarget;
  const now=new Date(),today=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');
  data.dailyGoals[today]=data.dailyTarget;
  return {source,merged,preferences:p.preferences,skipped:p.skipped,data};
 }
 function previewPlan(){const p=plan(pending),before=A.summary(p.source.durable),after=A.summary(p.merged),rows=$('backup-summary');rows.replaceChildren();
  for(const [key,index] of [['completed',7],['badges',8],['trophies',9],['unlocked',10]]){const row=document.createElement('p'),name=document.createElement('span'),value=document.createElement('b');name.textContent=strings()[index];value.textContent=`${before[key]} → ${after[key]}`;value.dir='ltr';row.append(name,value);rows.append(row);}
  const config=$('backup-configuration');config.replaceChildren();
  const add=(label,value)=>{const row=document.createElement('p'),name=document.createElement('span'),v=document.createElement('b');name.textContent=label;v.textContent=value;row.append(name,v);config.append(row);};
  add('🌐',document.querySelector(`#language-select option[value="${p.preferences.language}"]`).textContent);
  add(SudokuI18n.text('Wygląd'),SudokuI18n.text(({sage:'Klasyczny',ink:'Atrament i papier',studio:'Pracownia',forma:'Forma',energy:'Energia',tangerine:'Mandarynka',porcelain:'Porcelana',ukraine:'Ukraina',aurora:'Zorza',obsidian:'Obsydian',crown:'Korona',copper:'Miedź','night-sky':'Nocne niebo'})[p.preferences.theme]||p.preferences.theme));
  for(const [label,key]of [['Większy tekst','large'],['Wysoki kontrast','contrast'],['Cofnij i Przywróć','showHistory'],['Oznaczaj błędne cyfry','checkEntries'],['Pokaż kandydatów od razu','autoNotes']])add(SudokuI18n.text(label),p.preferences[key]?'✓':'—');
  add(SudokuI18n.text('Twój cel dzienny'),String(p.preferences.dailyTarget));
  $('backup-config-label').textContent=SudokuI18n.text('Preferencje gry');
  $('backup-theme-warning').hidden=!p.skipped;$('backup-theme-warning').textContent=p.skipped?errors()[p.skipped==='locked'?6:7]:'';
 }
 function message(error){const code=error?.code||error?.message;return code==='board'?strings()[13]:errors()[({game:9,version:10,read:11,write:12,export:13})[code]??8];}
 $('backup-export').onclick=()=>{try{const text=B.stringify(preferences(),local().durable,schema),url=URL.createObjectURL(new Blob([text],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='sudoku-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent='';}catch{status.textContent=message({code:'export'});}};
 $('backup-import').onclick=()=>{$('backup-file').click();};
 $('backup-file').onchange=async event=>{const file=event.target.files[0];if(!file)return;status.textContent='';try{
  if(file.size>B.maxBytes)throw Error('invalid');let text;try{text=await file.text();}catch{throw Object.assign(Error('read'),{code:'read'});}
  let value;try{value=JSON.parse(text);}catch{throw Error('invalid');}
  if(value?.format==='sudoku-notatnik-v1')A.readLegacy(value);
  pending=B.parse(text,schema);copy();previewPlan();$('backup-error').textContent='';dialog.showModal();dialog.querySelector('.settings-body').scrollTop=0;
 }catch(error){pending=null;status.textContent=message(error);}finally{event.target.value='';}};
 $('backup-cancel').onclick=$('backup-dismiss').onclick=()=>dialog.close();
 dialog.addEventListener('close',()=>{if(dialog.open)return;pending=null;$('backup-import').focus();});
 $('backup-accept').onclick=()=>{if(!pending||busy)return;busy=true;try{
  const p=plan(pending),pref=p.preferences,active=SudokuAttemptPreferences.get().active;
  const entries=Object.entries({
   [keys.library]:{...p.source.library,completed:p.merged.completed},[keys.progress]:p.data,
   [keys.technique]:{...p.source.technique,badges:p.merged.techniqueBadges},'sudoku-unlocked-themes-v1':p.merged.unlockedThemes,
   'sudoku-active-options-v1':{checkEntries:active}
  }).map(([key,v])=>[key,JSON.stringify(v)]);
  entries.push([keys.theme,pref.contrast?'contrast':pref.theme],[keys.previous,pref.theme],['sudoku-language',pref.language],['sudoku-large-text',String(pref.large)],['sudoku-check-entries',String(pref.checkEntries)],['sudoku-library-notes',String(pref.autoNotes)],['sudoku-show-history',String(pref.showHistory)]);
  try{globalThis.SudokuBackupStorage.commit(entries);}catch{throw Object.assign(Error('write'),{code:'write'});}
  SudokuLibrary.restoreBackup(p.merged.completed);
  globalThis.SudokuProgress?.restoreBackup?.(p.data,p.merged.completed);
  SudokuTechniqueRewards.restoreBackup?.(p.merged.techniqueBadges);
  SudokuTheme.restoreUnlocks(p.merged.unlockedThemes);
  SudokuAttemptPreferences.restore(pref.checkEntries);$('check-entries').checked=pref.checkEntries;updateAttemptNotice();
  SudokuLibrary.setAutoNotes(pref.autoNotes);$('preference-notes').checked=pref.autoNotes;
  SudokuHistoryPreference.restore(pref.showHistory);
  SudokuTheme.set(pref.theme);if(pref.contrast)SudokuTheme.set('contrast');SudokuTheme.setLargeText(pref.large);
  SudokuI18n.setLanguage(pref.language);
  $('preference-goal').value=[0,1,3,5].includes(pref.dailyTarget)?String(pref.dailyTarget):'custom';
  $('preference-custom').value=String(pref.dailyTarget);$('preference-custom').hidden=$('preference-custom-label').hidden=[0,1,3,5].includes(pref.dailyTarget);
  document.dispatchEvent(new Event('sudoku-goal-change'));
  status.textContent=strings()[12]+(p.skipped?' '+errors()[p.skipped==='locked'?6:7]:'');dialog.close();
 }catch(error){$('backup-error').textContent=message(error);}finally{busy=false;}};
 $('check-entries').addEventListener('click',updateAttemptNotice);$('open-preferences').addEventListener('click',updateAttemptNotice);
 document.addEventListener('sudoku-language-change',()=>{copy();if(dialog.open&&pending)previewPlan();});copy();
})();
