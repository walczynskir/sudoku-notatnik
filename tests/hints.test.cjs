const {test}=require('node:test');const assert=require('node:assert/strict');const S=require('../dist/logic.js'),{findHint}=require('../dist/hints.js');
const solved=[...'534678912672195348198342567859761423426853791713924856961537284287419635345286179'].map(Number);
const fixtures=[
 ['Jedyny kandydat','534008010000000000090302000009001420020803001703004006000007004200010035000086109'],
 ['Jedyne miejsce dla cyfry','000670002002100008100040000809000000420000000003920050000000004000010635005006000'],
 ['Zablokowani kandydaci','000608000670000300000000500000000003006000700710000050000000200200400005305280000'],
 ['Naga para','500600002600000300190000560000000400000800790700000050900000080000000005000006170']
];
for(const [technique,text]of fixtures)test(technique+': easiest technique and a sound deduction',()=>{const values=[...text].map(Number),before=JSON.stringify(values),h=findHint(values);assert.equal(h.kind,'hint');assert.equal(h.technique,technique);assert.equal(JSON.stringify(values),before);assert(h.sources.length);if(h.targets.length){for(const i of h.targets){assert(!h.sources.includes(i));assert(S.candidates(values,i).some(n=>h.digits.includes(n)));assert(!h.digits.includes(solved[i]));}}else assert.equal(solved[h.sources[0]],h.digits[0]);});
test('completed, conflicting and unsupported boards are distinguished',()=>{assert.equal(findHint(solved).kind,'complete');const bad=[...solved];bad[0]=bad[1];assert.equal(findHint(bad).kind,'conflict');assert.equal(findHint(Array(81).fill(0)).kind,'none');});
test('impossible empty cell is rejected even without duplicate givens',()=>{const v=Array(81).fill(0);for(let i=0;i<8;i++)v[i]=i+1;v[17]=9;assert.equal(S.conflicts(v).some(Boolean),false);assert.equal(findHint(v).kind,'invalid');});
test('analysis does not depend on manually removed notes',()=>{const state=S.parse(fixtures[2][1]);const before=findHint(state.values);state.notes=state.notes.map(()=>[]);assert.deepEqual(findHint(state.values),before);});
test('screenshot regression: completed locked-3 elimination is not suggested again',()=>{
 const v=[...'400986003083020040000143800020000050305060408010000020000408000030010084840609007'].map(Number);
 const raw=findHint(v);assert.equal(raw.technique,'Zablokowani kandydaci');assert.deepEqual(raw.digits,[3]);assert.deepEqual(raw.targets,[31,49]);
 const notes=v.map((_,i)=>S.candidates(v,i));for(const i of raw.targets)notes[i]=notes[i].filter(n=>n!==3);
 const snapshot=JSON.stringify(notes),next=findHint(v,notes);assert.notDeepEqual(next,raw);assert.equal(JSON.stringify(notes),snapshot);
 if(next.kind==='hint')for(const i of next.targets)assert(next.digits.some(n=>notes[i].includes(n)));
});
test('only remaining targets are highlighted for a partly performed elimination',()=>{
 const v=[...'400986003083020040000143800020000050305060408010000020000408000030010084840609007'].map(Number);
 const notes=v.map((_,i)=>S.candidates(v,i));notes[31]=notes[31].filter(n=>n!==3);
 const h=findHint(v,notes);assert.deepEqual(h.targets,[49]);assert(!h.explanation.includes('wiersz 4, kolumna 5'));
});
test('empty notes do not produce elimination hints but do not suppress placements',()=>{
 const notes=Array.from({length:81},()=>[]);assert.equal(findHint([...fixtures[2][1]].map(Number),notes).kind,'none');assert.equal(findHint([...fixtures[0][1]].map(Number),notes).technique,'Jedyny kandydat');
});
test('all completed pair eliminations are skipped',()=>{
 const v=[...fixtures[3][1]].map(Number),h=findHint(v);assert.equal(h.technique,'Naga para');const notes=v.map((_,i)=>S.candidates(v,i));for(const i of h.targets)notes[i]=notes[i].filter(n=>!h.digits.includes(n));assert.notDeepEqual(findHint(v,notes),h);
});
const {deductions}=require('../dist/hints.js');
const fullNotes=()=>Array.from({length:81},()=>[1,2,3,4,5,6,7,8,9]);
const technique=(notes,name)=>[...deductions(notes)].find(h=>h.technique===name);
test('hidden pair removes only other digits from its own two cells',()=>{
 const n=fullNotes();for(let i=2;i<9;i++)n[i]=n[i].filter(v=>![1,2].includes(v));
 const h=technique(n,'Ukryta para');assert.deepEqual(h.sources,[0,1]);assert.deepEqual(h.targets,[0,1]);assert.deepEqual(h.removals[0].digits,[3,4,5,6,7,8,9]);
});
test('naked triple supports three different two-digit combinations',()=>{
 const n=fullNotes();n[0]=[1,2];n[1]=[2,3];n[2]=[1,3];
 const h=technique(n,'Naga trójka');assert.deepEqual(h.sources,[0,1,2]);assert.deepEqual(h.targets,[3,4,5,6,7,8]);assert.deepEqual(h.removals[0].digits,[1,2,3]);
});
test('hidden triple retains its three digits and removes extras per cell',()=>{
 const n=fullNotes();n[0]=[1,2,4];n[1]=[2,3,5];n[2]=[1,3,6];for(let i=3;i<9;i++)n[i]=[4,5,6,7,8,9];
 const h=technique(n,'Ukryta trójka');assert.deepEqual(h.sources,[0,1,2]);assert.deepEqual(h.removals,[{cell:0,digits:[4]},{cell:1,digits:[5]},{cell:2,digits:[6]}]);
});
for(const transpose of [false,true])test('X-Wing '+(transpose?'columns':'rows')+' has four corners and correct elimination lines',()=>{
 const n=fullNotes(),cell=(a,b)=>transpose?b*9+a:a*9+b;
 for(const r of [0,3])for(let c=0;c<9;c++)if(![1,7].includes(c))n[cell(r,c)]=n[cell(r,c)].filter(v=>v!==5);
 const h=technique(n,'X-Wing');assert.deepEqual(h.sources,[cell(0,1),cell(0,7),cell(3,1),cell(3,7)]);assert.equal(h.targets.length,14);assert(h.removals.every(r=>r.digits.join()==='5'));assert(h.targets.every(i=>!h.sources.includes(i)));
});
test('an X-Wing is not inferred when a base line has a third candidate',()=>{
 const n=fullNotes();for(const r of [0,3])for(let c=0;c<9;c++)if(![1,7].includes(c))n[r*9+c]=n[r*9+c].filter(v=>v!==5);n[2].push(5);assert.equal(technique(n,'X-Wing'),undefined);
});
test('all emitted deductions preserve a known solution across deterministic puzzle samples',()=>{
 let seed=4321;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 for(let trial=0;trial<35;trial++){
  const values=solved.map(v=>random()<.32?v:0),n=values.map((_,i)=>S.candidates(values,i));
  for(const h of deductions(n))if(h.removals){for(const r of h.removals)assert(!r.digits.includes(solved[r.cell]),h.technique+' removed solution');}else assert.equal(h.digits[0],solved[h.sources[0]]);
 }
});
test('replay of completed eliminations does not mutate user notes or fabricate a placement',()=>{
 const v=[...'400986003083020040000143800020000050305060408010000020000408000030010084840609007'].map(Number),n=v.map((_,i)=>S.candidates(v,i));n[31]=n[31].filter(v=>v!==3);n[49]=n[49].filter(v=>v!==3);const before=JSON.stringify(n);const h=findHint(v,n);assert.equal(JSON.stringify(n),before);assert.equal(h.kind,'hint');assert(!h.removals?.some(r=>[31,49].includes(r.cell)&&r.digits.includes(3)));
});
