const {test}=require('node:test'),assert=require('node:assert/strict');const {analyzePixels,recognizeCell}=require('../dist/ocr.js');
function pixels(w,h){const a=new Uint8ClampedArray(w*h*4);a.fill(255);return a;}
function rect(a,w,x,y,width,height,v){for(let j=y;j<y+height;j++)for(let i=x;i<x+width;i++){const p=(j*w+i)*4;a[p]=a[p+1]=a[p+2]=v;}}
test('uniform and almost uniform cells are blank',()=>{const a=pixels(40,40);assert.equal(analyzePixels(a,40,40),null);rect(a,40,10,8,12,20,245);assert.equal(analyzePixels(a,40,40),null);});
test('adaptive threshold retains faint strokes above old fixed threshold',()=>{const a=pixels(40,40);rect(a,40,17,8,4,25,180);rect(a,40,9,19,19,4,180);const result=analyzePixels(a,40,40);assert(result);assert.equal(result.bounds.top,8);assert(result.mask[20*40+10]);});
test('edge grid lines are discarded without removing the digit',()=>{const a=pixels(40,40);rect(a,40,0,0,2,40,0);rect(a,40,15,8,8,24,40);const r=analyzePixels(a,40,40);assert.equal(r.bounds.left,15);assert.equal(r.bounds.width,8);});
test('low confidence or blank readings retry alternate segmentation modes',async()=>{const modes=[],answers=[{text:'',confidence:0},{text:'6',confidence:89},{text:'6',confidence:93}];const worker={async setParameters(p){modes.push(p.tessedit_pageseg_mode);},async recognize(){return {data:answers.shift()};}};const r=await recognizeCell(worker,{binary:{},original:{}});assert.equal(r.digit,6);assert.equal(r.uncertain,false);assert.deepEqual(modes,['10','13','8']);});
test('disagreeing readings are marked uncertain instead of silently trusted',async()=>{const answers=[{text:'6',confidence:80},{text:'9',confidence:87},{text:'6',confidence:81}];const worker={async setParameters(){},async recognize(){return {data:answers.shift()};}};const r=await recognizeCell(worker,{});assert.equal(r.digit,6);assert(r.uncertain);});
test('unreadable ink is returned as an uncertain blank',async()=>{const w={async setParameters(){},async recognize(){return {data:{text:'',confidence:0}};}};assert.deepEqual(await recognizeCell(w,{}),{digit:0,uncertain:true});});
test('alternate engine recovers a missed six only with agreeing image variants',async()=>{
 const primary={async setParameters(){},async recognize(){return {data:{text:'5',confidence:0}};}},secondary={async setParameters(){},async recognize(){return {data:{text:'6',confidence:89}};}};
 const r=await recognizeCell(primary,{},async()=>secondary);assert.equal(r.digit,6);assert.equal(r.uncertain,false);
});
test('alternate engine disagreement keeps the result uncertain',async()=>{
 const primary={async setParameters(){},async recognize(){return {data:{text:'',confidence:0}};}},answers=['6','9'],secondary={async setParameters(){},async recognize(){return {data:{text:answers.shift(),confidence:95}};}};
 const r=await recognizeCell(primary,{},async()=>secondary);assert.equal(r.digit,0);assert(r.uncertain);
});
