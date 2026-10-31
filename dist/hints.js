(function(root){
'use strict';
const S=root.Sudoku||(typeof require==='function'?require('./logic.js'):null);
const units=[];
for(let r=0;r<9;r++)units.push({name:`wierszu ${r+1}`,cells:Array.from({length:9},(_,c)=>r*9+c)});
for(let c=0;c<9;c++)units.push({name:`kolumnie ${c+1}`,cells:Array.from({length:9},(_,r)=>r*9+c)});
for(let b=0;b<9;b++)units.push({name:`kwadracie ${b+1}`,cells:Array.from({length:9},(_,j)=>(Math.floor(b/3)*3+Math.floor(j/3))*9+b%3*3+j%3)});
const label=i=>`wiersz ${Math.floor(i/9)+1}, kolumna ${i%9+1}`;
const all=[1,2,3,4,5,6,7,8,9];
const allCells=Array.from({length:81},(_,i)=>i);
function* combinations(items,n,start=0,prefix=[]){if(!n){yield prefix;return;}for(let i=start;i<=items.length-n;i++)yield* combinations(items,n-1,i+1,[...prefix,items[i]]);}
function elimination(technique,sources,removals,reason){return {kind:'hint',technique,sources,targets:removals.map(r=>r.cell),digits:[...new Set(removals.flatMap(r=>r.digits))].sort(),removals,explanation:reason+' Usuń wyłącznie wskazanych kandydatów: '+removals.map(r=>`${label(r.cell)} → ${r.digits.join(', ')}`).join('; ')+'.'};}
function* deductions(notes){
 for(let i=0;i<81;i++)if(notes[i].length===1)yield {kind:'hint',technique:'Jedyny kandydat',sources:[i],targets:[],digits:notes[i],explanation:`Pole ${label(i)} ma tylko jednego dozwolonego kandydata: ${notes[i][0]}. Możesz wpisać tę cyfrę.`};
 for(const u of units)for(const n of all){const places=u.cells.filter(i=>notes[i].includes(n));if(places.length===1)yield {kind:'hint',technique:'Jedyne miejsce dla cyfry',sources:places,targets:[],digits:[n],explanation:`W ${u.name} cyfra ${n} może znaleźć się tylko w polu: ${label(places[0])}. Możesz wpisać tam ${n}.`};}
 for(const u of units)for(const n of all){const places=u.cells.filter(i=>notes[i].includes(n));if(places.length<2)continue;for(const v of units){if(u===v||!places.every(i=>v.cells.includes(i)))continue;const removals=v.cells.filter(i=>!u.cells.includes(i)&&notes[i].includes(n)).map(cell=>({cell,digits:[n]}));if(removals.length)yield elimination('Zablokowani kandydaci',places,removals,`W ${u.name} wszystkie miejsca dla cyfry ${n} leżą także w ${v.name}.`);}}
 // Ranked subsets: pairs before triples, naked before hidden at each size.
 for(const size of [2,3,4]){
  for(const u of units)for(const cells of combinations(u.cells.filter(i=>notes[i].length>=2&&notes[i].length<=size),size)){
   const digits=[...new Set(cells.flatMap(i=>notes[i]))];if(digits.length!==size)continue;
   const removals=u.cells.filter(i=>!cells.includes(i)).map(cell=>({cell,digits:notes[cell].filter(n=>digits.includes(n))})).filter(r=>r.digits.length);
   if(removals.length)yield elimination(size===2?'Naga para':size===3?'Naga trójka':'Naga czwórka',cells,removals,`W ${u.name} pola ${cells.map(label).join('; ')} zawierają łącznie tylko cyfry ${digits.join(', ')}. Te cyfry muszą zająć te pola.`);
  }
  for(const u of units)for(const digits of combinations(all.filter(n=>u.cells.some(i=>notes[i].includes(n))),size)){
   const cells=u.cells.filter(i=>notes[i].some(n=>digits.includes(n)));if(cells.length!==size)continue;
   const removals=cells.map(cell=>({cell,digits:notes[cell].filter(n=>!digits.includes(n))})).filter(r=>r.digits.length);
   if(removals.length)yield elimination(size===2?'Ukryta para':size===3?'Ukryta trójka':'Ukryta czwórka',cells,removals,`W ${u.name} cyfry ${digits.join(', ')} występują wyłącznie w polach ${cells.map(label).join('; ')}. Pozostaw w tych polach tylko te cyfry.`);
  }
 }
 yield* fishDeductions(notes,2);
 yield* wingDeductions(notes);
 yield* fishDeductions(notes,3);
 yield* fishDeductions(notes,4);

}
function* fishDeductions(notes,size){
 const name={2:'X-Wing',3:'Swordfish',4:'Jellyfish'}[size];
 for(const transpose of [false,true])for(const n of all){
  const cell=(a,b)=>transpose?b*9+a:a*9+b;
  const positions=Array.from({length:9},(_,a)=>all.map(v=>v-1).filter(b=>notes[cell(a,b)].includes(n)));
  const eligible=all.map(v=>v-1).filter(a=>positions[a].length>=2&&positions[a].length<=size);
  for(const bases of combinations(eligible,size)){
   const cross=[...new Set(bases.flatMap(a=>positions[a]))].sort((a,b)=>a-b);if(cross.length!==size)continue;
   const sources=bases.flatMap(a=>positions[a].map(b=>cell(a,b))),removals=[];
   for(let a=0;a<9;a++)if(!bases.includes(a))for(const b of cross)if(notes[cell(a,b)].includes(n))removals.push({cell:cell(a,b),digits:[n]});
   if(removals.length)yield elimination(name,sources,removals,`Cyfra ${n}: w ${transpose?'kolumnach':'wierszach'} ${bases.map(v=>v+1).join(', ')} wszystkie możliwości mieszczą się w ${size} ${transpose?'wierszach':'kolumnach'}: ${cross.map(v=>v+1).join(', ')}. Każda z tych linii musi pomieścić tę cyfrę, więc zajmuje ona wszystkie linie poprzeczne.`);
  }
 }
}
function* wingDeductions(notes){
 const bi=allCells.filter(i=>notes[i].length===2);
 for(const pivot of allCells.filter(i=>notes[i].length===2||notes[i].length===3)){
  const pincers=bi.filter(i=>S.peers(pivot,i));
  for(const [a,b]of combinations(pincers,2)){
   const common=notes[a].filter(n=>notes[b].includes(n));if(common.length!==1)continue;const z=common[0],x=notes[a].find(n=>n!==z),y=notes[b].find(n=>n!==z);if(x===y)continue;
   const xyz=notes[pivot].length===3;if(xyz?![x,y,z].every(n=>notes[pivot].includes(n)):!(notes[pivot].includes(x)&&notes[pivot].includes(y)))continue;
   const sources=[pivot,a,b],removals=allCells.filter(i=>!sources.includes(i)&&notes[i].includes(z)&&S.peers(i,a)&&S.peers(i,b)&&(!xyz||S.peers(i,pivot))).map(cell=>({cell,digits:[z]}));
   if(removals.length)yield elimination(xyz?'XYZ-Wing':'XY-Wing',sources,removals,`Pole centralne ${label(pivot)} ma kandydatów ${notes[pivot].join(', ')}, a skrzydła ${label(a)} i ${label(b)} pary ${notes[a].join('/')} oraz ${notes[b].join('/')}. Niezależnie od wyboru w centrum cyfra ${z} wystąpi w jednym z ${xyz?'tych trzech pól':'dwóch skrzydeł'}.`);
  }
 }
 for(const [a,b]of combinations(bi,2)){
  if(S.peers(a,b)||notes[a].join()!==notes[b].join())continue;
  for(const linked of notes[a])for(const u of units){
   const ends=u.cells.filter(i=>notes[i].includes(linked));if(ends.length!==2||ends.includes(a)||ends.includes(b))continue;
   if(!((S.peers(a,ends[0])&&S.peers(b,ends[1]))||(S.peers(a,ends[1])&&S.peers(b,ends[0]))))continue;
   const z=notes[a].find(n=>n!==linked),sources=[a,b,...ends],removals=allCells.filter(i=>!sources.includes(i)&&notes[i].includes(z)&&S.peers(i,a)&&S.peers(i,b)).map(cell=>({cell,digits:[z]}));
   if(removals.length)yield elimination('W-Wing',sources,removals,`Pola ${label(a)} i ${label(b)} mają parę ${notes[a].join('/')}. Silne połączenie cyfry ${linked} w ${u.name} (${ends.map(label).join('; ')}) wymusza cyfrę ${z} w co najmniej jednym z tych dwóch pól.`);
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
 return {kind:'none',message:'Nie znalazłem nowego ruchu wśród dostępnych technik: jedyny kandydat, jedyne miejsce, zablokowani kandydaci, nagie i ukryte pary, trójki i czwórki, X-Wing, XY-Wing, XYZ-Wing, W-Wing, Swordfish, Jellyfish. Wykonane eliminacje są pomijane. Przy pustych notatkach oblicz kandydatów. Plansza może wymagać jeszcze trudniejszej techniki.'};
}
const guides={
 'Naga czwórka':'Cztery pola w jednej jednostce mają łącznie tylko cztery różne cyfry. Zajmą one te pola, więc można usunąć je z pozostałych pól jednostki.',
 'Ukryta czwórka':'Cztery cyfry występują wyłącznie w czterech polach jednostki. Usuń z tych czterech pól pozostałych kandydatów.',
 'XY-Wing':'Centrum ma parę XY, a dwa widzące je skrzydła pary XZ i YZ. Bez względu na cyfrę centrum jedno skrzydło ma Z, więc usuń Z z pól widzących oba skrzydła.',
 'XYZ-Wing':'Centrum ma XYZ, a widzące je skrzydła XZ i YZ. Usuń Z tylko z pól widzących wszystkie trzy pola: centrum i oba skrzydła.',
 'W-Wing':'Dwa pola z taką samą parą kandydatów są połączone silnym połączeniem jednej cyfry: w jednostce są dla niej tylko dwa miejsca. Jeden koniec widzi pierwszą parę, drugi drugą. Druga cyfra pary musi wystąpić w co najmniej jednym z tych pól; usuń ją ze wspólnych sąsiadów.',
 'Swordfish':'W trzech wierszach wszystkie miejsca dla jednej cyfry mieszczą się w tych samych trzech kolumnach. Usuń tę cyfrę z innych pól tych kolumn. Działa też z zamienionymi wierszami i kolumnami.',
 'Jellyfish':'W czterech wierszach wszystkie miejsca dla jednej cyfry mieszczą się w tych samych czterech kolumnach. Usuń tę cyfrę z innych pól tych kolumn. Działa też z zamienionymi wierszami i kolumnami.',
 'Jedyny kandydat':'W pustym polu zostaje tylko jedna możliwa cyfra po wykluczeniu liczb obecnych w jego wierszu, kolumnie i kwadracie. Można wpisać tę cyfrę.',
 'Jedyne miejsce dla cyfry':'W wierszu, kolumnie lub kwadracie dana cyfra może trafić tylko do jednego pola. Nawet jeśli to pole ma kilku kandydatów, tę cyfrę można w nim wpisać.',
 'Zablokowani kandydaci':'Jeśli wszystkie miejsca dla cyfry w kwadracie leżą w jednym wierszu lub kolumnie, usuń ją z pozostałych pól tego wiersza lub kolumny poza kwadratem. Działa też odwrotnie: jeśli wszystkie miejsca dla cyfry w wierszu lub kolumnie leżą w jednym kwadracie, usuń ją z pozostałych pól tego kwadratu.',
 'Naga para':'Dwa pola w tym samym wierszu, kolumnie lub kwadracie mają dokładnie tych samych dwóch kandydatów. Te cyfry zajmą te dwa pola, więc można usunąć je z kandydatów w pozostałych polach tej jednostki.',
 'Ukryta para':'Dwie cyfry mogą wystąpić wyłącznie w tych samych dwóch polach wiersza, kolumny lub kwadratu. Te pola są dla nich zarezerwowane, więc można usunąć z nich wszystkich pozostałych kandydatów.',
 'Naga trójka':'Trzy pola w jednym wierszu, kolumnie lub kwadracie zawierają łącznie tylko trzy różne cyfry. Każde pole może mieć dwóch lub trzech kandydatów. Te cyfry zajmą te trzy pola, więc usuń je z pozostałych pól tej jednostki.',
 'Ukryta trójka':'Trzy cyfry mogą występować tylko w tych samych trzech polach wiersza, kolumny lub kwadratu. Można usunąć z tych pól pozostałych kandydatów. Nie każda z tych trzech cyfr musi występować w każdym z trzech pól.',
 'X-Wing':'W dwóch wierszach dana cyfra ma dokładnie po dwa możliwe miejsca, w tych samych dwóch kolumnach. Powstaje prostokąt: cyfra musi zająć przeciwległe rogi, więc usuń ją z pozostałych pól obu kolumn. Reguła działa też po zamianie wierszy z kolumnami.'
};
const api={findHint,deductions,guides};root.SudokuHints=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
