
---

To open the app, click ↴  

<a href="//bacionejs.github.io/battito/battito.html" target="_blank"> <img src="https://repository-images.githubusercontent.com/1048415375/641c7009-ab04-4a74-861d-28f8b379d862" width="70%" /> </a>

Or download and open from your file manager 


---

<details><summary>Purpose</summary>  

- This music tracker produces Sonant formatted JSON. Sonant based synth is designed to be small, **for size constrained games**.  
- What makes this app unique from other Sonant based trackers is the use of a piano-roll to **reduce clicks and enhance visualization of note relationships**.  

</details><details><summary>Features</summary>

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
| **sequencer** | 8 columns (tracks/instruments), 500 rows (30-minute songs at 120 BPM), and cells where you can toggle through pattern IDs (8 per track). |
| **piano** | Edit patterns on a piano roll — 48 notes wide (4 octaves from C3 through C6) and 32 steps tall. |
| **textarea** | Import/export and manually edit tempo, instruments, and song. |
| **waveform** | Instrument waveform analyzer. |

---

Steps
1. Click on the column headers in the **sequencer** to hear what the preset instruments sound like. You can select multiple columns/rows in the **sequencer** for playback, but you can only have one column/row selected while editing notes on the **piano**. The **sequencer** constantly loops over the selected **sequencer** columns/rows. Click the upper-left corner cell in the **sequencer** to toggle the whole song.
1. To enter a note on the **piano**, select a column/row in the **sequencer** and click the intersecting cell to select a pattern ID. Then you can edit that pattern on the **piano**. To advance the pattern ID number just keep clicking in the **sequencer** cell. You can reuse a pattern ID. When coming back to edit a pattern, don't click the **sequencer** cell as that will advance the pattern ID, just select a column/row.

---

Optional
- There are 8 preset instruments, but you can also:
  - select a track and configure the **synth**
  - or import existing Sonant compatible song JSON which have instruments that you like and when prompted after pasting into the **textarea**, answer yes to import only instruments
- To clear everything, delete the text in the **textarea**, which will then automatically refresh with minimal settings.
- To save your work for future use, copy the **textarea** JSON to a separate text editor. To import, paste the JSON in the **textarea**.
- Normally, the song is output as JSON to use with a `sonant player`, but it can also be exported to `.wav` by long-pressing on the **waveform** visualizer. It will export whatever is selected: ranges or whole song.
- The **textarea** can be edited. Changes are live.
- Change the tempo by editing the first value in the **textarea** (5513=120 BPM).

---

Notes  
- Looping is **live**, meaning it regenerates every time, so changes you make to notes/sequence/synth, are reflected in the next loop. This is helpful when evaluating a small section, as the changes are almost immediate.

---

Usage
- For an example of music in a game, see [Bike](https://github.com/bacionejs/bike).

---

</details><details><summary>Songs</summary>

You can paste these songs into the **textarea**.

Beatnic by mBitsnBites (simplified)

```json
[5088,[[[7,0,0,1,255,0,7,0,0,1,255,0,0,100,0,5970,171,2,500,254,1,31,4,21],[1,1,1,1],[[147,0,0,0,147,0,0,0,147,0,0,0,147,0,0,0,147,0,0,0,147,0,0,0,147,0,0,0,147]]],[[7,0,0,0,255,2,7,0,4,0,255,2,0,88,2000,7505,255,2,3144,51,6,60,4,64,0,1,7,179],[1,1,1,1],[[0,0,123,0,0,0,0,0,0,0,0,0,0,0,123,0,123]]],[[7,0,0,0,192,2,7,0,0,0,201,3,0,100,150,7505,191,2,5839,254,6,121,6,147,0,1,6,195],[1,1,2,3],[[135,0,0,0,0,0,0,0,159,0,157,0,159,0,0,0,0,0,0,0,0,0,0,0,147,154,0,159],[138,0,0,0,0,0,0,0,150,0,159,0,162,0,0,0,0,0,0,0,0,0,150,0,162,150,0,159],[149,0,0,0,0,0,0,0,149,0,150,0,154,0,0,0,0,0,0,0,0,0,0,0,147,157,0,159]]]]]
```

Liver by mBitsnBites

```json
[5513,[[[7,0,0,0,192,3,7,0,7,0,201,3,0,789,1234,13636,191,2,5839,254,6,121,6,147,0,1,6,195],[1,2,0,0,1,2,1,2],[[154,0,154,0,152,0,147,0,0,0,0,0,0,0,0,0,154,0,154,0,152,0,157,0,0,0,156],[154,0,154,0,152,0,147,0,0,0,0,0,0,0,0,0,154,0,154,0,152,0,157,0,0,0,159]]],[[7,0,0,0,255,2,8,0,18,1,191,2,0,3997,56363,100000,255,2,392,255,8,69,5,67,0,1,4,57,3],[1,2,1,2,1,2,1,2],[[130],[123]]],[[8,0,0,0,0,0,8,0,0,0,0,0,60,50,419,4607,130,1,10332,120,4,16,5,108,0,0,5,187],[0,0,0,0,1,1],[[0,0,147,0,0,0,147,147,0,0,147,0,0,147,0,147,0,0,147,0,0,0,147,147,0,0,147,0,0,147,0,147]]],[[7,0,0,1,255,0,7,0,0,1,255,0,0,50,150,4800,200,2,600,254],[1,1,1,1,1,1],[[147,0,0,0,0,0,0,0,147,0,0,0,0,0,0,0,147,0,0,0,0,0,0,0,147]]],[[7,0,0,0,255,2,7,0,9,0,154,2,0,2418,1075,10614,240,3,2962,255,6,117,3,73,0,1,5,124],[0,0,0,0,1,2,1,2],[[154,0,154,0,152,0,147,0,0,0,0,0,0,0,0,0,154,0,154,0,152,0,157,0,0,0,156],[154,0,154,0,152,0,147,0,0,0,0,0,0,0,0,0,154,0,147,0,152,0,157,0,0,0,159]]],[[7,0,0,0,192,1,6,0,9,0,192,1,0,137,2000,4611,192,1,982,89,6,25,6,77,0,1,3,69],[1,2,1,3,1,3],[[130,0,130,0,142,0,130,130,0,142,130,0,142,0,130,0,130,0,130,0,142,0,130,130,0,142,130,0,142,0,130],[123,0,123,0,135,0,123,123,0,135,123,0,135,0,123,0,123,0,123,0,135,0,123,123,0,135,123,0,135,0,123],[135,0,135,0,147,0,135,135,0,147,135,0,147,0,135,0,135,0,135,0,147,0,135,135,0,147,135,0,147,0,135]]],[[7,0,0,0,255,3,8,0,0,0,255,0,127,22,88,3997,255,3,4067,234,4,33,2,84,0,1,3,28],[0,0,1,2,1,2,1,3],[[0,0,142,0,154,0,0,0,142,0,0,0,154,0,0,0,0,0,142,0,154,0,0,0,142,0,0,0,154],[0,0,147,0,154,0,0,0,147,0,0,0,154,0,0,0,0,0,147,0,154,0,147,0,0,0,154,0,0,0,154],[0,0,147,0,154,0,0,0,147,0,0,0,154,0,0,0,0,0,147,0,154,0,0,0,147]]],[[8,0,0,0,0,0,8,0,0,0,0,0,255,140347,9216,133417,208,2,2500,16,2,157,8,207,0,1,2,51],[0,0,1,1,1,1,1,1],[[147]]]]]
```

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

</details><details><summary>Alternatives</summary>

- Sonant
  - Original - 2008 Jake Taylor
  - js-sonant/soundbox - 2011 Marcus Geelnard
  - sonant-x - 2014 Nicolas Van
  - pl_synth - 2024 Dominic Szablewski

- Others
  - ZzFXM
  - BassoonTracker

</details><details><summary>Credits</summary>

- Music Player: [pl_synth](https://github.com/phoboslab/pl_synth)

</details>

---


