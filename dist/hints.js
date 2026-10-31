(function(root){
'use strict';
const S=root.Sudoku||(typeof require==='function'?require('./logic.js'):null);
const units=[];
for(let r=0;r<9;r++)units.push({name:`wierszu ${r+1}`,cells:Array.from({length:9},(_,c)=>r*9+c)});
for(let c=0;c<9;c++)units.push({name:`kolumnie ${c+1}`,cells:Array.from({length:9},(_,r)=>r*9+c)});
for(let b=0;b<9;b++)units.push({name:`kwadracie ${b+1}`,cells:Array.from({length:9},(_,j)=>(Math.floor(b/3)*3+Math.floor(j/3))*9+b%3*3+j%3)});
const label=i=>`wiersz ${Math.floor(i/9)+1}, kolumna ${i%9+1}`;
function findHint(values){
 const bad=S.conflicts(values);if(bad.some(Boolean))return {kind:'conflict',message:'Najpierw popraw powtarzające się liczby zaznaczone na czerwono.'};
 if(values.every(Boolean))return {kind:'complete',message:'Plansza jest wypełniona poprawnie. Sudoku ukończone!'};
 const notes=values.map((_,i)=>S.candidates(values,i));
 if(notes.some((a,i)=>!values[i]&&!a.length)||units.some(u=>[1,2,3,4,5,6,7,8,9].some(n=>!u.cells.some(i=>values[i]===n||notes[i].includes(n)))))return {kind:'invalid',message:'W tej planszy brakuje możliwości dla co najmniej jednego pola lub cyfry. Sprawdź wpisane liczby.'};
 const result=(technique,sources,targets,digits,explanation)=>({kind:'hint',technique,sources,targets,digits,explanation});
 for(let i=0;i<81;i++)if(notes[i].length===1)return result('Jedyny kandydat',[i],[],notes[i],`Pole ${label(i)} ma tylko jednego dozwolonego kandydata: ${notes[i][0]}. Możesz wpisać tę cyfrę.`);
 for(const u of units)for(let n=1;n<=9;n++){const places=u.cells.filter(i=>notes[i].includes(n));if(places.length===1)return result('Jedyne miejsce dla cyfry',places,[],[n],`W ${u.name} cyfra ${n} może znaleźć się tylko w polu: ${label(places[0])}. Możesz wpisać tam ${n}.`);}
 // An intersection of a line and box confines a digit, eliminating it outside.
 for(const u of units)for(let n=1;n<=9;n++){
  const places=u.cells.filter(i=>notes[i].includes(n));if(places.length<2)continue;
  for(const v of units){if(u===v||!places.every(i=>v.cells.includes(i)))continue;
   const targets=v.cells.filter(i=>!u.cells.includes(i)&&notes[i].includes(n));if(targets.length)return result('Zablokowani kandydaci',places,targets,[n],`W ${u.name} wszystkie miejsca dla cyfry ${n} leżą także w ${v.name}. Usuń kandydata ${n} z pól oznaczonych obwódką: ${targets.map(label).join('; ')}.`);
  }
 }
 for(const u of units){
  const pairs=u.cells.filter(i=>notes[i].length===2);
  for(let a=0;a<pairs.length;a++)for(let b=a+1;b<pairs.length;b++){
   const x=pairs[a],y=pairs[b],digits=notes[x];if(digits.join()!==notes[y].join())continue;
   const targets=u.cells.filter(i=>i!==x&&i!==y&&notes[i].some(n=>digits.includes(n)));
   if(targets.length)return result('Naga para',[x,y],targets,digits,`W ${u.name} pola ${label(x)} oraz ${label(y)} mają wyłącznie kandydatów ${digits.join(' i ')}. Te dwie cyfry zajmą te dwa pola, więc usuń je z kandydatów w pozostałych oznaczonych polach: ${targets.map(label).join('; ')}. Usuwaj tylko kandydatów z tej pary, którzy są w danym polu.`);
  }
 }
 return {kind:'none',message:'Nie znalazłem ruchu wśród dostępnych technik: jedyny kandydat, jedyne miejsce, zablokowani kandydaci i naga para. To nie oznacza, że plansza jest nierozwiązywalna — może wymagać trudniejszej techniki.'};
}
const api={findHint};root.SudokuHints=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
