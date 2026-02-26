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

This is just a dumping ground for me talking about the techniques behind Battito.

---

I'll discuss first one of the least interesting parts, the waveform analyzer. Originally, I had made the analyzer like everybody else, include the envelope as a background, remove delay, and plot the sample, but I grew increasingly frustrated with showing the envelope. As you increase one value, the others necessarily need to decrease to fit in a fixed area. And besides, the waveform is almost identical to the envelope, making it superfluous. Not only can you see the shape of the envelope from the sample, you can also see the envelope just by looking at the slider positions for the envelope. This led me to remove the envelope entirely. Also, this leads to another issue. Similar to the necessity of removing delay, as delay can be several seconds long and won't fit into a fixed area without losing the ability to visualize the waveform as it becomes more confined in a fixed area, the envelope can also be several seconds of time, and fitting it into a fixed area makes that it's difficult to see the waveform. One solution is to cut off the waveform after two seconds, but then we're back to why did we remove delay? It was to fit something into a fixed space. So I decided to do something different and just come in from both ends of the sample until a certain threshold was met and plot that. After testing it with several types of samples and tweaking the threshold, it seemed to look reasonable. The logic becomes basically:  
`for(let x=0;x<w;x++){c.lineTo(x,m+d[start+(x*(end-start)/(w-1)|0)]*m);}`





---

The main motivation for creating another tracker was that the trackers that are used for size-constrained games typically have editors that are number-centric, and being a music noob, it was difficult for me to reason about while composing a song. And so I decided to make a tracker with a piano roll, which necessarily is Huge and takes up more than half of the screen area. Initially I only had preset instruments, but eventually when I included the ability to configure the synth, I needed to include a widget and to make it small, I opted for a very generic set of sliders, of which there are 29 for two oscillators, envelopes, effects, etc. I didn't have room for nice labeling, so I grouped them by color and a very small label abbreviation. I changed some names to be more generic like Modulation instead of LFO, and included a rundown of building a synth sound in the readme. Even the on and off values are sliders, which isn't obvious from looking at the sliders, but is reasonably coherent if you read the instrument section of the readme.





---

With very little space remaining, I decided to rely on a text version of the underlying data, initially as a way to import and export and to set the beats per minute, but also the user can change the underlying data live, for example, changing the sound of a synth or even the notes being played.




---

Just for fun, I decided to try to make the interface buttonless. There are sliders, but besides that, there are no obvious buttons. You could consider the piano row is just a huge grid of buttons, but there are no obvious buttons. There are two long-press functions. For example, if you long-press on the waveform, it exports the song as a WAV file and an HTML file. The HTML file you would use in your game, and the WAV file is for whatever. And there's also a long press on the piano that will take you into time mode instead of step mode, which is the last thing I added to the application. Also, you could consider all the cells in the sequencer as buttons, the top left corner of the sequencer toggles the whole song off and on, and the columns and rows allow you to select a range of the song, especially useful for editing a small group of patterns. Also, the sequencer body can be thought of as a bunch of buttons, because you click in the cells to select a pattern ID.

---

Also, to keep things simple, the sequencer is hard-coded to 8-instrument, 60-phrases and 9-patterns per track so that at 60 beats per minute that will give you a fairly robust song up to eight minutes.





---

As an afterthought, I included a spectrum analyzer. Not that it's useful, but it's nice eye candy to have. While the spectrum analyzer eats up a lot of CPU, its code is very simple and relies on a style trick and a very simple loop.
`.meter{background:linear-gradient(to top,lime,orange,red);transition:height 50ms linear;}`
`meter.forEach((b,i)=>{b.style.height=(A[i]*0.4)+"%";})`



---

Initially, I built my app around the pl_synth wasm port, but eventually, just for fun, I decided to create my own port of the original Jake Taylor Sonant. The initial port of his C code wasn't too difficult, but being javascript, it was very slow to process a song. And so I kept adding optimizations, the two big ones being precomputed waveforms and precomputed note frequencies. For Ambidumbi, a fairly complex song, the hot inner loop runs 39,208,609 times and produces the final audio in 4243ms.


</details>

[^1]: The Battito synth function is a port of Jake Taylor's [public domain](https://github.com/parasyte/sonant-rs/issues/16#issuecomment-2979650137) Sonant.

