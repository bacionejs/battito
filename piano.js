/********* PIANO ROLL *********/
function renderPianoWidget(){
  pianoWidget.innerHTML='';
  const width=pianoWidget.parentElement.clientWidth;
  const height=pianoWidget.parentElement.clientHeight;
  const size=Math.floor(Math.min(width/pianoCols,height/pianoRows));
  pianoWidget.style.gridTemplateColumns=`repeat(${pianoCols}, ${size}px)`;
  pianoWidget.style.gridTemplateRows=`repeat(${pianoRows}, ${size}px)`;

  for(let r=0;r<pianoRows;r++){
    for(let c=0;c<pianoCols;c++){
      const cell=document.createElement('div'); cell.className='cell';
      cell.dataset.row=r; cell.dataset.col=c;
      cell.style.border='1px solid #ccc';
      if(c%12===0) cell.style.borderLeft='1px solid #333';
      if(r%4===0) cell.style.borderTop='1px solid #666';
      pianoWidget.appendChild(cell);
    }
  }
}

pianoWidget.addEventListener('click',e=>{
if(song.x.reduce((a,b)=>a+b,0)!==1||song.y.reduce((a,b)=>a+b,0)!==1)return;//You can only edit one track and one pattern at a time
let px=parseInt(e.target.dataset.col);let py=parseInt(e.target.dataset.row);//pianoxy
let sx=song.x.indexOf(1);let sy=song.y.indexOf(1);//sequencerxy
sy=song[1][sx][1][sy];sy=sy-1;//patternid
if(!song[1][sx][2][sy])song[1][sx][2][sy]=[];//pattern
song[1][sx][2][sy][py]=(song[1][sx][2][sy][py]==px+123)?0:px+123;//patternnote
refreshSongTextarea();
renderSongToPiano(currentSequencerRow);
});

















