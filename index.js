document.title="Battito";

let PLAYER=pl_synth_wasm_init;
let SR=8,SC=8,PR=32,PC=48;
let audioContext=new AudioContext();
let audioBuffer=null;
let A=null;
let previewAudioSource=null;
applystyle();
let song=getsong();
song.activeTracks=Array(SC).fill(0);
song.activeSequences=Array(SR).fill(0);
let bpm=samplesToBPM(song[0]);
let playbackAnimationId=null;
let currSequence=null;
let prevSequence=null;
let piano=element("div",document.body,"piano");
let sliders=element("div",document.body,"sliders");
let side=element("div",document.body,"side");
let sequencer=element("div",side,"sequencer");
let text=element("div",side,"text");
let canvas=element("canvas",side,"canvas");
text.contentEditable=true;
let fullscreenButton=element("div",document.body,"fullscreen");
fullscreenButton.textContent = "\u26F6";











function initSequencer(){
grid(sequencer,SC+1,SR+1);
element("div",sequencer,"cell col-header");
for(let c=0;c<SC;c++){let header=element("div",sequencer,"cell col-header");header.textContent=String.fromCharCode(65+c);header.dataset.col=c;}
for(let r=0;r<SR;r++){
  let header=element("div",sequencer,"cell row-header");
  header.textContent=r+1;header.dataset.row=r;
  for(let c=0;c<SC;c++){
    let cell=element("div",sequencer,"cell");
    cell.dataset.row=r;cell.dataset.col=c;
    if(song[1][c]&&song[1][c][1]&&song[1][c][1][r]!==undefined){cell.textContent=song[1][c][1][r]||"";}
  }
}
sequencer.querySelectorAll(".col-header[data-col]").forEach(header=>{header.style.color=getColor(parseInt(header.dataset.col));});
}

function initPiano(){
grid(piano,PC,PR);
for(let r=0;r<PR;r++){
  for(let c=0;c<PC;c++){
    let cell=element("div",piano,"cell");
    cell.dataset.row=r;cell.dataset.col=c;
    if(c%12===0)cell.style.borderLeft="1px solid black";if(r%4===0)cell.style.borderTop="1px solid black";
  }
}
}

function initSliders(){
getSliders().forEach((group,i)=>{
  let color=getColor(i);
  group.forEach(([label,index,max])=>{
    let l=element("label",sliders);l.textContent=label;l.style.color=color;
    let s=element("input",sliders,"slider");s.type="range";s.dataset.index=index;s.max=max;s.disabled=true;
  });
});
}











function updatePiano(){
piano.querySelectorAll(".cell").forEach(cell=>{cell.style.background="";});
let tracks=song[1];
if(!Array.isArray(tracks))return;
song.activeTracks.forEach((isActive,trackIndex)=>{
  if(!isActive)return;
  let track=tracks[trackIndex];
  if(!track||!Array.isArray(track[1])||!Array.isArray(track[2]))return;
  if(currSequence!==null){
    let patternId=track[1][currSequence];
    if(!patternId)return;
    let pattern=track[2][patternId-1];
    if(!pattern)return;
    pattern.forEach((note,row)=>{
      if(!note)return;
      let col=note-123;
      let cell=piano.querySelector("[data-col='"+col+"'][data-row='"+row+"']");
      if(cell){
        cell.style.background=getColor(trackIndex);
      }
    });
  }
});
}

function updateSliders(){
let ss=sliders.querySelectorAll(".slider");
let i=getActiveTrackIndex();
if(i!==null){
  ss.forEach(s=>{s.value=song[1][i]?.[0]?.[s.dataset.index]??0;s.disabled=false;});
}else{
  ss.forEach(s=>{s.disabled=true;s.value=0;});
}
}

function updateSequencer(){
let cells=sequencer.querySelectorAll(".cell");
let anyColActive=song.activeTracks.some(x=>x);
cells.forEach(cell=>{
  cell.classList.remove("active","row-selected","col-selected");
  let {row,col}=cell.dataset;
  if(row===undefined&&col===undefined)return;
  if(row===undefined){
    if(song.activeTracks[col])cell.classList.add("col-selected");
  }else if(col===undefined){
    if(previewAudioSource){previewAudioSource.stop();previewAudioSource=null;}
    if(song.activeSequences[row])cell.classList.add("row-selected");
  }else{
    let r=parseInt(row),c=parseInt(col);
    let track=song[1][c];
    if(track&&track[1]?.[r]!==undefined){
      let patternId=track[1][r];
      let isRowActive=song.activeSequences[r];
      let isColActive=song.activeTracks[c];
      if((isRowActive&&isColActive)||(isRowActive&&!anyColActive)||(isColActive&&!anyColActive)){
        cell.classList.add("active");
      }
      cell.textContent=patternId===0?"":patternId;
    }
  }
});
}

function updateText(){text.textContent=formatSongDataForDisplay(song);}











function stopPlayback(){
if(playbackAnimationId){cancelAnimationFrame(playbackAnimationId);playbackAnimationId=null;}
sequencer.querySelectorAll(".row-header").forEach(h=>h.classList.remove("row-playing"));
if(A){A.onended=null;A.stop();A.disconnect();A=null;}
}

function startPlayback(){
PLAYER(audioContext,synth=>{
  let activeSongParts=getActiveSongDataForPlayback();
  audioBuffer=synth.song(activeSongParts);
  A=audioContext.createBufferSource();
  A.buffer=audioBuffer;
  A.connect(audioContext.destination);
  A.onended=()=>{startPlayback();};
  let startTime=audioContext.currentTime;
  A.start(startTime);
  A.startTime=startTime;
  playbackAnimationId=requestAnimationFrame(updatePlaybackPointers);
});
}

function updatePlaybackPointers(){
try{
if(!A||!audioBuffer)return;
let elapsed=(audioContext.currentTime-A.startTime)%audioBuffer.duration;
let activeSequences=song.activeSequences.map((isOn,i)=>isOn?i:-1).filter(i=>i!==-1);
if(activeSequences.length===0)return;
let sequenceDuration=beatsToSeconds(SR,bpm);
let pianoRowDuration=sequenceDuration/PR;
if((elapsed/sequenceDuration)>activeSequences.length){
  if(playbackAnimationId)cancelAnimationFrame(playbackAnimationId);
  return;
}
currSequence=activeSequences[Math.floor(elapsed/sequenceDuration)%activeSequences.length];
let pianoRowIndex=Math.floor(elapsed/pianoRowDuration)%PR;
if(currSequence!==prevSequence){
  updateGridPointer(sequencer,SR,currSequence);
  prevSequence=currSequence;
  updatePiano();
}
updateGridPointer(piano,PR,pianoRowIndex);
}catch(err){console.error("Playback pointer error:",err);
}finally{playbackAnimationId=requestAnimationFrame(updatePlaybackPointers);}
function updateGridPointer(grid,totalRows,activeRow){
  for(let r=0;r<totalRows;r++){
    let rowHeader=grid.querySelector(".row-header[data-row='"+r+"'], .cell[data-row='"+r+"'][data-col='0']");
    if(rowHeader)rowHeader.classList.toggle("row-playing",r===activeRow);
  }
}
}











function handleSequencerClick(event){
let cell=event.target;
if(!cell.classList.contains("cell"))return;
let {row,col}=cell.dataset;
if(row===undefined&&col===undefined){
  let allOn=song.activeTracks.every(x=>x)&&song.activeSequences.every(y=>y);
  let toggleValue=allOn?0:1;
  song.activeTracks.fill(toggleValue);
  song.activeSequences.fill(toggleValue);
}else if(row===undefined){
  song.activeTracks[col]=song.activeTracks[col]?0:1;
  previewTrackSound(col);
}else if(col===undefined){
  song.activeSequences[row]=song.activeSequences[row]?0:1;
}else{
  let r=parseInt(row),c=parseInt(col);
  if(!song[1][c])song[1][c]=[[],[],[]];
  if(!song[1][c][1])song[1][c][1]=[];
  let currentPatternId=song[1][c][1][r]??0;
  song[1][c][1][r]=(currentPatternId+1)%9;
}
updateSequencer();
updateText();
updatePiano();
updateSliders();
let isAnyTrackActive=song.activeTracks.some(x=>x);
let isAnySequenceActive=song.activeSequences.some(y=>y);
if(isAnyTrackActive&&isAnySequenceActive){stopPlayback();startPlayback();}else{stopPlayback();}
}

function handlePianoClick(event){
let activeTrackCount=song.activeTracks.reduce((a,b)=>a+b,0);
let activeSequenceCount=song.activeSequences.reduce((a,b)=>a+b,0);
if(activeTrackCount!==1||activeSequenceCount!==1)return;
let pianoCol=parseInt(event.target.dataset.col);
let pianoRow=parseInt(event.target.dataset.row);
let trackIndex=song.activeTracks.indexOf(1);
let sequenceIndex=song.activeSequences.indexOf(1);
let patternId=song[1][trackIndex][1][sequenceIndex];
if(!patternId)return;
let patternIndex=patternId-1;
if(!song[1][trackIndex][2][patternIndex]){
  song[1][trackIndex][2][patternIndex]=[];
}
let pattern=song[1][trackIndex][2][patternIndex];
let noteValue=pianoCol+123;
pattern[pianoRow]=(pattern[pianoRow]===noteValue)?0:noteValue;
updateText();
updatePiano();
}

function handleSongPaste(event){
event.preventDefault();
let pastedText=(event.clipboardData).getData("text");
let keepInstrumentsOnly=confirm("Delete song patterns and keep only the instruments?");
let newSongData;
try{
  let sanitizedJson=fillEmptyArrayValues(pastedText);
  newSongData=JSON.parse(sanitizedJson);
  while(newSongData[1].length<8){newSongData[1].push([[7,0,0,0,192,2,7,0,0,0,192,2,0,0,0,20000,192,0,0,0,0,121,0,0,0,0,0,0,0],[],[]]);}
  if(newSongData[1].length>8){newSongData[1].length=8;}
}catch(err){alert("Invalid JSON! Paste failed.");return;}
if(newSongData&&Array.isArray(newSongData[1])){
  newSongData[1].forEach(track=>{
    if(track&&Array.isArray(track[0])){
      while(track[0].length<29){
        track[0].push(0);
      }
    }
  });
}
if(keepInstrumentsOnly){newSongData=stripSongData(newSongData);}
song[0]=newSongData[0];
song[1]=newSongData[1];
bpm=samplesToBPM(song[0]);
updateText();
updateSequencer();
}

function handleSongInput(){
if(text.textContent==""){
  let s=[];
  s.push(5000);
  s.push([]);
  for(let i=0;i<8;i++){ 
    s[1].push([[7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[],[]]); 
    s[1][i][0][0]=7;
    s[1][i][0][4]=255;
    s[1][i][0][16]=255;
  }
  text.textContent=formatSongDataForDisplay(s);
}
try{
let s=JSON.parse(text.textContent);
s.activeTracks=song.activeTracks;
s.activeSequences=song.activeSequences;
song=s;
bpm=samplesToBPM(song[0]);
updateSequencer();
updateSliders();
updatePiano();
previewTrackSound(getActiveTrackIndex());
}catch(e){}
}

function handleSliderInput(event){
if(!event.target.classList.contains("slider"))return;
if(previewAudioSource){previewAudioSource.stop();previewAudioSource=null;}
let trackIndex=getActiveTrackIndex();
if(trackIndex===null)return;
let slider=event.target;
let paramIndex=parseInt(slider.dataset.index);
let value=parseInt(slider.value);
if(!song[1][trackIndex])song[1][trackIndex]=[[],[],[]];
let instrument=song[1][trackIndex][0];
while(instrument.length<=paramIndex){instrument.push(0);}
instrument[paramIndex]=value;
updateText();
}

function handleSliderChange(event){
if(!event.target.classList.contains("slider"))return;
let trackIndex=getActiveTrackIndex();
if(trackIndex!==null){previewTrackSound(trackIndex);}
}

function handleFullscreenToggle() {
let el=document.documentElement;
if(el.requestFullscreen)el.requestFullscreen();
fullscreenButton.style.display="none";
}











function addEventListeners(){
sequencer.addEventListener("click",handleSequencerClick);
piano.addEventListener("click",handlePianoClick);
text.addEventListener("paste",handleSongPaste);
text.addEventListener("input",handleSongInput);
sliders.addEventListener("input",handleSliderInput);
sliders.addEventListener("change",handleSliderChange);
fullscreenButton.addEventListener("click", handleFullscreenToggle);
document.addEventListener("fullscreenchange",()=>{ if(!document.fullscreenElement){ fullscreenButton.style.display="block"; } });
}











function getActiveTrackIndex(){
let activeIndices=song.activeTracks.map((isActive,index)=>isActive?index:-1).filter(index=>index!==-1);
return activeIndices.length===1?activeIndices[0]:null;
}

function getActiveSongDataForPlayback(){
let songCopy=JSON.parse(JSON.stringify(song));
songCopy.activeTracks=[...song.activeTracks];
songCopy.activeSequences=[...song.activeSequences];
for(let t=songCopy[1].length-1;t>=0;t--){
  if(!songCopy.activeTracks[t]){
    songCopy[1].splice(t,1);
  }else{
    for(let s=songCopy[1][t][1].length-1;s>=0;s--){
      if(!songCopy.activeSequences[s]){
        songCopy[1][t][1].splice(s,1);
      }
    }
  }
}
return songCopy;
}

function stripSongData(songData){
let songCopy=JSON.parse(JSON.stringify(songData));
let instruments=songCopy[1].map(track=>[track[0],[],[]]);
return [songCopy[0],instruments];
}

function formatSongDataForDisplay(songData) {
  function stringify(arr) {return "[" + arr.map(x => Array.isArray(x) ? "\n" + stringify(x) : x || 0).join(",") + "]";}
  return fillEmptyArrayValues(stringify(songData));
}

function fillEmptyArrayValues(s){
let prev;
do{prev=s;s=s.replace(/,\s*,/g,",0,").replace(/\[\s*,/g,"[0,").replace(/,\s*\]/g,",0]");}while(s!==prev);
return s;
}

function previewTrackSound(trackIndex){
if(previewAudioSource){previewAudioSource.stop();previewAudioSource=null;}
let instrument=song[1][trackIndex]?.[0];
PLAYER(audioContext,synth=>{
let source=audioContext.createBufferSource();
if(instrument===undefined)return;
try{ source.buffer=synth.sound(instrument); }catch(e){drawWaveform(null);return;}
source.connect(audioContext.destination);
source.start();
previewAudioSource=source;
source.onended=()=>{if(previewAudioSource===source){previewAudioSource=null;}};
let instrumentForWave=JSON.parse(JSON.stringify(instrument));
instrumentForWave[20]=0;
instrumentForWave[21]=0;
let waveBuffer=synth.sound(instrumentForWave);
drawWaveform(waveBuffer,instrumentForWave);
});
}

function drawWaveform(buffer,t){
let c=canvas.getContext("2d"),m=canvas.height/2;
c.fillStyle="#0A0F0A";c.fillRect(0,0,canvas.width,canvas.height);
if(!buffer||!t){ c.strokeStyle="#39FF14"; c.beginPath();c.moveTo(0,m);c.lineTo(canvas.width,m);c.stroke(); return; }
let d=buffer.getChannelData(0),p=d.length/canvas.width,v=t[16]/255,a=t[13]/p,s=t[14]/p,r=t[15]/p;
c.fillStyle="#003300";c.beginPath();c.moveTo(0,m);
[[a,m-(m*v)],[a+s,m-(m*v)],[a+s+r,m],[a+s,m+(m*v)],[a,m+(m*v)]].forEach(p=>c.lineTo(p[0],p[1]));
c.closePath();c.fill();c.beginPath();c.moveTo(0,m);
for(let x=0;x<canvas.width&&x*p<d.length;x++){c.lineTo(x,m+d[Math.floor(x*p)]*m);}
c.strokeStyle="#39FF14";
c.stroke();
}

function element(tagName,parent=document.body,className=""){
let el=document.createElement(tagName);
if(className)el.className=className;
parent.appendChild(el);
return el;
}

function grid(el,cols,rows){Object.assign(el.style,{gridTemplateColumns:"repeat("+cols+",1fr)",gridTemplateRows:"repeat("+rows+",1fr)"});}
function samplesToBPM(samplesPerStep,sampleRate=44100,stepsPerBeat=4){return (sampleRate*60)/(samplesPerStep*stepsPerBeat);}
function beatsToSeconds(beats,bpm){return (60/bpm)*beats;}
function getColor(i){let hue=((i+5)*360)/9;return "hsl("+hue+", 70%, 50%)";}











function getSliders(){
return [
[["1v",4,255],["1w",5,3],["1o",0,16],["1s",1,11],["1d",2,255]],
[["2v",10,255],["2w",11,3],["2o",6,16],["2s",7,11],["2d",8,255]],
[["ea",13,200000],["es",14,200000],["er",15,200000],["e1",3,1],["e2",9,1]],
[["ct",17,4],["ca",18,11025],["cr",19,255]],
[["mw",28,3],["ms",26,16],["ma",27,255],["m1",24,1],["mc",25,1]],
[["ds",20,16],["da",21,248]],
[["ps",22,16],["pa",23,255]],
[["nv",12,255],["vm",16,255]],
];
}

function getsong(){
return [5513,[
[[7,0,0,1,255,0,7,0,0,1,255,0,0,100,0,5970,171,2,500,254,1,31,4,21,0,0,0,0,0],[],[]],
[[7,0,0,0,255,2,7,0,4,0,255,2,0,88,2000,7505,255,2,3144,51,6,60,4,64,0,1,7,179,0],[],[]],
[[7,0,0,0,192,2,7,0,0,0,201,3,0,100,150,7505,191,2,5839,254,6,121,6,147,0,1,6,195,0],[],[]],
[[9,0,0,0,255,0,9,0,12,0,255,0,0,100,0,14545,70,0,0,240,2,157,3,47,0,0,0,0,0],[],[]],
[[7,0,0,0,255,3,8,0,0,0,255,0,127,22,22,2193,255,3,4067,176,4,12,2,84,0,1,3,96,0],[],[]],
[[7,0,0,0,255,2,7,0,9,0,154,2,0,2418,1075,10614,240,3,2962,255,6,117,3,73,0,1,5,124,0],[],[]],
[[7,0,0,0,192,3,7,0,7,0,201,3,0,789,1234,13636,191,2,5839,254,6,121,6,147,0,1,6,195,0],[],[]],
[[7,0,0,0,192,2,7,0,0,0,192,2,0,0,0,20000,192,0,0,0,0,121,0,0,0,0,0,0,0],[],[]],
]];
}

function applystyle(){
element("style").textContent=`
*{margin:0;padding:0;box-sizing:border-box;scrollbar-width:none;user-select: none;touch-action:manipulation;}
body { display: flex; background:black; color:white;font-weight: bold;font-family:monospace;}
.piano{background:white;}
.piano, .sequencer{ display:grid; }
.cell { display: flex; align-items: center; justify-content: center; border: 1px solid silver; aspect-ratio:1/1; }
.active { background: blue;}
.col-selected, .row-selected { background: gray; }
.row-playing { border-left: 3px solid orange !important; }
.sliders{ display: flex; flex-direction: column; justify-content: space-evenly;  font-size: 8px; }
.sliders > * { display: flex; flex-direction: column; align-items: center; }
.sliders .slider { height: 2px; }
.sliders input[type="range"]::-webkit-slider-thumb { opacity: 0; }
.text{ padding: 10px; font-size: 5px; white-space: pre; overflow: auto; }
.sequencer { height:50dvh; aspect-ratio:1/1; }
.text{ height:25dvh; aspect-ratio:2/1; }
.canvas{ height:25dvh; aspect-ratio:2/1; }
.fullscreen{position:fixed;bottom:5px;right:5px;color:orange;z-index:1000;font-size:20px;}
.text, .canvas {border:1px solid silver; border-top:none;}
`;
}











function main(){
initPiano();
initSliders();
initSequencer();
updateText();
previewTrackSound(0);
addEventListeners();
}

main();
