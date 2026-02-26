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

The main motivation for creating another tracker was that the trackers that are used for size-constrained games typically have editors that are number-centric, and being a music noob, it was difficult for me to reason about while composing a song. And so I decided to make a tracker with a piano roll. Also, since an Android tablet is the only device I have, I wanted it to be very touch-friendly. And yes, I program on an Android tablet using Termux, Neovim, and Apache.  
  
Just for fun, I decided to try to make the interface buttonless. There are sliders, but besides that, there are no obvious controls.  

Also, to keep things simple, the sequencer is hard-coded to 8-tracks, 9-patterns per track and 60-phrases so that at 60 beats per minute that will give you a fairly robust song up to 8 minutes.  

Initially, I built my app around the pl_synth wasm port, but eventually, just for fun, I decided to create my own port of the original Jake Taylor Sonant. The initial port of his C code wasn't too difficult, but being javascript, it was very slow to process a song, so I added some optimizations.  

The application is less than 300 lines, and I didn't want to add things that aren't absolutely necessary, but there are few extras that help round it out: a tutorial, a waveform analyzer, a spectrum analyzer, and support for time mode.  
  
Since the piano roll takes up so much space, I had to squish the 29 instrument controls into a simple stack of sliders which are impossible to understand without reading the instrument section.  




---

I redesigned the original Sonant structure so that the only thing left untouched is the 29 instrument parameter keys; everything else was reorganized for clarity and musical meaning. Instead of using `rowLen`, I use `bpm` and derive row length internally, since BPM is more expressive at a high level and row length is just an implementation detail. I renamed `songData` to `tracks`, and inside each track I use `s` sequences that act as pointers to `p` patterns. In the original structure, what is now `s` used to be `p`, what is now `p` used to be `c`, and `c` contained sub-objects called `n`, which finally held the array of notes; I flattened and clarified that hierarchy so patterns directly contain note arrays. I also removed `songLen`, since total length is now derived automatically by inspecting the sequences and patterns, making the structure declarative while keeping the synthesis core behavior intact.

---


Originally, I made the waveform analyzer like everybody else, include the envelope as a background, remove delay, and plot the sample, but I grew increasingly frustrated with showing the envelope. As you increase one value, the others necessarily need to decrease to fit in a fixed area. And besides, the waveform is almost identical to the envelope, making it superfluous. Not only can you see the shape of the envelope from the sample, you can also see the envelope just by looking at the slider positions for the envelope. This led me to remove the envelope entirely. Also, this leads to another issue. Similar to the necessity of removing delay, as delay can be several seconds long and won't fit into a fixed area without losing the ability to visualize the waveform as it becomes more confined in a fixed area, the envelope can also be several seconds of time, and fitting it into a fixed area makes it difficult to see the waveform. One solution is to cut off the waveform after two seconds, but then we're back to why did we remove delay? It was to fit something into a fixed space. So I decided to do something different and just come in from both ends of the sample until a certain threshold was met and plot that. After testing it with several types of samples and tweaking the threshold, it seemed to look reasonable. The logic becomes basically:  
`for(let x=0;x<w;x++){c.lineTo(x,m+d[start+(x*(end-start)/(w-1)|0)]*m);}`

---


As an afterthought, I included a spectrum analyzer. Not that it's useful, but it's nice eye candy to have. While the spectrum analyzer eats up a lot of CPU, its code is very simple and relies on a style trick and a very simple loop:  
  
`.meter{background:linear-gradient(to top,lime,orange,red);transition:height 50ms linear;}`  
  
`meter.forEach((b,i)=>{b.style.height=(A[i]*0.4)+"%";})`

---

The main thing I did in the synth engine code to make it fast is precompute as much as possible and reduce repeated math inside the hot loop. The waveforms are fully generated ahead of time in SIN, SQUARE, SAW, and TRI, and the note frequencies for all 256 notes are precomputed so the inner loop doesn’t have to do exponentiation for every sample. I also simplified multiplications and divisions for envelopes and detuning by pre-scaling constants outside the loops, and the LFO and panning steps are calculated once per track per buffer instead of per sample. Everything that could be pulled out of the inner per-sample loop is pulled out, so the loop only does what it absolutely has to: fetch a sample from a waveform, mix oscillators, apply envelope, add optional noise, apply the filter, pan, and write into the buffer. Delay and master scaling happen after the main loops, so the hot path stays tight. The result is that even with multiple tracks, two oscillators per note, filters, envelopes, and noise, the CPU only does what’s necessary to generate the song without wasting cycles on recomputation.

For Ambidumbi, a fairly complex song, the hot inner loop runs 39,208,609 times and produces the final audio in 4243ms.

---


I style everything so it just works without thinking. I use grid layouts a lot; grid-template-columns makes it easy to size sequencer columns, piano keys, or anything else evenly without doing math. Then I use aspect ratios so squares stay squares and rectangles keep their shape no matter the screen.

---

By long pressing on the waveform widget, the JavaScript necessary to paste into your game is exported, but as an afterthought, I decided to also export the WAV file. And since it wasn't absolutely necessary for my application, I wanted to ensure that the code was very small. 

When I make a WAV file by hand I need to write exact bytes into a buffer. The WAV format has a forty four byte header followed by the raw audio samples. Some fields in the header are thirty two bit unsigned integers like the total file size and some are sixteen bit integers like the number of channels or bits per sample. I use a Uint8Array to hold all the bytes because I need a plain byte container and I use a DataView to write multi byte numbers at precise positions and make sure they are little endian as WAV requires. I use setInt16 for the actual audio samples because PCM audio is sixteen bit signed integers so each float sample between minus one and one gets scaled and written as an Int16. I use setUint32 for header fields that need four bytes.

---

For colors I do not pick explicit values. I have a function that automatically generates colors across a reasonable range. I use this same function for both the sequencer and the piano roll. That means the color of a track in the sequencer always matches the color of its notes on the piano roll. This makes it easy to see multiple tracks at once on the same piano roll because each track keeps a consistent color.

---

Early on I ran into problems making the app look the same in Chrome and Firefox. Eventually I gave up on Firefox and just block it. I do not do it explicitly, but one of the main things that breaks in Firefox is the sizing of the grid elements. So I just check the grid size and if it is wrong I show a message telling the user to use a Chromium-based browser. I just didn't have the energy for compatibility.

---

The grid function that builds my widgets works in a slightly unusual way. When you pass it an even number of columns, it just makes a regular grid. But if you pass an odd number, it switches into Excel-style mode and adds column headers across the top and row headers down the side, like A, B, C, D and 1, 2, 3, 4.

---

The sequencer is the most complex part of the app outside of the synth function. It handles all the logic for selecting tracks and rows, updating patterns. Each function is focused on one aspect, like `toggle` flipping cells, `scroll` keeping the view centered, `hasnotes` checking for active notes, `track` returning the current track, `sequences` collecting active rows, `phrase` flattening notes for the piano roll, `click` handling all grid interactions, `range` returning the active subset of the song, `pattern` giving the current row pattern.

To avoid having a bunch of buttons, all playback is controlled from the sequencer, so whenever you select a column and row to put notes it automatically starts, which can be a little annoying because you can’t make edits in silence.

---

Time mode is a special mode that lets you insert notes in real time as the song plays, showing ready set go messages and automatically advancing through the steps, whereas step mode is the default where you edit one row at a time and nothing moves until you manually change it. In other words, time mode is live and dynamic, letting you play along with the sequence, while step mode is static and precise, letting you carefully set each note.

---

The text area links straight to the underlying data, so you can see exactly what’s stored and even tweak it by hand. This also means I don’t have to add controls for saving, loading, etc.

---

The audio function is basically a wrapper around the audio context. It keeps track of the current sequence and step, starts the buffer when the sequencer triggers something, and updates the visuals automatically, using the `point` function to highlight which row is playing at any given moment. It also has a `preview` function that can play a single note on demand and draws the waveform in the canvas so you can see what you’re hearing.

</details>

[^1]: The Battito synth function is a port of Jake Taylor's [public domain](https://github.com/parasyte/sonant-rs/issues/16#issuecomment-2979650137) Sonant.

