const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
test('OCR success switches to the review without focusing a numeric input',()=>{
 const source=fs.readFileSync(path.join(__dirname,'../dist/app.js'),'utf8'),html=fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8'),elements={};let focus;
 for(const id of ['image-source','image-title','ocr-review','apply-image','edit-image-crop','recognize','ocr-review-title','image-dialog'])elements[id]={hidden:true,open:true,scrollTop:500,textContent:'',classList:{replace(a,b){this.from=a;this.to=b;}},focus(opts){focus={id,opts};}};
 elements['ocr-thumbnail']={width:450,height:450,getContext(){return {fillRect(){},drawImage(){},set fillStyle(v){}};}};const c={$:id=>elements[id],photo:{},crop:()=>({x:0,y:0,size:100})};vm.createContext(c);vm.runInContext(source.split('\n').find(l=>l.startsWith('function showImageReview()')),c);c.showImageReview();
 assert.equal(elements['image-source'].open,false);assert.equal(elements['ocr-review'].hidden,false);assert.equal(elements['apply-image'].hidden,false);assert.equal(elements['image-dialog'].scrollTop,0);assert.equal(focus.id,'ocr-review-title');assert(focus.opts.preventScroll);assert.equal(elements.recognize.classList.to,'secondary');
 const start=html.indexOf('<details id="image-source"'),end=html.indexOf('</details>',start),button=html.indexOf('id="recognize"');assert(button>start&&button<end,'retry must be inside collapsed source section');assert.equal((html.match(/id="recognize"/g)||[]).length,1);
});

test('retake reopens camera without applying the rejected photo and is blocked during OCR',()=>{
 const source=fs.readFileSync(path.join(__dirname,'../dist/app.js'),'utf8');let closed=0,opened=0;const elements={'retake-photo':{},'image-dialog':{close(){closed++;}},'open-camera':{click(){opened++;}}};const c={$:id=>elements[id],ocrBusy:false};vm.createContext(c);vm.runInContext(source.split('\n').find(l=>l.startsWith("$('retake-photo').onclick")),c);elements['retake-photo'].onclick();assert.equal(closed,1);assert.equal(opened,1);c.ocrBusy=true;elements['retake-photo'].onclick();assert.equal(closed,1);assert.equal(opened,1);
 const html=fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8');assert(html.indexOf('id="retake-photo"')<html.indexOf('id="image-source"'),'retake is visible above the image and outside collapsed details');
});
