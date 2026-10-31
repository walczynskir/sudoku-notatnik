(function(root){
'use strict';
const S=root.Sudoku||(typeof require==='function'?require('./logic.js'):null);
const units=[];
for(let r=0;r<9;r++)units.push({name:`wierszu ${r+1}`,cells:Array.from({length:9},(_,c)=>r*9+c)});
for(let c=0;c<9;c++)units.push({name:`kolumnie ${c+1}`,cells:Array.from({length:9},(_,r)=>r*9+c)});
for(let b=0;b<9;b++)units.push({name:`kwadracie ${b+1}`,cells:Array.from({length:9},(_,j)=>(Math.floor(b/3)*3+Math.floor(j/3))*9+b%3*3+j%3)});
const label=i=>`wiersz ${Math.floor(i/9)+1}, kolumna ${i%9+1}`;
const all=[1,2,3,4,5,6,7,8,9];
function* combinations(items,n,start=0,prefix=[]){if(!n){yield prefix;return;}for(let i=start;i<=items.length-n;i++)yield* combinations(items,n-1,i+1,[...prefix,items[i]]);}
function elimination(technique,sources,removals,reason){return {kind:'hint',technique,sources,targets:removals.map(r=>r.cell),digits:[...new Set(removals.flatMap(r=>r.digits))].sort(),removals,explanation:reason+' Usuń wyłącznie wskazanych kandydatów: '+removals.map(r=>`${label(r.cell)} → ${r.digits.join(', ')}`).join('; ')+'.'};}
function* deductions(notes){
 for(let i=0;i<81;i++)if(notes[i].length===1)yield {kind:'hint',technique:'Jedyny kandydat',sources:[i],targets:[],digits:notes[i],explanation:`Pole ${label(i)} ma tylko jednego dozwolonego kandydata: ${notes[i][0]}. Możesz wpisać tę cyfrę.`};
 for(const u of units)for(const n of all){const places=u.cells.filter(i=>notes[i].includes(n));if(places.length===1)yield {kind:'hint',technique:'Jedyne miejsce dla cyfry',sources:places,targets:[],digits:[n],explanation:`W ${u.name} cyfra ${n} może znaleźć się tylko w polu: ${label(places[0])}. Możesz wpisać tam ${n}.`};}
 for(const u of units)for(const n of all){const places=u.cells.filter(i=>notes[i].includes(n));if(places.length<2)continue;for(const v of units){if(u===v||!places.every(i=>v.cells.includes(i)))continue;const removals=v.cells.filter(i=>!u.cells.includes(i)&&notes[i].includes(n)).map(cell=>({cell,digits:[n]}));if(removals.length)yield elimination('Zablokowani kandydaci',places,removals,`W ${u.name} wszystkie miejsca dla cyfry ${n} leżą także w ${v.name}.`);}}
 // Ranked subsets: pairs before triples, naked before hidden at each size.
 for(const size of [2,3]){
  for(const u of units)for(const cells of combinations(u.cells.filter(i=>notes[i].length>=2&&notes[i].length<=size),size)){
   const digits=[...new Set(cells.flatMap(i=>notes[i]))];if(digits.length!==size)continue;
   const removals=u.cells.filter(i=>!cells.includes(i)).map(cell=>({cell,digits:notes[cell].filter(n=>digits.includes(n))})).filter(r=>r.digits.length);
   if(removals.length)yield elimination(size===2?'Naga para':'Naga trójka',cells,removals,`W ${u.name} pola ${cells.map(label).join('; ')} zawierają łącznie tylko cyfry ${digits.join(', ')}. Te cyfry muszą zająć te pola.`);
  }
  for(const u of units)for(const digits of combinations(all.filter(n=>u.cells.some(i=>notes[i].includes(n))),size)){
   const cells=u.cells.filter(i=>notes[i].some(n=>digits.includes(n)));if(cells.length!==size)continue;
   const removals=cells.map(cell=>({cell,digits:notes[cell].filter(n=>!digits.includes(n))})).filter(r=>r.digits.length);
   if(removals.length)yield elimination(size===2?'Ukryta para':'Ukryta trójka',cells,removals,`W ${u.name} cyfry ${digits.join(', ')} występują wyłącznie w polach ${cells.map(label).join('; ')}. Pozostaw w tych polach tylko te cyfry.`);
  }
 }
 // X-Wing: two rows sharing exactly two columns, or the transposed pattern.
 for(const transpose of [false,true])for(const n of all){
  const cell=(a,b)=>transpose?b*9+a:a*9+b;
  const positions=Array.from({length:9},(_,a)=>Array.from({length:9},(_,b)=>b).filter(b=>notes[cell(a,b)].includes(n)));
  for(let a=0;a<8;a++)for(let b=a+1;b<9;b++){
   if(positions[a].length!==2||positions[a].join()!==positions[b].join())continue;
   const cross=positions[a],sources=[cell(a,cross[0]),cell(a,cross[1]),cell(b,cross[0]),cell(b,cross[1])],removals=[];
   for(let k=0;k<9;k++)if(k!==a&&k!==b)for(const c of cross)if(notes[cell(k,c)].includes(n))removals.push({cell:cell(k,c),digits:[n]});
   if(removals.length)yield elimination('X-Wing',sources,removals,`Dla cyfry ${n} ${transpose?'kolumny':'wiersze'} ${a+1} i ${b+1} mają dokładnie te same dwa miejsca: ${transpose?'wiersze':'kolumny'} ${cross.map(c=>c+1).join(' i ')}. Cyfra zajmie przeciwległe rogi prostokąta, więc odpada w pozostałych polach tych ${transpose?'wierszy':'kolumn'}.`);
  }
 }
}
function findHint(values,manualNotes){
 if(S.conflicts(values).some(Boolean))return {kind:'conflict',message:'Najpierw popraw powtarzające się liczby zaznaczone na czerwono.'};
 if(values.every(Boolean))return {kind:'complete',message:'Plansza jest wypełniona poprawnie. Sudoku ukończone!'};
 const notes=values.map((_,i)=>S.candidates(values,i));
 const invalid=()=>notes.some((a,i)=>!values[i]&&!a.length)||units.some(u=>all.some(n=>!u.cells.some(i=>values[i]===n||notes[i].includes(n))));
 const prior=new Set();
 // Replay only eliminations proved by our own rules AND already absent from the
 // user's notes. Arbitrary manual exclusions never become premises.
 for(let pass=0;pass<730;pass++){
  if(invalid())return {kind:'invalid',message:'W tej planszy brakuje możliwości dla co najmniej jednego pola lub cyfry. Sprawdź wpisane liczby.'};
  let progressed=false;
  for(const h of deductions(notes)){
   if(!h.removals)return {...h,explanation:(prior.size?'Po uwzględnieniu już wykonanych, logicznie potwierdzonych eliminacji ('+[...prior].join(', ')+'): ':'')+h.explanation};
   const pending=h.removals.map(r=>({cell:r.cell,digits:r.digits.filter(n=>!manualNotes||manualNotes[r.cell]?.includes(n))})).filter(r=>r.digits.length);
   if(pending.length){const result=elimination(h.technique,h.sources,pending,h.explanation.split(' Usuń wyłącznie')[0]);if(prior.size)result.explanation='Po uwzględnieniu już wykonanych, logicznie potwierdzonych eliminacji ('+[...prior].join(', ')+'): '+result.explanation;return result;}
   // An entirely blank notebook means "no notes", not a completed proof.
   if(!manualNotes?.some(a=>a.length))continue;
   for(const r of h.removals)notes[r.cell]=notes[r.cell].filter(n=>!r.digits.includes(n));
   prior.add(h.technique);progressed=true;break;
  }
  if(!progressed)break;
 }
 return {kind:'none',message:'Nie znalazłem nowego ruchu wśród dostępnych technik: jedyny kandydat, jedyne miejsce, zablokowani kandydaci, nagie i ukryte pary oraz trójki, X-Wing. Wykonane eliminacje są pomijane. Przy pustych notatkach oblicz kandydatów. Plansza może wymagać jeszcze trudniejszej techniki.'};
}
const api={findHint,deductions};root.SudokuHints=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
