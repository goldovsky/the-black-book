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
          alignItems: orientation == 'horizontal' ? 'center' : '',
        }"
      >
        <the-fretboard
          :scale="scale"
          :prop-tuning="tuning"
          :start="start"
          :frets="frets + start - 1"
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

          <fieldset class="form-group">
            <legend>Frets</legend>
             <div class="controlfrets">
              <base-slider
                 title="# of Frets"
                :values="fretsrange"
                :initialvalue="13"
                @valueupdate="updateNumberOfFrets"
              ></base-slider>
              <base-slider
                 title="Starting Fret"
                :values="fretsrange"
                :initialvalue="0"
                @valueupdate="updateStartingNumber"
              ></base-slider>
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
export default {
  components: {
    TheFretboard,
    BaseCard,
  },
  data() {
    return {
      scale: "C Major",
      storeTuning: null,
      tuning: null, // build in created()
      orientation: "horizontal",
      start: 0,
      frets: null,
      fretsrange: [],
      startingfretrange: [], // TODO
      // below come from <script> inside html
      scales: {
        Major: [2, 2, 1, 2, 2, 2, 1],
        Minor: [2, 1, 2, 2, 1, 2, 2],
        Dorian: [2, 1, 2, 2, 2, 1, 2],
        Locrian: [1, 2, 2, 1, 2, 2, 2],
        Lydian: [2, 2, 2, 1, 2, 2, 1],
        Mixolydian: [2, 2, 1, 2, 2, 1, 2],
        Phrygian: [1, 2, 2, 2, 1, 2, 2],
        "Major Pentatonic": [2, 2, 3, 2, 3],
        "Minor Pentatonic": [3, 2, 2, 3, 2],
      },
      notes: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
    };
  },
  created() {
    this.storeTuning = this.instrument.tuning;
    // build tuning based on Store
    this.tuning = this.instrument.tuning.stringsNotes
      .reverse()
      .join(" ")
      .replace(/[0-9]/g, "");

    //let html = "";
    Object.keys(this.scales).forEach((scale) => {
      console.log("GDY Scale");
      console.log(scale);

      // notes.forEach((note, i) => {
      //   let scale_notes = [];
      //   for (let k = 0, j = 0, l = this.scales[scale].length; k < l; ++k) {
      //     scale_notes.push(notes[(i + j) % 12]);
      //     j += this.scales[scale][k];
      //   }
      //   scale_notes = scale_notes.join(" ");
      //   html += `<option value="${note} ${scale}">${scale_notes}</option>`;
      // });
    });
    //document.currentScript.parentNode.innerHTML = html;

    // Object.keys(data).forEach((key) => {
    // 	watch[key] = (val) => window.localStorage.setItem(key, val);
    // 	let value = window.localStorage.getItem(key);
    // 	if (value !== null) {
    // 		data[key] = value;
    // 	}
    // });

    //init fretsrange
    for (let frt = 0; frt < 25; ++frt) {
      this.fretsrange.push(frt);
    }
  },
  methods: {
    updateStartingNumber(value) {
      this.start = value;
      this.verifyFretboardValidity();
    },
    updateNumberOfFrets(value) {
      this.frets = value;
      this.verifyFretboardValidity();
    },
    // So we don't go beyond 24th
    verifyFretboardValidity() {
      let fretboardLimit = 25;
      if (this.start + this.frets > fretboardLimit) {
        this.frets = this.frets - (this.start + this.frets - fretboardLimit);
      }
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

.controlfrets{
  display: flex;
  /* flex-direction: column; */
  align-items: end;
  justify-content: space-around;
  margin: auto;
}

fieldset{
  border-radius: 12px; 
}
</style>