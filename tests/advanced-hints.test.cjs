const {test}=require('node:test'),assert=require('node:assert/strict'),S=require('../dist/logic.js'),H=require('../dist/hints.js');
const full=()=>Array.from({length:81},()=>[1,2,3,4,5,6,7,8,9]);
function find(n,name,options){for(const h of H.deductions(n,options))if(h.technique===name)return h;}
function contains(h,cell,digit){return h?.removals.some(r=>r.cell===cell&&r.digits.includes(digit));}
test('naked quad supports four different subsets',()=>{const n=full();n[0]=[1,2];n[1]=[2,3];n[2]=[3,4];n[3]=[1,4];const h=find(n,'Naga czwórka');assert.deepEqual(h.sources,[0,1,2,3]);assert(contains(h,4,4));assert(!contains(h,4,5));});
test('hidden quad removes extras within its four cells',()=>{const n=full();for(let i=4;i<9;i++)n[i]=[5,6,7,8,9];const h=find(n,'Ukryta czwórka');assert.deepEqual(h.sources,[0,1,2,3]);assert(contains(h,0,9));assert(!contains(h,0,1));});
for(const size of [3,4])for(const transpose of [false,true])test(`${size===3?'Swordfish':'Jellyfish'} ${transpose?'columns':'rows'}`,()=>{
 const n=full(),cell=(a,b)=>transpose?b*9+a:a*9+b,bases=size===3?[0,3,6]:[0,2,4,6],covers=size===3?[1,4,7]:[0,2,5,8];
 for(let k=0;k<size;k++){const allowed=[covers[k],covers[(k+1)%size]];for(let j=0;j<9;j++)if(!allowed.includes(j))n[cell(bases[k],j)]=n[cell(bases[k],j)].filter(v=>v!==5);}
 const h=find(n,size===3?'Swordfish':'Jellyfish');assert(h);assert.equal(h.sources.length,size*2);assert(h.targets.every(i=>covers.includes(transpose?Math.floor(i/9):i%9)));assert(h.removals.every(r=>r.digits.join()==='5'));
});
test('XY-Wing eliminates from common wing peers',()=>{const n=full();n[0]=[1,2];n[3]=[1,3];n[27]=[2,3];const h=find(n,'XY-Wing');assert(contains(h,30,3));assert(!contains(h,40,3));});
test('XYZ-Wing needs visibility of all three source cells',()=>{const n=full();n[0]=[1,2,3];n[1]=[1,3];n[9]=[2,3];const h=find(n,'XYZ-Wing');assert(contains(h,10,3));assert(!contains(h,28,3));});
test('W-Wing requires a conjugate link between the identical pairs',()=>{const n=full();n[0]=[1,2];n[40]=[1,2];for(let i=18;i<27;i++)if(![18,22].includes(i))n[i]=n[i].filter(v=>v!==1);const h=find(n,'W-Wing');assert(contains(h,4,2));n[20].push(1);assert.equal(find(n,'W-Wing'),undefined);});
for(const type of [1,2,4])test(`Unique Rectangle ${type} is gated by verified uniqueness`,()=>{
 const n=full(),pair=[1,2];n[0]=[...pair];n[3]=[...pair];n[9]=type===1?[...pair]:[1,2,3];n[12]=[1,2,3];if(type===4){n[12]=[1,2,4];for(let i=9;i<18;i++)if(![9,12].includes(i))n[i]=n[i].filter(v=>v!==1);}
 const name='Unique Rectangle typ '+type;assert.equal(find(n,name),undefined);const h=find(n,name,{unique:true});assert(h);if(type===1){assert(contains(h,12,1));assert(contains(h,12,2));}if(type===2)assert(contains(h,10,3));if(type===4){assert(contains(h,9,2));assert(contains(h,12,2));}
});
function coloring(){const n=full();for(const row of [0,3])for(let c=0;c<9;c++)if(![0,3].includes(c))n[row*9+c]=n[row*9+c].filter(v=>v!==5);for(let r=0;r<9;r++)if(![0,3].includes(r))n[r*9+3]=n[r*9+3].filter(v=>v!==5);return n;}
test('simple coloring trap removes a candidate seeing opposite colors',()=>{assert(contains(find(coloring(),'Kolorowanie — pułapka'),9,5));});
test('X-Chain yields valid endpoint eliminations',()=>{assert(contains(find(coloring(),'X-Chain'),9,5));});
for(const name of ['XY-Chain','AIC'])test(name+' explains an alternating endpoint proof',()=>{const n=full();n[0]=[1,2];n[3]=[1,3];n[27]=[2,3];const h=find(n,name);assert(contains(h,30,3));assert(h.explanation.includes('silne połączenie'));});
test('solution count distinguishes unique, multiple, impossible and unfinished search',()=>{const v=[...'534678912672195348198342567859761423426853791713924856961537284287419635345286179'].map(Number);v[0]=0;const before=JSON.stringify(v);assert.deepEqual(S.solutionCount(v),{count:1,complete:true});assert.equal(JSON.stringify(v),before);assert.equal(S.solutionCount(Array(81).fill(0)).count,2);v[0]=3;assert.equal(S.solutionCount(v).count,0);assert.equal(S.solutionCount(Array(81).fill(0),2,0).complete,false);});
test('every supported technique has a non-spoiling guide',()=>{for(const name of ['Naga czwórka','Ukryta czwórka','XY-Wing','XYZ-Wing','W-Wing','Swordfish','Jellyfish','Unique Rectangle typ 1','Unique Rectangle typ 2','Unique Rectangle typ 4','Kolorowanie — pułapka','Kolorowanie — sprzeczność','X-Chain','XY-Chain','AIC'])assert(H.guides[name]?.length>30,name);});
test('simple coloring wrap removes the conflicting color group',()=>{const positions=[6,11,18,26,29,31,32,40,45,49,50,53,54,63,69,72,75],n=full();for(let i=0;i<81;i++)if(!positions.includes(i))n[i]=n[i].filter(v=>v!==5);const h=find(n,'Kolorowanie — sprzeczność');assert(h);assert(contains(h,6,5));assert(!contains(h,69,5));});
test('advanced deductions never remove the reference solution under permuted digit labels',()=>{
 let seed=54875;const rnd=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};const base=[...'534678912672195348198342567859761423426853791713924856961537284287419635345286179'].map(Number);
 for(let t=0;t<50;t++){
  const order=[1,2,3,4,5,6,7,8,9];for(let i=8;i>0;i--){const j=Math.floor(rnd()*(i+1));[order[i],order[j]]=[order[j],order[i]];}
  const solved=base.map(v=>order[v-1]),values=solved.map(v=>rnd()<.3?v:0),n=values.map((_,i)=>S.candidates(values,i));
  for(const h of H.deductions(n)){if(h.removals){for(const r of h.removals)assert(!r.digits.includes(solved[r.cell]),h.technique);}else assert.equal(h.digits[0],solved[h.sources[0]]);}
 }
});

test('all advanced rules including uniqueness preserve a unique reference solution after sound candidate reductions',()=>{
 const solved=[...'534678912672195348198342567859761423426853791713924856961537284287419635345286179'].map(Number),values=[...'530070000600195000098000060800060003400803001700020006060000280000419005000080079'].map(Number);assert.deepEqual(S.solutionCount(values),{count:1,complete:true});let seed=97531;const rnd=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 for(let trial=0;trial<20;trial++){const notes=values.map((_,i)=>S.candidates(values,i).filter(n=>n===solved[i]||rnd()>.4));for(const h of H.deductions(notes,{unique:true})){if(h.removals)for(const r of h.removals)assert(!r.digits.includes(solved[r.cell]),h.technique);else assert.equal(h.digits[0],solved[h.sources[0]]);}}
});

test('photographed puzzle has a Skyscraper on 6 with exactly the documented eliminations',()=>{
 const values=[...'030107400006000053000006000904000500200030009000040800020700080500928000000000060'].map(Number),notes=values.map((_,i)=>S.candidates(values,i));
 const h=find(notes,'Skyscraper');assert(h);assert.deepEqual(h.digits,[6]);assert.deepEqual(h.sources,[54,58,45,31]);assert.deepEqual(h.removals,[{cell:28,digits:[6]},{cell:48,digits:[6]}]);
 assert([...H.deductions(notes)].findIndex(x=>x.technique==='Skyscraper')<[...H.deductions(notes)].findIndex(x=>x.technique.startsWith('Kolorowanie')));
 for(const removal of h.removals){const v=[...values];v[removal.cell]=6;assert.equal(S.solutionCount(v).count,0);}
});
for(const transpose of [false,true])test('Skyscraper requires two conjugate pairs '+transpose,()=>{
 const n=full(),cell=(r,c)=>transpose?c*9+r:r*9+c;
 for(const [r,cols]of [[0,[0,3]],[4,[0,4]]])for(let c=0;c<9;c++)if(!cols.includes(c))n[cell(r,c)]=n[cell(r,c)].filter(v=>v!==6);
 const h=find(n,'Skyscraper');assert(contains(h,cell(1,4),6));assert(contains(h,cell(3,3),6));assert(!h.targets.some(i=>h.sources.includes(i)));
 n[cell(0,8)].push(6);assert.equal(find(n,'Skyscraper'),undefined);
});
test('coloring deductions expose their two opposite groups',()=>{
 const values=[...'030107400006000053000006000904000500200030009000040800020700080500928000000000060'].map(Number),notes=values.map((_,i)=>S.candidates(values,i));
 const hints=[...H.deductions(notes)].filter(h=>h.technique.startsWith('Kolorowanie'));assert(hints.length);
 for(const h of hints){assert.equal(h.groups.length,2);assert.deepEqual([...h.groups.flat()].sort((a,b)=>a-b),[...h.sources].sort((a,b)=>a-b));assert.equal(h.coloringDigit,h.digits[0]);assert(h.groups.every(g=>g.length));}
});

test('findHint keeps coloring groups after replaying already completed eliminations',()=>{
 const state=require('./fixtures/coloring-state.json'),h=H.findHint(state.values,state.notes);assert.equal(h.technique,'Kolorowanie — pułapka');assert.deepEqual(h.groups,[[6,74,70],[78,63]]);assert.equal(h.coloringDigit,4);assert.deepEqual(h.removals,[{cell:0,digits:[4]}]);
});
