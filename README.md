
---

To open, click ↴  

<a href="//bacionejs.github.io/battito/battito.html" target="_blank"> <img src="https://repository-images.githubusercontent.com/1048415375/88c95659-f0f2-4d50-8758-763520fdcd2a" width="70%" /> </a>

Or download and open from your file manager 


---


Battito, a Sonant-based music tracker. At only 2k for the song and player, it is perfect for size-constrained games. Unlike other Sonant-based trackers, Battito uses a piano roll, making editing easier. It currently works only on the Chrome browser and looks great on a tablet. See the 25-second in-app video tutorial.

---

<details><summary>Features</summary>

- instrument editor
- sequence editor
- pattern editor
- play/stop/loop
- import/export
- instrument presets
- waveform analyzer
- spectrum analyzer

</details><details><summary>Guide</summary>

---

| Component   | Description |
|-------------|-------------|
| **synth** | Edit instrument oscillators, detune, envelope, modulation, cutoff, delay, etc. |
| **sequencer** | 8 columns (tracks/instruments), 60 rows (5-minute songs at 120 BPM), and cells where you can toggle through pattern IDs (8 per track). |
| **piano** | Edit patterns on a piano roll — 48 notes wide (4 octaves from C3 through C6) and 32 steps tall. |
| **textarea** | Import/export and manually edit tempo, instruments, and song. |
| **waveform** | Instrument waveform analyzer. |

---

Steps
1. Click on the column headers in the **sequencer** to hear what the preset instruments sound like. You can select multiple columns/rows in the **sequencer** for playback, but you can only have one column/row selected while editing notes on the **piano**. The **sequencer** constantly loops over the selected **sequencer** columns/rows. Click the upper-left corner cell in the **sequencer** to toggle the whole song.
1. To enter a note on the **piano**, select a column/row in the **sequencer** and click the intersecting cell to select a pattern ID. Then you can edit that pattern on the **piano**. To advance the pattern ID number just keep clicking in the **sequencer** cell. You can reuse a pattern ID. When coming back to edit a pattern, don't click the **sequencer** cell as that will advance the pattern ID, just select a column/row.

---

Optional
- There are 8 preset instruments, but you can also select a track and configure the **synth**
- To save your work for future use, copy the **textarea** JSON to a separate text editor. To import, paste the JSON in the **textarea**.
- Long-press the **waveform** visualizer to export html/wav; html for game, wav for whatever. It will export whatever is selected: ranges or whole song.
- The **textarea** can be edited. Changes are live.
- Change the tempo by editing the first value in the **textarea** (5513=120 BPM).
- To bypass the tutorial on startup, append "?off" to the url.

---

Notes  
- Looping is **live**, meaning it regenerates every time, so changes you make are reflected in the next loop. This is helpful when evaluating a small section, as the changes are almost immediate.

---

</details><details><summary>Instruments</summary>

---

Understanding these settings is the key to sound design, allowing you to create everything from deep basses and soaring leads to percussive hits and evolving soundscapes.

This synth is a **2-oscillator subtractive synthesizer**. This means it starts with harmonically rich sounds (from oscillators) and then carves away parts of the sound to shape the final timbre.

---

`vm` Volumn Master

The final volume control for the entire instrument patch.  

---

`nv` Noise Volumn

Blends white noise with the oscillators. Essential for percussion (snares, hats) and effects (wind, static).  

---

`1/2` Oscillators

`v` Volume - The volume of the individual oscillator.  
`w` Waveform - Selects the basic timbre: 0=Sine, 1=Square, 2=Saw, 3=Triangle.  
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

`t` Type - 0:Off, 1:High-Pass, 2:Low-Pass, 3:Band-Pass, 4:Notch. Set to 2 for most classic synth sounds. Use 1 for hi-hats or thinning out a sound.  
`a` Amount - For Low-Pass, lowering `a` makes the sound darker and more muffled.  
`r` Resonance - Emphasizes the frequencies around the cutoff point. Low values are subtle. High values give a sharp, ringing, "squelchy" sound. Bug: `r` must be used when using `t` or there will be no sound.  

---

`m` Modulate

`w` Waveform - The shape of the modulation signal (0:Sin,1:Sqr,2:Saw,3:Tri). Sine/Triangle gives smooth modulation (vibrato). Square gives an abrupt on/off effect (trills). Saw gives a repeating ramp.  
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

</details><details><summary>Notes</summary>

Sonant history
- Original Sonant: 2008 Jake Taylor
- js-sonant/soundbox: 2011 Marcus Geelnard
- sonant-x: 2014 Nicolas Van
- pl_synth: 2024 Dominic Szablewski

In 2025, Jake declared Sonant public domain.  
My tracker (GUI) is original and my player (synth engine) is based on Jake's original sonant.c; converted to javascript and optimized. For a javascript implementation that is faster, try the wasm solution by Dominic.  
The built-in tutorial's song is a simplified version of the song beatnic by mBitsnBites.  

</details>

---


