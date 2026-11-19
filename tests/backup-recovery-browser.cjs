const {chromium}=require(process.env.PLAYWRIGHT_PATH),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const A=require('../dist/progress-backup.js'),B=require('../dist/shared-progress-backup.js');
const id=n=>n.toString(16).padStart(16,'0'),record={level:'easy',help:false,date:'2026-11-17',dailyDate:null};
const board={values:[7,...Array(80).fill(0)],notes:Array.from({length:81},()=>[])};
const before=Object.fromEntries(A.transactionKeys.map(k=>[k,null]));Object.assign(before,{
 'sudoku-library-v1':JSON.stringify({completed:[id(1)],recent:[]}),
 'sudoku-progress-preview-v1':JSON.stringify({records:{[id(1)]:record},sessions:{[id(9)]:{level:'easy',help:true}},dailyTarget:3}),
 'sudoku-technique-achievements-v1':JSON.stringify({badges:{},sessions:{[id(9)]:{level:'starter',help:true}}}),
 'sudoku-theme':'sage','sudoku-previous-theme':'sage','sudoku-language':'pl','sudoku-show-history':'true'
});
const partial={...before,'sudoku-library-v1':JSON.stringify({completed:[id(2)],recent:[]}),'sudoku-progress-preview-v1':JSON.stringify({records:{[id(2)]:record}}),'sudoku-theme':'energy','sudoku-language':'ar'};
const journal=JSON.stringify({version:1,before});
async function profile(browser,width,refuse=false){const c=await browser.newContext({viewport:{width,height:850},hasTouch:true,serviceWorkers:'block'});await c.route('**/*',r=>{const u=new URL(r.request().url());if(u.hostname!=='localhost')return r.abort();const file=path.resolve(__dirname,'../dist','.'+(u.pathname==='/'?'/index.html':u.pathname));return fs.existsSync(file)?r.fulfill({path:file}):r.fulfill({status:404})});await c.addInitScript(({partial,journal,board,refuse,keys})=>{if(!localStorage.getItem('recovery-seeded')){for(const [k,v]of Object.entries(partial))if(v!==null)localStorage.setItem(k,v);localStorage.setItem('sudoku-backup-transaction-v1',journal);localStorage.setItem('sudoku-notatnik-v1',JSON.stringify(board));localStorage.setItem('sudoku-notatnik-initial-v1',JSON.stringify(board));localStorage.setItem('recovery-seeded','1');}globalThis.nativeSet=Storage.prototype.setItem;if(refuse)Storage.prototype.setItem=function(k,v){if(keys.includes(k))throw Error('recovery denied');return nativeSet.call(this,k,v)};},{partial,journal,board,refuse,keys:A.transactionKeys});const p=await c.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto('http://localhost/');await p.locator('#open-preferences').waitFor();return {c,p,errors};}
const fingerprint=p=>p.evaluate(()=>JSON.stringify({state,initial,history,future,sessions:SudokuProgress.backupData().sessions,technique:SudokuTechniqueRewards.backupData().sessions}));
(async()=>{const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});try{
for(const width of [390,1280]){
 const recovered=await profile(browser,width),p=recovered.p;
 assert.equal(await p.evaluate(()=>localStorage.getItem('sudoku-backup-transaction-v1')),null);
 assert.equal(await p.evaluate(()=>SudokuTheme.current),'sage');assert.equal(await p.evaluate(()=>SudokuI18n.language),'pl');assert.deepEqual(await p.evaluate(()=>SudokuLibrary.backupData().completed),[id(1)]);assert.equal(await p.evaluate(()=>state.values[0]),7);assert.deepEqual(await p.evaluate(()=>Object.keys(SudokuProgress.backupData().records)),[id(1)]);assert.equal(await p.evaluate(()=>SudokuProgress.backupData().sessions['0000000000000009'].help),true);
 const blocked=await profile(browser,width,true),q=blocked.p;
 await q.locator('#backup-recovery-dialog').waitFor({state:'visible'});fs.mkdirSync(path.join(__dirname,'artifacts'),{recursive:true});await q.screenshot({path:path.join(__dirname,`artifacts/recovery-${width}.png`)});assert.equal(await q.evaluate(()=>SudokuBackupStorage.blocked),true);
 assert.equal(await q.evaluate(()=>localStorage.getItem('sudoku-progress-preview-v1')),partial['sudoku-progress-preview-v1']);
 assert.deepEqual(await q.evaluate(()=>Object.keys(SudokuProgress.backupData().records)),[id(1)]);assert.equal(await q.evaluate(()=>SudokuTheme.current),'sage');
 const saved=await q.evaluate(()=>localStorage.getItem('sudoku-notatnik-v1'));
 assert.equal(await q.evaluate(()=>SudokuProgress.retrySave()),false);await q.evaluate(()=>save());assert.equal(await q.evaluate(()=>localStorage.getItem('sudoku-notatnik-v1')),saved);assert.equal(await q.evaluate(()=>localStorage.getItem('sudoku-progress-preview-v1')),partial['sudoku-progress-preview-v1']);
 await q.keyboard.press('Escape');assert(await q.locator('#backup-recovery-dialog').isVisible());await q.locator('#backup-recovery-retry').tap();assert(await q.locator('#backup-recovery-dialog').isVisible());
 await q.evaluate(()=>Storage.prototype.setItem=nativeSet);await q.locator('#backup-recovery-retry').tap();assert(await q.locator('#backup-recovery-dialog').isHidden());assert.equal(await q.evaluate(()=>SudokuBackupStorage.blocked),false);assert.equal(await q.evaluate(()=>localStorage.getItem('sudoku-backup-transaction-v1')),null);assert.equal(await q.evaluate(()=>localStorage.getItem('sudoku-progress-preview-v1')),before['sudoku-progress-preview-v1']);assert.equal(await q.evaluate(()=>state.values[0]),7);
 // Simulate a rejected import and permanently refused rollback in the running app.
 const progress=A.empty();progress.completed=[id(3)];progress.records[id(3)]=record;
 const schema={game:'sudoku',languages:['pl'],options:{checkEntries:v=>typeof v==='boolean',autoNotes:v=>typeof v==='boolean',showHistory:v=>typeof v==='boolean',dailyTarget:A.target,weeklyTarget:A.weekly},validProgress:A.validProgress,readLegacy:A.readLegacy};
 const text=B.stringify({language:'pl',theme:'sage',large:false,contrast:false,checkEntries:false,autoNotes:false,showHistory:true,dailyTarget:3,weeklyTarget:5},progress,schema);
 await p.evaluate(()=>change(()=>state.values[1]=8));const active=await fingerprint(p);const initialStored=await p.evaluate(()=>localStorage.getItem('sudoku-notatnik-v1'));
 await p.locator('#open-preferences').tap();await p.locator('#backup-file').setInputFiles({name:'backup.json',mimeType:'application/json',buffer:Buffer.from(text)});await p.locator('#backup-confirm').waitFor({state:'visible'});
 await p.evaluate(()=>{globalThis.nativeRuntimeSet=Storage.prototype.setItem;let n=0;Storage.prototype.setItem=function(k,v){if(++n>=4)throw Error('write and rollback denied');return nativeRuntimeSet.call(this,k,v)}});
 await p.locator('#backup-accept').tap();await p.locator('#backup-recovery-dialog').waitFor({state:'visible'});assert.equal(await fingerprint(p),active);assert.equal(await p.evaluate(()=>SudokuBackupStorage.blocked),true);assert(await p.evaluate(()=>Boolean(localStorage.getItem('sudoku-backup-transaction-v1'))));
 const pending=await p.evaluate(()=>localStorage.getItem('sudoku-progress-preview-v1'));assert.notEqual(pending,before['sudoku-progress-preview-v1']);assert.equal(await p.evaluate(()=>SudokuProgress.retrySave()),false);await p.evaluate(()=>save());assert.equal(await p.evaluate(()=>localStorage.getItem('sudoku-progress-preview-v1')),pending);assert.equal(await p.evaluate(()=>localStorage.getItem('sudoku-notatnik-v1')),initialStored);
 await p.evaluate(()=>Storage.prototype.setItem=nativeRuntimeSet);await p.locator('#backup-recovery-retry').tap();assert.equal(await fingerprint(p),active);assert.equal(await p.evaluate(()=>localStorage.getItem('sudoku-backup-transaction-v1')),null);await p.locator('#backup-accept').tap();assert(await p.locator('#backup-confirm').isHidden());assert.equal(await fingerprint(p),active);assert.deepEqual(await p.evaluate(()=>SudokuLibrary.backupData().completed.sort()),[id(1),id(3)]);
 assert.deepEqual(recovered.errors,[]);assert.deepEqual(blocked.errors,[]);await recovered.c.close();await blocked.c.close();console.log(width,'startup recovery, refused rollback, write guard and in-session retry OK');
}
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
