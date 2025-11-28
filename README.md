To open the tracker, click ↴  

<a href="//bacionejs.github.io/battito/index.html" target="_blank">
    <img src="README.jpg" width="33%" />
</a>


<details><summary>Purpose/Features/Limitations</summary>

- This music tracker produces Sonant formatted JSON. Sonant based synth is designed to be small, for size constrained demos or games (player+song is 2k).
- Why another tracker, when there are several already out there? The trackers I found were either too simple or too complex. This app tries to find a middle ground.
- For the pattern editor, this uses a 2D grid, whereas other apps use a 1D grid, making this **less flexible**, but requiring **less clicks** and providing **simultaneous spacial visualization of note relationships and of multiple tracks (color coded)**. 
- Song length: 8 phrases x 32 beats

</details><details><summary>Guide</summary>

---

Components
- **sequencer**: has 8 columns (tracks/instuments), 8 rows (phrases) and cells where you can toggle through pattern IDs (8 per track).
- **piano (pattern editor)**: is 48 notes wide (4 octaves from C3 through C6) and 32 beats tall. 
- **textarea**: is for import/export and manual edits of the tempo, instruments and song.
- **synth**: the instrument editor supports oscillators, detune, envelope, modulation, cutoff, delay, pan, ...

---

Steps
1. Click on the column headers in the **sequencer** to hear what the default instruments sound like. You can select multiple columns/rows in the **sequencer** for playback, but you can only have one column/row selected while editing notes on the **piano**. The **sequencer** constantly loops over the selected **sequencer** columns/rows. Click the upper-left corner cell in the **sequencer** to toggle the whole song.
1. To enter a note on the **piano**, select a column/row in the **sequencer** and click the intersecting cell to select a pattern ID. Then you can edit that pattern on the **piano**. To advance the pattern ID number just keep clicking in the **sequencer** cell. You can reuse a pattern ID. When coming back to edit a pattern, don't click the **sequencer** cell as that will advance the pattern ID, just select a column/row.


---

Optional
- There are 8 default instruments, but you can also:
  - select a track and configure the **synth**
  - or import existing Sonant compatible songs which have instruments that you like and when prompted after pasting into the **textarea**, answer yes to import only instruments

---

Usage
- For an example of music in a game, see [Bike](https://github.com/bacionejs/bike).

---

</details><details><summary>Example Songs</summary>

You can paste these songs into the **textarea**.

Beatnic by mBitsnBites (simplified)

```json
[5088,[[[7,0,0,1,255,0,7,0,0,1,255,0,0,100,0,5970,171,2,500,254,1,31,4,21],[1,1,1,1],[[147,0,0,0,147,0,0,0,147,0,0,0,147,0,0,0,147,0,0,0,147,0,0,0,147,0,0,0,147]]],[[7,0,0,0,255,2,7,0,4,0,255,2,0,88,2000,7505,255,2,3144,51,6,60,4,64,0,1,7,179],[1,1,1,1],[[0,0,123,0,0,0,0,0,0,0,0,0,0,0,123,0,123]]],[[7,0,0,0,192,2,7,0,0,0,201,3,0,100,150,7505,191,2,5839,254,6,121,6,147,0,1,6,195],[1,1,2,3],[[135,0,0,0,0,0,0,0,159,0,157,0,159,0,0,0,0,0,0,0,0,0,0,0,147,154,0,159],[138,0,0,0,0,0,0,0,150,0,159,0,162,0,0,0,0,0,0,0,0,0,150,0,162,150,0,159],[149,0,0,0,0,0,0,0,149,0,150,0,154,0,0,0,0,0,0,0,0,0,0,0,147,157,0,159]]]]]
```

Liver by mBitsnBites

```json
[5513,[[[7,0,0,0,192,3,7,0,7,0,201,3,0,789,1234,13636,191,2,5839,254,6,121,6,147,0,1,6,195],[1,2,0,0,1,2,1,2],[[154,0,154,0,152,0,147,0,0,0,0,0,0,0,0,0,154,0,154,0,152,0,157,0,0,0,156],[154,0,154,0,152,0,147,0,0,0,0,0,0,0,0,0,154,0,154,0,152,0,157,0,0,0,159]]],[[7,0,0,0,255,2,8,0,18,1,191,2,0,3997,56363,100000,255,2,392,255,8,69,5,67,0,1,4,57,3],[1,2,1,2,1,2,1,2],[[130],[123]]],[[8,0,0,0,0,0,8,0,0,0,0,0,60,50,419,4607,130,1,10332,120,4,16,5,108,0,0,5,187],[0,0,0,0,1,1],[[0,0,147,0,0,0,147,147,0,0,147,0,0,147,0,147,0,0,147,0,0,0,147,147,0,0,147,0,0,147,0,147]]],[[7,0,0,1,255,0,7,0,0,1,255,0,0,50,150,4800,200,2,600,254],[1,1,1,1,1,1],[[147,0,0,0,0,0,0,0,147,0,0,0,0,0,0,0,147,0,0,0,0,0,0,0,147]]],[[7,0,0,0,255,2,7,0,9,0,154,2,0,2418,1075,10614,240,3,2962,255,6,117,3,73,0,1,5,124],[0,0,0,0,1,2,1,2],[[154,0,154,0,152,0,147,0,0,0,0,0,0,0,0,0,154,0,154,0,152,0,157,0,0,0,156],[154,0,154,0,152,0,147,0,0,0,0,0,0,0,0,0,154,0,147,0,152,0,157,0,0,0,159]]],[[7,0,0,0,192,1,6,0,9,0,192,1,0,137,2000,4611,192,1,982,89,6,25,6,77,0,1,3,69],[1,2,1,3,1,3],[[130,0,130,0,142,0,130,130,0,142,130,0,142,0,130,0,130,0,130,0,142,0,130,130,0,142,130,0,142,0,130],[123,0,123,0,135,0,123,123,0,135,123,0,135,0,123,0,123,0,123,0,135,0,123,123,0,135,123,0,135,0,123],[135,0,135,0,147,0,135,135,0,147,135,0,147,0,135,0,135,0,135,0,147,0,135,135,0,147,135,0,147,0,135]]],[[7,0,0,0,255,3,8,0,0,0,255,0,127,22,88,3997,255,3,4067,234,4,33,2,84,0,1,3,28],[0,0,1,2,1,2,1,3],[[0,0,142,0,154,0,0,0,142,0,0,0,154,0,0,0,0,0,142,0,154,0,0,0,142,0,0,0,154],[0,0,147,0,154,0,0,0,147,0,0,0,154,0,0,0,0,0,147,0,154,0,147,0,0,0,154,0,0,0,154],[0,0,147,0,154,0,0,0,147,0,0,0,154,0,0,0,0,0,147,0,154,0,0,0,147]]],[[8,0,0,0,0,0,8,0,0,0,0,0,255,140347,9216,133417,208,2,2500,16,2,157,8,207,0,1,2,51],[0,0,1,1,1,1,1,1],[[147]]]]]
```


</details><details><summary>Credits</summary>

- Music Player: [pl_synth](https://github.com/phoboslab/pl_synth)

</details><details><summary>Alternatives</summary>

- https://github.com/phoboslab/pl_synth
- https://github.com/nicolas-van/sonant-x-live
- https://github.com/mbitsnbites/soundbox
- https://github.com/keithclark/ZzFXM
- https://github.com/steffest/BassoonTracker
- https://www.pouet.net/prod.php?which=53615 (original sonant)

</details>







---
</details><details><summary>Instrument Parameter Deep Dive</summary>

This document provides a comprehensive guide to the instrument parameters used in the synthesizer. Understanding these settings is the key to sound design, allowing you to create everything from deep basses and soaring leads to percussive hits and evolving soundscapes.

## Table of Contents
1.  [Core Synthesis Concepts](#1-core-synthesis-concepts)
    *   [The Signal Flow](#the-signal-flow)
    *   [Sources: Oscillators & Noise](#sources-oscillators--noise)
    *   [Shape: The Filter](#shape-the-filter)
    *   [Dynamics: The Envelope](#dynamics-the-envelope)
    *   [Movement: Modulation (LFO)](#movement-modulation-lfo)
    *   [Space: Effects (Delay & Pan)](#space-effects-delay--pan)
2.  [Detailed Parameter Reference](#2-detailed-parameter-reference)
    *   [Master & Noise](#master--noise)
    *   [Oscillator 1 & 2](#oscillator-1--2)
    *   [Amplitude Envelope (ASR)](#amplitude-envelope-asr)
    *   [Low-Frequency Oscillator (LFO)](#low-frequency-oscillator-lfo)
    *   [Filter](#filter)
    *   [Effects](#effects)
3.  [Sound Design Strategy](#3-sound-design-strategy)
4.  [30 Example Instrument Patches](#4-30-example-instrument-patches)
    *   [Bass Sounds](#bass-sounds)
    *   [Lead & Synth Sounds](#lead--synth-sounds)
    *   [Pads & Keys](#pads--keys)
    *   [Percussion](#percussion)
    *   [Sound Effects (FX)](#sound-effects-fx)

---

## 1. Core Synthesis Concepts

This synth is a **2-oscillator subtractive synthesizer**. This means it starts with harmonically rich sounds (from oscillators) and then carves away parts of the sound (with a filter) to shape the final timbre.

### The Signal Flow

A simplified view of how sound travels through the synth:

`Oscillators / Noise` -> `Filter` -> `Amplifier (controlled by Envelope)` -> `Effects` -> `Master Volume` -> `Output`

Modulators like the **LFO** and **Envelope** don't produce sound themselves; they automate other parameters (like pitch, filter cutoff, etc.) over time.

### Sources: Oscillators & Noise

This is where the sound begins.
*   **Oscillators (Osc 1 & Osc 2):** These generate a repeating electrical signal at a specific frequency, which we perceive as pitch. The shape of this signal, its **waveform**, determines the basic character (timbre) of the sound.
    *   **Sine (0):** The purest tone, with no overtones. Smooth, round, and gentle. Great for sub-basses and flute-like sounds.
    *   **Square (1):** Contains only odd-numbered harmonics. Sounds hollow, reedy, or like a clarinet. Great for retro video game sounds and sharp basses.
    *   **Sawtooth (2):** Contains all harmonics. Sounds bright, buzzy, and rich. The workhorse of synthesis, perfect for leads, pads, and basses.
    *   **Triangle (3):** Also contains only odd harmonics, but they roll off much faster than a square wave. Softer and more mellow than a square, like a gentle flute or bell.
*   **Noise Generator:** Produces a random signal containing all frequencies at once. It has no pitch. Essential for creating percussive sounds (snares, hi-hats) and atmospheric effects (wind, static).

### Shape: The Filter

The filter removes frequencies from the sound generated by the oscillators.
*   **Cutoff Frequency:** The point at which the filter starts working.
*   **Resonance:** A peak or boost at the cutoff frequency, adding a "squelchy," "bubbly," or "nasal" character to the sound.
*   **Filter Types:**
    *   **Low-Pass (LP):** Lets low frequencies pass through and cuts high frequencies. The most common filter type. Makes sounds darker or more muffled.
    *   **High-Pass (HP):** Lets high frequencies pass through and cuts low frequencies. Makes sounds thinner or tinnier.
    *   **Band-Pass (BP):** Cuts both high and low frequencies, leaving a band in the middle. Creates a "telephone" or "radio" effect.
    *   **Notch:** The opposite of a band-pass. It removes a specific band of frequencies. More subtle.

### Dynamics: The Envelope

The Amplitude Envelope controls the volume of a note over time, from the moment it's triggered to the moment it fades out. This synth uses an **ASR** (Attack, Sustain, Release) envelope.
*   **Attack:** How long it takes for the sound to reach its full volume after a note is pressed. (Fast attack = percussive, Slow attack = swelling pad).
*   **Sustain:** How long the sound stays at full volume before it begins to release. *Note: In this synth, this is a time value, not a level.*
*   **Release:** How long it takes for the sound to fade to silence after the sustain period ends.

### Movement: Modulation (LFO)

The **Low-Frequency Oscillator (LFO)** is just like a regular oscillator, but it runs at a frequency too slow to be heard as a pitch. Instead, we use its output to automatically "turn the knobs" of other parameters, creating effects like:
*   **Vibrato:** LFO modulating oscillator pitch.
*   **Wah-Wah/Wobble:** LFO modulating filter cutoff.
*   **Tremolo:** LFO modulating volume (not directly available in this synth, but a core concept).

### Space: Effects (Delay & Pan)

These are final processing stages that add space and character.
*   **Delay:** Creates echoes of the original sound.
*   **Pan:** Automatically moves the sound between the left and right speakers.

---

## 2. Detailed Parameter Reference

Here is a breakdown of every slider, grouped by function.

### Master & Noise

| Label | Index | Range | Description | In-Depth Explanation |
| :--- | :---: | :--- | :--- | :--- |
| **`v`** | 16 | 0-255 | Master Volume | The final volume control for the entire instrument patch. Set this to avoid clipping if your sound is very loud. |
| **`n`** | 12 | 0-255 | Noise Generator Volume | Blends white noise with the oscillators. A value of 0 means no noise. Essential for percussion (snares, hats) and effects (wind, static). |

### Oscillator 1 & 2

Both oscillators have identical parameters. Using both allows for richer, more complex sounds by layering different waveforms or detuning them.

| Label | Index | Range | Description | In-Depth Explanation |
| :--- | :---: | :--- | :--- | :--- |
| **`1v`/`2v`** | 4/10 | 0-255 | Oscillator Volume | The volume of the individual oscillator. Use this to mix the levels of Osc 1 and Osc 2. |
| **`1w`/`2w`** | 5/11 | 0-3 | Waveform | Selects the basic timbre: 0=Sine, 1=Square, 2=Saw, 3=Triangle. |
| **`1o`/`2o`** | 0/6 | 0-16 | Octave | Shifts the oscillator's pitch up or down in octaves. A value of 7 or 8 is often a good middle C starting point. Setting `2o` one octave below `1o` can create a sub-bass. |
| **`1s`/`2s`** | 1/7 | 0-11 | Semitone | Fine-tunes the pitch in semitone (half-step) increments. Useful for creating musical intervals between the two oscillators (e.g., set `2s` to 7 for a perfect fifth). |
| **`1d`/`2d`** | 2/8 | 0-255 | Detune | Fine-tunes the pitch by a very small amount. When Osc 1 and Osc 2 have slightly different detune values, they create a rich, thick "chorus" effect. This is key for pads and big leads. |
| **`e1`/`e2`** | 3/9 | 0-1 | Env > Pitch | Routes the amplitude envelope to modulate the oscillator's pitch. When `1`, the pitch starts high and quickly drops. Essential for creating kick drums, toms, and laser/zap sound effects. The attack time (`ea`) controls the speed of the pitch drop. |

### Amplitude Envelope (ASR)

| Label | Index | Range | Description | In-Depth Explanation |
| :--- | :---: | :--- | :--- | :--- |
| **`ea`** | 13 | 0-200000 | Attack | The time it takes for the note to fade in. **0** = instant, percussive. **High values** = slow, swelling sound (pads). |
| **`es`** | 14 | 0-200000 | Sustain | The time the note is held at full volume. **0** = the note immediately starts releasing. **High values** = the note is held for longer. A percussive "pluck" sound would have low `ea`, `es`, and `er`. |
| **`er`** | 15 | 0-200000 | Release | The time it takes for the note to fade out after the sustain period. **Low values** = abrupt stop. **High values** = long, echoing tail. |

### Low-Frequency Oscillator (LFO)

| Label | Index | Range | Description | In-Depth Explanation |
| :--- | :---: | :--- | :--- | :--- |
| **`mw`** | 28 | 0-3 | LFO Waveform | The shape of the LFO's modulation signal (0:Sin,1:Sqr,2:Saw,3:Tri). **Sine/Triangle** gives smooth modulation (vibrato). **Square** gives an abrupt on/off effect (trills). **Saw** gives a repeating ramp. |
| **`ms`** | 26 | 0-16 | LFO Speed | The frequency/rate of the LFO. **Low values** = slow, evolving changes. **High values** = fast, aggressive modulation (FM-like sounds). |
| **`ma`** | 27 | 0-255 | LFO Amount | The overall intensity or depth of the LFO's effect. At 0, the LFO has no effect, regardless of its routing. |
| **`m1`** | 24 | 0-1 | LFO > Osc 1 Pitch | Routes the LFO to modulate the pitch of Oscillator 1. A slow sine wave creates **vibrato**. A fast square wave creates a **trill**. |
| **`mc`** | 25 | 0-1 | LFO > Filter Cutoff | Routes the LFO to modulate the filter's cutoff frequency. A slow sine wave creates a gentle **sweep**. A speed-synced sawtooth or square wave creates a rhythmic **wobble** or **wah** effect. |

### Filter

| Label | Index | Range | Description | In-Depth Explanation |
| :--- | :---: | :--- | :--- | :--- |
| **`ct`** | 17 | 0-4 | Filter Type | 0:Off, 1:High-Pass, 2:Low-Pass, 3:Band-Pass, 4:Notch. Set to 2 (LP) for most classic synth sounds. Use 1 (HP) for hi-hats or thinning out a sound. |
| **`ca`** | 18 | 0-11025 | Filter Cutoff | The frequency where the filter starts working. For a Low-Pass filter, lowering `ca` makes the sound darker and more muffled. |
| **`cr`** | 19 | 0-255 | Filter Resonance | Emphasizes the frequencies around the cutoff point. Low values are subtle. High values give a sharp, ringing, "squelchy" sound. Can self-oscillate at maximum settings. |

### Effects

| Label | Index | Range | Description | In-Depth Explanation |
| :--- | :---: | :--- | :--- | :--- |
| **`ds`** | 20 | 0-16 | Delay Time | The time between echoes for the delay effect. The value corresponds to a musical subdivision (e.g., 8 is an 8th note delay). |
| **`da`** | 21 | 0-248 | Delay Amount | The volume/feedback of the echoes. Higher values mean more echoes that last longer. |
| **`ps`** | 22 | 0-16 | Pan Speed | The speed of the auto-panner LFO. Moves the sound left and right. |
| **`pa`** | 23 | 0-255 | Pan Amount | The depth of the auto-pan effect. 0 = no panning. 255 = hard left-to-right panning. |

---

## 3. Sound Design Strategy

A simple workflow for creating a sound from scratch (an "init" patch):

1.  **Start with the Source:** Turn on Oscillator 1 (`1v` > 0). Choose a waveform (`1w`). Set a base octave (`1o`).
2.  **Shape the Dynamics:** Adjust the Envelope (`ea`, `es`, `er`). Do you want a short pluck or a long pad?
3.  **Carve the Timbre:** Turn on the Filter (`ct`). Adjust the Cutoff (`ca`) and Resonance (`cr`) to taste.
4.  **Add Richness:** Turn on Oscillator 2 (`2v` > 0). Choose a waveform. Detune it slightly from Osc 1 (`2d`) for thickness.
5.  **Add Movement:** Add LFO modulation (`m1` for vibrato, `mc` for a filter sweep). Adjust speed (`ms`) and amount (`ma`).
6.  **Add Space:** Add a touch of Delay (`da`) or Pan (`pa`) for ambience and width.
7.  **Finalize:** Adjust the master Volume (`v`).

---

## 4. 30 Example Instrument Patches

Here are 30 distinct patches to get you started. Parameters not listed are assumed to be 0.

*(Note: These values are starting points. Adjust to taste!)*

### Bass Sounds

#### 1. Classic Kick Drum
*A punchy, 808-style kick drum. The key is the fast pitch envelope on a sine wave.*
`{"v":200, "1v":255, "1w":0, "1o":4, "ea":100, "es":20000, "er":25000, "e1":1}`

#### 2. Sub Bass
*A deep, pure sine wave bass that you feel more than you hear.*
`{"v":200, "1v":255, "1w":0, "1o":3, "es":40000, "er":30000, "ct":2, "ca":1500, "cr":20}`

#### 3. Aggressive Saw Bass
*A bright, buzzy bass common in electronic music. The filter tames the harshness.*
`{"v":180, "1v":255, "1w":2, "1o":4, "es":30000, "er":20000, "ct":2, "ca":2000, "cr":80}`

#### 4. Square Wave Funk Bass
*A hollow, funky bass sound reminiscent of classic funk and chiptune.*
`{"v":190, "1v":255, "1w":1, "1o":4, "ea":500, "es":25000, "er":15000, "ct":2, "ca":2500, "cr":100}`

#### 5. Wobble Bass
*A classic dubstep bass. The LFO modulating the filter cutoff is the secret.*
`{"v":170, "1v":255, "1w":2, "1o":4, "er":20000, "mw":0, "ms":8, "ma":200, "mc":1, "ct":2, "ca":1800, "cr":150}`

#### 6. Reese Bass
*Two detuned saw waves create this huge, moving bass sound.*
`{"v":160, "1v":200, "1w":2, "1o":4, "1d":110, "2v":200, "2w":2, "2o":4, "2d":145, "er":40000, "ct":2, "ca":3000, "cr":50}`

### Lead & Synth Sounds

#### 7. Bright Saw Lead
*A standard, cutting lead sound perfect for melodies.*
`{"v":180, "1v":200, "1w":2, "1o":7, "1d":120, "2v":200, "2w":2, "2o":7, "2d":135, "er":30000, "ct":2, "ca":6000, "cr":60}`

#### 8. Pluck Synth
*A short, percussive synth sound. The envelope is very tight.*
`{"v":200, "1v":255, "1w":2, "1o":8, "ea":100, "es":5000, "er":15000, "ct":2, "ca":5500, "cr":40, "ds":4, "da":100}`

#### 9. Vibrato Lead
*A simple lead with expressive vibrato from the LFO.*
`{"v":190, "1v":255, "1w":3, "1o":8, "er":40000, "mw":0, "ms":7, "ma":80, "m1":1}`

#### 10. Sync Lead
*Using a musical interval (a fifth) between oscillators for a powerful, harmonized lead.*
`{"v":170, "1v":220, "1w":1, "1o":7, "2v":220, "2w":1, "2o":7, "2s":7, "er":25000, "ct":2, "ca":7000, "cr":80}`

#### 11. PWM-style Lead
*Faking a Pulse Width Modulation sound by detuning two square waves against each other.*
`{"v":180, "1v":200, "1w":1, "1o":7, "1d":125, "2v":200, "2w":1, "2o":7, "2d":180, "er":30000}`

### Pads & Keys

#### 12. Swelling Saw Pad
*A classic ambient pad with a slow attack and long release. Detuned saws provide the richness.*
`{"v":150, "1v":180, "1w":2, "1o":6, "1d":120, "2v":180, "2w":2, "2o":6, "2d":135, "ea":80000, "er":100000, "ct":2, "ca":4000, "cr":30}`

#### 13. Mellow Triangle Pad
*A soft, gentle pad using triangle waves for a less aggressive tone.*
`{"v":180, "1v":200, "1w":3, "1o":7, "1d":125, "2v":200, "2w":3, "2o":6, "2d":128, "ea":60000, "er":80000}`

#### 14. Filter Sweep Pad
*An evolving pad where the LFO slowly opens and closes the filter.*
`{"v":160, "1v":255, "1w":2, "1o":6, "ea":70000, "er":90000, "mw":0, "ms":2, "ma":150, "mc":1, "ct":2, "ca":1500, "cr":90}`

#### 15. Electric Piano
*A simple, bell-like tone using a sine wave and a short envelope.*
`{"v":220, "1v":255, "1w":0, "1o":7, "er":35000, "2v":150, "2w":0, "2o":8, "er":30000}`

#### 16. Simple Organ
*Mixing two sine waves at different octaves creates a basic organ sound.*
`{"v":200, "1v":255, "1w":0, "1o":7, "2v":180, "2w":0, "2o":8, "ea":1000, "er":10000}`

### Percussion

#### 17. Snare Drum
*A blend of pitched body (triangle wave) and noisy snap (noise generator). A high-pass filter can help.*
`{"v":200, "1v":180, "1w":3, "1o":8, "ea":100, "es":10000, "er":15000, "n":200, "ct":1, "ca":3000}`

#### 18. Closed Hi-Hat
*Pure noise with a very tight envelope and a high-pass filter.*
`{"v":180, "es":4000, "er":5000, "n":255, "ct":1, "ca":8000, "cr":50}`

#### 19. Open Hi-Hat
*Same as the closed hat, but with a longer release time.*
`{"v":180, "es":4000, "er":40000, "n":255, "ct":1, "ca":7500, "cr":50}`

#### 20. Tom Drum
*Similar to a kick drum, but with a higher starting pitch and slightly different envelope.*
`{"v":200, "1v":255, "1w":0, "1o":6, "ea":100, "es":15000, "er":20000, "e1":1}`

#### 21. Clap/Click
*A short burst of noise with a very fast attack and decay.*
`{"v":200, "ea":50, "es":5000, "er":6000, "n":255, "ct":3, "ca":5000, "cr":100}`

### Sound Effects (FX)

#### 22. Laser Pew
*A high-pitched sine wave with a very fast pitch drop.*
`{"v":200, "1v":255, "1w":0, "1o":10, "ea":100, "es":10000, "er":15000, "e1":1}`

#### 23. Sci-Fi Riser
*A noise sound with a rising filter cutoff, controlled by an LFO Saw wave.*
`{"v":180, "er":80000, "n":255, "mw":2, "ms":4, "ma":255, "mc":1, "ct":2, "ca":500, "cr":120}`

#### 24. Alarm/Siren
*An LFO modulating pitch creates a classic siren effect.*
`{"v":190, "1v":255, "1w":1, "1o":9, "er":100000, "mw":0, "ms":9, "ma":120, "m1":1}`

#### 25. Computer Blip
*A high-pitched, short triangle wave sound.*
`{"v":220, "1v":255, "1w":3, "1o":11, "es":3000, "er":4000}`

#### 26. Wind
*Filtered noise with a long release and a slow, random-like LFO on the filter.*
`{"v":150, "ea":50000, "er":100000, "n":255, "mw":0, "ms":2, "ma":200, "mc":1, "ct":3, "ca":4000, "cr":150}`

#### 27. Lo-Fi Bell
*A triangle wave with a percussive envelope and a bit of detuning for character.*
`{"v":200, "1v":255, "1w":3, "1o":9, "1d":128, "2v":150, "2w":3, "2o":9, "2d":200, "ea":100, "er":50000}`

#### 28. Sub-heavy Tom
*A floor tom with a strong sine wave fundamental.*
`{"v":210, "1v":255, "1w":0, "1o":4, "1s":7, "ea":200, "es":10000, "er":40000, "e1":1, "ct":2, "ca":1000}`

#### 29. Auto-Pan Synth
*A simple synth that moves across the stereo field, adding width and interest.*
`{"v":180, "1v":255, "1w":2, "1o":7, "er":30000, "ps":6, "pa":255, "ds":6, "da":80}`

#### 30. Resonant Screech
*Pushing the filter resonance to its limit to create a high-pitched, screaming sound.*
`{"v":150, "1v":255, "1w":2, "1o":8, "er":20000, "ct":2, "ca":8000, "cr":250}`




</details>
