const {chromium}=require(process.env.PLAYWRIGHT_PATH),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});try{
 for(const [width,height] of (process.env.SUDOKU_TEST_URL?[[390,850],[1280,900]]:[[320,740],[390,850],[850,390],[1280,900]])){
  const context=await browser.newContext({viewport:{width,height},hasTouch:true,serviceWorkers:'block'});
  await context.route('**/*',r=>{const u=new URL(r.request().url());if(process.env.SUDOKU_TEST_URL)return u.hostname===new URL(process.env.SUDOKU_TEST_URL).hostname?r.continue():r.abort();if(u.hostname!=='localhost')return r.abort();const f=path.resolve(__dirname,'../dist','.'+(u.pathname==='/'?'/index.html':u.pathname));return fs.existsSync(f)?r.fulfill({path:f}):r.fulfill({status:404})});
  const page=await context.newPage();await page.goto(process.env.SUDOKU_TEST_URL||'http://localhost/');
  await page.evaluate(()=>{const d=empty();d.values[0]=1;replace(d,'test');});
  for(const lang of ['pl','ar'])for(const theme of ['sage','porcelain','night-sky','contrast'])for(const large of [false,true]){
   await page.selectOption('#language-select',lang);
   await page.evaluate(({theme,large})=>{document.documentElement.dataset.theme=theme;document.documentElement.dataset.textSize=large?'large':'normal'},{theme,large});
   await page.locator('#open-preferences').focus();await page.keyboard.press('Enter');
   await page.waitForTimeout(40);
   const box=await page.locator('#preferences-dialog').boundingBox();assert(box.x>=0&&box.x+box.width<=width+1);assert(box.y>=0&&box.y+box.height<=height+1);
   const close=await page.locator('#settings-dismiss').boundingBox();assert(close.width>=44&&close.height>=44);assert(close.x>box.x+box.width/2);assert(close.y>=box.y&&close.y+close.height<box.y+box.height);
   assert.equal(await page.locator('#preferences-dialog').evaluate(d=>d.scrollWidth<=d.clientWidth+1),true);
   assert.equal(await page.locator('#preferences-dialog .settings-body').evaluate(d=>d.scrollWidth<=d.clientWidth+1),true);
   assert(await page.locator('#settings-dismiss').getAttribute('aria-label'));
   await page.locator('.preference-info').first().tap();assert.equal(await page.locator('.preference-info').first().getAttribute('aria-expanded'),'true');await page.locator('.preference-info').first().tap();
   await page.locator('#preferences-dialog .settings-body').evaluate(n=>n.scrollTop=n.scrollHeight);
   assert(await page.locator('#settings-dismiss').isVisible());await page.keyboard.press('Escape');assert.equal(await page.locator('#open-preferences').evaluate(e=>document.activeElement===e),true);
  }
  await page.locator('#open-preferences').tap();await page.locator('#preference-notes').check();await page.locator('#settings-dismiss').tap();await page.reload();await page.locator('#open-preferences').tap();assert(await page.locator('#preference-notes').isChecked());assert.equal(await page.evaluate(()=>state.values[0]),1);
  await page.evaluate(()=>{globalThis.restoreSettingsSetItem=Storage.prototype.setItem;Storage.prototype.setItem=function(){throw new Error('test blocked')}});
  await page.locator('#preference-notes').uncheck();assert(await page.locator('#settings-save-error').isVisible());await page.locator('#settings-save-retry').tap();assert(await page.locator('#settings-save-error').isVisible());
  await page.evaluate(()=>Storage.prototype.setItem=globalThis.restoreSettingsSetItem);await page.locator('#settings-save-retry').tap();assert(await page.locator('#settings-save-error').isHidden());
  fs.mkdirSync(path.join(__dirname,'artifacts'),{recursive:true});await page.screenshot({path:path.join(__dirname,`artifacts/settings-${width}.png`)});
  await page.locator('#settings-dismiss').tap();assert.equal(await page.locator('#open-preferences').evaluate(e=>document.activeElement===e),true);await page.reload();await page.locator('#open-preferences').tap();assert.equal(await page.locator('#preference-notes').isChecked(),false);
  await context.close();console.log(`${width} settings OK`);
 }
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
