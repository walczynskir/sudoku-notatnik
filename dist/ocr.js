(function(root){
'use strict';
function analyzePixels(rgba,width,height){
 const gray=new Uint8Array(width*height),hist=new Uint32Array(256);let lo=255,hi=0;
 for(let i=0;i<gray.length;i++){const p=i*4,a=rgba[p+3]/255,v=Math.round((.299*rgba[p]+.587*rgba[p+1]+.114*rgba[p+2])*a+255*(1-a));gray[i]=v;hist[v]++;lo=Math.min(lo,v);hi=Math.max(hi,v);}
 if(hi-lo<18)return null;
 let sum=0;for(let i=0;i<256;i++)sum+=i*hist[i];let count=0,partial=0,best=-1,threshold=lo;
 for(let t=lo;t<hi;t++){count+=hist[t];partial+=t*hist[t];if(!count||count===gray.length)continue;const score=count*(gray.length-count)*(partial/count-(sum-partial)/(gray.length-count))**2;if(score>best){best=score;threshold=t;}}
 const seen=new Uint8Array(gray.length),mask=new Uint8Array(gray.length);let left=width,top=height,right=-1,bottom=-1,ink=0;
 for(let start=0;start<gray.length;start++){
  if(seen[start]||gray[start]>threshold)continue;
  const stack=[start],pixels=[];seen[start]=1;let x0=width,y0=height,x1=0,y1=0;
  while(stack.length){const p=stack.pop(),x=p%width,y=Math.floor(p/width);pixels.push(p);x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y);
   for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=width||ny>=height)continue;const n=ny*width+nx;if(!seen[n]&&gray[n]<=threshold){seen[n]=1;stack.push(n);}}
  }
  const w=x1-x0+1,h=y1-y0+1;
  const line=(h>height*.8&&w<width*.09)||(w>width*.8&&h<height*.09);
  const edge=(x0===0||y0===0||x1===width-1||y1===height-1)&&(w>width*.85||h>height*.85);
  if(pixels.length<Math.max(5,width*height*.0008)||h<height*.06||line||edge)continue;
  pixels.forEach(p=>mask[p]=1);ink+=pixels.length;left=Math.min(left,x0);right=Math.max(right,x1);top=Math.min(top,y0);bottom=Math.max(bottom,y1);
 }
 if(!ink||bottom-top<height*.12)return null;
 return {mask,gray,threshold,bounds:{left,top,width:right-left+1,height:bottom-top+1}};
}
function prepareCell(photo,crop,index,makeCanvas=()=>document.createElement('canvas')){
 const raw=makeCanvas();raw.width=raw.height=160;const ctx=raw.getContext('2d'),step=crop.size/9,inset=.07;
 ctx.fillStyle='white';ctx.fillRect(0,0,160,160);
 ctx.drawImage(photo,crop.x+(index%9+inset)*step,crop.y+(Math.floor(index/9)+inset)*step,step*(1-2*inset),step*(1-2*inset),0,0,160,160);
 const data=ctx.getImageData(0,0,160,160),analysis=analyzePixels(data.data,160,160);if(!analysis)return null;
 const clean=makeCanvas();clean.width=clean.height=160;const cc=clean.getContext('2d'),pixels=cc.createImageData(160,160);
 for(let i=0;i<analysis.mask.length;i++){const v=analysis.mask[i]?0:255;pixels.data[i*4]=pixels.data[i*4+1]=pixels.data[i*4+2]=v;pixels.data[i*4+3]=255;}cc.putImageData(pixels,0,0);
 const b=analysis.bounds,scale=Math.min(112/b.width,124/b.height),w=b.width*scale,h=b.height*scale;
 function normalized(source){const c=makeCanvas();c.width=c.height=160;const t=c.getContext('2d');t.fillStyle='white';t.fillRect(0,0,160,160);t.drawImage(source,b.left,b.top,b.width,b.height,(160-w)/2,(160-h)/2,w,h);return c;}
 return {binary:normalized(clean),original:normalized(raw)};
}
async function recognizeCell(worker,prepared){
 const attempts=[];
 for(const [canvas,mode]of [[prepared.binary,'10'],[prepared.original,'13'],[prepared.binary,'8']]){
  await worker.setParameters({tessedit_pageseg_mode:mode});const {data}=await worker.recognize(canvas),text=data.text.trim();
  if(/^[1-9]$/.test(text))attempts.push({digit:Number(text),confidence:Number(data.confidence)||0});
  if(attempts.length===1&&attempts[0].confidence>=92)break;
 }
 if(!attempts.length)return {digit:0,uncertain:true};
 const digits=[...new Set(attempts.map(a=>a.digit))];digits.sort((a,b)=>{
  const aa=attempts.filter(x=>x.digit===a),bb=attempts.filter(x=>x.digit===b);
  return bb.length-aa.length||Math.max(...bb.map(x=>x.confidence))-Math.max(...aa.map(x=>x.confidence));
 });
 const digit=digits[0],confidence=Math.max(...attempts.filter(a=>a.digit===digit).map(a=>a.confidence));
 return {digit,confidence,uncertain:digits.length>1||confidence<75};
}
const api={analyzePixels,prepareCell,recognizeCell};root.SudokuOCR=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
