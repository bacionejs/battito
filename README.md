  


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

- **Fast** - 75 times faster[^2] than [Sonant-X](https://github.com/nicolas-van/sonant-x-live) and comparable in speed to the [pl_synth](https://github.com/phoboslab/pl_synth) WASM solution
- **Selection** - Comprehensive selection mechanism
- **Export** - Exports your song as a complete ready-to-run HTML page or WAV file.
- **Scriptable** - Raw JSON can be edited live
- **Improv** - Has a tab for live-jamming
- **Pianoroll** - Intuitive one-click note input
- **Overdub** - Input notes while other tracks are playing
- **Live** - Regenerates every loop




</details><details><summary>Samples</summary>

**After opening a sample, click the sequencer corner to play it**  

[Beatnic by mBitsnBites (simplified)][beatnic]  
[Ambidumbi by Gargaj][ambidumbi]

</details>

---

Entire app source-code fits on a 3x5 card  

<a href="https://bacionejs.github.io/bacionejs/viewsource.html?b=1&file=https://raw.githubusercontent.com/bacionejs/battito/main/battito.html" target="_blank"><img width="200" src="https://github.com/user-attachments/assets/8c96011f-4e8f-4a3f-bb7d-c9113754fa40" /></a>

[^1]: The synth engine portion of this sequencer is a port of Jake Taylor's [public domain Sonant](https://github.com/user-attachments/assets/e01812b1-4b97-47e0-81a8-49d157aa89bf), **for size-constrained games and demos**
[^2]: [Battito][ambidumbi] vs [Sonant-X][ambidumbisonantx] song generation speed comparison

[beatnic]: https://bacionejs.github.io/battito/battito.html?song=eyJicG0iOjEwMCwidHJhY2tzIjpbeyJ2MSI6MjU1LCJ3MSI6MCwibzEiOjksInMxIjowLCJkMSI6MCwidjIiOjI1NSwidzIiOjAsIm8yIjo3LCJzMiI6MCwiZDIiOjAsImVhIjoxMDAsImVzIjowLCJlciI6NTk3MCwiZTEiOjEsImUyIjoxLCJjdCI6MiwiY2EiOjUwMCwiY3IiOjI1NCwibXciOjAsIm1zIjowLCJtYSI6MCwibTEiOjAsIm1jIjowLCJkcyI6MSwiZGEiOjMxLCJwcyI6NCwicGEiOjIxLCJudiI6MCwidm0iOjE3MSwicyI6WzEsMSwxLDFdLCJwIjpbWzEyMywwLDAsMCwxMjMsMCwwLDAsMTIzLDAsMCwwLDEyMywwLDAsMCwxMjMsMCwwLDAsMTIzLDAsMCwwLDEyMywwLDAsMCwxMjMsMCwwLDBdXX0seyJ2MSI6MjU1LCJ3MSI6MiwibzEiOjYsInMxIjoxMSwiZDEiOjAsInYyIjoyNTUsIncyIjoyLCJvMiI6NiwiczIiOjExLCJkMiI6NCwiZWEiOjg4LCJlcyI6MjAwMCwiZXIiOjc1MDUsImUxIjowLCJlMiI6MCwiY3QiOjIsImNhIjozMTQ0LCJjciI6NTEsIm13IjowLCJtcyI6NywibWEiOjE3OSwibTEiOjAsIm1jIjoxLCJkcyI6NiwiZGEiOjYwLCJwcyI6NCwicGEiOjY0LCJudiI6MCwidm0iOjI1NSwicyI6WzEsMSwxLDFdLCJwIjpbWzAsMCwxMjQsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDEyNCwwLDEyNCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF1dfSx7InYxIjoxOTIsIncxIjoyLCJvMSI6NywiczEiOjAsImQxIjowLCJ2MiI6MjAxLCJ3MiI6MywibzIiOjcsInMyIjowLCJkMiI6MCwiZWEiOjEwMCwiZXMiOjE1MCwiZXIiOjc1MDUsImUxIjowLCJlMiI6MCwiY3QiOjIsImNhIjo1ODM5LCJjciI6MjU0LCJtdyI6MCwibXMiOjYsIm1hIjoxOTUsIm0xIjowLCJtYyI6MSwiZHMiOjYsImRhIjoxMjEsInBzIjo2LCJwYSI6MTQ3LCJudiI6MCwidm0iOjE5MSwicyI6WzEsMSwyLDNdLCJwIjpbWzEzNSwwLDAsMCwwLDAsMCwwLDE1OSwwLDE1NywwLDE1OSwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMTQ3LDE1NCwwLDE1OSwwLDAsMCwwXSxbMTM4LDAsMCwwLDAsMCwwLDAsMTUwLDAsMTU5LDAsMTYyLDAsMCwwLDAsMCwwLDAsMCwwLDE1MCwwLDE2MiwxNTAsMCwxNTksMCwwLDAsMF0sWzE0OSwwLDAsMCwwLDAsMCwwLDE0OSwwLDE1MCwwLDE1NCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMTQ3LDE1NywwLDE1OSwwLDAsMCwwXV19XX0%3D

[ambidumbi]: https://bacionejs.github.io/battito/battito.html?song=%7B%22bpm%22%3A60%2C%22tracks%22%3A%5B%7B%22v1%22%3A255%2C%22w1%22%3A3%2C%22o1%22%3A9%2C%22s1%22%3A0%2C%22d1%22%3A0%2C%22v2%22%3A255%2C%22w2%22%3A3%2C%22o2%22%3A9%2C%22s2%22%3A0%2C%22d2%22%3A14%2C%22ea%22%3A100000%2C%22es%22%3A28181%2C%22er%22%3A100000%2C%22e1%22%3A0%2C%22e2%22%3A0%2C%22ct%22%3A3%2C%22ca%22%3A3700%2C%22cr%22%3A88%2C%22mw%22%3A0%2C%22ms%22%3A4%2C%22ma%22%3A228%2C%22m1%22%3A0%2C%22mc%22%3A1%2C%22ds%22%3A8%2C%22da%22%3A121%2C%22ps%22%3A1%2C%22pa%22%3A22%2C%22nv%22%3A0%2C%22vm%22%3A106%2C%22s%22%3A%5B0%2C0%2C1%2C2%2C1%2C2%2C1%2C2%2C1%2C2%2C0%2C0%2C1%2C2%2C1%2C2%5D%2C%22p%22%3A%5B%5B123%2C138%2C135%2C150%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C119%2C138%2C131%2C150%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B119%2C140%2C143%2C152%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C116%2C138%2C140%2C150%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%5D%7D%2C%7B%22v1%22%3A255%2C%22w1%22%3A2%2C%22o1%22%3A7%2C%22s1%22%3A0%2C%22d1%22%3A0%2C%22v2%22%3A255%2C%22w2%22%3A2%2C%22o2%22%3A8%2C%22s2%22%3A0%2C%22d2%22%3A18%2C%22ea%22%3A100000%2C%22es%22%3A56363%2C%22er%22%3A100000%2C%22e1%22%3A0%2C%22e2%22%3A0%2C%22ct%22%3A2%2C%22ca%22%3A200%2C%22cr%22%3A254%2C%22mw%22%3A0%2C%22ms%22%3A0%2C%22ma%22%3A0%2C%22m1%22%3A0%2C%22mc%22%3A0%2C%22ds%22%3A8%2C%22da%22%3A24%2C%22ps%22%3A0%2C%22pa%22%3A0%2C%22nv%22%3A0%2C%22vm%22%3A255%2C%22s%22%3A%5B3%2C4%2C3%2C4%2C3%2C4%2C3%2C4%2C3%2C4%2C5%2C6%2C3%2C4%2C3%2C4%2C3%2C5%5D%2C%22p%22%3A%5B%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B123%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C119%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B121%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C116%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B111%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C111%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B111%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%5D%7D%2C%7B%22v1%22%3A0%2C%22w1%22%3A0%2C%22o1%22%3A8%2C%22s1%22%3A0%2C%22d1%22%3A0%2C%22v2%22%3A0%2C%22w2%22%3A0%2C%22o2%22%3A8%2C%22s2%22%3A0%2C%22d2%22%3A0%2C%22ea%22%3A100000%2C%22es%22%3A100000%2C%22er%22%3A100000%2C%22e1%22%3A0%2C%22e2%22%3A0%2C%22ct%22%3A2%2C%22ca%22%3A2500%2C%22cr%22%3A16%2C%22mw%22%3A0%2C%22ms%22%3A3%2C%22ma%22%3A51%2C%22m1%22%3A0%2C%22mc%22%3A1%2C%22ds%22%3A3%2C%22da%22%3A157%2C%22ps%22%3A0%2C%22pa%22%3A0%2C%22nv%22%3A255%2C%22vm%22%3A100%2C%22s%22%3A%5B1%2C1%2C1%2C1%2C1%2C1%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C1%2C1%5D%2C%22p%22%3A%5B%5B135%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C135%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%5D%7D%2C%7B%22v1%22%3A255%2C%22w1%22%3A0%2C%22o1%22%3A8%2C%22s1%22%3A0%2C%22d1%22%3A0%2C%22v2%22%3A0%2C%22w2%22%3A0%2C%22o2%22%3A8%2C%22s2%22%3A0%2C%22d2%22%3A0%2C%22ea%22%3A0%2C%22es%22%3A0%2C%22er%22%3A6363%2C%22e1%22%3A1%2C%22e2%22%3A0%2C%22ct%22%3A0%2C%22ca%22%3A7400%2C%22cr%22%3A126%2C%22mw%22%3A0%2C%22ms%22%3A0%2C%22ma%22%3A0%2C%22m1%22%3A0%2C%22mc%22%3A0%2C%22ds%22%3A0%2C%22da%22%3A0%2C%22ps%22%3A0%2C%22pa%22%3A0%2C%22nv%22%3A0%2C%22vm%22%3A239%2C%22s%22%3A%5B0%2C0%2C0%2C0%2C1%2C1%2C1%2C1%2C1%2C1%2C0%2C0%2C1%2C1%2C1%2C1%5D%2C%22p%22%3A%5B%5B135%2C135%2C0%2C0%2C0%2C0%2C135%2C0%2C135%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C135%2C135%2C0%2C0%2C0%2C0%2C135%2C0%2C135%2C0%2C0%2C135%2C0%2C0%2C135%2C0%5D%5D%7D%2C%7B%22v1%22%3A255%2C%22w1%22%3A0%2C%22o1%22%3A8%2C%22s1%22%3A0%2C%22d1%22%3A0%2C%22v2%22%3A0%2C%22w2%22%3A0%2C%22o2%22%3A8%2C%22s2%22%3A0%2C%22d2%22%3A0%2C%22ea%22%3A1818%2C%22es%22%3A0%2C%22er%22%3A18181%2C%22e1%22%3A1%2C%22e2%22%3A0%2C%22ct%22%3A3%2C%22ca%22%3A6600%2C%22cr%22%3A78%2C%22mw%22%3A0%2C%22ms%22%3A4%2C%22ma%22%3A85%2C%22m1%22%3A0%2C%22mc%22%3A1%2C%22ds%22%3A3%2C%22da%22%3A73%2C%22ps%22%3A0%2C%22pa%22%3A0%2C%22nv%22%3A112%2C%22vm%22%3A254%2C%22s%22%3A%5B0%2C0%2C0%2C0%2C1%2C1%2C1%2C1%2C1%2C0%2C0%2C0%2C1%2C1%2C1%2C1%5D%2C%22p%22%3A%5B%5B0%2C0%2C0%2C0%2C135%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C135%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C135%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C135%2C0%2C0%2C0%5D%5D%7D%2C%7B%22v1%22%3A255%2C%22w1%22%3A0%2C%22o1%22%3A9%2C%22s1%22%3A0%2C%22d1%22%3A0%2C%22v2%22%3A255%2C%22w2%22%3A0%2C%22o2%22%3A9%2C%22s2%22%3A0%2C%22d2%22%3A12%2C%22ea%22%3A100%2C%22es%22%3A0%2C%22er%22%3A14545%2C%22e1%22%3A0%2C%22e2%22%3A0%2C%22ct%22%3A0%2C%22ca%22%3A0%2C%22cr%22%3A240%2C%22mw%22%3A0%2C%22ms%22%3A0%2C%22ma%22%3A0%2C%22m1%22%3A0%2C%22mc%22%3A0%2C%22ds%22%3A2%2C%22da%22%3A157%2C%22ps%22%3A0%2C%22pa%22%3A0%2C%22nv%22%3A0%2C%22vm%22%3A70%2C%22s%22%3A%5B0%2C0%2C0%2C0%2C0%2C0%2C1%2C2%2C1%2C2%2C0%2C0%2C0%2C0%2C1%2C2%5D%2C%22p%22%3A%5B%5B135%2C147%2C135%2C147%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C145%2C0%2C147%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C138%2C150%2C138%2C0%2C137%2C149%2C137%2C0%5D%2C%5B128%2C140%2C143%2C142%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C133%2C145%2C133%2C0%2C140%2C152%2C155%2C154%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%5D%7D%2C%7B%22v1%22%3A255%2C%22w1%22%3A2%2C%22o1%22%3A9%2C%22s1%22%3A0%2C%22d1%22%3A0%2C%22v2%22%3A255%2C%22w2%22%3A2%2C%22o2%22%3A10%2C%22s2%22%3A0%2C%22d2%22%3A28%2C%22ea%22%3A100%2C%22es%22%3A0%2C%22er%22%3A5454%2C%22e1%22%3A0%2C%22e2%22%3A0%2C%22ct%22%3A2%2C%22ca%22%3A7800%2C%22cr%22%3A94%2C%22mw%22%3A0%2C%22ms%22%3A7%2C%22ma%22%3A128%2C%22m1%22%3A0%2C%22mc%22%3A1%2C%22ds%22%3A3%2C%22da%22%3A103%2C%22ps%22%3A0%2C%22pa%22%3A0%2C%22nv%22%3A0%2C%22vm%22%3A254%2C%22s%22%3A%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C1%2C2%2C1%2C2%2C1%2C2%2C1%2C2%5D%2C%22p%22%3A%5B%5B0%2C135%2C137%2C0%2C137%2C138%2C0%2C138%2C140%2C0%2C140%2C142%2C0%2C142%2C143%2C145%2C0%2C135%2C137%2C0%2C137%2C138%2C0%2C138%2C140%2C0%2C140%2C142%2C0%2C142%2C143%2C145%5D%2C%5B0%2C135%2C137%2C0%2C137%2C138%2C0%2C138%2C140%2C0%2C140%2C142%2C0%2C142%2C143%2C145%2C0%2C135%2C137%2C0%2C137%2C138%2C0%2C138%2C140%2C0%2C140%2C142%2C150%2C149%2C147%2C149%5D%5D%7D%2C%7B%22v1%22%3A82%2C%22w1%22%3A2%2C%22o1%22%3A8%2C%22s1%22%3A0%2C%22d1%22%3A0%2C%22v2%22%3A0%2C%22w2%22%3A0%2C%22o2%22%3A8%2C%22s2%22%3A0%2C%22d2%22%3A0%2C%22ea%22%3A100%2C%22es%22%3A0%2C%22er%22%3A9090%2C%22e1%22%3A1%2C%22e2%22%3A0%2C%22ct%22%3A3%2C%22ca%22%3A5200%2C%22cr%22%3A63%2C%22mw%22%3A0%2C%22ms%22%3A0%2C%22ma%22%3A0%2C%22m1%22%3A0%2C%22mc%22%3A0%2C%22ds%22%3A0%2C%22da%22%3A0%2C%22ps%22%3A0%2C%22pa%22%3A0%2C%22nv%22%3A255%2C%22vm%22%3A232%2C%22s%22%3A%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C2%2C2%2C2%2C2%5D%2C%22p%22%3A%5B%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C135%2C0%2C0%2C0%2C135%2C0%2C0%2C0%2C135%2C0%2C0%2C135%2C135%2C0%2C0%2C0%2C135%2C0%2C0%2C0%2C135%2C0%2C0%2C0%2C135%2C135%2C0%2C0%2C135%2C0%5D%5D%7D%5D%7D

[ambidumbisonantx]: http://nicolas-van.github.io/sonant-x-live/#N4Igzg9gdg5gMgUyiAXARgKwBYA05owAiAhgC7GoDaoEYAxmgPoR2moCcetDjAJgmxQAGLvSb9SAVygJUIkNyYAPJADc5onqogAbVACYMGTUwDuxVQgBmEAE4BbVAGZN%2B5qw6u%2BAjQvpuJaVl0XD86NxUodWEvbT0UQ2Mwt3NLGwdnPCgIAEswBEYrYn5bXzVGMnI6AGtUNCEGhrxysEkwchzkBIAONF7mqMZbBB0EYny6xqaQcvtx0gRS9CEANjwrJUKcnQWllxANwuGAR2cAdmnD4cgoYig6YO7u9c3%2BHWIAT0ZSHPtHl%2B87y%2BxHsgjQ%2BjQAIADncjghTuhobCQYJ9Po8DobMwxHCEfJMRBCpsrCc6hisST4ahQgSKqCDPpniBaalrHZHDEQFCqCIRJD0fycILBbyhTgBeKALp4OhUUBdSjglxoJzPFXGTCirU4bW6nVCtCcFVqpyQzX6vWWi2SgC%2BOHlVDQhqFWD5WGVGHRVu9%2Bqda2NLr5GB9IdttvtYSYLEEZxM3kE8kU8aCviTkWiiZxcQMRjjrPSHPRyXcgiZ3ACPk55eTMjqZf8jHTqYb2YSueL%2BfZBiyuXyhWKizKg0qxBqkymA1UjFa7WInVQGBWTiXk6GIzGE2WE5mgzm7UH6HYnAOxO2u27J9xBkum2u0DuDxzoUOb0%2B31%2B%2F0vr%2BB9ISz82MJQFenKHIBdIJuShJJpSeKQUSwH4hSpKcrSKK%2BCyFhshknLciglAuLgBE4ERJE4LgxhrKRhE4Bg0ogLKeEOnhIYWqxLHsWxbHhkxlAcXxnH8Vq3EgAqSoCeJLFOpwgkScJokQhJilWn6SmqUJdo8U6kIycpTpqfpQhyY6ek6QZZm6mGGmRiWqD1jwEjNvZAgplWOJNq5Wi6I5ZiYQWjluNGtleA5HkVlItahY2aj%2BYwraZuEjCdth8jZHkBRFCUOZJOUI5jlujSrjOHRdPU27lMMozjMEpUFTuU57ueh5FocVhngezXEshhg3muNwPtVaxfiMb4%2FH8mRDUC4F1BgsaXmBMG%2BKByK%2FohUE4gtKEUp1VKIsySE7fsqG%2FhgkJ7YSSUcvIuGKmKZq3eZvpCnRDHUCJjpOMYpl6uqD3epZEZJoFKB2eIlbxaD4XBODUVRGS1mtokea%2BV2kVA3ZYUxYEEXxRE0WRXFXgXb4qV9hlB7yDlpBVLUnItG0xVDlOFUbsES4rnVjANe1TjHi1bVLPILXIWcrqC7eCB9fc1X6INL7DV8o1QwC35TSBAGwhtYuMGBaGbWtPCa3BQs7atCFwbrptEzhPKcXddtiqK9toM9cpvXhP0%2Fd9H2%2Bt7kne57tu%2B0KQd8iHweff9NA4mjcYhdDWNK9Z7mnUmCPtkmVs4zZwPBWDueQzF7lZwTHbI8lPZpf2mXoOCq65TTfR9IV9Nzl0FODMzVV1o3q5c0shj%2FlsOwHvsxsIisKw9XetxS6gZxMnLk2K%2BNi9vrrZyj%2BrQGG3Ny0QWd2IG8hptj3DtIbTSWK690SQYWkKNXTb2pOw7rFOy7jFu7xgefapAc%2Bv%2FRSgDDI2mEoDDwKBjxJjjrHZy2M4xFzjGnJIGcy6XS8EDKBDYYHFgTnUIs1ZEHFmQYTNBxNezpQHALOuVNRwN2mHTWc85aYd3XF3EI2Bsq7nmAeC4AJWrD2oZeHeVwJb3lnn%2BLWKtl4JGVvLVWmBZpLW3sfJEQELZwWgqog%2Bp89ZmwPhog%2Bmc8DXQAeKMUXpbZShlK7US%2FssCxg9g436Lpf5oGcX7NUwZg7PFDo4rARonCxhARGeSapXQumVFgSxfsokaicC4N0QYBS5kwLgL6kdrKYNgfvaBcDE5pjxtDEh1krYEIbEDeo%2BdMb5IMOjGGGZYheTbCghsZSK6kyoYzCotC8qlWbkwtuq5O6bk4aEWYPD%2B7YH4fzC8uj55TzETPR8kDB7SI%2FCvV48jdb1E3trDW2jlGq1Nlok2RttoIlOufYW5tfzgiZHfLC6CuRPzMsKcx7z9Af1egqUO8TgnB0caqH24THYRPcZYiFkTXE%2B3%2BT7IFvifGBl9OC6JKKBTulcUZZi4dAXwqRaHUFKK3SQrRe4uJsK8V%2BIJUi9xYKSVCm8e4o0zjmWZPAaWHJ3kawFLcnjFOWZmndHKTwdpxYY64LzpKgukUiHVhLtWYxIkKFV3au2Sm1NxwDIZiwpmbDNzsCEIa3ukyDBOA6kPRqeyNqekWZLFZ7NV4Kw2WrQEa8VpqP0UcwxtJTmwR0Rc9C%2B1%2FVHX3o8vy1scWmXRDG6x9FbGvK%2Bi49i2Lv5%2FJ%2Fhmx2%2Fsw7pufjm3FgDPaWTorYCAphEAlXqIYAYvAAAKlRFglXYDaIAA%3D%3D
