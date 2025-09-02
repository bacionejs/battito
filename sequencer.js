song.x = [0,0,0,0,0,0,0,0]; 
song.y = [0,0,0,0,0,0,0,0];

let audioContext = new AudioContext(), source;

/********* SONG TEXTAREA *********/
const songTextarea = document.getElementById('song-textarea');

function refreshSongTextarea() {
  if (songTextarea) {
    songTextarea.value = JSON.stringify(song, null, 2);
  }
}

function getActiveSongClone(row = null) {
let clonedSong = JSON.parse(JSON.stringify(song));
clonedSong.x = [...song.x];
clonedSong.y = [...song.y];
const tracks = clonedSong[1];
for (let t = tracks.length - 1; t >= 0; t--) {
  if (!clonedSong.x[t]) {
    tracks.splice(t, 1);
    clonedSong.x.splice(t, 1);
    continue;
  }
  const sequence = tracks[t][1];
  for (let j = sequence.length - 1; j >= 0; j--) {
    if (!clonedSong.y[j]) {
      sequence.splice(j, 1);
    }
  }
}
// If row is requested, return only that row’s data across all tracks
if (row !== null) {
  const rowData = tracks.map(t => t[1][row] ?? null);
  return rowData;
}
return clonedSong;
}




// Allow editing JSON manually
songTextarea.addEventListener('input', () => {
  try {
    const newSong = JSON.parse(songTextarea.value);
    newSong.x=song.x;
    newSong.y=song.y;
    song = newSong;
  } catch (e) {
    // ignore invalid JSON
  }
});


/********* SONG TEXTAREA SYNC *********/
function refreshSongTextarea() {
  if (songTextarea) {
    songTextarea.value = sparseArrayToString(song);
  }
}






function sparseArrayToString(a) {
let str = '[';
for (let i = 0; i < a.length; i++) {
  if (i > 0) str += ',';
  if (i in a) {
    if (Array.isArray(a[i])) {
      str += "\n" + sparseArrayToString(a[i]);
    } else {
      str += a[i];
    }
  } else {
    // Hole case
    str += '0';
  }
}
str += ']';
return str;
}








function strip(song) {
  const clonedSong = JSON.parse(JSON.stringify(song));
  const tempo = clonedSong[0];
  const tracks = clonedSong[1];
  const strippedTracks = tracks.map(track => {
    return [
      track[0],   // keep only the first array
      [],         // clear the second array
      []          // clear the third array
    ];
  });
  return [tempo, strippedTracks];
}

/********* INTERCEPT PASTE *********/
songTextarea.addEventListener('paste', (e) => {
e.preventDefault(); // stop the default paste behavior
const pastedText = (e.clipboardData || window.clipboardData).getData('text');
const stripData = confirm("Delete song and keep only the instruments?");
let parsedSong;
try {
  parsedSong = JSON.parse(pastedText);
} catch (err) {
  alert("Invalid JSON! Paste failed.");
  return;
}
if (stripData) { parsedSong = strip(parsedSong); }
song[0] = parsedSong[0];       // tempo
song[1] = parsedSong[1];       // tracks
song.x = song.x || Array(song.x?.length || 8).fill(0); // keep axis arrays or initialize
song.y = song.y || Array(song.y?.length || 8).fill(0);
const sequencerCells = sequencerWidget.querySelectorAll('.cell:not(.header):not(.row-header)'); sequencerCells.forEach(cell => { cell.textContent = ''; });
const pianoCells = pianoWidget.querySelectorAll('.cell'); pianoCells.forEach(cell => { cell.style.background = ''; });
refreshSongTextarea();
updateSequencerSelection();
});

















/********* SEQUENCER WIDGET *********/
const cellSize=toolbarHeight/(sequencerRows+1);
sequencerWidget.style.height=toolbarHeight+'px';
sequencerWidget.style.width=cellSize*(sequencerCols+1)+'px';
sequencerWidget.style.gridTemplateColumns=`${cellSize}px repeat(${sequencerCols}, ${cellSize}px)`;
sequencerWidget.style.gridTemplateRows=`${cellSize}px repeat(${sequencerRows}, ${cellSize}px)`;

// Top-left
const topLeft=document.createElement('div'); topLeft.className='cell header'; sequencerWidget.appendChild(topLeft);

// Column headers
for(let c=0;c<sequencerCols;c++){
  const colHeader=document.createElement('div');
  colHeader.className='cell header';
  colHeader.textContent=String.fromCharCode(65+c);
  colHeader.dataset.col=c;
  sequencerWidget.appendChild(colHeader);
}

// Rows + cells
for(let r=0;r<sequencerRows;r++){
  const rowHeader=document.createElement('div'); rowHeader.className='cell row-header';
  rowHeader.textContent=r+1; rowHeader.dataset.row=r; sequencerWidget.appendChild(rowHeader);
  for(let c=0;c<sequencerCols;c++){
    const cell=document.createElement('div'); cell.className='cell';
    cell.dataset.row=r; cell.dataset.col=c;
    if(song[1][c] && song[1][c][1][r]!==undefined) cell.textContent=song[1][c][1][r];
    sequencerWidget.appendChild(cell);
  }
}



/********* INIT *********/
applyTrackColor();
renderPianoWidget(); refreshSongTextarea();


/********* COLOR SEQUENCER WIDGET X-AXIS HEADERS *********/
function applyTrackColor(){
  const headers = sequencerWidget.querySelectorAll('.header[data-col]');
  headers.forEach(h => {
    const color = getTrackColor(parseInt(h.dataset.col));
    h.style.color = color;      // <-- use track color for text
    h.style.background = "white"; // default background
  });
}

function updateSequencerSelection(){
  const cells=sequencerWidget.querySelectorAll('.cell');
  const anyRowOn=song.y.some(y=>y);
  const anyColOn=song.x.some(x=>x);
  cells.forEach(cell=>{
    const row=cell.dataset.row, col=cell.dataset.col;
    cell.classList.remove('active','row-selected','col-selected');
    if(row===undefined && col===undefined) return;
    if(row===undefined && col!==undefined){
      const c=parseInt(col);
      if(song.x[c]){
        cell.classList.add('col-selected');
        cell.style.background = "#808080";  // gray when selected
      } else {
        cell.style.background = "white";    // reset if not selected
      }
    }
    else if(col===undefined && row!==undefined){
      if(song.y[row]) cell.classList.add('row-selected');
    }
    else {
      const r=parseInt(row), c=parseInt(col);
      if(song[1][c] && song[1][c][1][r]!==undefined){
        const val=song[1][c][1][r];
        const rowOn=song.y[r], colOn=song.x[c];
        if((rowOn && colOn)|| (rowOn && !anyColOn)|| (colOn && !anyRowOn))
          cell.classList.add('active');
        cell.textContent=val===0?'':val;
      }
    }
  });
}

/********* SEQUENCER WIDGET CLICK HANDLING *********/
sequencerWidget.addEventListener('click', e => {
const cell = e.target; 
if(!cell.classList.contains('cell')) return;
const row = cell.dataset.row, col = cell.dataset.col;
if(row===undefined && col===undefined){ // top-left cell: toggle all on/off
  const allOn = song.x.every(x=>x) && song.y.every(y=>y);
  song.x = song.x.map(()=>allOn?0:1); 
  song.y = song.y.map(()=>allOn?0:1);
}

else if(row===undefined && col!==undefined){ // column header toggle
  const c = parseInt(col); 
  song.x[c] = song.x[c] ? 0 : 1; 
  let d=song[1][parseInt(col)][0];
  if (!audioContext) audioContext = new AudioContext();
  pl_synth_wasm_init(audioContext, synth => {
    const buffer = synth.sound(d);
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start();
  });
}
else if(col===undefined && row!==undefined){ // row header toggle
  const r = parseInt(row); 
  song.y[r] = song.y[r] ? 0 : 1;
}
  else { // inner cell click: cycle through values 0–9
  const r = parseInt(row), c = parseInt(col);
  if (!song[1][c]) song[1][c] = [[], [], []];// if track not defined, initialize it
  song[1][c][1][r] = ((song[1][c][1][r] ?? 0) + 1) % 10; // cycle value, treating undefined as 0
}
updateSequencerSelection(); 
refreshSongTextarea();
if(song.x.some(x => x) && song.y.some(y => y)){
  stopPlayback(); startPlayback();
} else {
  stopPlayback();
}
});

















function renderSongToPiano(sequencerRow = null) {
  // clear piano first
  pianoWidget.querySelectorAll('.cell').forEach(cell => {
    cell.style.background = ''; // reset
  });

  const tracks = song[1];
  if (!Array.isArray(tracks)) return;

  // loop through all active tracks
  song.x.forEach((trackActive, sx) => {
    if (!trackActive) return;

    const track = tracks[sx];
    if (!track || !Array.isArray(track[1]) || !Array.isArray(track[2])) return; // defensive

    if (sequencerRow !== null) {
      const sequence = track[1];
      const patId = sequence[sequencerRow];
      if (!patId) return; // nothing assigned for this sequencer row

      const patIndex = patId - 1;
      const pattern = track[2][patIndex];
      if (!pattern) return;

      // render the entire pattern (32 rows)
      pattern.forEach((note, row) => {
        if (!note) return;
        const col = note - 123;
        const cell = pianoWidget.querySelector(`[data-col="${col}"][data-row="${row}"]`);
        if (cell) {
          const color = (typeof getTrackColor === 'function') ? getTrackColor(sx) : '#88f';
          cell.style.background = color;
        }
      });
    } else {
      // fallback: render all active patterns across song.y
      song.y.forEach((patActive, sy) => {
        if (!patActive) return;
        const patId = track[1][sy];
        if (!patId) return;
        const patIndex = patId - 1;
        const pattern = track[2][patIndex];
        if (!pattern) return;
        pattern.forEach((note, row) => {
          if (!note) return;
          const col = note - 123;
          const cell = pianoWidget.querySelector(`[data-col="${col}"][data-row="${row}"]`);
          if (cell) {
            const color = (typeof getTrackColor === 'function') ? getTrackColor(sx) : '#88f';
            cell.style.background = color;
          }
        });
      });
    }
  });
}






let currentSequencerRow;



let bpm=samplesToBPM(song[0]);
function samplesToBPM(samplesPerStep, sampleRate = 44100, stepsPerBeat = 4) {
  return (sampleRate * 60) / (samplesPerStep * stepsPerBeat);
}
function beatsToSeconds(beats, bpm) {
  return (60 / bpm) * beats;
}






function highlightRow(stepNumber) {
  for (let r = 0; r < 32; r++) {
    const firstCell = pianoWidget.querySelector(`.cell[data-row="${r}"][data-col="0"]`);
    if (firstCell) {
      if (r === stepNumber) {
        firstCell.style.borderLeft = "3px solid lime";
      } else {
        firstCell.style.borderLeft = "1px solid black";
      }
    }
  }
}



let isPlaying = false;
let playRAF;

function startPlayback() {
pl_synth_wasm_init(audioContext, synth => {
  if (playRAF) cancelAnimationFrame(playRAF);
  sequencerWidget.querySelectorAll('.row-header.row-playing').forEach(h => h.classList.remove('row-playing'));
  source = audioContext.createBufferSource();
  const activeSong = getActiveSongClone();
  buffer = synth.song(activeSong);
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.onended = () => { startPlayback(); };
  const startTime = audioContext.currentTime;
  source.start(startTime);
  source.startTime = startTime;
  let sequencerLastRow = null;

  function sequencerPointer() {
  try {
    if (!source || !buffer) return;

    // how far into the loop are we?
    const elapsed = (audioContext.currentTime - source.startTime) % buffer.duration;

    // active sequencer rows
    const activeSequencerRows = song.y.map((on, i) => on ? i : -1).filter(i => i !== -1);
    if (activeSequencerRows.length === 0) return;

    // how long each sequencer row lasts
    const sequencerRowDuration = beatsToSeconds(sequencerRows, bpm);

    // which sequencer row are we on?
    const sequencerActiveIndex =
      Math.floor(elapsed / sequencerRowDuration) % activeSequencerRows.length;
    currentSequencerRow = activeSequencerRows[sequencerActiveIndex];

    // highlight sequencer row (existing logic)
    if (currentSequencerRow !== sequencerLastRow) {
      if (sequencerLastRow !== null) {
        const prev = sequencerWidget.querySelector(
          `.row-header[data-row="${sequencerLastRow}"]`
        );
        if (prev) prev.classList.remove("row-playing");
      }
      const sequencerRowHeader = sequencerWidget.querySelector(
        `.row-header[data-row="${currentSequencerRow}"]`
      );
      if (sequencerRowHeader) sequencerRowHeader.classList.add("row-playing");
      sequencerLastRow = currentSequencerRow;

      renderSongToPiano(currentSequencerRow);
    }

    // 🔹 NEW: piano sub-steps (32 per sequencer row)
    const pianoStepDuration = sequencerRowDuration / 32;
    const pianoStepIndex = Math.floor(elapsed / pianoStepDuration) % 32;

    highlightRow(pianoStepIndex);

  } catch (err) {
    console.error("sequencerPointer error:", err);
  } finally {
    playRAF = requestAnimationFrame(sequencerPointer);
  }
}



  playRAF = requestAnimationFrame(sequencerPointer);
});
}

function stopPlayback() {
  if (playRAF) {
    cancelAnimationFrame(playRAF);
    playRAF = null;
  }
  sequencerWidget.querySelectorAll(".row-header").forEach(h => h.classList.remove("row-playing"));
  if (source) {
    source.onended = null;
    source.stop();
    source.disconnect();
    source = null;
  }
}








