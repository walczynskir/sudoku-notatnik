// Camera ownership stays with this dialog, including late permission responses.
function createCameraSession(mediaDevices){
 let request=0,stream=null;
 function stop(){request++;stream?.getTracks().forEach(track=>track.stop());stream=null;}
 async function start(){stop();const current=request;const next=await mediaDevices.getUserMedia({audio:false,video:{facingMode:{ideal:'environment'},width:{ideal:1920},height:{ideal:1920}}});if(current!==request){next.getTracks().forEach(track=>track.stop());return null;}stream=next;return next;}
 return {start,stop};
}
if(typeof module!=='undefined')module.exports={createCameraSession};
if(typeof document!=='undefined'){
 const dialog=$('camera-dialog'),video=$('camera-preview'),status=$('camera-status'),take=$('take-photo');
 const session=createCameraSession(navigator.mediaDevices);let opening=0;
 function stopCamera(){opening++;session.stop();video.pause();video.srcObject=null;video.hidden=true;take.disabled=true;}
 dialog.addEventListener('close',stopCamera);
 window.addEventListener('pagehide',stopCamera);
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&dialog.open){dialog.close();stopCamera();}});
 video.addEventListener('loadeddata',()=>{take.disabled=!dialog.open||!video.videoWidth;});
 $('open-camera').onclick=async()=>{
  dialog.showModal();const attempt=++opening;take.disabled=true;
  status.textContent='Zezwól przeglądarce na dostęp do aparatu. Mikrofon nie jest potrzebny.';
  if(!navigator.mediaDevices?.getUserMedia){status.textContent='Podgląd aparatu jest tutaj niedostępny. Użyj przycisku „Użyj aparatu telefonu” lub wczytaj obrazek.';return;}
  try{const stream=await session.start();if(!stream||attempt!==opening||!dialog.open)return;video.srcObject=stream;video.hidden=false;await video.play();if(attempt!==opening||!dialog.open)return;take.disabled=!video.videoWidth;status.textContent='Obejmij całą planszę, ustaw aparat równolegle do kartki i zrób zdjęcie.';}
  catch(error){if(attempt!==opening||!dialog.open)return;stopCamera();status.textContent=error.name==='NotAllowedError'?'Brak dostępu do aparatu. Zezwól na kamerę w ustawieniach przeglądarki lub użyj aparatu telefonu.':error.name==='NotFoundError'?'Nie znaleziono aparatu. Możesz wczytać gotowy obrazek.':'Nie udało się uruchomić aparatu. Sprawdź, czy nie korzysta z niego inna aplikacja, lub użyj aparatu telefonu.';}
 };
 $('native-camera').onclick=()=>{dialog.close();stopCamera();$('camera-file').click();};
 take.onclick=async()=>{
  if(!video.videoWidth||!video.videoHeight){status.textContent='Poczekaj na obraz z aparatu.';return;}
  take.disabled=true;
  try{const canvas=document.createElement('canvas'),scale=Math.min(1,2400/Math.max(video.videoWidth,video.videoHeight));canvas.width=Math.round(video.videoWidth*scale);canvas.height=Math.round(video.videoHeight*scale);canvas.getContext('2d').drawImage(video,0,0,canvas.width,canvas.height);dialog.close();stopCamera();await openPhoto(canvas);}
  catch(error){message('Nie udało się odczytać zdjęcia. Spróbuj ponownie lub wczytaj obrazek.');if(dialog.open){take.disabled=false;status.textContent='Nie udało się zrobić zdjęcia. Spróbuj ponownie.';}}
 };
}
