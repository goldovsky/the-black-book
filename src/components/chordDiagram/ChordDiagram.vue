<template>
  <svg
    width="100%"
    viewBox="0 0 100 110"
    :class="{ rotateLeft: rotationLeft, rotateRight: rotationRight }"
  >
    <!-- Chord name -->
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
    <text class="openMutedstringSymbol"
      v-for="n in this.instrument.strings"
      :x="openMutedStringPosition(n)"
      y="15"
      :key="n"
    >{{openMutedstringSymbol(n)}}</text>

    <!-- Side number to know where to position the diagram on the fretboard | @5) -->
    <text v-if="nutPosition !== '0'" x="2" y="24" fill="black" font-size="8">
      {{ nutPosition }}
    </text>

    <!-- NUT | @6 -->
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
        v-for="n in instrument.strings"
        :key="n - 1"
        class="string"
        :x1="arrayStringXIndex[n - 1]"
        y1="0"
        :x2="arrayStringXIndex[n - 1]"
        :y2="n - 1 === 0 || n - 1 === instrument.strings - 1 ? 95 : 99"
        :style="{ strokeWidth: stringStrokeWidth }"
      />

      <!-- Fingers -->
      <base-fingering
        :chord="chord"
      ></base-fingering>

      <!-- Bottom diagram -->
      <path class="bottomDiagram" :d="bottomDiagramPath"></path>
    </svg>
  </svg>
</template>

<script>
/**
 * TODO
 * 2) take a look into chord diagrams to see if we need more frets, and if so how to implement it, calculate delta between lowest and highest frets in chord object
 * 3) calculate everything from a multiple of current strings used
 * 
 * ...
 * 
 *  * - Refacto the whole object and it's components
 * - Change the proportion of the object to match the chordify's example (w:360 | h:450)
 * @1) check my books to see if the name shouldn't be displayed bellow instead of above
 * @3.5) TODO get global store data to determine if rotation or not
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
//import { useStore } from "vuex";

export default {
  components: {
    BaseFingering,
  },
  props: ['name', 'chord', 'nutPosition'],
  data() {
    return {
      // store
      // chord data
      // computed graphical properties
      rotationLeft: null,
      rotationRight: null,
      nutPath: null,
      bottomDiagramPath: null, // from baseFretboard
      x2DiagramWidth: 100, // Diagram width, from a string to another
      nutline: false, // TODO calculate if nut need to be displayed in the diagram,
      arrayStringXIndex: [],
      // else
      chordNameXPosition: null,
    };
  },
  created() {
    /**
     * STORE
     */
    //const store = useStore();

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
    for (var i = 0; i < this.instrument.strings; i++) {
      this.arrayStringXIndex.push(this.$store.getters.display.diagrams.chords.width * i);
      //this.$store.state.chordDiagramWidth * stringIndex
    }
  },
  methods: {
    openMutedstringSymbol(n) {
      // TODO correction on: 
      /**
       * test: {
            frets: [4,null,4,null,null,null],
            fingers: [4,null,4,null,null,null],
            intervals:['x','x','x','x','x','x']
          },
        * X at 2nd string, shouldn't be there 
       */

      // (X☓╳✕✖◯○⭘)
      if (this.chord['frets'] !== undefined) {
        switch (this.chord['frets'][n-1]) {
          case null:
            return "✕";
            case 0:
            return "⭘";
          default:
            return "";
        }
      }
      return "";
    },
    openMutedStringPosition(n) {
      let instrument = this.$store.getters.instrument;
      return instrument.leftDominantHand ?
      n * 12.7 - 3 : 
      (instrument.strings - n + 1) * 12.7 - 3;
    }
  },
  computed: {
    instrument() {
      return this.$store.getters.instrument;
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
      return this.instrument.leftDominantHand() ? (1 / (this.i + 1)) * 2 : (this.i + 1) * 2;
    }
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

.openMutedstringSymbol {
  fill: var(--diagram-stroke);
  font-size:7px;
}
</style>
