<template>
  <div>
    <section>
      <div>
        <h1>Fretboard</h1>
        <div>
          <span>Tuning: </span>
          <span
            >{{ instrument.tuning.type }}
            {{
              instrument.tuning.tonality.charAt(0).toUpperCase() +
              instrument.tuning.tonality.slice(1).toLowerCase()
            }}</span
          >
        </div>
      </div>
    </section>
    <div id="fretboardapp">
      <section
        class="col-9 align-middle"
        v-bind:style="{
          alignItems: fretboard.orientation == 'horizontal' ? 'center' : '',
        }"
      >
        <the-fretboard
          :scale="scale"
          :convertedIntervals="convertedIntervals"
          :prop-tuning="tuning"
          :start="fretboard.startingFret"
          :frets="fretboard.frets + fretboard.startingFret - 1"
          title="Test"
        ></the-fretboard>
      </section>
      <div id="scaletitle">{{ displayScaleTitle }}</div>

      <base-card>
        <section class="col-3">
          <fieldset class="form-group mt-4">
            <legend>General</legend>
            <div class="form-group">
              <label for="scale">Scale</label>
              <input
                id="scale"
                class="form-control"
                type="text"
                v-model="scale"
                list="scaleOptions"
              />
              <!-- <datalist id="scaleOptions">
                <option></option>
              </datalist> -->
              <span class="form-text text-muted"
                >1 or more space separated note names or a scale name (e.g. C
                Major)</span
              >
            </div>
          </fieldset>

          <fieldset class="form-group mt-4">
            <legend>Scale</legend>
            <div class="currentnotes">
              <text class="currentnote"
                v-for="n in currentNotes"
                :key="n"
              >{{n}}</text>
            </div>

            <div class="baseflex noteselection">
              <!-- C, D, E, F, G, A, B -->
              <div class="scale">
                <base-slider-array
                   title="Tonality"
                  :values="selector.tonality.available"
                  :indexInitialValue="0"
                  @valueupdate="setTonality"
                ></base-slider-array>
              </div>
  
              <!-- ♭, ♮, ♯ -->
              <div class="accidental">
                <base-slider-array
                   title="accidental"
                  :values="selector.accidental.available"
                  :indexInitialValue="1"
                  @valueupdate="setAccidental"
                ></base-slider-array>
              </div>
            </div>

            <div class="baseflex dropdowns">
              <!-- ... Pentatonic ... -->
              <base-dropdown class="scaledropdown level1" :values="getScaleLevel1" :initialIndex="selector.scales.level1" @dropdownupdate="setScalesLevel1" ></base-dropdown>
              <!-- scales -->
              <base-dropdown class="scaledropdown" :values="getScaleLevel2" :initialIndex="selector.scales.level2" @dropdownupdate="setScalesLevel2" ></base-dropdown>
              <!-- Modes -->
              <base-dropdown class="modedropdown" :values="getScaleLevel3" :initialIndex="selector.scales.level3" @dropdownupdate="setScalesLevel3" ></base-dropdown>
            </div>
          </fieldset>


          <!-- Frets  -->
          <fieldset class="form-group">
            <legend>Frets</legend>
             <div class="controlfrets">
              <base-slider-numerical
                 title="# of Frets"
                :values="fretboard.range"
                :initialvalue="13"
                @valueupdate="updateNumberOfFrets"
              ></base-slider-numerical>
              <base-slider-numerical
                 title="Starting Fret"
                :values="fretboard.range"
                :initialvalue="0"
                @valueupdate="updateStartingNumber"
              ></base-slider-numerical>
               </div>
          </fieldset>
        </section>
      </base-card>
    </div>
  </div>
</template>

<script>
/**
 * TODO
 *
 * info: frets start and # of frets can be used to display shapes (penta...)
 * - always display open strings notes, in grey if not part of the scale, in shape and color if so
 * - CSS | last fret in dotted line if not the 21/22/24th fret
 * - CSS | add instrument head icon for the tuning
 * - CSS | Tonality Slider -> bigger and wider to take up the available space
 */
import TheFretboard from "./../fretboard/TheFretboard.vue";
import BaseCard from "./../ui/BaseCard.vue";
import scalesDatabase from "./../../database/scales.js";
export default {
  components: {
    TheFretboard,
    BaseCard,
  },
  data() {
    return {
      scale: "C Major",
      selector: {
        tonality: {
          available: ["C","D","E","F","G","A","B"],
          selected: null
        },
        accidental: {
          available : ["♭","♮","♯"],
          selected: null
        },
        notes: [
          {
            sharp: 'B♯',
            native: 'C'
          },
          {
            sharp: 'C♯',
            native: null,
            flat: 'D♭',
          },
          {
            native: 'D'
          },
          {
            sharp: 'D♯',
            native: null,
            flat: 'E♭',
          },
          {
            native: 'E',
            flat: 'F♭',
          },
          {
            sharp: 'E♯',
            native: 'F'
          },
          {
            sharp: 'F♯',
            native: null,
            flat: 'G♭',
          },
          {
            native: 'G'
          },
          {
            sharp: 'G♯',
            native: null,
            flat: 'A♭',
          },
          {
            native: 'A'
          },
          {
            sharp: 'A♯',
            native: null,
            flat: 'B♭',
          },
          {
            native: 'B',
            flat: 'C♭',
          },
        ],
        scales: {
          database: scalesDatabase,
          /* For the level meaning -> cf scales.js */
          level1: null,
          level2: null,
          level3: null
        }
      },
      tuning: null, // build in created()
      fretboard: {
        orientation: "horizontal",
        startingFret: 0,
        range: [],
        frets: null
      }
    };
  },
  created() {
    // build tuning based on Store
    this.tuning = this.instrument.tuning.stringsNotes
      .reverse()
      .join(" ")
      .replace(/[0-9]/g, "");

    // Initialise Frets Range
    for (let frt = 0; frt < 25; ++frt) {
      this.fretboard.range.push(frt);
    }
    // init scale levels
    this.selector.scales.level1 = 2;
    this.selector.scales.level2 = 0;
    this.selector.scales.level3 = 0;
  },
  methods: {
    updateStartingNumber(value) {
      this.fretboard.startingFret = value;
      this.verifyFretboardValidity();
    },
    updateNumberOfFrets(value) {
      this.fretboard.frets = value;
      this.verifyFretboardValidity();
    },
    // So we don't go beyond 24th
    verifyFretboardValidity() {
      let fretboardLimit = 25;
      if (this.fretboard.startingFret + this.fretboard.frets > fretboardLimit) {
        this.fretboard.frets = this.fretboard.frets - (this.fretboard.startingFret + this.fretboard.frets - fretboardLimit);
      }
    },
    setTonality(tonality) {
      this.selector.tonality.selected = tonality;
      this.currentNotes();
    },
    setAccidental(accidental) {
      this.selector.accidental.selected = accidental;
    },
    /** 
     * Handling of dropdowns concerning scale selection
     */
    setScalesLevel1(name) {
      this.selector.scales.level1 = Object.keys(this.selector.scales.database).indexOf(name);
      // reset levels
      this.selector.scales.level2 = 0;
      this.selector.scales.level3 = 0;
    },
    setScalesLevel2(name) {
      this.selector.scales.level2 = this.getScaleLevel2.indexOf(name);
      // reset level 3
      this.selector.scales.level3 = 0;
    },
    setScalesLevel3(name) {
      this.selector.scales.level3 = this.getScaleLevel3.indexOf(name);
    },
    /**
     * convert current scale to a different mode
     * Example for the Major scale:
     * IN : [0, 2, 4, 5, 7, 9, 11]
     * OUT : [0, 2, 3, 5, 7, 9, 10]
     */
     _applyModeToScale(intervals, modeIndex){
      // no modification needed for the first mode
      if (modeIndex == 0) { return intervals; }
      const octave = 12;
      const startingPoint = intervals[modeIndex];
      
      // First, we add notes to the octave before our starting point at the end of the array
      for (var j = 0; j < modeIndex; j++) {
        intervals.push(intervals[j] + octave);
      }

      // Secondly we remove the unwanted values before our starting point based on the mode
      intervals.splice(0, modeIndex);

      // Thirdly ...
      for (var i = 0; i < intervals.length; i++) {
        intervals[i] = intervals[i] - startingPoint;
      }

      return intervals;
    },
    currentNotes() {
      let scaleIntervals = this.getIntervals;
      let notesNames = [];

      // get tonality index of this.selector.notes
      let tonalityIndex = this._getIndexOfCurrentTonality;

      console.log(tonalityIndex);
      

      let copyNotes = [...this.selector.notes];
      // no modification needed for the first index
      if (tonalityIndex != 0) { 
        // First, we add notes to the octave before our starting point at the end of the array
        for (var i = 0; i < tonalityIndex; i++) {
          copyNotes.push(copyNotes[i]);
        }  
        // Secondly we remove the unwanted values before our starting point based on the mode
        copyNotes.splice(0, tonalityIndex);
       }
    

      for (var j = 0; j < scaleIntervals.length; j++) {
        let note = copyNotes[scaleIntervals[j]];
        //console.log(note)
        if (note.native == null) {
          // TODO implement sharp or flat selector
          // we go for sharp for now
          notesNames.push(note.sharp);
        } else {
          notesNames.push(note.native);
        }
      }

      return notesNames;
    }
  },
  computed: {
    instrument() {
      return this.$store.getters.instrument;
    },
    getScaleLevel1() {
      return Object.keys(this.selector.scales.database);
    },
    getScaleLevel2() {
      let keyLevel1 = this.getScaleLevel1[this.selector.scales.level1];
      return Object.keys(this.selector.scales.database[keyLevel1]);
    },
    getScaleLevel3() {
      let keyLevel1 = this.getScaleLevel1[this.selector.scales.level1];
      let keyLevel2 = this.getScaleLevel2[this.selector.scales.level2];
      return this.selector.scales.database[keyLevel1][keyLevel2]['modes'];
    },
    getIntervals() {
      return this.selector.scales.database[this.getScaleLevel1[this.selector.scales.level1]][this.getScaleLevel2[this.selector.scales.level2]]['intervals'];
    },
    displayScaleTitle() {
      let displaylevel2 = '';
      let level2 = this.getScaleLevel2[[this.selector.scales.level2]].replace('_',' ');
      let level3 = this.getScaleLevel3[[this.selector.scales.level3]].toLowerCase();

      if (level3 != level2) {
        displaylevel2 = '「' + level2 + '」';
      }

      return this.selector.tonality.selected 
      + ' ' 
      + this.getScaleLevel3[[this.selector.scales.level3]] 
      + displaylevel2;
    },
    /**
     * convert current interval system in scale.js to the system used in TheFretboard.vue/computed.js
     * Example for the Major scale:
     * IN : [0, 2, 4, 5, 7, 9, 11]
     * OUT : [0, 2, 2, 1, 2, 2, 2, 1]
     */
    convertedIntervals() {
      let intervals = this.getIntervals;
      // apply mode
      intervals = this._applyModeToScale(intervals, this.selector.scales.level3);

      let convertedIntervals = [];
      for (var i = 0; i <= intervals.length; i++) {
        let interval = null;
        if (i == 0) {
          interval = i;
        }else if (i == intervals.length) {
          interval = 12 - intervals[i - 1]; // 12 -> octave
        } else {
          interval = intervals[i] - intervals[i - 1];
        }
        convertedIntervals.push(interval);
      }
      return convertedIntervals;
    },
    _getIndexOfCurrentTonality() {
      // index of current note on the chromatic scale
      return this.selector.notes.map(function(n) { return n.native; }).indexOf(this.selector.tonality.selected) 
      // application of the accidental
      - (this.selector.accidental.available.indexOf(this.selector.accidental.selected) -1);
    }
  }
}
</script>

<style>
#fretboardapp {
  align-items: center;
  /* display: flex; */
  justify-content: center;
}
#fretboardapp > section:first-child {
  display: flex;
  /* height: 100vh; */
  justify-content: center;
  overflow: auto;
}
#fretboardapp > section:nth-child(2) {
  border-left: 5px solid #888;
  /* height: 100vh; */
  overflow-y: scroll;
}
#scaletitle{
  margin-top: 1%;
  font-weight: bold;
  font-size: larger;
}
fieldset {
  border-radius: 12px; 
}
.controlfrets {
  display: flex;
  /* flex-direction: column; */
  align-items: end;
  justify-content: space-around;
  margin: auto;
}
.baseflex {
  display: flex;
  align-items: top;
  justify-content: center;
}
.noteselection {
  margin-bottom: 3%;
}
.scale {
  width: 70%;
  margin-left: 3%;
  margin-right: 3%;
  .basesliderarray{
    width: 100%;
  }
}
.accidental {
  width: 21%;
  margin-right: 3%;
}
.scaledropdown{
  margin-left: 3%;
}
#fretboardapp > div > section > fieldset:nth-child(2) > div.baseflex.dropdowns > div.scaledropdown.level1 > div.cursorpointer > div.placeholdervalue {
  background: var(--color-2);
  color: white;
}
.modedropdown {
  margin-left: 3%;
  margin-right: 3%;
  display: flex;
  width: -webkit-fill-available;
  .cursorpointer {
    width: -webkit-fill-available;
  }
  .placeholdervalue {
    width: -webkit-fill-available;
  }
}
.currentnotes{
  display:flex;
  margin-left: 3%;
  margin-right: 3%;
}
.currentnote{
  flex:auto;
  font-weight: bold;
  font-size: x-large;
}
</style>