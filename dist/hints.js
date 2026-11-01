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
function* deductions(notes,options={}){
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
 if(options.unique===true||options.isUnique?.())yield* rectangleDeductions(notes);
 yield* coloringDeductions(notes);
 yield* chainDeductions(notes,'X-Chain');
 yield* chainDeductions(notes,'XY-Chain');
 yield* chainDeductions(notes,'AIC');
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

function* rectangleDeductions(notes){
 for(const [r1,r2]of combinations(all.map(n=>n-1),2))for(const [c1,c2]of combinations(all.map(n=>n-1),2)){
  const corners=[r1*9+c1,r1*9+c2,r2*9+c1,r2*9+c2];
  if(new Set(corners.map(i=>Math.floor(i/27)*3+Math.floor(i%9/3))).size!==2||corners.some(i=>notes[i].length<2))continue;
  for(const digits of combinations(notes[corners[0]],2)){
   if(!corners.every(i=>digits.every(n=>notes[i].includes(n))))continue;
   const floors=corners.filter(i=>notes[i].length===2),roofs=corners.filter(i=>notes[i].length>2);
   if(floors.length===3){const cell=roofs[0];yield elimination('Unique Rectangle typ 1',corners,[{cell,digits}],`Potwierdzono jedno rozwiązanie planszy. Trzy rogi prostokąta mają wyłącznie parę ${digits.join('/')}. Czwarty róg (${label(cell)}) nie może mieć tej samej pary, bo powstałyby dwa rozwiązania.`);}
   if(floors.length!==2||roofs.length!==2||!S.peers(...roofs))continue;
   const extras=[...new Set(roofs.flatMap(i=>notes[i].filter(n=>!digits.includes(n))))];
   if(extras.length===1){const n=extras[0],removals=allCells.filter(i=>!corners.includes(i)&&notes[i].includes(n)&&roofs.every(r=>S.peers(i,r))).map(cell=>({cell,digits:[n]}));if(removals.length)yield elimination('Unique Rectangle typ 2',corners,removals,`Potwierdzono jedno rozwiązanie. Dwa dodatkowe rogi (${roofs.map(label).join('; ')}) mają oprócz pary ${digits.join('/')} tylko cyfrę ${n}. Co najmniej jeden z nich musi mieć tę dodatkową cyfrę.`);}
   for(const u of units.filter(u=>roofs.every(i=>u.cells.includes(i))))for(const strong of digits){const places=u.cells.filter(i=>notes[i].includes(strong));if(places.length!==2||!roofs.every(i=>places.includes(i)))continue;const removed=digits.find(n=>n!==strong);yield elimination('Unique Rectangle typ 4',corners,roofs.map(cell=>({cell,digits:[removed]})),`Potwierdzono jedno rozwiązanie. Cyfra ${strong} w ${u.name} ma tylko dwa miejsca: dodatkowe rogi prostokąta. Drugą cyfrę pary (${removed}) trzeba z tych rogów wykluczyć, aby uniknąć dwóch rozwiązań.`);}
  }
 }
}
function strongDigitGraph(notes,n){const graph=Array.from({length:81},()=>new Set());for(const u of units){const p=u.cells.filter(i=>notes[i].includes(n));if(p.length===2){graph[p[0]].add(p[1]);graph[p[1]].add(p[0]);}}return graph;}
function* coloringDeductions(notes){
 for(const n of all){const graph=strongDigitGraph(notes,n),seen=new Set();
  for(const root of allCells){if(!graph[root].size||seen.has(root))continue;const color=new Map([[root,0]]),queue=[root];let valid=true;
   for(let k=0;k<queue.length;k++){const a=queue[k];seen.add(a);for(const b of graph[a]){if(!color.has(b)){color.set(b,1-color.get(a));queue.push(b);}else if(color.get(b)===color.get(a))valid=false;}}
   if(!valid)continue;const groups=[queue.filter(i=>color.get(i)===0),queue.filter(i=>color.get(i)===1)];
   for(const group of groups)if(group.some((a,k)=>group.slice(k+1).some(b=>S.peers(a,b))))yield elimination('Kolorowanie — sprzeczność',queue,group.map(cell=>({cell,digits:[n]})),`Silne połączenia cyfry ${n} tworzą dwie przeciwne grupy: [${groups[0].map(label).join('; ')}] i [${groups[1].map(label).join('; ')}]. Dwa pola jednej grupy widzą się wzajemnie, więc cała ta grupa musi być fałszywa.`);
   const removals=allCells.filter(i=>!color.has(i)&&notes[i].includes(n)&&groups.every(g=>g.some(a=>S.peers(i,a)))).map(cell=>({cell,digits:[n]}));
   if(removals.length)yield elimination('Kolorowanie — pułapka',queue,removals,`Silne połączenia cyfry ${n} tworzą przeciwne grupy: [${groups[0].map(label).join('; ')}] i [${groups[1].map(label).join('; ')}]. Pola docelowe widzą obie grupy. Jedna grupa musi być prawdziwa, więc cyfra odpada z tych pól.`);
  }
 }
}
function* chainDeductions(notes,technique){
 const node=(i,n)=>i*9+n-1,cell=id=>Math.floor(id/9),digit=id=>id%9+1;
 const ids=allCells.flatMap(i=>notes[i].map(n=>node(i,n))),weak=new Map(ids.map(id=>[id,new Set()])),strong=new Map(ids.map(id=>[id,new Set()]));
 function edge(graph,a,b){graph.get(a).add(b);graph.get(b).add(a);}
 for(const i of allCells)for(const [a,b]of combinations(notes[i],2)){if(technique!=='X-Chain'){edge(weak,node(i,a),node(i,b));if(notes[i].length===2)edge(strong,node(i,a),node(i,b));}}
 for(const n of all){const positions=allCells.filter(i=>notes[i].includes(n));for(const [a,b]of combinations(positions,2))if(S.peers(a,b))edge(weak,node(a,n),node(b,n));if(technique!=='XY-Chain')for(const u of units){const p=u.cells.filter(i=>notes[i].includes(n));if(p.length===2)edge(strong,node(p[0],n),node(p[1],n));}}
 // Bounded alternating inference chains, at most 11 links; no grouped nodes.
 for(const start of ids){if(!strong.get(start).size)continue;const queue=[{id:start,truth:false,path:[start]}],visited=new Set([start*2]);let emitted=false;
  for(let k=0;k<queue.length&&!emitted;k++){
   const current=queue[k];if(current.path.length>12)continue;
   if(current.truth&&current.id!==start&&current.path.length>=4&&(technique!=='XY-Chain'||digit(current.id)===digit(start))){
    const pathCells=[...new Set(current.path.map(cell))];const removals=[];
    for(const target of weak.get(start))if(weak.get(current.id).has(target)&&!pathCells.includes(cell(target))){const existing=removals.find(r=>r.cell===cell(target));if(existing)existing.digits.push(digit(target));else removals.push({cell:cell(target),digits:[digit(target)]});}
    if(removals.length){const chain=current.path.map((id,j)=>`${j?j%2?' = ':' — ':''}${label(cell(id))} (${digit(id)})`).join('');yield elimination(technique,pathCells,removals,`Łańcuch: ${chain}. Znak = oznacza silne połączenie, — słabe. Jeśli pierwszy kandydat jest fałszywy, ostatni jest prawdziwy. Każdy kandydat widzący oba końce musi więc odpaść.`);emitted=true;break;}
   }
   if(current.path.length>=12)continue;
   const nextEdges=current.truth?weak.get(current.id):strong.get(current.id);
   for(const next of nextEdges){if(current.path.includes(next))continue;const truth=!current.truth,key=next*2+Number(truth);if(visited.has(key))continue;visited.add(key);queue.push({id:next,truth,path:[...current.path,next]});}
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
  for(const h of deductions(notes,{isUnique:()=>verifiedUnique(values)})){
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
 return {kind:'none',message:'Nie znalazłem nowego ruchu wśród dostępnych technik: jedyny kandydat, jedyne miejsce, zablokowani kandydaci, nagie i ukryte pary, trójki i czwórki, X-Wing, XY-Wing, XYZ-Wing, W-Wing, Swordfish, Jellyfish, Unique Rectangle (typy 1, 2, 4), kolorowanie oraz łańcuchy X/XY/AIC. Wykonane eliminacje są pomijane. Przy pustych notatkach oblicz kandydatów. Plansza może wymagać jeszcze trudniejszej techniki.'};
}
let uniqueKey='',uniqueResult=false;
function verifiedUnique(values){const key=values.join('');if(key!==uniqueKey){const result=S.solutionCount(values);uniqueResult=result.complete&&result.count===1;uniqueKey=key;}return uniqueResult;}
const guides={
  "Unique Rectangle typ 1": "Tylko dla planszy z potwierdzonym jednym rozwiązaniem: cztery rogi prostokąta w dwóch blokach nie mogą tworzyć tej samej dwucyfrowej pary. Jeśli trzy rogi są taką parą, usuń obie cyfry z czwartego.\n\nCztery narożniki muszą należeć do dwóch wierszy, dwóch kolumn i dokładnie dwóch bloków. Gdyby wszystkie używały wyłącznie tej samej pary, można byłoby zamienić cyfry miejscami w całym prostokącie bez naruszenia tych jednostek. Otrzymalibyśmy drugie rozwiązanie.\n\nPrzy potwierdzonym jednym rozwiązaniu czwarty róg musi więc wybrać cyfrę spoza pary. Usuń z niego obie cyfry pary, ale nie zgaduj, która z dodatkowych jest poprawna. Bez założenia jednoznaczności ten argument nie jest dozwolony.",
  "Unique Rectangle typ 2": "Dwa rogi prostokąta są tą samą parą, a dwa pozostałe mają dodatkowo tę samą trzecią cyfrę. Przy potwierdzonej jednoznaczności co najmniej jeden z dodatkowych rogów musi zawierać tę cyfrę. Usuń ją ze wspólnych sąsiadów tych rogów.\n\nDwa rogi z dodatkową cyfrą są w tej odmianie w jednej jednostce. Gdyby żaden nie wybrał dodatkowej cyfry, wszystkie cztery rogi korzystałyby tylko z pary i powstałby zamienny prostokąt z dwoma rozwiązaniami.\n\nPrzynajmniej jeden z tych dwóch rogów musi więc zawierać dodatkową cyfrę. Każde inne pole widzące oba rogi nie może jej zawierać, niezależnie od tego, który róg ją dostanie. Nie usuwaj jej z samych rogów.",
  "Unique Rectangle typ 4": "Przy potwierdzonej jednoznaczności: dwa rogi są parą, a pozostałe dwa są połączone silnym połączeniem jednej cyfry pary w jednostce. Usuń drugą cyfrę pary z tych dwóch dodatkowych rogów.\n\nDwa dodatkowe rogi dzielą jednostkę, w której jedna cyfra pary występuje jako kandydat tylko w tych rogach. Ta cyfra musi zająć jeden z nich. Gdyby drugi róg użył drugiej cyfry pary, pozostałe dwa rogi także zamknęłyby się w tej parze i można byłoby zamienić cały prostokąt.\n\nJednoznaczność wyklucza taki układ. Usuń drugą cyfrę pary z obu dodatkowych rogów. Silne połączenie dotyczy konkretnej jednostki — same obecne cyfry w dwóch rogach nie wystarczają.",
  "Kolorowanie — pułapka": "Połącz silne pary jednej cyfry i przypisz przeciwne grupy kolejnym końcom. Jedna grupa musi być prawdziwa. Kandydat poza łańcuchem, który widzi obie grupy, jest niemożliwy.\n\nDla jednej cyfry połącz pary, które są jej jedynymi dwoma miejscami w jednostce. Końce takiego połączenia mają przeciwne wartości logiczne: gdy jeden jest prawdziwy, drugi fałszywy. Idąc po połączeniach, otrzymujesz dwie naprzemienne grupy, a jedna z nich musi być prawdziwa.\n\nKandydat spoza tej sieci, który widzi przynajmniej jedno pole z każdej grupy, przegrywa w obu przypadkach. Usuń go, ale nie wybieraj na tej podstawie jednej grupy jako poprawnej. Kolor jest etykietą zależności, nie zgadywaną cyfrą.",
  "Kolorowanie — sprzeczność": "Pokoloruj naprzemiennie końce silnych połączeń jednej cyfry. Jeśli dwa pola tej samej grupy widzą się wzajemnie, wszystkie kandydaty tej grupy są fałszywe.\n\nW jednej spójnej sieci silnych połączeń cała grupa tego samego koloru ma tę samą wartość logiczną. Jeśli dwa jej pola współdzielą wiersz, kolumnę lub blok, nie mogą jednocześnie zawierać rozpatrywanej cyfry. Taka grupa nie może być prawdziwa.\n\nUsuń kandydatów tej cyfry ze wszystkich pól sprzecznej grupy, nie z obu grup naraz. Nie łącz kolorów z niezależnych sieci tak, jakby były jednym dowodem.",
  "X-Chain": "Łańcuch jednej cyfry przeplata silne i słabe połączenia, zaczynając i kończąc silnym. Co najmniej jeden z końców jest prawdziwy. Usuń tę cyfrę z pól widzących oba końce.\n\nSilne połączenie pozwala przejść od „ten kandydat jest fałszywy” do „następny jest prawdziwy”. Słabe pozwala przejść od „prawdziwy” do „następny fałszywy”. Naprzemienne użycie tych dwóch reguł buduje dowód dla jednej cyfry, bez zgadywania wartości całej planszy.\n\nZacznij myślowo od fałszywego pierwszego końca. Jeśli łańcuch kończy się prawdziwym drugim końcem, co najmniej jeden z końców musi być prawdziwy. Usuwasz cyfrę tylko z pól widzących oba końce, nie z każdego pola sąsiadującego z dowolnym fragmentem łańcucha.",
  "XY-Chain": "Łańcuch pól z dwiema cyframi wykorzystuje silną zależność wewnątrz pola i słabe połączenia tej samej cyfry między polami. Jeśli oba końce reprezentują tę samą cyfrę, usuń ją ze wspólnych sąsiadów.\n\nKażde używane pole ma dokładnie dwóch kandydatów: odrzucenie jednego wymusza drugiego. Między polami przechodzisz po tej samej cyfrze, której dwa widzące się pola nie mogą zawierać jednocześnie. W ten sposób wymuszenia przechodzą przez kolejne różne pary.\n\nOba końce muszą reprezentować tę samą cyfrę. Jeśli jej brak na pierwszym końcu wymusza ją na ostatnim, jest prawdziwa na co najmniej jednym z nich. Usuń ją z ich wspólnych sąsiadów; sama seria dowolnych pól z dwiema notatkami nie stanowi jeszcze poprawnego łańcucha.",
  "AIC": "Naprzemienny łańcuch wnioskowania łączy silne i słabe zależności między kandydatami. Gdy z fałszywości pierwszego wynika prawdziwość ostatniego, kandydat wykluczający oba końce musi być fałszywy. Ta wersja analizuje proste łańcuchy do 11 połączeń, bez grup i sieci.\n\nW tej aplikacji znak = oznacza silne połączenie: oba końce nie mogą być fałszywe. Znak — oznacza słabe: oba nie mogą być prawdziwe. Silne połączenie może wynikać z dwóch kandydatów w polu albo dwóch miejsc cyfry w jednostce. Łańcuch przeplata te zależności i zaczyna oraz kończy się silnym połączeniem.\n\nNie musisz rozstrzygać, który koniec jest prawdziwy. Wystarczy, że kandydat docelowy wyklucza oba: gdyby był prawdziwy, oba końce byłyby fałszywe, czemu przeczy łańcuch. W tej wersji analizowane są proste łańcuchy do 11 połączeń, bez grup i rozgałęzionych sieci.",
  "Naga czwórka": "Cztery pola w jednej jednostce mają łącznie tylko cztery różne cyfry. Zajmą one te pola, więc można usunąć je z pozostałych pól jednostki.\n\nZasada jest taka sama jak dla nagiej pary i trójki, ale obejmuje cztery pola. Listy mogą mieć różną długość; razem muszą zawierać dokładnie cztery cyfry. Cztery pola jednej jednostki potrzebują czterech różnych wartości, więc żadna z tych cyfr nie zostaje dla pozostałych pól.\n\nZwróć uwagę na kierunek eliminacji: cyfry czwórki usuwasz poza jej polami, we wspólnej jednostce. Nie próbujesz jeszcze rozstrzygać, która cyfra trafia do którego z czterech pól.",
  "Ukryta czwórka": "Cztery cyfry występują wyłącznie w czterech polach jednostki. Usuń z tych czterech pól pozostałych kandydatów.\n\nSkup się na czterech cyfrach i sprawdź wszystkie ich pozycje w jednej jednostce. Jeśli razem zajmują tylko cztery pola, te pola są w całości dla nich zarezerwowane. Rozbudowane listy notatek mogą ukrywać ten układ.\n\nCzyść same cztery pola z pozostałych cyfr. W przeciwieństwie do nagiej czwórki wybranych cyfr nie skreślasz tutaj z zewnętrznych pól — warunek już mówi, że nie mają tam swoich miejsc.",
  "XY-Wing": "Centrum ma parę XY, a dwa widzące je skrzydła pary XZ i YZ. Bez względu na cyfrę centrum jedno skrzydło ma Z, więc usuń Z z pól widzących oba skrzydła.\n\nLitery X, Y i Z oznaczają trzy różne cyfry. Centrum widzi oba skrzydła, czyli współdzieli z każdym wiersz, kolumnę lub blok; skrzydła nie muszą widzieć się wzajemnie. Gdy centrum przyjmie X, skrzydło XZ musi przyjąć Z. Gdy centrum przyjmie Y, skrzydło YZ musi przyjąć Z.\n\nW obu przypadkach jedno ze skrzydeł zawiera Z. Z można więc usunąć tylko z pól widzących oba skrzydła. Nie trzeba wiedzieć, które skrzydło ostatecznie przyjmie Z.",
  "XYZ-Wing": "Centrum ma XYZ, a widzące je skrzydła XZ i YZ. Usuń Z tylko z pól widzących wszystkie trzy pola: centrum i oba skrzydła.\n\nRozpatrz trzy możliwości centrum. Gdy wybierze Z, Z jest w centrum. Gdy wybierze X, skrzydło XZ zostaje z Z; gdy wybierze Y, skrzydło YZ zostaje z Z. Za każdym razem Z wystąpi w którymś z trzech pól.\n\nDlatego cel eliminacji musi widzieć nie tylko oba skrzydła, lecz także centrum. To ważna różnica względem XY-Wing: pole widzące same skrzydła nie zawsze pozwala usunąć Z.",
  "W-Wing": "Dwa pola z taką samą parą kandydatów są połączone silnym połączeniem jednej cyfry: w jednostce są dla niej tylko dwa miejsca. Jeden koniec widzi pierwszą parę, drugi drugą. Druga cyfra pary musi wystąpić w co najmniej jednym z tych pól; usuń ją ze wspólnych sąsiadów.\n\nSilne połączenie oznacza tutaj, że wybrana cyfra ma w jednej jednostce dokładnie dwa miejsca i jedno z nich musi być prawdziwe. Wyobraź sobie, że obie jednakowe pary wybierają cyfrę łączącą zamiast drugiej cyfry. Każda para wykluczy wtedy inny koniec silnego połączenia, więc nie zostanie żadne miejsce dla tej cyfry — sprzeczność.\n\nCo najmniej jedna para musi zatem użyć drugiej cyfry. Usuń tę drugą cyfrę ze wspólnych sąsiadów dwóch pól z parą, a nie automatycznie z otoczenia całego połączenia.",
  "Swordfish": "W trzech wierszach wszystkie miejsca dla jednej cyfry mieszczą się w tych samych trzech kolumnach. Usuń tę cyfrę z innych pól tych kolumn. Działa też z zamienionymi wierszami i kolumnami.\n\nWybierz jedną cyfrę. W trzech wybranych wierszach jej wszystkie pozycje muszą łącznie mieścić się w trzech kolumnach. Każdy z tych wierszy potrzebuje jednego wystąpienia cyfry, a żadna kolumna nie może dostać jej dwa razy. Trzy wystąpienia zajmą więc wszystkie trzy kolumny.\n\nSkreśl cyfrę z tych kolumn poza trzema wierszami tworzącymi układ. Nie jest wymagany pełny prostokąt ani taka sama liczba kandydatów w każdym wierszu. Ta aplikacja rozpoznaje podstawową odmianę bez płetw.",
  "Jellyfish": "W czterech wierszach wszystkie miejsca dla jednej cyfry mieszczą się w tych samych czterech kolumnach. Usuń tę cyfrę z innych pól tych kolumn. Działa też z zamienionymi wierszami i kolumnami.\n\nTu rozumowanie obejmuje cztery wiersze i cztery kolumny dla jednej cyfry. Wszystkie możliwości w wybranych wierszach muszą mieścić się w tych czterech kolumnach. Cztery wymagane wystąpienia nie mogą współdzielić kolumny, więc zajmą każdą z nich.\n\nEliminuj cyfrę w tych kolumnach poza wierszami źródłowymi. Liczy się wspólne ograniczenie wszystkich czterech wierszy, nie sam wizualny kształt rysunku. W tej aplikacji jest to podstawowa odmiana bez płetw; wiersze i kolumny można zamienić.",
  "Jedyny kandydat": "W pustym polu zostaje tylko jedna możliwa cyfra po wykluczeniu liczb obecnych w jego wierszu, kolumnie i kwadracie. Można wpisać tę cyfrę.\n\nSpójrz na jedno puste pole, a nie na całą linię. Zbierz cyfry już wpisane w jego wierszu, kolumnie i bloku. Każda z nich jest w tym polu zabroniona. Jeśli po wykluczeniu zostaje jedna możliwość, nie ma drugiego poprawnego wyboru.\n\nTo jest wpisanie liczby, nie eliminacja w innych polach. Sama pojedyncza ręczna notatka nie wystarczy do dowodu: kandydaci muszą wynikać z poprawnych ograniczeń planszy.",
  "Jedyne miejsce dla cyfry": "W wierszu, kolumnie lub kwadracie dana cyfra może trafić tylko do jednego pola. Nawet jeśli to pole ma kilku kandydatów, tę cyfrę można w nim wpisać.\n\nWybierz jedną cyfrę i jedną jednostkę, czyli wiersz, kolumnę albo blok. Sprawdź wszystkie puste pola tej jednostki. Cyfra musi wystąpić w niej dokładnie raz, więc jeśli pasuje tylko do jednego pola, właśnie tam jest jej miejsce.\n\nRóżnica względem jedynego kandydata: tutaj jedyna jest pozycja cyfry w jednostce, niekoniecznie lista kandydatów w samym polu. Pozostałe notatki w tym polu nie przeszkadzają we wpisaniu ustalonej cyfry.",
  "Zablokowani kandydaci": "Jeśli wszystkie miejsca dla cyfry w kwadracie leżą w jednym wierszu lub kolumnie, usuń ją z pozostałych pól tego wiersza lub kolumny poza kwadratem. Działa też odwrotnie: jeśli wszystkie miejsca dla cyfry w wierszu lub kolumnie leżą w jednym kwadracie, usuń ją z pozostałych pól tego kwadratu.\n\nKluczem jest przecięcie bloku z wierszem lub kolumną. Gdy wszystkie możliwości danej cyfry w bloku leżą na tej samej linii, nie trzeba wiedzieć, które pole ją zawiera. Wiadomo już, że linia będzie miała tę cyfrę wewnątrz bloku, więc poza nim nie może jej powtórzyć.\n\nW odwrotnym kierunku to wiersz lub kolumna ogranicza cyfrę do jednego bloku, a eliminacje dotyczą reszty tego bloku. Nie usuwaj kandydatów z pól tworzących samo przecięcie.",
  "Naga para": "Dwa pola w tym samym wierszu, kolumnie lub kwadracie mają dokładnie tych samych dwóch kandydatów. Te cyfry zajmą te dwa pola, więc można usunąć je z kandydatów w pozostałych polach tej jednostki.\n\nSzukaj dwóch pól z dokładnie tą samą parą, bez dodatkowych kandydatów. Nie musisz ustalać kolejności cyfr. Jedno pole zajmie jedną cyfrę, drugie pozostałą, więc obie są zarezerwowane dla tej pary pól.\n\nEliminacje wykonuj wyłącznie w jednostce wspólnej dla obu pól. Zachowaj obie cyfry w samej parze. Para, która nie usuwa niczego z innych pól, nie daje jeszcze nowego ruchu.",
  "Ukryta para": "Dwie cyfry mogą wystąpić wyłącznie w tych samych dwóch polach wiersza, kolumny lub kwadratu. Te pola są dla nich zarezerwowane, więc można usunąć z nich wszystkich pozostałych kandydatów.\n\nZamiast szukać krótkich list kandydatów, śledź pozycje dwóch cyfr w jednej jednostce. Jeśli obie mieszczą się tylko w tych samych dwóch polach, muszą wspólnie je zająć. Inne cyfry zapisane w tych polach są wtedy zbędne.\n\nTo odwrócenie nagiej pary: tutaj usuwasz inne cyfry z dwóch pól, a nie cyfry pary z pozostałych pól. Każda z dwóch wybranych cyfr musi mieć w jednostce co najmniej jedno możliwe miejsce.",
  "Naga trójka": "Trzy pola w jednym wierszu, kolumnie lub kwadracie zawierają łącznie tylko trzy różne cyfry. Każde pole może mieć dwóch lub trzech kandydatów. Te cyfry zajmą te trzy pola, więc usuń je z pozostałych pól tej jednostki.\n\nNie wymagaj identycznych trzech kandydatów w każdym polu. Trzy listy mogą być różne; ważne, by ich suma zawierała dokładnie trzy cyfry. Ponieważ trzy pola w jednej jednostce nie mogą powtarzać liczb, zużyją wszystkie trzy cyfry między sobą.\n\nSkreśl te cyfry wyłącznie w pozostałych polach wspólnej jednostki. Żadna dodatkowa, czwarta cyfra nie może występować w wybranych trzech polach — wtedy ta reguła nie działa.",
  "Ukryta trójka": "Trzy cyfry mogą występować tylko w tych samych trzech polach wiersza, kolumny lub kwadratu. Można usunąć z tych pól pozostałych kandydatów. Nie każda z tych trzech cyfr musi występować w każdym z trzech pól.\n\nZaznacz wszystkie miejsca trzech wybranych cyfr w jednej jednostce. Łącznie muszą mieścić się w trzech polach, choć poszczególna cyfra nie musi pojawiać się w każdym z nich. Te trzy cyfry muszą gdzieś wystąpić, więc zajmują cały zestaw trzech pól.\n\nUsuń z tych pól kandydatów spoza wybranej trójki. Nie usuwaj cyfr trójki tylko dlatego, że kolejność ich rozmieszczenia nie jest jeszcze znana.",
  "X-Wing": "W dwóch wierszach dana cyfra ma dokładnie po dwa możliwe miejsca, w tych samych dwóch kolumnach. Powstaje prostokąt: cyfra musi zająć przeciwległe rogi, więc usuń ją z pozostałych pól obu kolumn. Reguła działa też po zamianie wierszy z kolumnami.\n\nWybierz jedną cyfrę i znajdź dwa wiersze, w których ma ona po dwa miejsca. Obie pary muszą leżeć w tych samych kolumnach. Gdy w pierwszym wierszu wybierzesz jeden róg, drugi wiersz musi użyć przeciwnego rogu, bo kolumna nie może powtórzyć cyfry.\n\nNiezależnie od wyboru obie kolumny zostaną zajęte przez tę cyfrę w tych dwóch wierszach. Usuń ją z pozostałych pól obu kolumn, zachowując cztery rogi. Przy zamianie wierszy z kolumnami odwraca się też kierunek eliminacji."
};
const api={findHint,deductions,guides};root.SudokuHints=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
