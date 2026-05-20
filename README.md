<a href="//bacionejs.github.io/battito/battito.html" target="_blank"><img src="https://repository-images.githubusercontent.com/1048415375/5420aaef-7338-48b6-a817-3660165a012c" width="100%" /></a>

Battito Beats is the easiest music tracker in its class

[live tutorial](https://bacionejs.github.io/battito/battito.html?t=element(%22style%22).textContent%3D%22.tut-pointer%2C.tut-message%7Bposition%3Afixed%3Bz-index%3A2%3B%7D%20.tut-message%7Bpadding%3A1rem%3B%7D%22%0Alet%20ci%3D0%2Cp%2Csong%2Cclicks%3Binit()%3B%0Afunction%20init()%7Bp%3Delement(%22div%22%2Cdocument.body%2C%22tut-pointer%22%2C%22%F0%9F%91%89%22)%3Bp.style.transition%3D%22transform%20.1s%20ease%22%3BinitSong()%3BinitClicks()%3Bmove()%3B%7D%0Afunction%20move()%7Bif(ci%3E%3Dclicks.length)return%20p.remove()%3Blet%20e%3Dclicks%5Bci%2B%2B%5D()%3Blet%20r%3De.getBoundingClientRect()%3Bp.style.top%3Dr.top%3Bp.style.left%3Dr.left%3Bclick(e)%3B%7D%0Afunction%20click(e)%7BsetTimeout(()%3D%3E%7Bp.style.transform%3D%22scale(.5)%22%3Be.click()%3BsetTimeout(()%3D%3E%7Bp.style.transform%3D%22%22%3BsetTimeout(move%2C100)%3B%7D%2C100)%3B%7D%2C100)%3B%7D%0Afunction%20make(clickon%2Cc%2Cr)%7Breturn%20()%3D%3Eclickon.cells.find(x%3D%3Ex.row%3D%3Dr%26%26x.col%3D%3Dc)%3B%7D%0Afunction%20toggle(c%2Cr)%7Breturn%20Array(2).fill(0).flatMap(()%3D%3E%5Bmake(sequencer%2Cc%2C-1)%2Cmake(sequencer%2C-1%2Cr)%5D)%3B%7D%0Afunction%20initClicks()%7Blet%20notes%3Dnew%20Map()%3B%0A%20%20let%20sequencerclicks%3Dsong.flatMap((t%2Cc)%3D%3Et%5B0%5D.flatMap((pid%2Cr)%3D%3E(notes.set(c%2B%22-%22%2Bpid%2C%7Bc%2Cr%2Ca%3At%5B1%5D%5Bpid-1%5D%7D)%2CArray(pid).fill(0).map(()%3D%3Emake(sequencer%2Cc%2Cr)))))%3B%0A%20%20let%20pianoclicks%3D%5B...notes.values()%5D.flatMap((%7Bc%2Cr%2Ca%7D)%3D%3Etoggle(c%2Cr).toSpliced(2%2C0%2C...a.flatMap((n%2Cr)%3D%3En%3F%5Bmake(piano%2Cn-123%2Cr)%5D%3A%5B%5D)))%3B%0A%20%20clicks%3D%5B...sequencerclicks%2C...pianoclicks%2Cmake(sequencer%2C-1%2C-1)%5D%3B%0A%7D%0Afunction%20initSong()%7Bsong%3D%5B%0A%20%20%5B%5B1%2C1%2C1%2C1%5D%2C%5B%5B123%2C%2C%2C%2C123%2C%2C%2C%2C123%2C%2C%2C%2C123%2C%2C%2C%2C123%2C%2C%2C%2C123%2C%2C%2C%2C123%2C%2C%2C%2C123%5D%5D%5D%2C%0A%20%20%5B%5B1%2C1%2C1%2C1%5D%2C%5B%5B%2C%2C124%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C124%2C%2C124%5D%5D%5D%2C%0A%20%20%5B%5B1%2C1%2C2%2C3%5D%2C%5B%5B135%2C%2C%2C%2C%2C%2C%2C%2C159%2C%2C157%2C%2C159%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C147%2C154%2C%2C159%5D%2C%5B138%2C%2C%2C%2C%2C%2C%2C%2C150%2C%2C159%2C%2C162%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C150%2C%2C162%2C150%2C%2C159%5D%2C%5B149%2C%2C%2C%2C%2C%2C%2C%2C149%2C%2C150%2C%2C154%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C147%2C157%2C%2C159%5D%5D%5D%5D%3B%0A%7D)

<details><summary>Guide</summary>

---

The app is great on a **tablet**, but on a phone, it's very difficult. You can try to click the full screen icon in the lower right and use it in portrait, first setting your sequencer values and then scrolling to the left to lay down your notes.

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

</details>

[^1]: The synth part of this tracker is a port of Jake Taylor's [public domain](https://github.com/parasyte/sonant-rs/issues/16#issuecomment-2979650137) Sonant, designed for size-constrained games.

