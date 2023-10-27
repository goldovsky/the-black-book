<template>
  <div>
    <section>
      <div>
        <h1>Fretboard</h1>
        <div>
          <span>Tuning: </span>
          <span
            >{{ getInstrument.tuning.type }}
            {{
              getInstrument.tuning.tonality.charAt(0).toUpperCase() +
              getInstrument.tuning.tonality.slice(1).toLowerCase()
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
          :prop-tuning="fretboard.tuning"
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
                v-for="n in getCurrentScaleNotesDenomination"
                :key="n"
              >{{n}}</text>
            </div>

            <div class="baseflex noteselection">
              <!-- C, D, E, F, G, A, B -->
              <div class="scale">
                <base-slider-array
                   title="Tonality"
                  :values="selector.tonic.list"
                  :indexInitialValue="0"
                  @valueupdate="setTonic"
                ></base-slider-array>
              </div>
  
              <!-- ♭, ♮, ♯ -->
              <div class="accidental">
                <base-slider-array
                   title="accidental"
                  :values="selector.accidental.list"
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
                @valueupdate="setNumberOfFrets"
              ></base-slider-numerical>
              <base-slider-numerical
                 title="Starting Fret"
                :values="fretboard.range"
                :initialvalue="0"
                @valueupdate="setStartingNumber"
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
        tonic: {
          list: ["C","D","E","F","G","A","B"],
          selected: null
        },
        accidental: {
          list : ["♭","♮","♯"],
          selected: null
        },
        twelveTones: [
          {
            sharp: 'B♯',
            native: 'C',
            doubleFlat: 'D𝄫'
          },
          {
            sharp: 'C♯',
            native: null,
            flat: 'D♭',
          },
          {
            doubleSharp: 'C𝄪',
            native: 'D',
            doubleFlat: 'E𝄫'
          },
          {
            sharp: 'D♯',
            native: null,
            flat: 'E♭',
          },
          {
            doubleSharp: 'D𝄪',
            native: 'E',
            flat: 'F♭',
          },
          {
            sharp: 'E♯',
            native: 'F',
            doubleFlat: 'G𝄫'
          },
          {
            sharp: 'F♯',
            native: null,
            flat: 'G♭',
          },
          {
            doubleSharp: 'F𝄪',
            native: 'G',
            doubleFlat: 'A𝄫'
          },
          {
            sharp: 'G♯',
            native: null,
            flat: 'A♭',
          },
          {
            doubleSharp: 'G𝄪',
            native: 'A',
            doubleFlat: 'B𝄫'
          },
          {
            sharp: 'A♯',
            native: null,
            flat: 'B♭',
          },
          {
            doubleSharp: 'A𝄪',
            native: 'B',
            flat: 'C♭',
          },
        ],
        scales: {
          database: scalesDatabase,
          /* Indexes, for the level meaning -> cf scales.js */
          level1: null,
          level2: null,
          level3: null
        }
      },
      fretboard: {
        tuning: null, // build in created()
        orientation: "horizontal",
        startingFret: 0,
        range: [],
        frets: null
      }
    };
  },
  created() {
    // build tuning based on Store
    this.fretboard.tuning = this.getInstrument.tuning.stringsNotes
      .reverse()
      .join(" ")
      .replace(/[0-9]/g, "");

    // Initialise Frets Range
    for (let frt = 0; frt <= 24; ++frt) {
      this.fretboard.range.push(frt);
    }
    // init scale levels
    this.selector.scales.level1 = 2;
    this.selector.scales.level2 = 0;
    this.selector.scales.level3 = 0;

    // init tonality -> C
    this.setTonic("C"); // TODO check if needed
    // init accidental -> ♮
    this.setAccidental('♮');
  },
  methods: {
    setStartingNumber(value) {
      this.fretboard.startingFret = value;
      this.verifyFretboardValidity();
    },
    setNumberOfFrets(value) {
      this.fretboard.frets = value;
      this.verifyFretboardValidity();
    },
    // So we don't go beyond 24th
    // TODO clean that up
    verifyFretboardValidity() {
      // TODO put at 24
      let fretboardLimit = 25;
      if (this.fretboard.startingFret + this.fretboard.frets > fretboardLimit) {
        // TODO this.fretboard.frets minus itself? seriously? xD
        this.fretboard.frets = this.fretboard.frets - (this.fretboard.startingFret + this.fretboard.frets - fretboardLimit);
      }
    },
    setTonic(tonic) {
      this.selector.tonic.selected = tonic;
    },
    setAccidental(accidental) {
      this.selector.accidental.selected = accidental;
    },
    /** 
     * Handling of dropdowns concerning scale selection
     */
    // TODO write those 3 functions into 1 function
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
    _getTonicsOrderedStartingFromCurrentTonic() {
      let tonicIndex = this.selector.tonic.list.indexOf(this.selector.tonic.selected);
        let copyTonics = [...this.selector.tonic.list];
        // no modification needed for the first index
        if (tonicIndex != 0) { 
          // First, we add notes to the octave before our starting point at the end of the array
          for (var i = 0; i < tonicIndex; i++) {
            copyTonics.push(copyTonics[i]);
          }  
          // Secondly we remove the unwanted values before our starting point based on the mode
          copyTonics.splice(0, tonicIndex);
        }

        return copyTonics;
    },
    _nextLogicalNoteDenomination(index, TonicsFromContext) {
      // For now, a switch is here even if only one case cause others will come later on
        switch (this.selector.scales.level1) {
          // Pentatonic
          case 0: { 
            if ((index > 0) && ((this._getIntervals[index] - this._getIntervals[index - 1]) > 2)) {
              TonicsFromContext.splice(index, 1);
            }
          }
        }

        return TonicsFromContext[index];
      }
  },
  computed: {
    getInstrument() {
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
    displayScaleTitle() {
      let displaylevel2 = '';
      let level2 = this.getScaleLevel2[[this.selector.scales.level2]].replace('_',' ');
      let level3 = this.getScaleLevel3[[this.selector.scales.level3]].toLowerCase();

      if (level3 != level2) {
        displaylevel2 = '「' + level2 + '」';
      }

      return this.selector.tonic.selected 
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
      let intervals = this._applyModeToScale([...this._getIntervals], this.selector.scales.level3);
      let convertedIntervals = [];
      
      for (let i = 0; i < intervals.length; i++) {
        if (i === 0) {
          convertedIntervals.push(intervals[i]);
        } else {
          convertedIntervals.push(intervals[i] - intervals[i - 1]);
        }
      }
      
      // Calculate the octave interval
      convertedIntervals.push(12 - intervals[intervals.length - 1]);

      return convertedIntervals;
    },
    getCurrentScaleNotesDenomination() {
      let scaleIntervals = this._applyModeToScale([...this._getIntervals], this.selector.scales.level3);
      let TonicsFromContext = this._getTonicsOrderedStartingFromCurrentTonic();
      let notes = this._getNotesStartingFromCurrentIndex;
      let response = [];

      // Pour chaque note de la gamme
      for (var j = 0; j < scaleIntervals.length; j++) {
        // object from twelveNotes
        let objectNote = notes[scaleIntervals[j]];
        let nextLogicalNoteDenomination = this._nextLogicalNoteDenomination(j, TonicsFromContext);
        // key of the current note
        let key = Object.keys(objectNote).find(key => !!objectNote[key] && objectNote[key].startsWith(nextLogicalNoteDenomination));

        response.push(objectNote[key]);
      }

      return response;
    },
    _getIntervals() {
      return this.selector.scales.database[this.getScaleLevel1[this.selector.scales.level1]][this.getScaleLevel2[this.selector.scales.level2]]['intervals'];
    },
    _getTwelvesNotesIndexOfCurrentTonic() {
      let noteWeAreLookingFor = (this.selector.tonic.selected + this.selector.accidental.selected).replace('♮','');
      let self = this;

      // index of current note on the chromatic scale
      let indexCurrentNote = this.selector.twelveTones.map(function(n) {
        switch (self.selector.accidental.selected) {
          case "♭":
          return n.flat;
          case "♮":
            return n.native != null ? n.native : '';
          case "♯":
            return n.sharp;
        }
      }).indexOf(noteWeAreLookingFor);

      return indexCurrentNote;
    },
    _getNotesStartingFromCurrentIndex() {
      // get tonality index of this.selector.notes
      let tonalityIndex = this._getTwelvesNotesIndexOfCurrentTonic;

      let copyNotes = [...this.selector.twelveTones];
      // no modification needed for the first index
      if (tonalityIndex != 0) { 
        // First, we add notes to the octave before our starting point at the end of the array
        for (var i = 0; i < tonalityIndex; i++) {
          copyNotes.push(copyNotes[i]);
        }  
        // Secondly we remove the unwanted values before our starting point based on the mode
        copyNotes.splice(0, tonalityIndex);
       }

       return copyNotes;
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