/* Recover an unfinished import before any Sudoku controller reads its state. */
(() => {
 const root=globalThis;
 let native;
 try{native=root.localStorage;}catch{native={getItem(){throw Error('storage unavailable');},setItem(){throw Error('storage unavailable');},removeItem(){throw Error('storage unavailable');}};}
 const messages={
  pl:['Odzyskiwanie zapisu','Poprzedni import nie został zakończony. Nie udało się jeszcze przywrócić spójnego zapisu. Zapis gry jest wstrzymany, aby chronić planszę i postępy. Spróbuj ponownie odzyskać zapis.','Spróbuj ponownie'],
  en:['Recovering your save','The previous import did not finish. The consistent save could not yet be restored. Saving is paused to protect your grid and progress. Try recovering the save again.','Try again'],
  es:['Recuperar el guardado','La importación anterior no terminó. Aún no se pudo restaurar un guardado coherente. El guardado está pausado para proteger la cuadrícula y el progreso. Vuelve a intentar la recuperación.','Reintentar'],
  de:['Spielstand wiederherstellen','Der letzte Import wurde nicht abgeschlossen. Der konsistente Spielstand konnte noch nicht wiederhergestellt werden. Das Speichern ist zum Schutz von Raster und Fortschritt angehalten. Versuche die Wiederherstellung erneut.','Erneut versuchen'],
  'zh-Hans':['恢复存档','上次导入未完成，尚未恢复一致的存档。为保护棋盘和进度，已暂停保存。请重试恢复存档。','重试'],
  hi:['सेव बहाल करना','पिछला आयात पूरा नहीं हुआ। संगत सेव अभी बहाल नहीं हो सका। ग्रिड और प्रगति की रक्षा के लिए सेव रोक दिया गया है। फिर से बहाल करने की कोशिश करें।','फिर कोशिश करें'],
  fr:['Récupérer la sauvegarde','L’importation précédente est restée inachevée. La sauvegarde cohérente n’a pas encore pu être rétablie. L’enregistrement est suspendu pour protéger la grille et la progression. Réessayez la récupération.','Réessayer'],
  ar:['استعادة الحفظ','لم يكتمل الاستيراد السابق. لم نتمكن بعد من استعادة حفظ متسق. أُوقف الحفظ لحماية الشبكة والتقدم. حاول استعادة الحفظ مرة أخرى.','إعادة المحاولة'],
  it:['Recupero del salvataggio','L’importazione precedente non è terminata. Non è stato ancora possibile ripristinare un salvataggio coerente. Il salvataggio è sospeso per proteggere la griglia e i progressi. Riprova il recupero.','Riprova'],
  uk:['Відновлення збереження','Попередній імпорт не завершився. Узгоджене збереження ще не вдалося відновити. Запис призупинено, щоб захистити сітку й прогрес. Спробуйте відновити збереження ще раз.','Спробувати знову']
 };
 let modal;
 const guard=SudokuProgressBackup.createStorageGuard(native,()=>queueMicrotask(show));
 root.SudokuBackupStorage=guard;
 function show(){
  if(!guard.blocked)return;
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',show,{once:true});return;}
  const language=document.documentElement.lang.split('-')[0];
  const text=messages[document.documentElement.lang]||messages[language]||messages.en;
  if(!modal){
   modal=document.createElement('dialog');modal.id='backup-recovery-dialog';
   modal.setAttribute('translate','no');modal.setAttribute('aria-labelledby','backup-recovery-title');modal.setAttribute('aria-describedby','backup-recovery-message');
   modal.style.cssText='box-sizing:border-box;max-width:calc(100% - 24px);width:480px;max-height:90dvh;overflow:auto;padding:22px;background:var(--bg,#fff);color:var(--ink,#111);font:inherit;line-height:1.5';
   const title=document.createElement('h2');title.id='backup-recovery-title';title.style.cssText='font-size:1.25em;line-height:1.4;margin-top:0';
   const description=document.createElement('p');description.id='backup-recovery-message';
   const retry=document.createElement('button');retry.type='button';retry.id='backup-recovery-retry';retry.style.cssText='min-width:44px;min-height:44px;padding:8px 16px;font:inherit;white-space:normal';
   retry.onclick=()=>{try{guard.recover();modal.close();document.dispatchEvent(new Event('sudoku-storage-recovered'));}catch{show();}};
   modal.addEventListener('cancel',event=>event.preventDefault());
   modal.append(title,description,retry);document.body.append(modal);
  }
  document.getElementById('backup-recovery-title').textContent=text[0];document.getElementById('backup-recovery-message').textContent=text[1];document.getElementById('backup-recovery-retry').textContent=text[2];
  if(!modal.open)modal.showModal();
 }
 document.addEventListener('DOMContentLoaded',show,{once:true});
})();
