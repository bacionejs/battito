  


https://github.com/user-attachments/assets/2d5bebcc-a4ab-442e-a44f-e4c2e488d14d


[Try it](https://bacionejs.github.io/battito/battito.html)

</details><details><summary>Guide</summary>

Steps
1. Click on the column headers in the **sequencer** to hear what the preset instruments sound like. You can select multiple columns/rows in the sequencer for **playback**, but when **editing**, select only one **row**. The last **column** selected is the one that will be edited. For example, select drum, bass and lastly lead to **hear** drum/bass and **edit** lead. The sequencer constantly loops over the selected sequencer columns/rows. Click the corner to toggle the whole song. Looping is **live**, meaning it regenerates every time, so changes you make are reflected in the next loop. This is helpful when editing a small section, as the changes are almost immediate. An **improv** browser tab will be created the first time you click a column. It can be ignored or closed and is useful for discovering a melody. For example, toggle your whole song on, toggle off an instrument, and improvise that instrument.
1. To enter a note on the **piano**, select a column/row in the **sequencer** and click the intersecting cell to select a pattern ID. Then you can edit that pattern on the piano. To advance the pattern ID number just keep clicking in the sequencer cell. You can reuse a pattern ID. When coming back to edit a pattern, don't click the sequencer cell as that will advance the pattern ID, just select a column/row.

---

Optional
- There are 8 preset instruments, but you can also select a track and configure the **synth** (see the Instruments section below)
- To **export** html/wav, long-press the waveform visualizer. Use the html file for your game and the wav file for whatever else. It exports the **current selection**: whole song or ranges. The exported game-ready html file (engine+song) is 2k zipped, thousands of times smaller than a wav file.
- To **export** a sound effect, like an explosion, create one note on the first row of the piano, and export a range.
- To save your work for future use, copy the **textarea** to a separate text editor. To **import**, paste in the textarea.
- The **textarea** can be edited. Changes are **live** just like the other components. This is especially helpful when adjusting envelope values, as they have a large range.
- To change the tempo, edit the `bpm` value in the **textarea**.
- Besides clicking sequencer column headers to preview instruments, you can also click the piano to hear what their **pitch** sounds like.
- The piano roll is only 4 octaves wide but you can compensate by setting the oscillator **octave**.

---

</details><details><summary>Instruments</summary>

---

The synth[^1] is a **2-oscillator subtractive synthesizer**. This means it starts with harmonically rich sounds (from oscillators) and then carves away parts of the sound to shape the final timbre.

To configure an instrument, click on one of the sequencer columns and manipulate the sliders. And like any other value, including sequences and patterns, you can configure the instruments from the **textarea**.

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
`1`/`2` Routes the envelope to modulate the pitch of oscillator 1 or 2. Essential for creating kick drums, toms, and laser/zap sound effects. The attack time (`ea`) controls the speed of the pitch drop.  

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

</details><details><summary>Comparisons</summary>

- **Fast** - 75 times faster than [Sonant-X](https://github.com/nicolas-van/sonant-x-live) and comparable in speed to the [pl_synth](https://github.com/phoboslab/pl_synth) WASM solution
- **Selection** - Comprehensive selection mechanism
- **Export** - Exports a complete ready-to-run HTML page
- **Scriptable** - Raw JSON can be edited live
- **Improv** - Has a tab for live-jamming
- **Pianoroll** - Intuitive one-click note input
- **Overdub** - Input notes while other tracks are playing
- **Live** - Regenerates every loop




</details><details><summary>Samples</summary>

**After opening a sample, click the sequencer corner to play it**  

[Beatnic by mBitsnBites (simplified)](https://bacionejs.github.io/battito/battito.html?song=%7B%22bpm%22%3A100%2C%22tracks%22%3A%5B%7B%22v1%22%3A255%2C%22w1%22%3A0%2C%22o1%22%3A9%2C%22s1%22%3A0%2C%22d1%22%3A0%2C%22v2%22%3A255%2C%22w2%22%3A0%2C%22o2%22%3A7%2C%22s2%22%3A0%2C%22d2%22%3A0%2C%22ea%22%3A100%2C%22es%22%3A0%2C%22er%22%3A5970%2C%22e1%22%3A1%2C%22e2%22%3A1%2C%22ct%22%3A2%2C%22ca%22%3A500%2C%22cr%22%3A254%2C%22mw%22%3A0%2C%22ms%22%3A0%2C%22ma%22%3A0%2C%22m1%22%3A0%2C%22mc%22%3A0%2C%22ds%22%3A1%2C%22da%22%3A31%2C%22ps%22%3A4%2C%22pa%22%3A21%2C%22nv%22%3A0%2C%22vm%22%3A171%2C%22s%22%3A%5B1%2C1%2C1%2C1%5D%2C%22p%22%3A%5B%5B123%2C0%2C0%2C0%2C123%2C0%2C0%2C0%2C123%2C0%2C0%2C0%2C123%2C0%2C0%2C0%2C123%2C0%2C0%2C0%2C123%2C0%2C0%2C0%2C123%2C0%2C0%2C0%2C123%2C0%2C0%2C0%5D%5D%7D%2C%7B%22v1%22%3A255%2C%22w1%22%3A2%2C%22o1%22%3A6%2C%22s1%22%3A11%2C%22d1%22%3A0%2C%22v2%22%3A255%2C%22w2%22%3A2%2C%22o2%22%3A6%2C%22s2%22%3A11%2C%22d2%22%3A4%2C%22ea%22%3A88%2C%22es%22%3A2000%2C%22er%22%3A7505%2C%22e1%22%3A0%2C%22e2%22%3A0%2C%22ct%22%3A2%2C%22ca%22%3A3144%2C%22cr%22%3A51%2C%22mw%22%3A0%2C%22ms%22%3A7%2C%22ma%22%3A179%2C%22m1%22%3A0%2C%22mc%22%3A1%2C%22ds%22%3A6%2C%22da%22%3A60%2C%22ps%22%3A4%2C%22pa%22%3A64%2C%22nv%22%3A0%2C%22vm%22%3A255%2C%22s%22%3A%5B1%2C1%2C1%2C1%5D%2C%22p%22%3A%5B%5B0%2C0%2C124%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C124%2C0%2C124%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%5D%7D%2C%7B%22v1%22%3A192%2C%22w1%22%3A2%2C%22o1%22%3A7%2C%22s1%22%3A0%2C%22d1%22%3A0%2C%22v2%22%3A201%2C%22w2%22%3A3%2C%22o2%22%3A7%2C%22s2%22%3A0%2C%22d2%22%3A0%2C%22ea%22%3A100%2C%22es%22%3A150%2C%22er%22%3A7505%2C%22e1%22%3A0%2C%22e2%22%3A0%2C%22ct%22%3A2%2C%22ca%22%3A5839%2C%22cr%22%3A254%2C%22mw%22%3A0%2C%22ms%22%3A6%2C%22ma%22%3A195%2C%22m1%22%3A0%2C%22mc%22%3A1%2C%22ds%22%3A6%2C%22da%22%3A121%2C%22ps%22%3A6%2C%22pa%22%3A147%2C%22nv%22%3A0%2C%22vm%22%3A191%2C%22s%22%3A%5B1%2C1%2C2%2C3%5D%2C%22p%22%3A%5B%5B135%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C159%2C0%2C157%2C0%2C159%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C147%2C154%2C0%2C159%2C0%2C0%2C0%2C0%5D%2C%5B138%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C150%2C0%2C159%2C0%2C162%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C150%2C0%2C162%2C150%2C0%2C159%2C0%2C0%2C0%2C0%5D%2C%5B149%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C149%2C0%2C150%2C0%2C154%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C147%2C157%2C0%2C159%2C0%2C0%2C0%2C0%5D%5D%7D%5D%7D)

[Ambidumbi by Gargaj](https://bacionejs.github.io/battito/battito.html?song=%7B%22bpm%22%3A60%2C%22tracks%22%3A%5B%7B%22v1%22%3A255%2C%22w1%22%3A3%2C%22o1%22%3A9%2C%22s1%22%3A0%2C%22d1%22%3A0%2C%22v2%22%3A255%2C%22w2%22%3A3%2C%22o2%22%3A9%2C%22s2%22%3A0%2C%22d2%22%3A14%2C%22ea%22%3A100000%2C%22es%22%3A28181%2C%22er%22%3A100000%2C%22e1%22%3A0%2C%22e2%22%3A0%2C%22ct%22%3A3%2C%22ca%22%3A3700%2C%22cr%22%3A88%2C%22mw%22%3A0%2C%22ms%22%3A4%2C%22ma%22%3A228%2C%22m1%22%3A0%2C%22mc%22%3A1%2C%22ds%22%3A8%2C%22da%22%3A121%2C%22ps%22%3A1%2C%22pa%22%3A22%2C%22nv%22%3A0%2C%22vm%22%3A106%2C%22s%22%3A%5B0%2C0%2C1%2C2%2C1%2C2%2C1%2C2%2C1%2C2%2C0%2C0%2C1%2C2%2C1%2C2%5D%2C%22p%22%3A%5B%5B123%2C138%2C135%2C150%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C119%2C138%2C131%2C150%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B119%2C140%2C143%2C152%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C116%2C138%2C140%2C150%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%5D%7D%2C%7B%22v1%22%3A255%2C%22w1%22%3A2%2C%22o1%22%3A7%2C%22s1%22%3A0%2C%22d1%22%3A0%2C%22v2%22%3A255%2C%22w2%22%3A2%2C%22o2%22%3A8%2C%22s2%22%3A0%2C%22d2%22%3A18%2C%22ea%22%3A100000%2C%22es%22%3A56363%2C%22er%22%3A100000%2C%22e1%22%3A0%2C%22e2%22%3A0%2C%22ct%22%3A2%2C%22ca%22%3A200%2C%22cr%22%3A254%2C%22mw%22%3A0%2C%22ms%22%3A0%2C%22ma%22%3A0%2C%22m1%22%3A0%2C%22mc%22%3A0%2C%22ds%22%3A8%2C%22da%22%3A24%2C%22ps%22%3A0%2C%22pa%22%3A0%2C%22nv%22%3A0%2C%22vm%22%3A255%2C%22s%22%3A%5B3%2C4%2C3%2C4%2C3%2C4%2C3%2C4%2C3%2C4%2C5%2C6%2C3%2C4%2C3%2C4%2C3%2C5%5D%2C%22p%22%3A%5B%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B123%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C119%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B121%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C116%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B111%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C111%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B111%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%5D%7D%2C%7B%22v1%22%3A0%2C%22w1%22%3A0%2C%22o1%22%3A8%2C%22s1%22%3A0%2C%22d1%22%3A0%2C%22v2%22%3A0%2C%22w2%22%3A0%2C%22o2%22%3A8%2C%22s2%22%3A0%2C%22d2%22%3A0%2C%22ea%22%3A100000%2C%22es%22%3A100000%2C%22er%22%3A100000%2C%22e1%22%3A0%2C%22e2%22%3A0%2C%22ct%22%3A2%2C%22ca%22%3A2500%2C%22cr%22%3A16%2C%22mw%22%3A0%2C%22ms%22%3A3%2C%22ma%22%3A51%2C%22m1%22%3A0%2C%22mc%22%3A1%2C%22ds%22%3A3%2C%22da%22%3A157%2C%22ps%22%3A0%2C%22pa%22%3A0%2C%22nv%22%3A255%2C%22vm%22%3A100%2C%22s%22%3A%5B1%2C1%2C1%2C1%2C1%2C1%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C1%2C1%5D%2C%22p%22%3A%5B%5B135%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C135%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%5D%7D%2C%7B%22v1%22%3A255%2C%22w1%22%3A0%2C%22o1%22%3A8%2C%22s1%22%3A0%2C%22d1%22%3A0%2C%22v2%22%3A0%2C%22w2%22%3A0%2C%22o2%22%3A8%2C%22s2%22%3A0%2C%22d2%22%3A0%2C%22ea%22%3A0%2C%22es%22%3A0%2C%22er%22%3A6363%2C%22e1%22%3A1%2C%22e2%22%3A0%2C%22ct%22%3A0%2C%22ca%22%3A7400%2C%22cr%22%3A126%2C%22mw%22%3A0%2C%22ms%22%3A0%2C%22ma%22%3A0%2C%22m1%22%3A0%2C%22mc%22%3A0%2C%22ds%22%3A0%2C%22da%22%3A0%2C%22ps%22%3A0%2C%22pa%22%3A0%2C%22nv%22%3A0%2C%22vm%22%3A239%2C%22s%22%3A%5B0%2C0%2C0%2C0%2C1%2C1%2C1%2C1%2C1%2C1%2C0%2C0%2C1%2C1%2C1%2C1%5D%2C%22p%22%3A%5B%5B135%2C135%2C0%2C0%2C0%2C0%2C135%2C0%2C135%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C135%2C135%2C0%2C0%2C0%2C0%2C135%2C0%2C135%2C0%2C0%2C135%2C0%2C0%2C135%2C0%5D%5D%7D%2C%7B%22v1%22%3A255%2C%22w1%22%3A0%2C%22o1%22%3A8%2C%22s1%22%3A0%2C%22d1%22%3A0%2C%22v2%22%3A0%2C%22w2%22%3A0%2C%22o2%22%3A8%2C%22s2%22%3A0%2C%22d2%22%3A0%2C%22ea%22%3A1818%2C%22es%22%3A0%2C%22er%22%3A18181%2C%22e1%22%3A1%2C%22e2%22%3A0%2C%22ct%22%3A3%2C%22ca%22%3A6600%2C%22cr%22%3A78%2C%22mw%22%3A0%2C%22ms%22%3A4%2C%22ma%22%3A85%2C%22m1%22%3A0%2C%22mc%22%3A1%2C%22ds%22%3A3%2C%22da%22%3A73%2C%22ps%22%3A0%2C%22pa%22%3A0%2C%22nv%22%3A112%2C%22vm%22%3A254%2C%22s%22%3A%5B0%2C0%2C0%2C0%2C1%2C1%2C1%2C1%2C1%2C0%2C0%2C0%2C1%2C1%2C1%2C1%5D%2C%22p%22%3A%5B%5B0%2C0%2C0%2C0%2C135%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C135%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C135%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C135%2C0%2C0%2C0%5D%5D%7D%2C%7B%22v1%22%3A255%2C%22w1%22%3A0%2C%22o1%22%3A9%2C%22s1%22%3A0%2C%22d1%22%3A0%2C%22v2%22%3A255%2C%22w2%22%3A0%2C%22o2%22%3A9%2C%22s2%22%3A0%2C%22d2%22%3A12%2C%22ea%22%3A100%2C%22es%22%3A0%2C%22er%22%3A14545%2C%22e1%22%3A0%2C%22e2%22%3A0%2C%22ct%22%3A0%2C%22ca%22%3A0%2C%22cr%22%3A240%2C%22mw%22%3A0%2C%22ms%22%3A0%2C%22ma%22%3A0%2C%22m1%22%3A0%2C%22mc%22%3A0%2C%22ds%22%3A2%2C%22da%22%3A157%2C%22ps%22%3A0%2C%22pa%22%3A0%2C%22nv%22%3A0%2C%22vm%22%3A70%2C%22s%22%3A%5B0%2C0%2C0%2C0%2C0%2C0%2C1%2C2%2C1%2C2%2C0%2C0%2C0%2C0%2C1%2C2%5D%2C%22p%22%3A%5B%5B135%2C147%2C135%2C147%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C145%2C0%2C147%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C138%2C150%2C138%2C0%2C137%2C149%2C137%2C0%5D%2C%5B128%2C140%2C143%2C142%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C133%2C145%2C133%2C0%2C140%2C152%2C155%2C154%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%5D%7D%2C%7B%22v1%22%3A255%2C%22w1%22%3A2%2C%22o1%22%3A9%2C%22s1%22%3A0%2C%22d1%22%3A0%2C%22v2%22%3A255%2C%22w2%22%3A2%2C%22o2%22%3A10%2C%22s2%22%3A0%2C%22d2%22%3A28%2C%22ea%22%3A100%2C%22es%22%3A0%2C%22er%22%3A5454%2C%22e1%22%3A0%2C%22e2%22%3A0%2C%22ct%22%3A2%2C%22ca%22%3A7800%2C%22cr%22%3A94%2C%22mw%22%3A0%2C%22ms%22%3A7%2C%22ma%22%3A128%2C%22m1%22%3A0%2C%22mc%22%3A1%2C%22ds%22%3A3%2C%22da%22%3A103%2C%22ps%22%3A0%2C%22pa%22%3A0%2C%22nv%22%3A0%2C%22vm%22%3A254%2C%22s%22%3A%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C1%2C2%2C1%2C2%2C1%2C2%2C1%2C2%5D%2C%22p%22%3A%5B%5B0%2C135%2C137%2C0%2C137%2C138%2C0%2C138%2C140%2C0%2C140%2C142%2C0%2C142%2C143%2C145%2C0%2C135%2C137%2C0%2C137%2C138%2C0%2C138%2C140%2C0%2C140%2C142%2C0%2C142%2C143%2C145%5D%2C%5B0%2C135%2C137%2C0%2C137%2C138%2C0%2C138%2C140%2C0%2C140%2C142%2C0%2C142%2C143%2C145%2C0%2C135%2C137%2C0%2C137%2C138%2C0%2C138%2C140%2C0%2C140%2C142%2C150%2C149%2C147%2C149%5D%5D%7D%2C%7B%22v1%22%3A82%2C%22w1%22%3A2%2C%22o1%22%3A8%2C%22s1%22%3A0%2C%22d1%22%3A0%2C%22v2%22%3A0%2C%22w2%22%3A0%2C%22o2%22%3A8%2C%22s2%22%3A0%2C%22d2%22%3A0%2C%22ea%22%3A100%2C%22es%22%3A0%2C%22er%22%3A9090%2C%22e1%22%3A1%2C%22e2%22%3A0%2C%22ct%22%3A3%2C%22ca%22%3A5200%2C%22cr%22%3A63%2C%22mw%22%3A0%2C%22ms%22%3A0%2C%22ma%22%3A0%2C%22m1%22%3A0%2C%22mc%22%3A0%2C%22ds%22%3A0%2C%22da%22%3A0%2C%22ps%22%3A0%2C%22pa%22%3A0%2C%22nv%22%3A255%2C%22vm%22%3A232%2C%22s%22%3A%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C2%2C2%2C2%2C2%5D%2C%22p%22%3A%5B%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C135%2C0%2C0%2C0%2C135%2C0%2C0%2C0%2C135%2C0%2C0%2C135%2C135%2C0%2C0%2C0%2C135%2C0%2C0%2C0%2C135%2C0%2C0%2C0%2C135%2C135%2C0%2C0%2C135%2C0%5D%5D%7D%5D%7D)


</details>

---

Entire app source-code fits on a 3x5 card  

<a href="https://bacionejs.github.io/bacionejs/viewsource.html?b=1&file=https://raw.githubusercontent.com/bacionejs/battito/main/battito.html" target="_blank"><img width="200" src="https://github.com/user-attachments/assets/8c96011f-4e8f-4a3f-bb7d-c9113754fa40" /></a>

[^1]: The synth engine portion of this sequencer is a port of Jake Taylor's [public domain Sonant](https://github.com/user-attachments/assets/e01812b1-4b97-47e0-81a8-49d157aa89bf), designed for size-constrained projects.
