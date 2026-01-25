
<a href="//bacionejs.github.io/battito/battito.html" target="_blank"><img src="https://repository-images.githubusercontent.com/1048415375/59cbd670-4542-4af1-98c3-a787f6f8e9a2" width="100%" /></a>


Battito is a tablet-centric music tracker with piano-roll, live-loop editing and a blazingly fast engine, for size-constrained games

<details><summary>Features</summary>

- instrument/sequence/pattern editors
- waveform/spectrum analyzers
- instrument presets
- step/time modes
- live-loop editing
- import/export

</details><details><summary>Guide</summary>

---

Steps
1. Click on the column headers in the **sequencer** to hear what the preset instruments sound like. You can select multiple columns/rows in the sequencer for **playback** but when **editing**, select only one **row**. The last **column** selected is the one that will be edited. For example, select drum, bass and lastly lead to **hear** drum/bass and **edit** lead. The sequencer constantly loops over the selected sequencer columns/rows. Click the corner to toggle the whole song. Looping is **live**, meaning it regenerates every time, so changes you make are reflected in the next loop. This is helpful when editing a small section, as the changes are almost immediate.
1. To enter a note on the **piano**, select a column/row in the **sequencer** and click the intersecting cell to select a pattern ID. Then you can edit that pattern on the piano. To advance the pattern ID number just keep clicking in the sequencer cell. You can reuse a pattern ID. When coming back to edit a pattern, don't click the sequencer cell as that will advance the pattern ID, just select a column/row.

---

Optional
- There are 8 preset instruments, but you can also select a track and configure the **synth** (see the Instruments section)
- To **export** html/wav, long-press the waveform visualizer. Use the html file for your game and the wav file for whatever else. It will export whatever is selected: whole song or ranges. The exported game-ready html file (engine+song) is 2k zipped, thousands of times smaller than a wav file.
- To **export** a sound effect, like an explosion, create one note on the first row of the piano, and export a range.
- To save your work for future use, copy the **textarea** to a separate text editor. To **import**, paste in the textarea.
- The **textarea** can be edited. Changes are **live** just like the other components.
- To change the tempo, edit the `bpm` value in the **textarea**.
- Besides clicking sequencer column headers to preview instruments, you can also click the piano to hear what their pitches sound like.
- Switch from **stepmode** to **timemode** by longpressing the piano. To help keep you in time, create a drum track and a cowbell lead-in. Also, lower the `bpm` temporarily to make it easier.

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

</details><details><summary>Compatibility</summary>

The app is compatible with the most recent version of Chrome and Android Chrome as of January 2026. It's also compatible with the Edge browser and maybe some other Chromium-based browser. If you don't see a 48-note wide piano roll, then that's a good indication that your browser is either not compatible or not up to date. I haven't tested it on Apple devices. I didn't have the energy to make it compatible with Firefox, so I explicitly disable the app if run from Firefox. I'm a minimalist, and at only 400 lines of code, I want to keep the app simple. I developed it for a tablet in landscape mode, so the piano roll is very big and almost impossible to use on a phone. But it is possible. To use it on a phone, try clicking the full screen icon in the lower right of the app, and then use it in portrait mode, first setting your sequencer values and then scrolling to the left to lay down your notes.

</details><details><summary>Credits</summary>

Battito ports Jake Taylor's [public domain](https://github.com/parasyte/sonant-rs/issues/16#issuecomment-2979650137) Sonant engine and optimizes with precomputed pitch for **all notes**, precomputed **sine**, and precomputed **LFO**, resulting in a mostly linear, arithmetic-only, blazingly fast render loop.  

</details>

---

