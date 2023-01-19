<template>
  <svg
    role="img"
    :aria-labelledby="ariaIds"
    :viewBox="svgViewBox"
    :style="svgStyle"
  >
    <title :id="ariaTitleId">{{ ariaTitleText }}</title>
    <desc :id="ariaDescId">{{ ariaDescText }}</desc>
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
 * - check nut color/ design
 * - when startng from a fret instead of the nut, le repères de touches n'apparaissent pas toutes
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
      stringSize: null,
      noteRadius: null,
      noteTextColor: null,
      rootTextColor: null,
      fretSpace: null,
      nutSize: null,
      fretSize: null,
      fretColor: null,
      nutColor: null,
      stringColor: null,
      noteColor: null,
      rootColor: null,
      stringSpace: null,
      referenceRadius: null, // repère de touche
      referenceColor: null,
      orientation: null,
      reference: null,
      tuning: null,
      /**
       *
       */
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
    scale: {
      type: String,
      default: "C D E F G A B",
      //validation: this.validNoteList,
    },
    propTuning: {
      type: String,
      default: "G C E A",
      //validation: this.validNoteList,
    },
    start: {
      type: Number,
      default: 0,
      validator: (v) => v >= 0 && v <= 30,
    },
    frets: {
      type: Number,
      default: 5,
      validator: (v) => v >= 1 && v <= 30,
    }
  },
  created() {
    /**
     * Design Values
     */
    // @1
    this.stringSize = 3;
    this.noteRadius = 12;
    this.fretSpace = 66;
    this.nutSize = 10;
    this.fretSize = 6; //2;
    this.stringSpace = "40";
    this.referenceRadius = 5;
    this.reference = "3 5 7 9 12 12 15 17 19 21 24 24"; // enter number twice to get two dots
    this.orientation = "horizontal";
    this.fretColor = "var(--fretboard-fret-color)";
    this.nutColor = "var(--nut-color)";
    this.stringColor = "var(--fretboard-string-color)";
    this.noteColor = "var(--fretboard-note-color)";
    this.rootColor = "var(--fretboard-root-color)";
    this.noteTextColor = "var(--fretboard-noteText-color)";
    this.rootTextColor = "var(--fretboard-rootText-color)";
    this.referenceColor = "var(--fretboard-reference-color)";
    /**
     * Reverse string order to get the low string on top of the diagram
     */
    // todo replace this.$store with a computedInstrument
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
      return stringX + (this.instrument.leftDominantHand ? -(this.nutSize) : this.nutSize);
    }
  },
  computed,
};
</script>

<style>
/* cf: ./src/assets/css/shape-intervals.scss */
</style>