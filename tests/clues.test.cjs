const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),S=require('../dist/logic.js');
const blank=()=>({values:Array(81).fill(0),notes:Array.from({length:81},()=>[])});
test('given clues survive JSON and singles; invalid or changed clues are rejected',()=>{
 const b=blank();b.values[0]=5;b.givens=[...b.values];b.notes[1]=[3];assert.equal(S.isGiven(b,0),true);assert.equal(S.isGiven(b,1),false);S.placeValue(b,0,7);assert.equal(b.values[0],5);const parsed=S.parse(JSON.stringify(b));assert.deepEqual(parsed,b);const filled=S.fillSingles(parsed);assert.equal(filled.state.values[1],3);assert.deepEqual(filled.state.givens,b.givens);assert.throws(()=>S.validate({...b,givens:[5]}));assert.throws(()=>S.validate({...b,values:Array(81).fill(0)}));assert.equal(S.validate(blank()).givens,undefined);
});
test('actual input handlers block clues; unlocking, undo, redo, lock and restart preserve state',()=>{
 const source=fs.readFileSync(require.resolve('../dist/app.js'),'utf8'),buttons={},c={Sudoku:S,state:blank(),initial:blank(),selected:0,mode:'value',history:[],future:[],structuredClone,clearHint(){},save(){},render(){},message(){},confirmAction(t,d,fn){fn();},$:id=>buttons[id]??(buttons[id]={})};vm.createContext(c);
 for(const prefix of ['function change(fn)','function enter(n)',"$('erase').onclick", "$('undo').onclick", "$('redo').onclick", "$('clue-lock').onclick", "$('restart').onclick"])vm.runInContext(source.split('\n').find(l=>l.startsWith(prefix)),c);
 c.state.values[0]=5;buttons['clue-lock'].onclick();assert.equal(c.state.givens[0],5);vm.runInContext('enter(7)',c);buttons.erase.onclick();assert.equal(c.state.values[0],5);assert.equal(c.history.length,1);
 c.selected=1;vm.runInContext('enter(3)',c);assert.equal(c.state.values[1],3);buttons.undo.onclick();assert.equal(c.state.values[1],0);buttons.redo.onclick();assert.equal(c.state.values[1],3);buttons.restart.onclick();assert.equal(c.state.values[1],0);assert.equal(c.state.givens[0],5);
 buttons['clue-lock'].onclick();assert.equal(c.state.givens[0],0);c.selected=0;vm.runInContext('enter(7)',c);assert.equal(c.state.values[0],7);buttons.undo.onclick();buttons.undo.onclick();assert.equal(c.state.givens[0],5);buttons.redo.onclick();assert.equal(c.state.givens[0],0);
});
