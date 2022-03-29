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
    <svg viewBox="0 0 100 100" x="5" y="20" width="95" height="80">
      <!-- Top Diagram | @1.w -->
      <line
        v-if="nutline"
        x1="0"
        y1="0"
        :x2="x2DiagramWidth"
        y2="0"
        class="topDiagram"
      />

      <!-- Frets -->
      <line x1="0" y1="20" :x2="x2DiagramWidth" y2="20" class="fret" />
      <line x1="0" y1="40" :x2="x2DiagramWidth" y2="40" class="fret" />
      <line x1="0" y1="60" :x2="x2DiagramWidth" y2="60" class="fret" />
      <line x1="0" y1="80" :x2="x2DiagramWidth" y2="80" class="fret" />

      <!-- STRINGS -->
      <line
        v-for="n in nbStrings"
        :key="n - 1"
        class="string"
        :x1="arrayStringXIndex[n - 1]"
        y1="0"
        :x2="arrayStringXIndex[n - 1]"
        :y2="n - 1 === 0 || n - 1 === nbStrings - 1 ? 95 : 99"
        :style="{ strokeWidth: stringStrokeWidth }"
      />

      <!-- Fingers -->
      <base-fingering
        v-for="note in dexterityCorrectedChord"
        :key="note"
        :string="note.string"
        :fret="note.fret"
        :finger="note.finger"
      ></base-fingering>

      <!-- Bottom diagram -->
      <path class="bottomDiagram" :d="bottomDiagramPath"></path>
    </svg>
  </svg>
</template>

<script>
/**
 * TODO
 * 1) Is it interesting to merge BaseChord, BaseString and BaseFretboard into this one single file?
 * 2) take a look into chord diagrams to see if we need more frets, and if so how to implement it
 * 3) calculate everything from a multiple of current strings used
 * @1) instead of 6 use current strings number used in app
 * @2) based on the variable leftDominantHand,
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
 *
 *
 *
 *
 *
 *
 *  * @1.w) TODO : use his if nut isn't part of the diagram
 *
 *
 *
 *
 * * @1)  add option in store data to not differenciate the string size
 * - if we differenciate the string size, calculate the placement for the last string to match the width of the string
 *
 *
 *
 *
 *  ?REFACTO :
 * instead of using data variables, use computed to $store
 */
import BaseFingering from "./elements/BaseFingering.vue";
import { useStore } from "vuex";

export default {
  components: {
    BaseFingering,
  },
  props: ["name", "chord", "nutPosition"],
  data() {
    return {
      // store
      nbStrings: null,
      // chord data
      dexterityCorrectedChord: null,
      // computed graphical properties
      rotationLeft: null,
      rotationRight: null,
      nutPath: null,
      bottomDiagramPath: null, // from baseFretboard
      x2DiagramWidth: 100, // Diagram width, from a string to another
      nutline: false, // todo calculate if nut isn't part of diagram,
      arrayStringXIndex: [],
      // else
      chordNameXPosition: null,
    };
  },
  created() {
    /**
     * STORE
     */
    const store = useStore();
    if (!this.leftDominantHand) {
      return;
    }
    this.nbStrings = store.getters.nbStrings;

    /**
     * Modify CHORD DATA based on Dexterity
     * WIP
     */
    let tmpChord = JSON.parse(JSON.stringify(this.chord));
    // loop for each fingering
    for (const idx in tmpChord) {
      // fingering is type 'barre'
      if (typeof tmpChord[idx].string === "object") {
        for (const arrayIdx in tmpChord[idx].string) {
          console.log(arrayIdx);
          // tmpChord[idx].string[arrayIdx] =
        }
        // fingering is type standard
      } else {
        // tmpChord[idx] = tmpChord[idx] - store.getters.nbStrings;
        tmpChord[idx] = 1 - this.nbStrings;
      }
    }
    this.dexterityCorrectedChord = this.chord; // TODO when code above is ok, replace with tmpChord

    /**
     * PATH
     */
    // @3.5
    this.rotationLeft = false;
    this.rotationRight = false;
    this.chordNameXPosition = 45; // 53 when chordDiagramWidth = 20
    this.nutWidth = 56.9; // 72.9 when chordDiagramWidth is at 20 | (729 * (this.$store.state.chordDiagramWidth / 20)) / 10
    this.nutPath = `M12.55,15
       q 0,-3.5 3.5,-3.5
       h${this.nutWidth}
       q 3.5,0 3.5,3.5
       v0
       z`;

    /**
     * Calculate Paths
     */
    this.bottomDiagramPath = `M0,94
       q 0,5 5,5
       h70
       q 5,0 5,-5
       q 0,5 -5,5
       v0
       h-70`; // h(-)90 when chordDiagramWidth = 20
    this.x2DiagramWidth = this.$store.getters.display.diagrams.chords.width * 5;

    /**
     * Calculate arrayStringXIndex
     * X position for earch string
     */
    // do it better than a for loop
    for (var i = 0; i < this.nbStrings; i++) {
      this.arrayStringXIndex.push(this.$store.getters.display.diagrams.chords.width * i);
      //this.$store.state.chordDiagramWidth * stringIndex
    }
  },
  computed: {
    leftDominantHand() {
      return this.$store.getters.instrument.leftDominantHand;
    },
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
    // from base string
    stringStrokeWidth() {
      // @1
      const activateDifferentStringSize = false;
      if (!activateDifferentStringSize) {
        return 0.5;
      }

      // return calculated Width based on the selected dexterity
      return this.leftDominantHand() ? (1 / (this.i + 1)) * 2 : (this.i + 1) * 2;
    },
  },
};
</script>

<style scoped>
.rotateLeft {
  transform: rotate(-90deg);
}
.rotateRight {
  transform: rotate(90deg);
}

.nut {
  fill: none;
  stroke: var(--diagram-stroke);
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 0.5;
}

.topDiagram {
  stroke: var(--diagram-stroke);
  /* stroke: rgba(0, 0, 0, 0.1); */
  stroke-width: 4;
  stroke-dasharray: 4, 3;
}

.fret {
  stroke: var(--diagram-fret);
  stroke-width: 4;
}
.string {
  stroke: var(--diagram-string);
  /* stroke-width: 0.5; */
  /* stroke-dasharray: 1, 0.2; */
}
.bottomDiagram {
  fill: none;
  stroke: var(--diagram-stroke);
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 0.5;
  /* transition: 0.2s; */
}
</style>
