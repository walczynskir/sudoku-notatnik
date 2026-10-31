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
