const {test}=require('node:test'),assert=require('node:assert/strict'),S=require('../dist/logic.js'),H=require('../dist/hints.js');
const full=()=>Array.from({length:81},()=>[1,2,3,4,5,6,7,8,9]);
function find(n,name){for(const h of H.deductions(n))if(h.technique===name)return h;}
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
test('every supported technique has a non-spoiling guide',()=>{for(const name of ['Naga czwórka','Ukryta czwórka','XY-Wing','XYZ-Wing','W-Wing','Swordfish','Jellyfish'])assert(H.guides[name]?.length>30,name);});
test('advanced deductions never remove the reference solution under permuted digit labels',()=>{
 let seed=54875;const rnd=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};const base=[...'534678912672195348198342567859761423426853791713924856961537284287419635345286179'].map(Number);
 for(let t=0;t<50;t++){
  const order=[1,2,3,4,5,6,7,8,9];for(let i=8;i>0;i--){const j=Math.floor(rnd()*(i+1));[order[i],order[j]]=[order[j],order[i]];}
  const solved=base.map(v=>order[v-1]),values=solved.map(v=>rnd()<.3?v:0),n=values.map((_,i)=>S.candidates(values,i));
  for(const h of H.deductions(n)){if(h.removals){for(const r of h.removals)assert(!r.digits.includes(solved[r.cell]),h.technique);}else assert.equal(h.digits[0],solved[h.sources[0]]);}
 }
});
