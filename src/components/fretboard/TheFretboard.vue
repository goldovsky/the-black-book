<template>
  <svg
    role="img"
    :aria-labelledby="ariaIds"
    :viewBox="svgViewBox"
    :style="svgStyle"
  >
    <title :id="ariaTitleId">{{ ariaTitleText }}</title>
    <desc :id="ariaDescId">{{ ariaDescText }}</desc>

    <!-- Repère de touche -->
    <ellipse
      v-for="ref in fretMarkerRendering"
      :key="ref"
      role="presentation"
      :cx="ref.cx"
      :cy="ref.cy"
      :rx="7"
      :ry="(instrument.strings % 2 == 0) ? 7 : 17"
      :stroke="ref.stroke"
      :fill="ref.fill"
    />

    <!-- Frette -->
    <rect
      v-for="fret in fretRenderings"
      :key="fret"
      role="presentation"
      :x="fret.x"
      :y="fret.y"
      :height="fret.height"
      :width="fret.width"
      :fill="fret.color"
    />

    <!-- Corde -->
    <rect
      v-for="string in stringRenderings"
      :key="string"
      role="presentation"
      :x="stopStringAtNut(string.x)"
      :y="string.y"
      :height="string.height"
      :width="string.width"
      :fill="string.color"
    />

    <!-- Note : Shape -->
    <circle
      v-for="note in scaleRendering"
      :key="note"
      role="presentation"
      :cx="note.cx"
      :cy="note.cy"
      :r="note.radius"
      :stroke="note.stroke"
      :fill="note.fill"
    />

    <!-- Note : Nom de la note -->
    <text
      v-for="text in scaleText"
      :key="text"
      text-anchor="middle"
      dominant-baseline="middle"
      :x="text.x"
      :y="text.y"
      :fill="text.fill"
    >
      {{ text.text }}
    </text>
  </svg>
</template>

<script>
/**
 * TODO
 * @1) Change rendered/set values to CSS
 * @displayIntervalsInsteadOfNotes prop option to not display number in notes or interval instead
 * - change notes circle to shape and color based on intervals
 *
 */
//import { useStore } from "vuex";
import computed from "./computed.js";
export default {
  data() {
    return {
      /**
       * Design Values
       */
      inlay: {
        radius: 5,
        color: "var(--fretboard-reference-color)",
        positions: "3 5 7 9 12 12 15 17 19 21 24 24 27 29 31" // enter number twice to get two dots
      },
      fret: {
        size: 6, //2
        color: "var(--fretboard-fret-color)",
        colored: "var(--fretboard-colored-fret-color)",
        space: 66,
        
      },
      string: {
        size: 3,
        space: "40",
        color: "var(--fretboard-string-color)"
      },
      nut: {
        size: 10,
        color: "var(--nut-color)"
      },
      note: {
        radius: 12,
        color: "var(--fretboard-note-color)",
        textColor: "var(--fretboard-noteText-color)",
        root: {
          color: "var(--fretboard-root-color)",
          textColor: "var(--fretboard-rootText-color)",
        }
      },
      orientation: null,
      tuning: null,
      ariaUid: 0,
      noteNames: [
        "C",
        "C#",
        "D",
        "D#",
        "E",
        "F",
        "F#",
        "G",
        "G#",
        "A",
        "A#",
        "B",
      ],
    };
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    newscalenotename: {
      type: Array[String],
      default: ["C","D","E","F","G","A","B"]
    },
    intervals: {
      type: Array[Number],
      default: [0, 2, 4, 5, 7, 9, 11, 0] // Major scale
    },
    propTuning: {
      type: String,
      default: "G C E A"
    },
    start: {
      type: Number,
      default: 0
    },
    frets: {
      type: Number,
      default: 5
    }
  },
  created() {
    /**
     * Design Values
     */
    // @1
    this.orientation = "horizontal";
    /**
     * Reverse string order to get the low string on top of the diagram
     */
    if (this.$store.getters.display.diagrams.fretboard.switchStringSymmetry) {
      var reverseTuning = this.propTuning;
      reverseTuning = reverseTuning.split(" ").reverse().join(" ");
      this.tuning = reverseTuning;
    } else {
      this.tuning = this.propTuning;
    }
  },
  methods: {
    ariaId() {
      return this.ariaUid++;
    },
    getValues(values) {
      let noteValue = {
        C: 0,
        D: 2,
        E: 4,
        F: 5,
        G: 7,
        A: 9,
        B: 11,
      };
      return values
        .trim()
        .toUpperCase()
        .split(/\s+/)
        .map((v) => {
          let accidental =
            ("0" + v.slice(1))
              .split(/(?=.)/)
              .reduce((r, n) => r * 1 + (n === "B" ? -1 : n === "#" ? 1 : 0)) *
            1;
          return Math.abs((noteValue[v[0]] + accidental) % 12);
        });
    },
    validNoteList(list) {
      return list.match(/^\s*[A-F][#b]*(\s+[A-F][#b]*)*\s*$/);
    },
    stopStringAtNut(stringX) {
      // nut not displayed
      if (this.start != 0) {
        return stringX;
      }
      return stringX + (this.instrument.leftDominantHand ? -(this.nut.size) : this.nut.size);
    }
  },
  computed,
};
</script>

<style>
/* cf: ./src/assets/css/shape-intervals.scss */
</style>