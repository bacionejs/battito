
const SR = 8;
const SC = 8;
const PR = 32;
const PC = 48;
const WASM_SYNTH_INITIALIZER = pl_synth_wasm_init;

// --- Instrument Parameter Definitions ---
const PARAM_MAP = [
  // Oscillator 1
  {color:"#ff8080", label:'1v', index:4, min:0, max:255, description:'Oscillator 1: Volume'},
  {color:"#ff8080", label:'1w', index:5, min:0, max:3, description:'Oscillator 1: Waveform (0:Sin,1:Sqr,2:Saw,3:Tri)'},
  {color:"#ff8080", label:'1o', index:0, min:0, max:16, description:'Oscillator 1: Octave'},
  {color:"#ff8080", label:'1s', index:1, min:0, max:11, description:'Oscillator 1: Semitone'},
  {color:"#ff8080", label:'1d', index:2, min:0, max:255, description:'Oscillator 1: Detune'},

  // Oscillator 2
  {color:"#80a0ff", label:'2v', index:10, min:0, max:255, description:'Oscillator 2: Volume'},
  {color:"#80a0ff", label:'2w', index:11, min:0, max:3, description:'Oscillator 2: Waveform (0:Sin,1:Sqr,2:Saw,3:Tri)'},
  {color:"#80a0ff", label:'2o', index:6, min:0, max:16, description:'Oscillator 2: Octave'},
  {color:"#80a0ff", label:'2s', index:7, min:0, max:11, description:'Oscillator 2: Semitone'},
  {color:"#80a0ff", label:'2d', index:8, min:0, max:255, description:'Oscillator 2: Detune'},

  // Envelope
  {color:"#ffd27f", label:'ea', index:13, min:0, max:200000, description:'Envelope: Attack'},
  {color:"#ffd27f", label:'es', index:14, min:0, max:200000, description:'Envelope: Sustain'},
  {color:"#ffd27f", label:'er', index:15, min:0, max:200000, description:'Envelope: Release'},

  // Envelope -> Pitch
  {color:"#ffb3ff", label:'e1', index:3, min:0, max:1, description:'Oscillator 1: Env > Pitch'},
  {color:"#ffb3ff", label:'e2', index:9, min:0, max:1, description:'Oscillator 2: Env > Pitch'},

  // Filter
  {color:"#a0ff80", label:'ct', index:17, min:0, max:4, description:'Filter: Type (0:Off,1:HP,2:LP,3:BP,4:Notch)'},
  {color:"#a0ff80", label:'ca', index:18, min:0, max:11025, description:'Filter: Cutoff'},
  {color:"#a0ff80", label:'cr', index:19, min:0, max:255, description:'Filter: Resonance'},

  // LFO
  {color:"#7fffd4", label:'mw', index:28, min:0, max:3, description:'LFO: Waveform (0:Sin,1:Sqr,2:Saw,3:Tri)'},
  {color:"#7fffd4", label:'ms', index:26, min:0, max:16, description:'LFO: Speed'},
  {color:"#7fffd4", label:'ma', index:27, min:0, max:255, description:'LFO: Amount'},

  {color:"skyblue", label:'m1', index:24, min:0, max:1, description:'LFO > Osc 1 Pitch'},
  {color:"skyblue", label:'mc', index:25, min:0, max:1, description:'LFO > Filter Cutoff'},

  // Delay
  {color:"#d0b0ff", label:'ds', index:20, min:0, max:16, description:'Delay: Time'},
  {color:"#d0b0ff", label:'da', index:21, min:0, max:248, description:'Delay: Amount'},

  // Pan
  {color:"pink", label:'ps', index:22, min:0, max:16, description:'Pan: Speed'},
  {color:"pink", label:'pa', index:23, min:0, max:255, description:'Pan: Amount'},

  // Noise
  {color:"yellow", label:'nv', index:12, min:0, max:255, description:'Noise Generator Volume'},

  // Master Volume
  {color:"#ffffff", label:'vm', index:16, min:0, max:255, description:'Master Volume'}
];


element("style").textContent=`

body {
margin: 0;
padding: 0;
display: flex;
flex-direction: column;
height: 100vh;
background: white;
overflow: hidden;
}

.cell {
display: flex;
align-items: center;
justify-content: center;
user-select: none;
border: 1px solid #ccc;
}

.header, .row-header {
font-weight: bold;
background: white;
}

.header { z-index: 2; }
.row-header { z-index: 1; }
.active { background-color: #007BFF; color: white; }
.col-selected, .row-selected { background-color: #e0e0e0; }
.row-playing { border-left: 3px solid limegreen !important; }

.instrumentControlsContainer{
display: flex;
flex-wrap: wrap;
justify-content: space-evenly;
align-items: flex-end;
background-color: black;
border-top: 1px solid #ccc;
overflow-x: auto;
}

.slider-group {
display: flex;
flex-direction: column;
align-items: center;
font-family: monospace;
}

.instrument-slider {
writing-mode: bt-lr; /* For vertical slider */
-webkit-appearance: slider-vertical; /* For WebKit browsers */
width: 1px;
}

.instrument-slider:disabled {
opacity: 0.3;
}

.toolbar{
display: flex;
alignItems: flex-start;
}

.sequencerGrid{
display: grid;
}

.songTextarea{
flex: 1;
height: 100%;
padding: 5px;
resize: none;
font-family: monospace;
font-size: 12px;
white-space: pre;
overflow: auto;
}

.pianoRollContainer{
flex: 1;
display: flex;
justify-content: center;
align-items: start;
margin-top: 10px;
overflow: auto;
}

.pianoGrid{
display:grid;
}

`;

// --- GLOBAL STATE ---
let audioContext = new AudioContext();
let audioBufferSource = null;
let audioBuffer = null;
let previewAudioSource = null;

let song = [5513, [
  [[7, 0, 0, 1, 255, 0, 7, 0, 0, 1, 255, 0, 0, 100, 0, 5970, 171, 2, 500, 254, 1, 31, 4, 21], [], []],
  [[7, 0, 0, 0, 255, 2, 7, 0, 4, 0, 255, 2, 0, 88, 2000, 7505, 255, 2, 3144, 51, 6, 60, 4, 64, 0, 1, 7, 179], [], []],
  [[7, 0, 0, 0, 192, 2, 7, 0, 0, 0, 201, 3, 0, 100, 150, 7505, 191, 2, 5839, 254, 6, 121, 6, 147, 0, 1, 6, 195], [], []],
  [[9, 0, 0, 0, 255, 0, 9, 0, 12, 0, 255, 0, 0, 100, 0, 14545, 70, 0, 0, 240, 2, 157, 3, 47, 0, 0, 0, 0, 0], [], []],
  [[7, 0, 0, 0, 255, 3, 8, 0, 0, 0, 255, 0, 127, 22, 22, 2193, 255, 3, 4067, 176, 4, 12, 2, 84, 0, 1, 3, 96, 0], [], []],
  [[7, 0, 0, 0, 255, 2, 7, 0, 9, 0, 154, 2, 0, 2418, 1075, 10614, 240, 3, 2962, 255, 6, 117, 3, 73, 0, 1, 5, 124, 0], [], []],
  [[7, 0, 0, 0, 192, 3, 7, 0, 7, 0, 201, 3, 0, 789, 1234, 13636, 191, 2, 5839, 254, 6, 121, 6, 147, 0, 1, 6, 195, 0], [], []],
  [[7, 0, 0, 0, 192, 2, 7, 0, 0, 0, 192, 2, 0, 0, 0, 20000, 192, 0, 0, 0, 0, 121, 0, 0, 0, 0, 0, 0, 0], [], []],//piano
]];

song.activeTracks = Array(SC).fill(0);
song.activeSequences = Array(SR).fill(0);
let bpm = samplesToBPM(song[0]);
let playbackAnimationId = null;
let currentSequence = null;
let prevSequence = null;

// --- UI ELEMENT CREATION ---
document.title = "Battito";

function element(tagName, parent = document.body, className = '') {
  const el = document.createElement(tagName);
  if (className) el.className = className;
  parent.appendChild(el);
  return el;
}
// Main layout containers
const toolbar = element("div", document.body, "toolbar");
const instrumentControlsContainer = element("div", document.body, "instrumentControlsContainer");
const pianoRollContainer = element("div", document.body, "pianoRollContainer");
// Toolbar components
const sequencerGrid = element("div", toolbar, "sequencerGrid");
const songTextarea = element("textarea", toolbar, "songTextarea");
songTextarea.placeholder = "Paste song JSON here to import";
// Piano Roll
const pianoGrid = element("div", pianoRollContainer, "pianoGrid");

// --- INITIALIZATION ---

function initSequencer() {
  const h = window.innerWidth / 2;
  const c = h / (SR + 1);
  Object.assign(sequencerGrid.style, {width: `${h}px`, height: `${h}px`, gridTemplateColumns: `${c}px repeat(${SC}, ${c}px)`, gridTemplateRows: `${c}px repeat(${SR}, ${c}px)`, });
  // Top-left corner cell
  element("div", sequencerGrid, "cell header");
  // Column headers
  for (let c = 0; c < SC; c++) {const header = element("div", sequencerGrid, "cell header"); header.textContent = String.fromCharCode(65 + c); header.dataset.col = c;}
  // Row headers and cells
  for (let r = 0; r < SR; r++) {
    const rowHeader = element("div", sequencerGrid, "cell row-header");
    rowHeader.textContent = r + 1;
    rowHeader.dataset.row = r;
    for (let c = 0; c < SC; c++) {
      const cell = element("div", sequencerGrid, "cell");
      cell.dataset.row = r;
      cell.dataset.col = c;
      if (song[1][c] && song[1][c][1] && song[1][c][1][r] !== undefined) {cell.textContent = song[1][c][1][r] || '';}
    }
  }
  initTrackColors();
}

function initPianoRoll() {
  pianoGrid.innerHTML = "";
  const container = pianoGrid.parentElement;
  const cellSize = Math.floor(Math.min(
    container.clientWidth / PC,
    container.clientHeight / PR
  ));
  Object.assign(pianoGrid.style, {gridTemplateColumns: `repeat(${PC}, ${cellSize}px)`, gridTemplateRows: `repeat(${PR}, ${cellSize}px)`, });
  for (let r = 0; r < PR; r++) {
    for (let c = 0; c < PC; c++) {
      const cell = element("div", pianoGrid, "cell");
      cell.dataset.row = r;
      cell.dataset.col = c;
      if (c % 12 === 0) cell.style.borderLeft = "1px solid #333";
      if (r % 4 === 0) cell.style.borderTop = "1px solid #666";
    }
  }
}

function initInstrumentControls() {
  instrumentControlsContainer.innerHTML = '';
  PARAM_MAP.forEach(param => {
    const group = element("div", instrumentControlsContainer, "slider-group");

    const label = element("label", group);
    label.textContent = param.label;
    label.style.color=param.color;

    const slider = element("input", group, "instrument-slider");
    slider.type = "range";
    slider.min = param.min;
    slider.max = param.max;
    slider.dataset.index = param.index;
    slider.disabled = true;
  });
}

// --- UI UPDATE FUNCTIONS ---

function updateSequencerSelection() {
  const cells = sequencerGrid.querySelectorAll(".cell");
  const anyRowActive = song.activeSequences.some(y => y);
  const anyColActive = song.activeTracks.some(x => x);
  cells.forEach(cell => {
    cell.classList.remove("active", "row-selected", "col-selected");
    const {row, col} = cell.dataset;
    if (row === undefined && col === undefined) return; // Top-left corner
    // Column Header
    if (row === undefined) {
      if (song.activeTracks[col]) cell.classList.add("col-selected");
    }
    // Row Header
    else if (col === undefined) {
      // Stop any previously playing preview note
      if (previewAudioSource) {
        previewAudioSource.stop();
        previewAudioSource = null;
      }
      if (song.activeSequences[row]) cell.classList.add("row-selected");
    }
    // Grid Cell
    else {
      const r = parseInt(row), c = parseInt(col);
      const track = song[1][c];
      if (track && track[1]?.[r] !== undefined) {
        const patternId = track[1][r];
        const isRowActive = song.activeSequences[r];
        const isColActive = song.activeTracks[c];
        if ((isRowActive && isColActive) || (isRowActive && !anyColActive) || (isColActive && !anyRowActive)) {
          cell.classList.add("active");
        }
        cell.textContent = patternId === 0 ? "" : patternId;
      }
    }
  });
}

function updatePianoRoll() {
  pianoGrid.querySelectorAll(".cell").forEach(cell => {cell.style.background = "";});
  const tracks = song[1];
  if (!Array.isArray(tracks)) return;
  song.activeTracks.forEach((isActive, trackIndex) => {
    if (!isActive) return;
    const track = tracks[trackIndex];
    if (!track || !Array.isArray(track[1]) || !Array.isArray(track[2])) return;
    if (currentSequence !== null) {
      const patternId = track[1][currentSequence];
      if (!patternId) return;
      const pattern = track[2][patternId - 1];
      if (!pattern) return;
      pattern.forEach((note, row) => {
        if (!note) return;
        const col = note - 123; // Note value to column index
        const cell = pianoGrid.querySelector(`[data-col='${col}'][data-row='${row}']`);
        if (cell) {
          cell.style.background = getTrackColor(trackIndex);
        }
      });
    }
  });
}

function updateSongTextarea() {
  if (songTextarea) {
    songTextarea.value = formatSongDataForDisplay(song);
  }
}

function updateInstrumentSliders() {
  const trackIndex = getActiveTrackIndex();
  const sliders = instrumentControlsContainer.querySelectorAll('.instrument-slider');

  if (trackIndex !== null) {
    const instrument = song[1][trackIndex]?.[0];
    sliders.forEach(slider => {
      const paramIndex = slider.dataset.index;
      // Use instrument value if it exists, otherwise default to 0.
      slider.value = instrument?.[paramIndex] ?? 0;
      slider.disabled = false;
    });
  } else {
    sliders.forEach(slider => {
      slider.disabled = true;
      slider.value = slider.min; // Reset to min value when disabled
    });
  }
}

// --- AUDIO PLAYBACK ---

function stopPlayback() {
  if (playbackAnimationId) {
    cancelAnimationFrame(playbackAnimationId);
    playbackAnimationId = null;
  }
  sequencerGrid.querySelectorAll(".row-header").forEach(h => h.classList.remove("row-playing"));
  if (audioBufferSource) {
    audioBufferSource.onended = null;
    audioBufferSource.stop();
    audioBufferSource.disconnect();
    audioBufferSource = null;
  }
}

function startPlayback() {
  WASM_SYNTH_INITIALIZER(audioContext, synth => {
    const activeSongParts = getActiveSongDataForPlayback();
    audioBuffer = synth.song(activeSongParts);
    audioBufferSource = audioContext.createBufferSource();
    audioBufferSource.buffer = audioBuffer;
    audioBufferSource.connect(audioContext.destination);
    // Loop playback
    audioBufferSource.onended = () => {startPlayback();};
    const startTime = audioContext.currentTime;
    audioBufferSource.start(startTime);
    audioBufferSource.startTime = startTime; // Store start time for animation sync
    playbackAnimationId = requestAnimationFrame(updatePlaybackPointers);
  });
}

function updatePlaybackPointers() {
  try {
    if (!audioBufferSource || !audioBuffer) return;
    const elapsed = (audioContext.currentTime - audioBufferSource.startTime) % audioBuffer.duration;
    const activeSequences = song.activeSequences
      .map((isOn, i) => isOn ? i : -1)
      .filter(i => i !== -1);
    if (activeSequences.length === 0) return;
    const sequenceDuration = beatsToSeconds(SR, bpm);
    const pianoRowDuration = sequenceDuration / PR;
    // Stop if playback has somehow gone past the rendered audio data
    if ((elapsed / sequenceDuration) > activeSequences.length) {
      if (playbackAnimationId) cancelAnimationFrame(playbackAnimationId);
      return;
    }
    const currentSequenceIndex = Math.floor(elapsed / sequenceDuration) % activeSequences.length;
    currentSequence = activeSequences[currentSequenceIndex];
    const pianoRowIndex = Math.floor(elapsed / pianoRowDuration) % PR;
    updateSequencerPointer(currentSequence);
    updatePianoRollPointer(pianoRowIndex);
  } catch (err) {
    console.error("Playback pointer error:", err);
  } finally {
    playbackAnimationId = requestAnimationFrame(updatePlaybackPointers);
  }
}

function updateSequencerPointer(rowIndex) {
  if (rowIndex === prevSequence) return;
  updateGridPointer(sequencerGrid, SR, rowIndex);
  prevSequence = rowIndex;
  updatePianoRoll();
}

function updatePianoRollPointer(rowIndex) {
  updateGridPointer(pianoGrid, PR, rowIndex);
}

function updateGridPointer(grid, totalRows, activeRow) {
  for (let r = 0; r < totalRows; r++) {
    const rowHeader = grid.querySelector(`.row-header[data-row='${r}'], .cell[data-row='${r}'][data-col='0']`);
    if (rowHeader) rowHeader.classList.toggle('row-playing', r === activeRow);
  }
}

// --- EVENT HANDLERS ---

function handleSequencerClick(event) {
  const cell = event.target;
  if (!cell.classList.contains("cell")) return;
  const {row, col} = cell.dataset;
  if (row === undefined && col === undefined) { // Top-left corner: Toggle all
    const allOn = song.activeTracks.every(x => x) && song.activeSequences.every(y => y);
    const toggleValue = allOn ? 0 : 1;
    song.activeTracks.fill(toggleValue);
    song.activeSequences.fill(toggleValue);
  } else if (row === undefined) { // Column header: Toggle track
    song.activeTracks[col] = song.activeTracks[col] ? 0 : 1;
    previewTrackSound(col);
  } else if (col === undefined) { // Row header: Toggle sequence
    song.activeSequences[row] = song.activeSequences[row] ? 0 : 1;
  } else { // Grid cell: Cycle pattern ID
    const r = parseInt(row), c = parseInt(col);
    if (!song[1][c]) song[1][c] = [[], [], []];
    if (!song[1][c][1]) song[1][c][1] = [];
    const currentPatternId = song[1][c][1][r] ?? 0;
    song[1][c][1][r] = (currentPatternId + 1) % 9; // Cycle 0-8
  }
  updateSequencerSelection();
  updateSongTextarea();
  updatePianoRoll();
  updateInstrumentSliders();
  const isAnyTrackActive = song.activeTracks.some(x => x);
  const isAnySequenceActive = song.activeSequences.some(y => y);
  if (isAnyTrackActive && isAnySequenceActive) {
    stopPlayback();
    startPlayback();
  } else {
    stopPlayback();
  }
}

function handlePianoRollClick(event) {
  const activeTrackCount = song.activeTracks.reduce((a, b) => a + b, 0);
  const activeSequenceCount = song.activeSequences.reduce((a, b) => a + b, 0);
  // Allow editing only when exactly one track and one sequence are selected
  if (activeTrackCount !== 1 || activeSequenceCount !== 1) return;
  const pianoCol = parseInt(event.target.dataset.col);
  const pianoRow = parseInt(event.target.dataset.row);
  const trackIndex = song.activeTracks.indexOf(1);
  const sequenceIndex = song.activeSequences.indexOf(1);
  const patternId = song[1][trackIndex][1][sequenceIndex];
  if (!patternId) return; // No pattern selected for this cell
  const patternIndex = patternId - 1;
  if (!song[1][trackIndex][2][patternIndex]) {
    song[1][trackIndex][2][patternIndex] = [];
  }
  const pattern = song[1][trackIndex][2][patternIndex];
  const noteValue = pianoCol + 123;
  // Toggle note on/off
  pattern[pianoRow] = (pattern[pianoRow] === noteValue) ? 0 : noteValue;
  updateSongTextarea();
  updatePianoRoll();
}

function handleSongPaste(event) {
  event.preventDefault();
  const pastedText = (event.clipboardData).getData("text");
  const keepInstrumentsOnly = confirm("Delete song patterns and keep only the instruments?");
  let newSongData;
  try {
    const sanitizedJson = fillEmptyArrayValues(pastedText);
    newSongData = JSON.parse(sanitizedJson);
  } catch (err) {
    alert("Invalid JSON! Paste failed.");
    return;
  }
  if (keepInstrumentsOnly) {
    newSongData = stripSongData(newSongData);
  }
  // Update song state
  song[0] = newSongData[0];
  song[1] = newSongData[1];
  bpm = samplesToBPM(song[0]);
  // Reset UI
  updateSongTextarea();
  updateSequencerSelection();
  updateInstrumentSliders();
}

function handleSongInput() {
  try {
    const newSong = JSON.parse(songTextarea.value);
    // Preserve active track/sequence state
    newSong.activeTracks = song.activeTracks;
    newSong.activeSequences = song.activeSequences;
    song = newSong;
  } catch (e) {
    // Ignore invalid JSON while typing
  }
}

function handleSliderInput(event) {
  if (!event.target.classList.contains('instrument-slider')) return;
  if (previewAudioSource) {
    previewAudioSource.stop();
    previewAudioSource = null;
  }
  const trackIndex = getActiveTrackIndex();
  if (trackIndex === null) return;
  const slider = event.target;
  const paramIndex = parseInt(slider.dataset.index);
  const value = parseInt(slider.value);
  if (!song[1][trackIndex]) song[1][trackIndex] = [[], [], []];
  const instrument = song[1][trackIndex][0];
  while (instrument.length <= paramIndex) {instrument.push(0);}
  instrument[paramIndex] = value;
  updateSongTextarea();
}
function handleSliderChange(event) {
  if (!event.target.classList.contains('instrument-slider')) return;
  const trackIndex = getActiveTrackIndex();
  if (trackIndex !== null) {
    previewTrackSound(trackIndex);
  }
}

function addEventListeners() {
  sequencerGrid.addEventListener("click", handleSequencerClick);
  pianoGrid.addEventListener("click", handlePianoRollClick);
  songTextarea.addEventListener("paste", handleSongPaste);
  songTextarea.addEventListener("input", handleSongInput);
  instrumentControlsContainer.addEventListener('input', handleSliderInput);
  instrumentControlsContainer.addEventListener('change', handleSliderChange);
}

// --- UTILITY FUNCTIONS ---

function getActiveTrackIndex() {
  const activeIndices = song.activeTracks
    .map((isActive, index) => isActive ? index : -1)
    .filter(index => index !== -1);
  return activeIndices.length === 1 ? activeIndices[0] : null;
}

function getActiveSongDataForPlayback() {
  let songCopy = JSON.parse(JSON.stringify(song));
  songCopy.activeTracks = [...song.activeTracks];
  songCopy.activeSequences = [...song.activeSequences];
  // Filter out inactive tracks
  for (let t = songCopy[1].length - 1; t >= 0; t--) {
    if (!songCopy.activeTracks[t]) {
      songCopy[1].splice(t, 1);
    } else {
      // Filter out inactive sequences within the active track
      for (let s = songCopy[1][t][1].length - 1; s >= 0; s--) {
        if (!songCopy.activeSequences[s]) {
          songCopy[1][t][1].splice(s, 1);
        }
      }
    }
  }
  return songCopy;
}

function formatSongDataForDisplay(songData) {
  function stringify(arr) {return "[" + arr.map(x => Array.isArray(x) ? "\n" + stringify(x) : x || 0).join(",") + "]";}
  const jsonString = stringify(songData);
  return fillEmptyArrayValues(jsonString);
}

function stripSongData(songData) {
  let songCopy = JSON.parse(JSON.stringify(songData));
  const instruments = songCopy[1].map(track => [track[0], [], []]);
  return [songCopy[0], instruments];
}

function fillEmptyArrayValues(jsonString) {
  let prev;
  do {
    prev = jsonString;
    jsonString = jsonString.replace(/,\s*,/g, ',0,').replace(/\[\s*,/g, '[0,').replace(/,\s*\]/g, ',0]');
  } while (jsonString !== prev);
  return jsonString;
}

function samplesToBPM(samplesPerStep, sampleRate = 44100, stepsPerBeat = 4) {
  return (sampleRate * 60) / (samplesPerStep * stepsPerBeat);
}

function beatsToSeconds(beats, bpm) {
  return (60 / bpm) * beats;
}

function initTrackColors() {
  sequencerGrid.querySelectorAll(".header[data-col]").forEach(header => {
    header.style.color = getTrackColor(parseInt(header.dataset.col));
  });
}

function getTrackColor(trackIndex) {
  const hue = (trackIndex * 360) / SC;
  return `hsl(${hue}, 70%, 50%)`;
}

function previewTrackSound(trackIndex) {
  // Stop any previously playing preview note
  if (previewAudioSource) {
    previewAudioSource.stop();
    previewAudioSource = null;
  }

  if (song[1][trackIndex]?.[0]) {
    WASM_SYNTH_INITIALIZER(audioContext, synth => {
      const source = audioContext.createBufferSource();
      source.buffer = synth.sound(song[1][parseInt(trackIndex)][0]);
      source.connect(audioContext.destination);
      source.start();

      // Store the new source and clean it up when it ends
      previewAudioSource = source;
      source.onended = () => {
        if (previewAudioSource === source) {
          previewAudioSource = null;
        }
      };
    });
  }
}
// --- MAIN EXECUTION ---

function main() {
  initSequencer();
  initPianoRoll();
  initInstrumentControls();
  addEventListeners();
  updateSongTextarea();
  updateInstrumentSliders();
}
main();
