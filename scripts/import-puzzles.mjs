import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {Worker} from 'node:worker_threads';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url)),source=process.argv[2];
if(!source)throw Error('Usage: node scripts/import-puzzles.mjs SOURCE_DIRECTORY [COUNT_PER_LEVEL]');
const target=Number(process.argv[3]||2500);if(!Number.isInteger(target)||target<1)throw Error('Invalid count');
const revision='d8c8ebaee0c08c412cfba96af1923dfa61c83317';
const levels=['easy','medium','hard','expert'],files=['easy','medium','hard','diabolical'];
const queues=Object.fromEntries(levels.map((level,i)=>[level,fs.readFileSync(path.join(source,files[i]+'.txt'),'utf8').trim().split(/\r?\n/).map(line=>{const [sourceId,givens,rating]=line.trim().split(/\s+/);return {sourceId,puzzle:givens,rating:Number(rating)};})]));
const records=Object.fromEntries(levels.map(l=>[l,[]])),cursor=Object.fromEntries(levels.map(l=>[l,0])),errors={},rejections=[],seen=new Set();const pending=Object.fromEntries(levels.map(l=>[l,new Map()])),resolved=Object.fromEntries(levels.map(l=>[l,0]));let rotate=0,inFlight=0,checked=0;
function next(){for(let i=0;i<levels.length;i++){const level=levels[(rotate++)%levels.length];if(records[level].length>=target||cursor[level]>=queues[level].length)continue;const index=cursor[level]++;return {level,index,...queues[level][index]};}return null;}
await new Promise((resolve,reject)=>{
 const workers=Array.from({length:4},()=>new Worker(new URL('./library/validate.cjs',import.meta.url)));
 function dispatch(w){const job=next();if(job){inFlight++;w.postMessage(job);}else if(!inFlight){workers.forEach(w=>w.terminate());resolve();}}
 for(const w of workers){w.on('error',error=>{workers.forEach(worker=>worker.terminate());reject(error);});w.on('message',job=>{inFlight--;checked++;pending[job.level].set(job.index,job);while(pending[job.level].has(resolved[job.level])){const item=pending[job.level].get(resolved[job.level]);pending[job.level].delete(resolved[job.level]++);if(item.result.error){errors[item.result.error]=(errors[item.result.error]||0)+1;rejections.push({level:item.level,sourceId:item.sourceId,givens:item.puzzle,rating:item.rating,...item.result});}else if(records[item.level].length<target&&!seen.has(item.puzzle)){seen.add(item.puzzle);records[item.level].push({id:crypto.createHash('sha256').update(item.puzzle).digest('hex').slice(0,16),givens:item.puzzle,rating:item.rating,sourceId:item.sourceId,...item.result});}}if(checked%500===0)console.log(JSON.stringify({checked,accepted:Object.fromEntries(levels.map(l=>[l,records[l].length])),errors}));dispatch(w);});dispatch(w);}
});
for(const level of levels)if(records[level].length!==target)throw Error(`Not enough supported puzzles for ${level}: ${records[level].length}/${target}; download more source candidates`);
const directory=path.join(root,'dist/puzzles');fs.mkdirSync(directory,{recursive:true});
const manifest={format:1,dataset:'sudoku-exchange-v1',source:{url:'https://github.com/grantm/sudoku-exchange-puzzle-bank',revision,license:'Public domain (Unlicense)'},validation:{engineVersion:fs.readFileSync(path.join(root,'VERSION'),'utf8').trim(),engineSha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'dist/hints.js'))).update(fs.readFileSync(path.join(root,'dist/logic.js'))).digest('hex'),unique:true,completeLogicalSolve:true,hintAPI:'findHint',maxNodes:200000,maxMs:2000,maxSteps:729},levels:{},total:target*4};
for(const level of levels){const selected=records[level].sort((a,b)=>a.id.localeCompare(b.id));manifest.levels[level]={count:selected.length,chunks:[]};for(let i=0;i<selected.length;i+=500){const batch=selected.slice(i,i+500),file=`${level}-${i/500+1}.json`,content=JSON.stringify(batch)+'\n';fs.writeFileSync(path.join(directory,file),content);manifest.levels[level].chunks.push({file,count:batch.length,ids:batch.map(p=>p.id),sha256:crypto.createHash('sha256').update(content).digest('hex')});}}
fs.writeFileSync(path.join(directory,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
fs.copyFileSync(path.join(source,'LICENSE.txt'),path.join(directory,'LICENSE.txt'));
fs.mkdirSync(path.join(root,'licenses'),{recursive:true});fs.copyFileSync(path.join(source,'LICENSE.txt'),path.join(root,'licenses/sudoku-exchange-LICENSE.txt'));
fs.mkdirSync(path.join(root,'reports'),{recursive:true});fs.writeFileSync(path.join(root,'reports/puzzle-import.json'),JSON.stringify({source:manifest.source,validation:manifest.validation,accepted:manifest.total,checked,errors,rejections},null,2)+'\n');
console.log(JSON.stringify({total:manifest.total,checked,errors,levels:Object.fromEntries(levels.map(l=>[l,records[l].length]))}));
