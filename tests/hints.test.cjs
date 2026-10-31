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
