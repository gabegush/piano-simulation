'use strict';
const music=document.querySelector('#background-music');
const demo=document.querySelector('#demo-video');
const toggle=document.querySelector('#music-toggle');
const volume=document.querySelector('#music-volume');
const status=document.querySelector('#sound-status');
let optedIn=false;
music.volume=Number(volume.value);
function showSound(message){toggle.textContent=music.paused?(optedIn?'Resume music':'Music off'):'Mute music';toggle.setAttribute('aria-pressed',String(!music.paused));toggle.setAttribute('aria-label',music.paused?'Turn background music on':'Mute background music');status.textContent=message;}
async function startMusic(){optedIn=true;if(!demo.paused)demo.pause();try{await music.play();showSound('Playing project performance · Pas de deux');}catch{showSound('Playback unavailable. Try Music again, or continue silently.');}}
function stopMusic(){optedIn=false;music.pause();showSound('Background music off');}
function enter(){document.querySelector('#work').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});document.querySelector('#project-title').setAttribute('tabindex','-1');document.querySelector('#project-title').focus({preventScroll:true});}
document.querySelector('#enter-music').addEventListener('click',()=>{startMusic();enter();});
document.querySelector('#enter-silent').addEventListener('click',()=>{stopMusic();enter();});
toggle.addEventListener('click',()=>music.paused?startMusic():stopMusic());
volume.addEventListener('input',()=>{music.volume=Number(volume.value);});
demo.addEventListener('play',()=>{music.pause();showSound('Background paused for the demo');});
demo.addEventListener('pause',()=>showSound(optedIn?'Demo paused · choose Resume music when ready':'Background music off'));
demo.addEventListener('ended',()=>{if(optedIn&&!document.hidden)startMusic();else showSound('Demo finished · background music off');});
document.addEventListener('visibilitychange',()=>{if(document.hidden){music.pause();showSound(optedIn?'Music paused while away · resume when ready':'Background music off');}});
music.addEventListener('error',()=>showSound('Music could not load. The case study remains available.'));
document.querySelectorAll('[data-time]').forEach(button=>button.addEventListener('click',()=>{demo.currentTime=Number(button.dataset.time);demo.focus();}));
document.querySelectorAll('.compare-range').forEach(range=>range.addEventListener('input',()=>{range.closest('figure').querySelector('.comparison').style.setProperty('--split',range.value+'%');}));
const steps=[['MUSICAL EVENTS','Separate attack, release, and resonance.','Pitch and onset identify a strike. Physical key duration guides the hand. Musical release and pedal state determine how long the sound continues. Keeping these signals separate prevents a moving hand from abruptly cutting off a sustained note.'],['HAND & FINGER PLAN','Choose a hand that can complete the phrase.','Assign the performing hand and finger while respecting notes already held, chord order, and the next target. Hand transfers remain explicit so the visible key color follows the hand actually playing it.'],['ARTICULATED RIG','Turn targets into a plausible pose.','Computed key targets drive fixed-length articulated joints. Wrist travel prepares the next attack; held-note constraints keep contact stable. Fingertip and collision checks expose failures that a visually attractive frame can hide.'],['RENDER & VERIFY','Keep the sound and picture on one clock.','A deterministic frame timeline connects note events, key colors, the performance view and keyboard view. Complete and check the main media, freeze the version, then derive portrait excerpts from that exact result.']];
document.querySelectorAll('[data-step]').forEach(button=>button.addEventListener('click',()=>{const n=Number(button.dataset.step);document.querySelectorAll('[data-step]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});document.querySelector('#step-label').textContent=`0${n+1} / ${steps[n][0]}`;document.querySelector('#step-title').textContent=steps[n][1];document.querySelector('#step-copy').textContent=steps[n][2];}));
document.querySelectorAll('.comparison').forEach(panel=>{const range=panel.closest('figure').querySelector('.compare-range');function move(event){const box=panel.getBoundingClientRect();range.value=String(Math.round(Math.max(0,Math.min(100,(event.clientX-box.left)/box.width*100))));range.dispatchEvent(new Event('input',{bubbles:true}));}panel.addEventListener('pointerdown',event=>{panel.setPointerCapture(event.pointerId);move(event);});panel.addEventListener('pointermove',event=>{if(panel.hasPointerCapture(event.pointerId))move(event);});panel.addEventListener('pointerup',event=>{if(panel.hasPointerCapture(event.pointerId))panel.releasePointerCapture(event.pointerId);});});
