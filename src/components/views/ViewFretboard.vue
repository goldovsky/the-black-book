<template>
  <div id="fretboardapp">
    <!-- <section>
      <div>
        <h1>Fretboard</h1>
        <h4>{{ storeTuning.type }} {{ storeTuning.tonality }}</h4>
      </div>
    </section> -->
    <section
      class="col-9 align-middle"
      v-bind:style="{ alignItems: orientation == 'horizontal' ? 'center' : '' }"
    >
      <the-fretboard
        :scale="scale"
        :prop-tuning="tuning"
        :strumming-hand="strummingHand"
        :start="start"
        :frets="frets + start - 1"
        :fret-color="fretColor"
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
          <div class="form-group">
            <label for="numberOfFrets"># of Frets</label>
            <base-input-number
              id="numberOfFrets"
              class="form-control"
              :min="1"
              :max="30"
              :value="frets"
              v-model="frets"
              @input="updateNumberOfFrets"
            />
          </div>
          <div class="form-group">
            <label for="startingFret">Starting Fret</label>
            <base-input-number
              id="startingFret"
              class="form-control"
              :min="0"
              :max="23"
              :value="start"
              v-model="start"
              @input="updateStartingNumber"
            />
          </div>
        </fieldset>
      </section>
    </base-card>
  </div>
</template>

<script>
/**
 * TODO
 * put fretboard into basecard
 * position of settings bellow, without a basecard
 *
 * info: frets start and # of frets can be used to display shapes (penta...)
 * - move repère touche suivant le nombre de cordes
 * - always display strings notes, in grey if not part of the scale, in shape and color if so
 * - switch b <-> # (bemol/sharp)
 * - last fret in dotted line if not the 21/22/24th fret
 * - add H1 title fretboard
 * - add h4 or else tuning
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
      frets: 13,
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
    this.storeTuning = this.$store.getters.tuning;
    // build tuning based on Store
    this.tuning = this.$store.getters.tuning.stringsNotes
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
  },
  methods: {
    updateStartingNumber(value) {
      this.start = value;
      // todo check relation betwen this and number of frets
    },
    updateNumberOfFrets(value) {
      this.frets = value;
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
</style>