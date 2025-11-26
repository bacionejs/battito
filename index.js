document.title="Battito";
document.body.style.margin = "0";
document.body.style.display = "flex";
document.body.style.flexDirection = "column";
document.body.style.height = "100vh";
document.body.style.background = "#fafafa";
document.body.style.overflow = "hidden";

// Toolbar
const toolbar = document.createElement("div");
toolbar.id = "toolbar";
toolbar.style.display = "flex";
toolbar.style.alignItems = "flex-start";
toolbar.style.background = "#ddd";
toolbar.style.padding = "5px";
toolbar.style.boxSizing = "border-box";
document.body.appendChild(toolbar);

// Sequencer container
const sequencerContainer = document.createElement("div");
sequencerContainer.id = "sequencer-container";
sequencerContainer.style.marginRight = "auto";
toolbar.appendChild(sequencerContainer);

// Sequencer widget
const S = document.createElement("div");
S.id = "sequencer-widget";
S.style.display = "grid";
S.style.background = "#fff";
S.style.border = "1px solid #ccc";
S.style.boxSizing = "border-box";
sequencerContainer.appendChild(S);

// Song textarea
const T = document.createElement("textarea");
T.id = "song-textarea";
T.style.flex = "1";
T.style.height = "calc(100% - 10px)";
T.style.marginLeft = "5px";
T.style.resize = "none";
T.style.fontFamily = "monospace";
T.style.fontSize = "12px";
T.style.whiteSpace = "pre";
T.style.overflow = "auto";
toolbar.appendChild(T);

// Piano container
const pianoContainer = document.createElement("div");
pianoContainer.id = "piano-container";
pianoContainer.style.flex = "1";
pianoContainer.style.display = "flex";
pianoContainer.style.justifyContent = "center";
pianoContainer.style.alignItems = "start";
pianoContainer.style.background = "#f8f8f8";
pianoContainer.style.overflow = "hidden";
document.body.appendChild(pianoContainer);

// Piano widget
const P = document.createElement("div");
P.id = "piano-widget";
P.style.display = "grid";
pianoContainer.appendChild(P);

const style = document.createElement("style");
style.textContent = `
.cell { display: flex; align-items: center; justify-content: center; box-sizing: border-box; user-select: none; cursor: pointer; border: 1px solid #ccc; }
.header, .row-header { font-weight: bold; background: white; }
.header { z-index: 2; }
.row-header { z-index: 1; }
.active { background-color: #007BFF; color: white; }
.col-selected, .row-selected { background-color: #808080; }
.header[data-col] { background: white; }
.header[data-col].col-selected { background-color: #808080 !important; }
.row-playing { border-left: 3px solid limegreen !important; }
`;
document.head.appendChild(style);


let M=pl_synth_wasm_init;

// let song=[5088,[[[7,0,0,1,255,0,7,0,0,1,255,0,0,100,0,5970,171,2,500,254,1,31,4,21],[1,1,1,1],[[147,0,0,0,147,0,0,0,147,0,0,0,147,0,0,0,147,0,0,0,147,0,0,0,147,0,0,0,147]]],[[7,0,0,0,255,2,7,0,4,0,255,2,0,88,2000,7505,255,2,3144,51,6,60,4,64,0,1,7,179],[1,1,1,1],[[0,0,123,0,0,0,0,0,0,0,0,0,0,0,123,0,123]]],[[7,0,0,0,192,2,7,0,0,0,201,3,0,100,150,7505,191,2,5839,254,6,121,6,147,0,1,6,195],[1,1,2,3],[[135,0,0,0,0,0,0,0,159,0,157,0,159,0,0,0,0,0,0,0,0,0,0,0,147,154,0,159],[138,0,0,0,0,0,0,0,150,0,159,0,162,0,0,0,0,0,0,0,0,0,150,0,162,150,0,159],[149,0,0,0,0,0,0,0,149,0,150,0,154,0,0,0,0,0,0,0,0,0,0,0,147,157,0,159]]]]];//beatnic

// /*
let song=[5513,[
[[7,0,0,1,255,0,7,0,0,1,255,0,0,100,0,5970,171,2,500,254,1,31,4,21],[],[]],
[[7,0,0,0,255,2,7,0,4,0,255,2,0,88,2000,7505,255,2,3144,51,6,60,4,64,0,1,7,179],[],[]],
[[7,0,0,0,192,2,7,0,0,0,201,3,0,100,150,7505,191,2,5839,254,6,121,6,147,0,1,6,195],[],[]],
[[9,0,0,0,255,0,9,0,12,0,255,0,0,100,0,14545,70,0,0,240,2,157,3,47,0,0,0,0,0],[],[]],
[[7,0,0,0,255,3,8,0,0,0,255,0,127,22,22,2193,255,3,4067,176,4,12,2,84,0,1,3,96,0],[],[]],
[[7,0,0,0,255,2,7,0,9,0,154,2,0,2418,1075,10614,240,3,2962,255,6,117,3,73,0,1,5,124,0],[],[]],
[[7,0,0,0,192,3,7,0,7,0,201,3,0,789,1234,13636,191,2,5839,254,6,121,6,147,0,1,6,195,0],[],[]],
[[7,0,0,0,192,2,7,0,0,0,192,2,0,0,0,20000,192,0,0,0,0,121,0,0,0,0,0,0,0],[],[]],//piano
// [[7,0,0,0,192,2,7,0,0,0,192,2,0,0,0,20000,192,0,0,0,0,121,0,0,0,0,0,0,0],[],[]],
// [[7,0,0,0,216,1,7,0,11,0,235,1,0,789,1234,14259,144,2,8029,116,3,113,1,105,0,1,3,158,1],[],[]],
// [[7,0,0,0,192,1,6,0,9,0,192,1,0,137,2000,4611,192,1,982,89,6,25,6,77,0,1,3,69],[],[]],
]];
// */





song.x=[0,0,0,0,0,0,0,0]; song.y=[0,0,0,0,0,0,0,0];
let pianoRows=32,pianoCols=48;let sequencerCols=8,sequencerRows=8,toolbarHeight=innerWidth/2;
let raf; let prevSequence=null;let currSequence; let A=new AudioContext(),C,B=null; let bpm=samplesToBPM(song[0]);

/*********INIT*********/
initSequencer();initPiano();

function initSequencer(){
let size=toolbarHeight/(sequencerRows+1);
S.style.width=S.style.height=toolbarHeight+"px";
S.style.gridTemplateColumns=size+"px repeat("+sequencerCols+", "+size+"px)";
S.style.gridTemplateRows=size+"px repeat("+sequencerRows+", "+size+"px)";
//Top-left
let topLeft=div();topLeft.className="cell header";S.appendChild(topLeft);
//Columnheaders
for(let c=0;c<sequencerCols;c++){
  let chead=div();
  chead.className="cell header";
  chead.textContent=String.fromCharCode(65+c);
  chead.dataset.col=c;
  S.appendChild(chead);
}
//Rows+cells
for(let r=0;r<sequencerRows;r++){
  let rhead=div();rhead.className="cell row-header";
  rhead.textContent=r+1;rhead.dataset.row=r;S.appendChild(rhead);
  for(let c=0;c<sequencerCols;c++){
    let cell=div();cell.className="cell";
    cell.dataset.row=r;cell.dataset.col=c;
    if(song[1][c]&&song[1][c][1][r]!==undefined)cell.textContent=song[1][c][1][r];
    S.appendChild(cell);
  }
}
initTrackColor();
}

function initPiano(){P.innerHTML="";
let size=Math.floor(Math.min(P.parentElement.clientWidth/pianoCols,P.parentElement.clientHeight/pianoRows));
P.style.gridTemplateColumns="repeat("+pianoCols+", "+size+"px)";
P.style.gridTemplateRows="repeat("+pianoRows+", "+size+"px)";
for(let r=0;r<pianoRows;r++){
  for(let c=0;c<pianoCols;c++){
    let cell=div();
    cell.className="cell";
    cell.dataset.row=r;cell.dataset.col=c;
    cell.style.border="1px solid #ccc";
    if(c%12===0)cell.style.borderLeft="1px solid #333";
    if(r%4===0)cell.style.borderTop="1px solid #666";
    P.appendChild(cell);
  }
}
}

function updateSequencerSelection(){
let cells=S.querySelectorAll(".cell");
let anyRowOn=song.y.some(y=>y);
let anyColOn=song.x.some(x=>x);
cells.forEach(cell=>{
  let row=cell.dataset.row,col=cell.dataset.col;
  cell.classList.remove("active","row-selected","col-selected");
  if(row===undefined&&col===undefined)return;
  if(row===undefined&&col!==undefined){
    let c=parseInt(col);
    if(song.x[c]){
      cell.classList.add("col-selected");
      cell.style.background="silver";
    }else{
      cell.style.background="white";
    }
  }
  else if(col===undefined&&row!==undefined){
    if(song.y[row])cell.classList.add("row-selected");
  }
  else{
    let r=parseInt(row),c=parseInt(col);
    if(song[1][c]&&song[1][c][1][r]!==undefined){
      let val=song[1][c][1][r];
      let rowOn=song.y[r],colOn=song.x[c];
      if((rowOn&&colOn)||(rowOn&&!anyColOn)||(colOn&&!anyRowOn))cell.classList.add("active");
      cell.textContent=val===0?"":val;
    }
  }
});
}

function updatePiano(){
P.querySelectorAll(".cell").forEach(cell=>{cell.style.background="";});
let tracks=song[1];
if(!Array.isArray(tracks))return;
song.x.forEach((trackActive,sx)=>{
  if(!trackActive)return;
  let track=tracks[sx];
  if(!track||!Array.isArray(track[1])||!Array.isArray(track[2]))return;
  if(currSequence!==null){
    let patId=track[1][currSequence];
    if(!patId)return;
    let patIndex=patId-1;
    let pattern=track[2][patIndex];
    if(!pattern)return;
    pattern.forEach((note,row)=>{
      if(!note)return;
      let col=note-123;
      let cell=P.querySelector("[data-col='"+col+"'][data-row='"+row+"']");
      if(cell){
        let color=(typeof trackColor==="function")?trackColor(sx):"#88f";
        cell.style.background=color;
      }
    });
  }
});
}

function stopPlayback(){
if(raf){cancelAnimationFrame(raf);raf=null;}
S.querySelectorAll(".row-header").forEach(h=>h.classList.remove("row-playing"));
if(C){C.onended=null;C.stop();C.disconnect();C=null;}
}

function startPlayback(){M(A,m=>{
C=A.createBufferSource(); B=m.song(songParts()); C.buffer=B; C.connect(A.destination);
C.onended=()=>{startPlayback();};
let t=A.currentTime; C.start(t); C.startTime=t;
raf=requestAnimationFrame(pointers);
});}

function pointers(){try{if(!C||!B)return;
let elapsed=(A.currentTime-C.startTime)%B.duration;
let sequences=song.y.map((on,i)=>on?i:-1).filter(i=>i!==-1);
if(sequences.length===0)return;
let time=beatsToSeconds(sequencerRows,bpm);
if((elapsed/time)>sequences.length){cancelAnimationFrame(raf);return;}
currSequence=sequences[Math.floor(elapsed/time)%sequences.length];
sequencerPointer();
pianoPointer(Math.floor(elapsed/(time/pianoRows))%pianoRows);
}catch(err){console.error("error:",err);}finally{raf=requestAnimationFrame(pointers);}
}

function sequencerPointer(){if(currSequence===prevSequence)return;point(S,sequencerRows,currSequence);prevSequence=currSequence;updatePiano();}
function pianoPointer(i){point(P,pianoRows,i)}
function point(o,rows,i){for(let r=0;r<rows;r++){o.querySelector(".cell[data-row='"+r+"'][data-col='0']").style.borderLeft=(r===i)?"3px solid lime":"1px solid black";}}

function songParts(){let c=JSON.parse(JSON.stringify(song));c.x=[...song.x];c.y=[...song.y];
for(let t=c[1].length-1;t>=0;t--)if(!c.x[t])c[1].splice(t,1),c.x.splice(t,1);
else for(let j=c[1][t][1].length-1;j>=0;j--)if(!c.y[j])c[1][t][1].splice(j,1);
return c;
}

S.addEventListener("click",e=>{let cell=e.target;if(!cell.classList.contains("cell"))return;let row=cell.dataset.row,col=cell.dataset.col;
if(row===undefined&&col===undefined){//top-left
  let allon=song.x.every(x=>x)&&song.y.every(y=>y);
  song.x=song.x.map(()=>allon?0:1);song.y=song.y.map(()=>allon?0:1);
}
else if(row===undefined&&col!==undefined){//column
  let c=parseInt(col);
  song.x[c]=song.x[c]?0:1;
  sound(col);
}
else if(col===undefined&&row!==undefined){//row
  let r=parseInt(row);
  song.y[r]=song.y[r]?0:1;
}
else{//cell
  let r=parseInt(row),c=parseInt(col);
  if(!song[1][c])song[1][c]=[[],[],[]];
  song[1][c][1][r]=((song[1][c][1][r]??0)+1)%9;
}
updateSequencerSelection();updateText();updatePiano();
if(song.x.some(x=>x)&&song.y.some(y=>y)){stopPlayback();startPlayback();}else{stopPlayback();}
});

P.addEventListener("click",e=>{
if(song.x.reduce((a,b)=>a+b,0)!==1||song.y.reduce((a,b)=>a+b,0)!==1)return;//one
let px=parseInt(e.target.dataset.col);let py=parseInt(e.target.dataset.row);//pianoxy
let sx=song.x.indexOf(1);let sy=song.y.indexOf(1);//sequencerxy
sy=song[1][sx][1][sy];sy=sy-1;//patternid
if(!song[1][sx][2][sy])song[1][sx][2][sy]=[];//pattern
song[1][sx][2][sy][py]=(song[1][sx][2][sy][py]==px+123)?0:px+123;//patternnote
updateText();
updatePiano();
});

T.addEventListener("paste",(e)=>{e.preventDefault();
let s,pastedText=(e.clipboardData).getData("text"),yes=confirm("Delete song and keep only the instruments?");
try{s=JSON.parse(pastedText);}catch(err){alert("Invalid JSON! Paste failed.");return;}if(yes){s=stripSong(s);}
song[0]=s[0];song[1]=s[1];song.x=song.x||Array(song.x?.length||8).fill(0);song.y=song.y||Array(song.y?.length||8).fill(0);
let sequencerCells=S.querySelectorAll(".cell:not(.header):not(.row-header)");sequencerCells.forEach(cell=>{cell.textContent="";});
let pianoCells=P.querySelectorAll(".cell");pianoCells.forEach(cell=>{cell.style.background="";});
updateText();updateSequencerSelection();
});

T.addEventListener("input",()=>{try{let newSong=JSON.parse(T.value);newSong.x=song.x;newSong.y=song.y;song=newSong;}catch(e){/*bad*/}});

function songToString(a){return "["+a.map(x=>Array.isArray(x)?"\n"+songToString(x):x||0).join(",")+"]";}
function stripSong(s){let c=JSON.parse(JSON.stringify(s));return [c[0],c[1].map(t=>{return [t[0],[],[]];})];}
function samplesToBPM(samplesPerStep,sampleRate=44100,stepsPerBeat=4){return (sampleRate*60)/(samplesPerStep*stepsPerBeat);}
function beatsToSeconds(beats,bpm){return (60/bpm)*beats;}
function initTrackColor(){S.querySelectorAll(".header[data-col]").forEach(h=>{h.style.color=trackColor(parseInt(h.dataset.col));});}
function trackColor(trackIndex){let hue=(trackIndex*360)/sequencerRows;return "hsl("+hue+", 70%, 50%)";}
function updateText(){if(T){T.value=songToString(song);}}
function sound(track){M(A,m=>{let s=A.createBufferSource();s.buffer=m.sound(song[1][parseInt(track)][0]);s.connect(A.destination);s.start();});}
function div(){return document.createElement("div");}

