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
