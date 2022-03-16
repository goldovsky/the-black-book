<template>
  <!-- @4 -->
  <svg
    width="100%"
    viewBox="0 0 100 110"
    :class="{ rotateLeft: rotationLeft, rotateRight: rotationRight }"
  >
    <!-- Chord name -->
    <!-- @1 -->
    <text
      y="8"
      :x="chordNameXPosition"
      fill="var(--diagram-stroke)"
      font-size="10"
      font-weight="bold"
      text-anchor="middle"
    >
      {{ name }}
    </text>

    <!-- ⭘/✕ Open/Muted Strings -->
    <!-- @2 -->
    <!-- base 20 this is : v-for="(note, index) in splitTuning" :x="8.6 + index * 16" y="15" :key="index" fill="black" font-size="10" -->
    <!-- <text
      v-for="n in 6"
      :x="n * 12.7 - 4"
      y="15"
      :key="n"
      fill="black"
      font-size="10"
    >✕</text> -->

    <!-- Side number to know where to position the diagram on the fretboard | @5) -->
    <text v-if="nutPosition !== '0'" x="2" y="24" fill="black" font-size="8">
      {{ nutPosition }}
    </text>

    <!-- NUT | @6-->
    <svg viewBox="0 0 100 100" class="nut">
      <path :d="nutPath"></path>
    </svg>

    <!-- Fretboard -->
    <base-fretboard :nutline="false" x="5" y="20" width="95" height="80">
      <base-string
        v-for="n in nbStrings"
        :key="n - 1"
        :i="n - 1"
        :nbStrings="nbStrings"
        :leftDexterity="leftDexterity"
      ></base-string>
      <base-fingering
        v-for="note in dexterityCorrectedChord"
        :key="note"
        :string="note.string"
        :fret="note.fret"
        :finger="note.finger"
      ></base-fingering>
    </base-fretboard>
  </svg>
</template>

<script>
/**
 * TODO
 * 1) Is it interesting to merge BaseChord, BaseString and BaseFretboard into this one single file?
 * 2) take a look into chord diagrams to see if we need more frets, and if so how to implement it
 * 3) calculate everything from a multiple of current strings used
 * @1) instead of 6 use current strings number used in app
 * @2) based on the variable leftDexterity,
 * create a function  on created()
 * that will mirror every string on the chord based nbStrings
 *
 *
 *
 *  * - Refacto the whole opbject and it's components
 * - Change the proportion of the object to match the chordify's example (w:360 | h:450)
 * @1) check my books to see if the name shouldn't be displayed bellow instead of above
 * @2) The open/Muted Strings ned to be based on the object, so need to modify it, symbols(X☓╳✕✖◯○⭘)
 * @3.5) todo get global store data to determine if rotation or not
 * @4) optimize Rotate way to do it
 * @5) check which should be calculated, do the positioning on the Y axis
 * @6) do a v-if to check if it need to be displayed or not
 */
//import BaseChord from "./elements/BaseChord.vue";
import BaseFingering from "./elements/BaseFingering.vue";
import BaseString from "./elements/BaseString.vue";
import BaseFretboard from "./elements/BaseFretboard.vue";
import { useStore } from "vuex";

export default {
  components: {
    //BaseChord,
    BaseFingering,
    BaseString,
    BaseFretboard,
  },
  props: ["name", "chord", "nutPosition"],
  data() {
    return {
      dexterityCorrectedChord: null,
      nbStrings: null,
      leftDexterity: null,
      rotationLeft: null,
      rotationRight: null,
      nutPath: null,
      chordNameXPosition: null,
    };
  },
  created() {
    // @2) WIP
    const store = useStore();
    this.leftDexterity = store.getters.leftDexterity;
    if (!this.leftDexterity) {
      return;
    }
    this.nbStrings = store.getters.nbStrings;

    let tmpFretted = JSON.parse(JSON.stringify(this.chord));
    // loop for each fingering
    for (const idx in tmpFretted) {
      // fingering is type 'barre'
      if (typeof tmpFretted[idx].string === "object") {
        for (const arrayIdx in tmpFretted[idx].string) {
          console.log(arrayIdx);
          // tmpFretted[idx].string[arrayIdx] =
        }
        // fingering is type standard
      } else {
        // tmpFretted[idx] = tmpFretted[idx] - store.getters.nbStrings;
        tmpFretted[idx] = 1 - this.nbStrings;
      }
    }

    this.dexterityCorrectedChord = this.chord;

    /**------------------------- */
    // created from baseChord
    // @3.5
    this.rotationLeft = false;
    this.rotationRight = false;

    this.chordNameXPosition = 45; // 53 when chordDiagramWidth is at 20

    this.nutWidth = 56.9; // 72.9 when chordDiagramWidth is at 20 | (729 * (this.$store.state.chordDiagramWidth / 20)) / 10
    this.nutPath = `M12.55,15
       q 0,-3.5 3.5,-3.5
       h${this.nutWidth}
       q 3.5,0 3.5,3.5
       v0
       z`;
  },
  computed: {
    splitTuning() {
      const re = /[ABCDEFG][#b]?/g;
      let tuning = [];
      let match;
      do {
        match = re.exec(this.tuning);
        if (match) {
          tuning.push(match[0]);
        }
      } while (match && tuning.length < 6);
      return tuning;
    },
  },
};
</script>

<style scoped>
.nut {
  fill: none;
  stroke: var(--diagram-stroke);
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 0.5;
}

.rotateLeft {
  transform: rotate(-90deg);
}
.rotateRight {
  transform: rotate(90deg);
}
</style>
