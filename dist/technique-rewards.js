/* Achievements for unaided technique-level attempts. */
(function(root){
'use strict';
const D=root.SudokuDifficulty||(typeof require==='function'?require('./difficulty.js'):null),key=D?.isPreview(root.location)?'sudoku-technique-achievements-preview-v1':'sudoku-technique-achievements-v1';
const rewards={advanced:{id:'obsidian',name:'Obsydian'},extreme:{id:'crown',name:'Korona'}};
function createTracker(saved={}){
 const data={sessions:{},badges:{},...saved};for(const k of ['sessions','badges'])if(!data[k]||typeof data[k]!=='object'||Array.isArray(data[k]))data[k]={};
 return {data,begin(record){if(!D.levels.some(l=>l.id===record.previewLevel))return;data.sessions[record.id]={level:record.previewLevel,help:false};},assist(id){if(data.sessions[id])data.sessions[id].help=true;},finish(record,date=new Date().toISOString().slice(0,10)){const s=data.sessions[record.id];if(!s||s.help||s.level!==record.previewLevel||data.badges[s.level])return null;data.badges[s.level]={date,puzzleId:record.id};return s.level;},earned(level){return Boolean(data.badges[level]);},unlocked(){return Object.entries(rewards).filter(([level])=>data.badges[level]).map(([,r])=>r.id);}};
}
const api={createTracker,rewards};root.SudokuTechniqueRewards=api;if(typeof module!=='undefined')module.exports=api;
if(typeof document==='undefined'||!D.enabled(root.location)||new URLSearchParams(root.location?.search||'').get('features')?.split(',').includes('no-gamification'))return;
let saved={};try{saved=JSON.parse(localStorage.getItem(key)||'{}');}catch{}
const tracker=createTracker(saved);let active=null,panel=null,notice=null,storageOK=true;
function persist(){try{localStorage.setItem(key,JSON.stringify(tracker.data));}catch{storageOK=false;}paint();}
function register(){for(const id of tracker.unlocked())root.SudokuTheme?.registerTechniqueTheme(id);}
function paint(){register();for(const l of D.levels){const badge=document.querySelector(`[data-level-achievement="${l.id}"]`);if(badge){badge.textContent=tracker.earned(l.id)?'✓ Samodzielnie':'◇ Do zdobycia';badge.classList.toggle('earned',tracker.earned(l.id));}}
 if(!panel)return;panel.querySelector('.technique-earned-count').textContent=`Zdobyte: ${D.levels.filter(l=>tracker.earned(l.id)).length} / 6`;
 for(const [level,reward]of Object.entries(rewards)){const card=panel.querySelector(`[data-technique-reward="${level}"]`),earned=tracker.earned(level);card.querySelector('button').disabled=!earned;card.querySelector('.technique-reward-state').textContent=earned?'Motyw odblokowany':level==='advanced'?'Rozwiąż samodzielnie poziom Ekstremalny.':'Rozwiąż samodzielnie poziom Arcymistrzowski.';}
 panel.querySelector('.technique-storage-warning').hidden=storageOK;
}
api.bind=()=>{const picker=document.querySelector('.technique-picker');if(!picker||panel)return;for(const l of D.levels){const badge=document.createElement('span');badge.className='level-achievement';badge.dataset.levelAchievement=l.id;document.getElementById('library-level-'+l.id).nextElementSibling.append(badge);}
 panel=document.createElement('details');panel.className='technique-rewards';panel.innerHTML='<summary>Plakietki i motywy nagrodowe</summary><p class="technique-earned-count"></p><p class="help">Plakietkę zdobywasz za pierwsze samodzielne rozwiązanie na danym poziomie. Podpowiedzi techniki i oznaczanie błędów wykluczają zaliczenie. Kandydaci i wypełnianie pojedynczych są dozwolone.</p><div class="technique-reward-grid">'+Object.entries(rewards).map(([level,r])=>`<section data-technique-reward="${level}"><div class="technique-swatch ${r.id}" aria-hidden="true"></div><strong>${r.name}</strong><p class="technique-reward-state"></p><button type="button" class="secondary" disabled>${r.id==='obsidian'?'Wybierz motyw Obsydian':'Wybierz motyw Korona'}</button></section>`).join('')+'</div><p class="help technique-storage-warning" hidden>Nie udało się zapisać nagród. Są dostępne tylko w tej sesji.</p>';picker.after(panel);for(const [level,r]of Object.entries(rewards))panel.querySelector(`[data-technique-reward="${level}"] button`).onclick=()=>{if(tracker.earned(level)){register();root.SudokuTheme?.set(r.id);}};
 notice=document.createElement('p');notice.className='badge-toast';notice.setAttribute('role','status');notice.hidden=true;document.body.append(notice);paint();};
api.begin=record=>{tracker.begin(record);persist();};
api.assist=()=>{if(active){tracker.assist(active.id);persist();}};
api.onBoard=(record,solved,{errors=false}={})=>{active=record||null;if(!record)return;if(errors)tracker.assist(record.id);const awarded=solved?tracker.finish(record):null;persist();if(awarded&&notice){notice.textContent='🏅 Plakietka samodzielności: '+D.levels.find(l=>l.id===awarded).label;notice.hidden=false;clearTimeout(api.toastTimer);api.toastTimer=setTimeout(()=>{notice.hidden=true;},6000);}};
register();
})(globalThis);
