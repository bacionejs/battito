<a href="//bacionejs.github.io/battito/battito.html" target="_blank"><img src="https://repository-images.githubusercontent.com/1048415375/5982d166-8567-49f5-bb03-adea6bfe133e" width="100%" /></a>

Battito Beats is a tablet-centric music tracker with piano-roll, live-loop editing and a small Sonant-class[^1] engine for size-constrained games

<details><summary>Guide</summary>

---

Steps
1. Click on the column headers in the **sequencer** to hear what the preset instruments sound like. You can select multiple columns/rows in the sequencer for **playback**, but when **editing**, select only one **row**. The last **column** selected is the one that will be edited. For example, select drum, bass and lastly lead to **hear** drum/bass and **edit** lead. The sequencer constantly loops over the selected sequencer columns/rows. Click the corner to toggle the whole song. Looping is **live**, meaning it regenerates every time, so changes you make are reflected in the next loop. This is helpful when editing a small section, as the changes are almost immediate.
1. To enter a note on the **piano**, select a column/row in the **sequencer** and click the intersecting cell to select a pattern ID. Then you can edit that pattern on the piano. To advance the pattern ID number just keep clicking in the sequencer cell. You can reuse a pattern ID. When coming back to edit a pattern, don't click the sequencer cell as that will advance the pattern ID, just select a column/row.

---

Optional
- There are 8 preset instruments, but you can also select a track and configure the **synth** (see the Instruments section)
- To **export** html/wav, long-press the waveform visualizer. Use the html file for your game and the wav file for whatever else. It will export whatever is selected: whole song or ranges. The exported game-ready html file (engine+song) is 2k zipped, thousands of times smaller than a wav file.
- To **export** a sound effect, like an explosion, create one note on the first row of the piano, and export a range.
- To save your work for future use, copy the **textarea** to a separate text editor. To **import**, paste in the textarea.
- The **textarea** can be edited. Changes are **live** just like the other components.
- To change the tempo, edit the `bpm` value in the **textarea**.
- Switch from **stepmode** to **timemode** by longpressing the piano. To help keep you in time, create a drum track and a cowbell lead-in. Also, lower the `bpm` temporarily to make it easier.
- Besides clicking sequencer column headers to preview instruments, you can also click the piano to hear what their **pitch** sounds like.
- The piano roll is only 4 octaves wide but you can compensate by setting the oscillator **octave**.
- The app is great on a tablet, but on a phone, it's very difficult. You can try to click the full screen icon in the lower right and use it in portrait, first setting your sequencer values and then scrolling to the left to lay down your notes.

---

</details><details><summary>Instruments</summary>

---

To configure an instrument, click on one of the sequencer columns and manipulate the sliders. And like any other value, including sequences and patterns, you can configure the instruments from the text area.

---

Understanding these settings is the key to sound design, allowing you to create everything from deep basses and soaring leads to percussive hits and evolving soundscapes.

This synth is a **2-oscillator subtractive synthesizer**. This means it starts with harmonically rich sounds (from oscillators) and then carves away parts of the sound to shape the final timbre.

---

`vm` Volume Master

The final volume control for the entire instrument patch.  

---

`nv` Noise Volume

Blends white noise with the oscillators. Essential for percussion (snares, hats) and effects (wind, static).  

---

`1/2` Oscillators

`v` Volume - The volume of the individual oscillator.  
`w` Waveform - Selects the basic timbre: Sine(0), Square(1), Saw(2), Triangle(3).  
`o` Octave - Shifts the oscillator's pitch up or down in octaves. A value of 7 or 8 is often a good middle C starting point. Setting `2o` one octave below `1o` can create a sub-bass.  
`s` Semitone - Fine-tunes the pitch in semitone (half-step) increments. Useful for creating musical intervals between the two oscillators (e.g., set `2s` to 7 for a perfect fifth).  
`d` Detune - Fine-tunes the pitch by a very small amount. When `1` and `2` have slightly different detune values, they create a rich, thick "chorus" effect. This is key for pads and big leads.  

---

`e` Envelope

`a` Attack - The time it takes for the note to fade in. 0 = instant, percussive. High values = slow, swelling sound (pads).  
`s` Sustain - The time the note is held at full volume. 0 = the note immediately starts releasing. High values = the note is held for longer. A percussive "pluck" sound would have low `a`, `s`, and `r`.  
`r` Release - The time it takes for the note to fade out after the sustain period. Low values = abrupt stop. High values = long, echoing tail.  
`1`/`2` Routes the envelope to modulate the pitch of oscillator 1 or 2. Essential for creating kick drums, toms, and laser/zap sound effects. The attack time (`ea`) controls the speed of the pitch drop.  

---

`c` Cutoff

`t` Type - The type of filter: Off(0), High-Pass(1), Low-Pass(2), Band-Pass(3), Notch(4). Set to 2 for most classic synth sounds. Use 1 for hi-hats or thinning out a sound.  
`a` Amount - For Low-Pass, lowering `a` makes the sound darker and more muffled.  
`r` Resonance - Emphasizes the frequencies around the cutoff point. Low values are subtle. High values give a sharp, ringing, "squelchy" sound.  

---

`m` Modulation

`w` Waveform - The shape of the modulation signal: Sine(0), Square(1), Saw(2), Triangle(3). Sine/Triangle gives smooth modulation (vibrato). Square gives an abrupt on/off effect (trills). Saw gives a repeating ramp.  
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

</details><details><summary>Developer Notes</summary>


---

The main motivation for creating another tracker is that the trackers which are used for size-constrained games typically have editors that are number-centric, and being a music noob, it was difficult for me to reason about while composing a song. And so I decided to make a tracker with a piano roll. Also, since an Android tablet is the only device I have, I wanted it to be very touch-friendly. And yes, I program on an Android tablet using Termux, Neovim, and Apache.  
  
Just for fun, I decided to try to make the interface buttonless. There are sliders, but besides that, there are no obvious controls.  

Also, to keep things simple, the sequencer is hard-coded to 8-tracks, 9-patterns per track and 60-phrases so that at 60 beats per minute you can create a fairly robust song up to 8 minutes long.  

Initially, I built my app around the pl_synth wasm port, but eventually, just for fun, I created my own port of the original Jake Taylor Sonant synth engine. The initial port of Jake's C code wasn't too difficult, but being javascript, it was very slow to process a song, so I added some optimizations.  

The application is less than 300 lines, and I didn't want to add things that aren't absolutely necessary, but there are a few extras that help round it out: a tutorial, a waveform analyzer, a spectrum analyzer, and support for timemode in addition to the standard stepmode.  
  
Since the piano roll takes up so much space, I had to squish the 29 instrument controls into a simple stack of sliders which are impossible to understand without reading the instruments section.  

To eliminate controls for saving, loading and BPM, I have a text widget, which has the added benefit of allowing fine tweaks that are difficult with the sliders. And like all the other widgets, changes are live.

I style everything so it just works without thinking. I use grid layouts a lot; grid-template-columns makes it easy to size sequencer columns, piano keys, or anything else evenly without doing math. Then I use aspect ratios so squares stay squares and rectangles keep their shape no matter the screen.

Early on I ran into problems making the app look the same in Chrome and Firefox. Eventually I gave up on Firefox and just block it, not explicitly but by analyzing one its known failure points on initialization.

---

I redesigned the original Sonant structure so that the only thing left untouched is the 29 instrument parameter keys; everything else was reorganized for clarity and musical meaning. Instead of using `rowLen`, I use `bpm` and derive row length internally, since BPM is more expressive at a high level and row length is just an implementation detail. I renamed `songData` to `tracks`, and inside each track I use `s` sequences that act as pointers to `p` patterns. In the original structure, what is now `s` used to be `p`, what is now `p` used to be `c`, and `c` contained sub-objects called `n`, which finally held the array of notes; I flattened and clarified that hierarchy so patterns directly contain note arrays. I also removed `songLen`, since total length is now derived automatically by inspecting the sequences and patterns, making the structure declarative while keeping the synthesis core behavior intact.

---

The main thing I did in the synth engine code to make it fast is precompute as much as possible and reduce repeated math inside the hot loop. The waveforms are fully generated ahead of time in SIN, SQUARE, SAW, and TRI, and the note frequencies for all 256 notes are precomputed so the inner loop doesn’t have to do exponentiation for every sample. I also simplified multiplications and divisions for envelopes and detuning by pre-scaling constants outside the loops, and the LFO and panning steps are calculated once per track per buffer instead of per sample. Everything that could be pulled out of the inner per-sample loop is pulled out, so the loop only does what it absolutely has to: fetch a sample from a waveform, mix oscillators, apply envelope, add optional noise, apply the filter, pan, and write into the buffer. Delay and master scaling happen after the main loops, so the hot path stays tight. The result is that even with multiple tracks, two oscillators per note, filters, envelopes, and noise, the CPU only does what’s necessary to generate the song without wasting cycles on recomputation. For Ambidumbi, a fairly complex song, the hot inner loop runs 39,208,609 times and produces the final audio in 4243ms.

---

The sequencer is the most complex part of the app outside of the synth function. It handles all the logic for selecting tracks and rows and updating patterns. Each function is focused on one aspect, like `toggle` flipping cells, `scroll` keeping the view centered, `hasnotes` checking for active notes, `track` returning the current track, `sequences` collecting active rows, `phrase` flattening notes for the piano roll, `click` handling all grid interactions, `range` returning the active subset of the song, `pattern` giving the current row pattern. To avoid having a bunch of buttons, all playback is controlled from the sequencer, so whenever you select a column and row to put notes it automatically starts, which can be a little annoying because you can’t make edits in silence.

---

The audio function is basically a wrapper around the audio context. It keeps track of the current sequence and step, starts the buffer when the sequencer triggers something, and updates the visuals, using the `point` function to highlight which row is playing at any given moment. It also has a `preview` function that can play a single note on demand and draws the waveform in the canvas so you can see what you’re hearing.

---

The waveform analyzer is very helpful for visualizing the synth you're configuring. Originally, I included the envelope outline, but eventually removed it because representing variable `ASR` values as relative terms in a fixed area is misleading, and it basically mirrors the shape of the waveform anyway. For the same reason (fitting unknown times into a fixed area), the `delay` parameter becomes an issue. One strategy is to just remove it. But by using a simple strategy, finding the `start` and `end` of the most relevant portions of a sample, `delay` can be included and produce a reasonably informative waveform while also simplifying the code. The logic becomes basically: `for(let x=0;x<w;x++){c.lineTo(x,m+d[start+(x*(end-start)/(w-1)|0)]*m);}`  
  
Unlike the waveform analyzer, the spectrum analyzer is basically just eye candy, but easy to implement with a style trick and a simple loop: `.meter{background:linear-gradient(to top,lime,orange,red);transition:height 50ms linear;}`  `meter.forEach((b,i)=>{b.style.height=(A[i]*0.4)+"%";})`

---

Export is triggered by long-pressing the waveform widget, producing the JavaScript to paste into your game, and an optional WAV file. WAVs have a 44-byte header followed by raw audio samples; some bytes are ASCII identifiers like "RIFF", "WAVE", "fmt ", and "data", while other fields are 32-bit unsigned integers (e.g., total file size) or 16-bit integers (channels, bits per sample). Many values are hardcoded based on safe assumptions: 16-bit PCM, stereo, 44.1 kHz, standard 44-byte header, with BlockAlign, ByteRate, and BitsPerSample precomputed. Only chunk sizes (`ChunkSize` and `Subchunk2Size`) are calculated from the song length. A `Uint8Array` holds all bytes, and a `DataView` writes multi-byte numbers in little-endian order as WAV requires. Audio samples use `setInt16` because PCM is 16-bit signed integers, scaling floats from -1 to 1; header fields needing 4 bytes use `setUint32`. This reduces a normally complex process to just a few lines of code:

```
  function bufferToWav(){
    let os=44,b=audio.buffer,d=b.length*4,o=new ArrayBuffer(d+os),v=new DataView(o),u8=new Uint8Array(o);
    u8.set([82,73,70,70,0,0,0,0,87,65,86,69,102,109,116,32,16,0,0,0,1,0,2,0,68,172,0,0,16,177,2,0,4,0,16,0,100,97,116,97,0,0,0,0]);
    v.setUint32(4,d+36,1); v.setUint32(40,d,1); for(let j=0,i,s;j<b.length;j++)for(i=0;i<2;i++,os+=2)v.setInt16(os,(s=b.getChannelData(i)[j])*32767-(s<0),1);
    return new Blob([o],{type:"audio/wav"});
  }
```

---



</details>

[^1]: The Battito synth function is a port of Jake Taylor's [public domain](https://github.com/parasyte/sonant-rs/issues/16#issuecomment-2979650137) Sonant.

