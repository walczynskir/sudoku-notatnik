const {test}=require('node:test');
const assert=require('node:assert/strict');
const S=require('../dist/logic.js');
const sample='530070000600195000098000060800060003400803001700020006060000280000419005000080079';
test('candidates respect row, column and box',()=>{const p=S.parse(sample);assert.deepEqual(S.candidates(p.values,2),[1,2,4]);assert.deepEqual(S.candidates(p.values,0),[]);assert.deepEqual(S.candidates(Array(81).fill(0),40),[1,2,3,4,5,6,7,8,9]);});
test('conflicts mark both repeated cells',()=>{const p=S.parse(sample);assert(!S.conflicts(p.values).some(Boolean));p.values[2]=5;assert(S.conflicts(p.values)[0]);assert(S.conflicts(p.values)[2]);});
test('text and JSON imports preserve notes and reject invalid input',()=>{assert.throws(()=>S.parse('123'));assert.throws(()=>S.validate({values:Array(81).fill(10)}));const p=S.parse('.'.repeat(81));p.notes[0]=[2,4];assert.deepEqual(S.parse(JSON.stringify(p)),p);assert.deepEqual(S.parse(sample.match(/.{9}/g).join('\n')),S.parse(sample));});
test('placing a digit updates row, column and box notes while preserving manual exclusions',()=>{
 const state=S.parse('.'.repeat(81));
 state.notes=state.notes.map(()=>[1,2,5,9]);
 S.placeValue(state,0,5);
 assert.equal(state.values[0],5);assert.deepEqual(state.notes[0],[]);
 for(const i of [1,8,9,72,10,20])assert.deepEqual(state.notes[i],[1,2,9]);
 assert.deepEqual(state.notes[40],[1,2,5,9]);
 assert(!state.notes[1].includes(3));
});
test('the value and note cleanup can be restored together from an undo snapshot',()=>{
 const state=S.parse('.'.repeat(81));state.notes[1]=[2,5];
 const snapshot=JSON.stringify(state);S.placeValue(state,0,5);
 const restored=JSON.parse(snapshot);assert.equal(restored.values[0],0);assert.deepEqual(restored.notes[1],[2,5]);
});
test('fill singles repeats until newly created singles are filled',()=>{const state=S.parse('.'.repeat(81));state.notes[0]=[1];state.notes[1]=[1,2];const before=JSON.stringify(state),result=S.fillSingles(state);assert.equal(result.count,2);assert.equal(result.state.values[0],1);assert.equal(result.state.values[1],2);assert.deepEqual(result.state.notes[1],[]);assert.equal(JSON.stringify(state),before);});
test('all initial singles are filled, and filled cells and empty notes are skipped',()=>{const state=S.parse('.'.repeat(81));state.values[80]=9;state.notes[0]=[1];state.notes[1]=[2];const result=S.fillSingles(state);assert.equal(result.count,2);assert.equal(result.state.values[80],9);assert.deepEqual(result.state.notes[0],[]);assert.equal(S.fillSingles(S.parse('.'.repeat(81))).count,0);});
test('contradictory singles abort the entire operation without mutating inputs',()=>{const state=S.parse('.'.repeat(81));state.notes[0]=[1];state.notes[1]=[1];const before=JSON.stringify(state);assert(S.fillSingles(state).error);assert.equal(JSON.stringify(state),before);});
test('singles incompatible with givens or leaving notes empty are rejected',()=>{const state=S.parse('.'.repeat(81));state.values[0]=1;state.notes[1]=[1];assert(S.fillSingles(state).error);state.values[0]=0;state.notes[0]=[1];state.notes[1]=[2];state.notes[2]=[1,2];assert(S.fillSingles(state).error);});

test('a conflict in a later round aborts the whole cascade',()=>{
 const state=S.parse('.'.repeat(81));state.notes[0]=[1];state.notes[1]=[1,2];state.notes[2]=[1,2];const before=JSON.stringify(state);assert(S.fillSingles(state).error);assert.equal(JSON.stringify(state),before);
});
test('cascade stops when only multiple candidates remain',()=>{
 const state=S.parse('.'.repeat(81));state.notes[0]=[1];state.notes[1]=[1,2];state.notes[2]=[2,3];state.notes[3]=[3,4,5];const result=S.fillSingles(state);assert.equal(result.count,3);assert.equal(result.state.values[2],3);assert.deepEqual(result.state.notes[3],[4,5]);
});
test('digit completion counts values and unlocks after removal',()=>{const v=[...'534678912672195348198342567859761423426853791713924856961537284287419635345286179'].map(Number);assert.deepEqual(S.digitState(v,6),{count:9,disabled:true,complete:true});v[v.indexOf(6)]=0;assert.deepEqual(S.digitState(v,6),{count:8,disabled:false,complete:false});});
test('nine conflicting entries are blocked but never marked as a correct complete digit',()=>{const v=Array(81).fill(0);for(let i=0;i<9;i++)v[i]=4;assert.deepEqual(S.digitState(v,4),{count:9,disabled:true,complete:false});assert.deepEqual(S.digitState(v,3),{count:0,disabled:false,complete:false});});
