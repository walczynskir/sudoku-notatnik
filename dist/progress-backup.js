/* Sudoku adapter: durable achievements only; active boards and sessions are excluded. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.SudokuProgressBackup=api;})(globalThis,()=>{
 'use strict';
 const levels=['easy','medium','hard','expert'],techniques=['starter','gentle','regular','demanding','advanced','extreme'];
 const rewardIds=['aurora','obsidian','crown','copper','night-sky'];
 const badgeIds=[...['100','200','500','1000'].map(n=>'hundreds-'+n),...['3','7','15','30'].map(n=>'rhythm-'+n),...levels.map(n=>'level-'+n)];
 const fields=['completed','records','goals','awards','dailyGoals','dailyAwards','badges','techniqueBadges','unlockedThemes'];
 const object=v=>v!==null&&typeof v==='object'&&!Array.isArray(v)&&[Object.prototype,null].includes(Object.getPrototypeOf(v));
 const exact=(v,keys)=>object(v)&&Object.keys(v).length===keys.length&&keys.every(k=>Object.hasOwn(v,k));
 const safeKeys=(v,keys,required=[])=>object(v)&&Object.keys(v).every(k=>keys.includes(k))&&required.every(k=>Object.hasOwn(v,k));
 const id=s=>typeof s==='string'&&/^[a-f0-9]{16}$/.test(s);
 const date=s=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&Number.isFinite(Date.parse(s))&&new Date(s).toISOString().slice(0,10)===s;
 const target=v=>Number.isInteger(v)&&v>=0&&v<=99;
 const weekly=v=>[0,3,5,7].includes(v);
 const map=(v,key,value)=>object(v)&&Object.keys(v).length<=100000&&Object.entries(v).every(([k,r])=>key(k)&&value(r));
 const unique=(v,check)=>Array.isArray(v)&&v.length<=100000&&new Set(v).size===v.length&&v.every(check);
 function validProgress(p){const completed=new Set(p?.completed||[]);return exact(p,fields)
  &&unique(p.completed,id)
  &&map(p.records,id,r=>safeKeys(r,['level','techniqueLevel','help','date','dailyDate'],['level','help','date'])&&levels.includes(r.level)&&(r.techniqueLevel===undefined||techniques.includes(r.techniqueLevel))&&[true,false,null].includes(r.help)&&date(r.date)&&(r.dailyDate===undefined||r.dailyDate===null||date(r.dailyDate)))
  &&Object.keys(p.records).every(k=>completed.has(k))
  &&map(p.goals,date,weekly)&&map(p.dailyGoals,date,target)
  &&map(p.awards,date,r=>exact(r,['target','date'])&&weekly(r.target)&&r.target>0&&date(r.date))
  &&map(p.dailyAwards,date,r=>exact(r,['target'])&&target(r.target)&&r.target>0)
  &&map(p.badges,k=>badgeIds.includes(k),r=>exact(r,['date'])&&date(r.date))
  &&map(p.techniqueBadges,k=>techniques.includes(k),r=>exact(r,['date','puzzleId'])&&date(r.date)&&id(r.puzzleId))
  &&unique(p.unlockedThemes,k=>rewardIds.includes(k));}
 const empty=()=>Object.fromEntries(fields.map(k=>[k,['completed','unlockedThemes'].includes(k)?[]:{}]));
 // Existing storage has optional historical fields and duplicate legacy IDs.
 function snapshot(library={},progress={},technique={},unlocked=[]){
  const p=empty();for(const k of ['records','goals','awards','dailyGoals','dailyAwards','badges'])p[k]=structuredClone(progress[k]||{});
  p.completed=[...new Set([...(library.completed||[]),...Object.keys(p.records)])].sort();
  p.techniqueBadges=structuredClone(technique.badges||{});
  const rewards=new Set([...(progress.unlockedThemes||[]),...unlocked]);
  if(p.completed.length>=3)rewards.add('copper');if(p.completed.length>=10)rewards.add('night-sky');
  if(p.techniqueBadges.advanced)rewards.add('obsidian');if(p.techniqueBadges.extreme)rewards.add('crown');
  p.unlockedThemes=rewardIds.filter(k=>rewards.has(k));return p;
 }
 function merge(local,incoming){
  if(!validProgress(local)||!validProgress(incoming))throw Error('invalid');
  const result=empty();result.completed=[...new Set([...local.completed,...incoming.completed])].sort();
  for(const k of fields.filter(k=>!['completed','unlockedThemes'].includes(k)))result[k]=structuredClone({...incoming[k],...local[k]});
  const unlocked=new Set([...local.unlockedThemes,...incoming.unlockedThemes]);
  if(result.completed.length>=3)unlocked.add('copper');if(result.completed.length>=10)unlocked.add('night-sky');
  if(result.techniqueBadges.advanced)unlocked.add('obsidian');if(result.techniqueBadges.extreme)unlocked.add('crown');
  result.unlockedThemes=rewardIds.filter(k=>unlocked.has(k));return result;
 }
 const summary=p=>({completed:p.completed.length,records:Object.keys(p.records).length,unknown:p.completed.filter(k=>!p.records[k]).length,badges:Object.keys(p.badges).length+Object.keys(p.techniqueBadges).length,trophies:Object.keys(p.dailyAwards).length,unlocked:p.unlockedThemes.length});
 function readLegacy(v){throw Object.assign(Error(v?.format==='sudoku-notatnik-v1'||Array.isArray(v?.values)?'board':'invalid'),{code:v?.format==='sudoku-notatnik-v1'||Array.isArray(v?.values)?'board':'invalid'});}
 // A durable undo journal makes an interrupted multi-key import recoverable.
 const journal='sudoku-backup-transaction-v1';
 const transactionKeys=['sudoku-library-v1','sudoku-progress-preview-v1','sudoku-technique-achievements-v1','sudoku-unlocked-themes-v1','sudoku-active-options-v1','sudoku-theme','sudoku-previous-theme','sudoku-language','sudoku-large-text','sudoku-check-entries','sudoku-library-notes','sudoku-show-history'];
 function readJournal(storage){
  const raw=storage.getItem(journal);if(raw===null)return null;
  const data=JSON.parse(raw);
  if(!exact(data,['version','before'])||data.version!==1||!exact(data.before,transactionKeys)||!Object.values(data.before).every(v=>v===null||typeof v==='string'))throw Error('invalid journal');
  return data.before;
 }
 function recover(storage){
  const before=readJournal(storage);if(!before)return;
  for(const key of transactionKeys){if(before[key]===null)storage.removeItem(key);else storage.setItem(key,before[key]);}
  // Removing the journal is the commit point of recovery, not its first step.
  storage.removeItem(journal);
 }
 function write(storage,entries){
  recover(storage);
  if(!Array.isArray(entries)||entries.length!==transactionKeys.length||!entries.every(e=>Array.isArray(e)&&e.length===2&&transactionKeys.includes(e[0])&&typeof e[1]==='string')||new Set(entries.map(e=>e[0])).size!==transactionKeys.length)throw Error('invalid transaction');
  const before=Object.fromEntries(transactionKeys.map(k=>[k,storage.getItem(k)]));
  storage.setItem(journal,JSON.stringify({version:1,before}));
  try{for(const [key,value]of entries)storage.setItem(key,value);storage.removeItem(journal);}
  catch(error){try{recover(storage);}catch{}throw error;}
 }
 // Controllers use this guard instead of writing over an unfinished recovery.
 function createStorageGuard(native,onBlocked=()=>{}){
  let blocked=false,before=null,unavailableAtBoot=false;
  function block(){const fresh=!blocked;blocked=true;try{before=readJournal(native);}catch{before=null;}if(fresh)onBlocked();}
  function startRecovery(){
   // No storage access at all retains the existing session-only fallback.
   let raw;try{raw=native.getItem(journal);}catch{if(!blocked)unavailableAtBoot=true;return;}
   if(raw===null){blocked=false;before=null;return;}
   try{recover(native);blocked=false;before=null;}catch(error){block();throw error;}
  }
  try{startRecovery();}catch{}
  const writable=()=>{if(unavailableAtBoot)throw Error('storage unavailable at startup; reload before saving');if(blocked)throw Error('backup recovery pending');if(native.getItem(journal)!==null){block();throw Error('backup recovery pending');}};
  const storage={
   getItem(key){if(transactionKeys.includes(key)){if(blocked)return before?before[key]:null;if(unavailableAtBoot)return null;}return native.getItem(key);},
   setItem(key,value){writable();native.setItem(key,value);},
   removeItem(key){writable();native.removeItem(key);}
  };
  return {storage,get blocked(){return blocked;},recover(){startRecovery();if(blocked)throw Error('backup recovery pending');},commit(entries){writable();try{write(native,entries);}catch(error){try{if(native.getItem(journal)!==null)block();}catch{block();}throw error;}}};
 }
 return {fields,rewardIds,empty,validProgress,snapshot,merge,summary,readLegacy,write,target,weekly,journal,transactionKeys,readJournal,recover,createStorageGuard};
});
