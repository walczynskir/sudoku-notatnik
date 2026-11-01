const S=require('../../dist/logic.js'),H=require('../../dist/hints.js');
const order=['Jedyny kandydat','Jedyne miejsce dla cyfry','Zablokowani kandydaci','Naga para','Ukryta para','Naga trójka','Ukryta trójka','Naga czwórka','Ukryta czwórka','X-Wing','XY-Wing','XYZ-Wing','W-Wing','Swordfish','Jellyfish','Unique Rectangle typ 1','Unique Rectangle typ 2','Unique Rectangle typ 4','Kolorowanie — sprzeczność','Kolorowanie — pułapka','X-Chain','XY-Chain','AIC'];
function validatePuzzle(puzzle,{maxMs=2000,maxNodes=200000}={}){
 if(!/^[0-9]{81}$/.test(puzzle))return {error:'format'};
 const values=[...puzzle].map(Number);if(S.conflicts(values).some(Boolean))return {error:'conflict'};
 const unique=S.solutionCount(values,2,maxNodes);if(!unique.complete||unique.count!==1)return {error:'uniqueness'};
 const state={values,notes:values.map((_,i)=>S.candidates(values,i))},steps={};let hardest=0,total=0;const started=Date.now();
 while(state.values.some(v=>!v)){
  if(Date.now()-started>maxMs)return {error:'time-budget',stalled:state.values.join(''),usedTechniques:Object.keys(steps)};if(++total>729)return {error:'step-budget'};
  const hint=H.findHint(state.values,state.notes);if(hint.kind!=='hint')return {error:hint.kind==='none'?'unsupported':hint.kind,stalled:state.values.join(''),usedTechniques:Object.keys(steps)};
  if(hint.removals){let removed=0;for(const {cell,digits}of hint.removals){const before=state.notes[cell].length;state.notes[cell]=state.notes[cell].filter(n=>!digits.includes(n));removed+=before-state.notes[cell].length;}if(!removed)return {error:'no-progress'};}
  else {const cell=hint.sources[0],digit=hint.digits[0];if(!S.candidates(state.values,cell).includes(digit))return {error:'invalid-placement'};S.placeValue(state,cell,digit);}
  if(state.values.some((v,i)=>!v&&!state.notes[i].length))return {error:'empty-cell'};
  steps[hint.technique]=(steps[hint.technique]||0)+1;hardest=Math.max(hardest,order.indexOf(hint.technique));
 }
 if(S.conflicts(state.values).some(Boolean))return {error:'invalid-solution'};
 return {hardest:order[hardest],steps,totalSteps:total};
}
module.exports={validatePuzzle,order};
if(require('node:worker_threads').parentPort){const port=require('node:worker_threads').parentPort;port.on('message',job=>port.postMessage({...job,result:validatePuzzle(job.puzzle)}));}
