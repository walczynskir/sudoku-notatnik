const {test}=require('node:test');
const assert=require('node:assert/strict');
const S=require('../dist/logic.js');
const sample='530070000600195000098000060800060003400803001700020006060000280000419005000080079';
test('candidates respect row, column and box',()=>{const p=S.parse(sample);assert.deepEqual(S.candidates(p.values,2),[1,2,4]);assert.deepEqual(S.candidates(p.values,0),[]);assert.deepEqual(S.candidates(Array(81).fill(0),40),[1,2,3,4,5,6,7,8,9]);});
test('conflicts mark both repeated cells',()=>{const p=S.parse(sample);assert(!S.conflicts(p.values).some(Boolean));p.values[2]=5;assert(S.conflicts(p.values)[0]);assert(S.conflicts(p.values)[2]);});
test('text and JSON imports preserve notes and reject invalid input',()=>{assert.throws(()=>S.parse('123'));assert.throws(()=>S.validate({values:Array(81).fill(10)}));const p=S.parse('.'.repeat(81));p.notes[0]=[2,4];assert.deepEqual(S.parse(JSON.stringify(p)),p);assert.deepEqual(S.parse(sample.match(/.{9}/g).join('\n')),S.parse(sample));});
