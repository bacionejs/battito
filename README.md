<a href="//bacionejs.github.io/battito/battito.html" target="_blank"><img src="https://github.com/user-attachments/assets/71f17939-b7be-4454-8572-44b1b2a5f804" width="100%" /></a>

---

👉 [Try it](https://bacionejs.github.io/battito/battito.html) (includes tutorial [^1] 🧑‍🎓)  

---

Entire app source code fits on a 3x5 card 🤯  

<a href="https://bacionejs.github.io/bacionejs/viewsource.html?b=1&file=https://raw.githubusercontent.com/bacionejs/battito/main/battito.html" target="_blank"><img width="200" src="https://github.com/user-attachments/assets/4b5be4b1-9f3d-4d9a-9c28-3b3f8b2a7aee" /></a>

---

> [!WARNING]
> 1. Only works on modern chromium browsers
> 1. The app is great on a **tablet**, but on a phone it is a tight squeeze, but you can try to click the fullscreen icon in the lower right and use it in portrait, first setting your sequencer value to a smaller height

---

<details><summary>Guide 📖</summary>

---

Steps
1. Click on the column headers in the **sequencer** to hear what the preset instruments sound like. You can select multiple columns/rows in the sequencer for **playback**, but when **editing**, select a single column and row.
1. To enter a note on the **piano**, select a column/row in the **sequencer** and click the intersecting cell to select a pattern ID. Then you can edit that pattern on the piano. To advance the pattern, press the play button or start the sequencer.

---

Optional
- There are 8 preset instruments, but you can also select a track and configure the **synth** (see the Instruments section below)
- To **export** html/wav, long-press the waveform visualizer. Use the html file for your game and the wav file for whatever else. It exports the **current selection**: whole song or ranges. The exported html embeds the minimal player for the selection.
- To **export** a sound effect, like an explosion, create one note on the first row of the piano, and export a range.
- To save your work for future use, copy the **textarea** to a separate text editor. To **import**, paste in the textarea.
- The **textarea** can be edited. Changes are **live** just like the other components. This is helpful when adjusting envelope values, as they have a large range.
- To change the tempo, edit the `bpm` value in the **textarea**.
- Besides clicking sequencer column headers to preview instruments, you can also click the piano to hear what their **pitch** sounds like.
- The piano roll is only 4 octaves wide but you can compensate by setting the oscillator **octave**.

---

</details><details><summary>Instruments 🎚️</summary>

---

The synth[^2] is a **2-oscillator subtractive synthesizer**. This means it starts with harmonically rich sounds (from oscillators) and then carves away parts of the sound to shape the final timbre. The engine is compact but expressive.

To configure an instrument, click on one of the sequencer columns and manipulate the sliders. And like any other value, including sequences and patterns, you can configure the instruments from the textarea by editing the JSON-like song object.

Understanding these settings is the key to sound design, allowing you to create everything from deep basses and soaring leads to percussive hits and evolving soundscapes.

---

`vm` Volume Master

The final volume control for the entire instrument patch.  

---

`nv` Noise Volume

Blends white noise with the oscillators. Essential for percussion (snares, hats) and effects (wind, static).  

---

`1/2` Oscillators

`v` Volume - The volume of the individual oscillator.  
`w` Waveform - Selects the basic timbre: Sine, Square, Saw, Triangle.  
`o` Octave - Shifts the oscillator's pitch up or down in octaves. A value of 7 or 8 is often a good middle C starting point. Setting `o2` one octave below `o1` can create a sub-bass.  
`s` Semitone - Fine-tunes the pitch in semitone (half-step) increments. Useful for creating musical intervals between the two oscillators (e.g., set `s2` to 7 for a perfect fifth).  
`d` Detune - Fine-tunes the pitch by a very small amount. When `1` and `2` have slightly different detune values, they create a rich, thick "chorus" effect. This is key for pads and big leads.  

---

`e` Envelope

`a` Attack - The time it takes for the note to fade in. 0 = instant, percussive. High values = slow, swelling sound (pads).  
`s` Sustain - The time the note is held at full volume. 0 = the note immediately starts releasing. High values = the note is held for longer. A percussive "pluck" sound would have low `a`, `s`, and `r`.  
`r` Release - The time it takes for the note to fade out after the sustain period. Low values = abrupt stop. High values = long, echoing tail.  
`1`/`2` Routes the envelope to modulate the pitch of oscillator 1 or 2. Essential for creating kick drums, toms, and laser/zap sound effects. The attack time (`ea`) controls the speed of the pitch modulation.

---

`c` Cutoff

`t` Type - The type of filter: Off, High-Pass, Low-Pass, Band-Pass, Notch. Set to Low-Pass for most classic synth sounds. Use High-Pass for hi-hats or thinning out a sound.  
`a` Amount - For Low-Pass, lowering `a` makes the sound darker and more muffled.  
`r` Resonance - Emphasizes the frequencies around the cutoff point. Low values are subtle. High values give a sharp, ringing, "squelchy" sound.  
  
Depending on the cutoff type `t`, you must set `a` or `r` or there will be no sound.

---

`m` Modulation

`w` Waveform - The shape of the modulation signal: Sine, Square, Saw, Triangle. Sine/Triangle gives smooth modulation (vibrato). Square gives an abrupt on/off effect (trills). Saw gives a repeating ramp.
`s` Speed - Low values = slow, evolving changes. High values = fast, aggressive modulation.  
`a` Amount - The overall intensity.  
`1` Modulate the pitch of Oscillator 1. A slow sine wave creates vibrato. A fast square wave creates a trill.  
`c` Modulate the cutoff frequency. A slow sine wave creates a gentle sweep. A speed-synced sawtooth or square wave creates a rhythmic wobble or wah effect.  

---

`d` Delay

`s` Speed - The time between echoes for the delay effect.  
`a` Amount - The volume/feedback of the echoes. Higher values mean more echoes that last longer.  

---

`p` Pan

`s` Speed - Moves the sound left and right.  
`a` Amount - The depth.  

---

</details>

[^^1]: The tutorial song is a portion of Beatnic by mBitsnBites
[^^2]: The synth engine part of this sequencer is a port of Jake Taylor's public domain Sonant, designed for small size and clarity


<details>
<summary>Readable battito.html — reformatted & commented (click to expand)</summary>

Below is a human-friendly, reformatted and annotated version of battito.html. It preserves the same logic but adds whitespace and comments to make the flow easier to follow. For full low-level details (the synthesis engine), consult the original battito.html in the repository.

```html
<!-- battito.html — annotated excerpt (readable version) -->
<!doctype html>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<script>
// Entry: initialize UI and runtime when page loads
onload = () => {
  document.title = "🎼 Battito Beats";

  // Inject compact stylesheet for UI layout
  element("style").textContent = `
    *{margin:0;padding:0;box-sizing:border-box;scrollbar-width:none;user-select:none;touch-action:manipulation}
    body{background:#121212;color:white;display:flex;font:bold .5rem monospace}
    html{overscroll-behavior-y:contain}
    .piano,.sequencer,.sliders,.cell{display:grid}
    .side{position:relative}
    .cell{place-items:center;aspect-ratio:1;border:1px solid #2a2a2a;transition: background 0.4s ease-out}
    .piano{color:#2a2a2a;line-height:0}
    .piano>.cell:nth-child(12n+1){color:gray}
    .fullscreen{position:absolute;bottom:0;right:0;z-index:1;font-size:1rem;color:orange}
    .sliders{place-items:center;white-space:pre}
    .slider{height:1px;accent-color:blue}
    input::-webkit-slider-thumb{opacity:0}
    label{pointer-events:none}
    .sequencer>.cell:nth-child(-n+9){position:sticky;top:0}
    .sequencer{aspect-ratio:1;overflow-y:scroll}
    .text{all:inherit;padding:1rem;white-space:pre;overflow:auto}
    .text,.canvas{height:25%;aspect-ratio:1}
  `;
};

// --- Constants and playback state ---
let SC = 8, SR = 60, PC = 48, PR = 32; // grid sizes
let C3 = 12*7 + 12*3 + 3;               // pitch offset used by the piano mapping
let SAMPLERATE = 44100 * 60 / 4;        // used for drawing/preview timing
let STEPRATE = PR * 60 / 4;             // steps-per-minute scaling

// Audio engine, song data, and UI arrays
let BS = Battito.toString();            // stringified engine for export
let A = new AudioContext();             // WebAudio context
let SONG = instruments().presets;       // default song object (from instruments())
let C = Array(SC).fill(0);              // channel enables
let R = Array(SR).fill(0);              // row selection flags
let RK = [...R.keys()];                 // row indices
let PA = Array(PC * PR);                // phrase->piano map
R[-1] = C[-1] = 1;                      // sentinel values used elsewhere

// --- DOM construction ---
let piano = element("div", document.body, "piano");
let sliders = element("div", document.body, "sliders");
let side = element("div", document.body, "side");
let sequencer = element("div", side, "sequencer");
let text = element("textarea", side, "text");
let X = element("canvas", side, "canvas").getContext("2d");
let fullscreen = element("div", side, "fullscreen", "⛶");

let widgets = [piano, sliders, sequencer, text];
let update = () => widgets.forEach(o => o.update());
let track = () => { return C[LT] && SONG.tracks[LT]; };

// Simple color palette for tracks
let color = i => ["#f55","#fc2","#cf0","#6fd","#4cf","#74f","#f48","#fa4"][i] || "#888";

// --- Widget behaviors (updates & handlers) ---
piano.update = function(){ phrase().forEach((v,i) => this.cells[i].style.background = color(v)) };

sequencer.update = function(){
  this.cells.forEach(e => state(e, (active, note, body, sequence) => {
    e.style.background = !active ? "" : !note ? "gray" : color(e.col);
    body && (e.textContent = sequence || "");
  }));
};

sliders.update = function(){
  let t = track();
  this.cells.forEach(s => { s.disabled = !t; s.value = t ? t[s.key] : 0; s.previousSibling.textContent = s.key + label(+s.value, s.max) });
};

text.update = function(){ if (this == document.activeElement) return; let s = this.selectionStart; this.value = format(SONG); this.setSelectionRange(s,s) };

// --- Interaction handlers ---
piano.onclick = function({target:{row,col}}){ let n = col + C3; preview(n); if (!(p=pattern())) return; p[row] = p[row]==n ? 0 : n; update() };

sequencer.onclick = function({target:{row,col}}){
  let hr = !~col, hc = !~row;
  hr & hc ? toggleall() : hr | hc ? ((hr?R:C)[row+col+1] ^= 1, hc && (LT = col, preview())) : incrementid(row,col);
  update(); start();
};

sliders.oninput = function({target:{key,value}}){ (track()[key] = +value, update(), preview()) };
text.oninput = function(){ try { let song = format(text.value); SONG = song; update(); preview() } catch {} };
fullscreen.onclick = () => document.documentElement.requestFullscreen();

makelongpress(X.canvas, save);
oncontextmenu = e => e.target.tagName == "TEXTAREA";

grid(piano, PC, PR); naturals(piano); grid(sequencer, SC+1, SR+1); instruments().init(sliders); compatibility();
fetch('tutorial.js').then(r => r.text()).then(c => eval(c));

// --- Playback: start / source / loop ---
function start(){ try { S?.stop?.(); (S = source(range())) && (S.start(S.startTime = A.currentTime), loop()) } catch {} }
function source(s){ let n; return s && (n = Object.assign(A.createBufferSource(), { buffer: Battito(A).createbuffer(s) }), n.connect(A.destination), n) }
function loop(){ if (!S || !next()) return; if (cS != pS) { pS = cS; piano.update(); scroll() } if (cP != pP) { draw(); sequencer.update(); playhead(cP); pP = cP } requestAnimationFrame(loop) }

// More helpers: playhead, scroll, next, toggleall, incrementid, pattern, phrase, range, state, hasnotes, preview, draw, candy
// See the original battito.html for the full implementations.

// --- Export helpers (wave/html) ---
function save(){ if (!hasnotes()) return; let s = "song" + Date.now(), d = (b,z) => { Object.assign(d.a ??= element("a"), { href: URL.createObjectURL(b), download: s+z }).click() }; d(wave(), ".wav"); d(html(), ".html") }
function html(){ return new File([`<\\script>onload=()=>{\n document.body.textContent='Click to play';addEventListener('click',music(),{once:true});\n\n${music()}\n\n}</\\script>`], "") }
function music(){ return `function music(){\nlet A=new AudioContext(),S=source(${format(range())});\n${source}\n${BS}\nreturn ()=>{S.loop=true;S.start()}\n}` }
function wave(){ /* builds a WAV file from S.buffer */ }

// --- Small DOM helpers & instruments ---
function grid(p,c,r){ p.style.gridTemplateColumns = "repeat("+c+",1fr)"; p.cells = Array.from({length:c*r}, (_,i) => { let e = element("div", p, "cell"); e.col = i % c; e.row = i / c | 0; return c & 1 ? header(e) : e }) }
function header(c){ let r = --c.row, t = --c.col, v; !~r ? (~t && (v = String.fromCharCode(65+t), c.style.color = color(t))) : !~t && (v = r+1); c.textContent = v; return c }
function naturals(p){ p.cells.forEach(c => c.textContent = c.row%4 ? "" : "C,,D,,E,F,,G,,A,,B".split(",")[c.col%12]) }
function label(v,m){ return String(m==4 ? ["Off","High","Low","Band","Notch"][v] : m==3 ? ["Sine","Square","Saw","Tri"][v] : m==1 ? ["Off","On"][v] : v).padStart(10," ") }
function format(data){ return (typeof data=="object") ? JSON.stringify(data).replace(/{/g, "\n$&").replace(/\x22/g, "") : JSON.parse(data.replace(/(\w+):/g,'"$1":')) }

// instruments() and Battito() (synthesis engine) are present in the original file. For brevity the full low-level code is omitted here — inspect battito.html in the repository for the complete implementation.

</script>
```

</details>


