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
          :prop-tuning="tuning"
          :start="fretboard.startingFret"
          :frets="frets + fretboard.startingFret - 1"
          title="Test"
        ></the-fretboard>
      </section>

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

          <hr />

          <fieldset class="form-group mt-4">
            <legend>Scale</legend>
            <div class="scale">
              <base-slider-array
                 title="Tonal"
                :values="selector.notes"
                :indexInitialValue="0"

              ></base-slider-array>
            </div>

            <base-dropdown :values="selector.scales.extends.list" @dropdownupdate="nbNotesByScaleSelected" title="type"></base-dropdown>


            <div class="scalealteration">
              <base-slider-array
                 title="alteration"
                :values="selector.accidental"
                :indexInitialValue="1"
              ></base-slider-array>
            </div>
          </fieldset>

          <hr />

          <fieldset class="form-group">
            <legend>Frets</legend>
             <div class="controlfrets">
              <base-slider-numerical
                 title="# of Frets"
                :values="fretsrange"
                :initialvalue="13"
                @valueupdate="updateNumberOfFrets"
              ></base-slider-numerical>
              <base-slider-numerical
                 title="Starting Fret"
                :values="fretsrange"
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
 * - always display strings notes, in grey if not part of the scale, in shape and color if so
 * - switch b <-> # (bemol/sharp)
 * - last fret in dotted line if not the 21/22/24th fret
 * - add instrument head icon for the tuning
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
      scalesDatabase: null,
      scale: "C Major",
      selector: {
        notes: ["C","D","E","F","G","A","B"],
        accidental: ["♭","♮","♯"],
        scales: {
          currentSelection: null,
          extends: {
            selected: null,
            list: ["5 - Pentatonic","6 - Hexatonic","7 - Heptatonic"]
          }
        }
      },
      tuning: null, // build in created()
      fretboard: {
        orientation: "horizontal",
        startingFret: 0
      },
      frets: null,
      fretsrange: [],
      startingfretrange: [], // TODO
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
      this.fretsrange.push(frt);
    }

    // load scale database
    this.scalesDatabase = scalesDatabase;
  },
  methods: {
    updateStartingNumber(value) {
      this.fretboard.startingFret = value;
      this.verifyFretboardValidity();
    },
    updateNumberOfFrets(value) {
      this.frets = value;
      this.verifyFretboardValidity();
    },
    // So we don't go beyond 24th
    verifyFretboardValidity() {
      let fretboardLimit = 25;
      if (this.fretboard.startingFret + this.frets > fretboardLimit) {
        this.frets = this.frets - (this.fretboard.startingFret + this.frets - fretboardLimit);
      }
    },
    nbNotesByScaleSelected(nb) {
      this.selector.scales.extends.selected = nb;
    }
  },
  computed: {
    instrument() {
      return this.$store.getters.instrument;
    },
  },
};
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

.controlfrets {
  display: flex;
  /* flex-direction: column; */
  align-items: end;
  justify-content: space-around;
  margin: auto;
}

.scale {
  width: 80%;
}

fieldset{
  border-radius: 12px; 
}
</style>