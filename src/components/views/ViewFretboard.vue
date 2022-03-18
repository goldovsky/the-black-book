<template>
  <div id="fretboardapp">
    <section
      class="col-9 align-middle"
      v-bind:style="{ alignItems: orientation == 'horizontal' ? 'center' : '' }"
    >
      <the-fretboard
        :scale="scale"
        :tuning="tuning"
        :strumming-hand="strummingHand"
        :reference="reference"
        :start="start"
        :frets="frets"
        :fret-color="fretColor"
        title="Test"
      ></the-fretboard>
    </section>
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
        <div class="form-group">
          <label for="tuning">Tuning</label>
          <input
            id="tuning"
            class="form-control"
            type="text"
            v-model="tuning"
            list="tuningOptions"
          />
          <datalist id="tuningOptions">
            <option value="E A D G B E">Guitar Standard</option>
            <option value="D A G B C E">Guitar Drop D</option>
            <option value="E A C# E A E">Guitar Open A</option>
            <option value="C G C G C E">Guitar Open C</option>
            <option value="G C E A">Tenor Ukele Standard</option>
          </datalist>
          <span class="form-text text-muted"
            >1 or more space separated notes. Use b for flats and # for sharps.
            String order: last to first</span
          >
        </div>
      </fieldset>

      <hr />

      <fieldset class="form-group">
        <legend>Frets</legend>
        <div class="form-group">
          <label for="numberOfFrets"># of Frets</label>
          <input
            id="numberOfFrets"
            class="form-control"
            type="number"
            max="30"
            min="1"
            v-model="frets"
          />
          <span class="text-muted form-text">number between 1 and 30</span>
        </div>
        <div class="form-group">
          <label for="startingFret">Starting Fret</label>
          <input
            id="startingFret"
            class="form-control"
            type="number"
            min="0"
            max="30"
            v-model="start"
          />
          <span class="text-muted form-text">number &ge; 0 and &lt; frets</span>
        </div>
      </fieldset>

      <hr />

      <fieldset class="form-group">
        <legend>Reference Dots</legend>
        <div class="form-group">
          <label for="references">References</label>
          <input
            id="references"
            class="form-control"
            type="text"
            v-model="reference"
          />
          <span class="form-text text-muted"
            >1 or more space-separated numbers. Enter a number twice to get 2
            dots.</span
          >
        </div>
      </fieldset>
    </section>
  </div>
</template>

<script>
/**
 * TODO
 * put fretboard into basecard
 * position of settings bellow, without a basecard
 */
import TheFretboard from "./../fretboard/TheFretboard.vue";
export default {
  components: {
    TheFretboard,
  },
  data() {
    return {
      scale: "C Major",
      tuning: "G C E A",
      orientation: "horizontal",
      start: 0,
      frets: 15,
      reference: "5 7 10 12 12 15",
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
};
</script>

<style>
#fretboardapp {
  align-items: center;
  display: flex;
  justify-content: center;
}
#fretboardapp > section:first-child {
  display: flex;
  height: 100vh;
  justify-content: center;
  overflow: auto;
}
#fretboardapp > section:nth-child(2) {
  border-left: 5px solid #888;
  height: 100vh;
  overflow-y: scroll;
}
</style>