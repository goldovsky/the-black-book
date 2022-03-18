<template>
  <svg
    role="img"
    :aria-labelledby="ariaIds"
    :viewBox="svgViewBox"
    :style="svgStyle"
  >
    <title :id="ariaTitleId">{{ ariaTitleText }}</title>
    <desc :id="ariaDescId">{{ ariaDescText }}</desc>
    <circle
      v-for="ref in referenceRendering"
      :key="ref"
      role="presentation"
      :cx="ref.cx"
      :cy="ref.cy"
      :r="ref.radius"
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
      :x="string.x"
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
 */
import { useStore } from "vuex";
import computed from './computed.js';
export default {
  data() {
    return {
      nbStrings: null,
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
      stringColor: null,
      noteColor: null,
      rootColor: null,
      stringSpace: null,
      referenceRadius: null, // repère de touche
      referenceColor: null,
      leftDexterity: null,
      orientation: null,
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
    tuning: {
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
    },
    reference: {
      type: String,
      default: "",
      //validation: this.validNumberList,
    },
  },
  created() {
    /**
     * STORE
     */
    const store = useStore();
    this.nbStrings = store.getters.nbStrings;
    this.leftDexterity = store.getters.leftDexterity;
    /**
     * Design Values
     */
    // @1
    this.stringSize = 3;
    this.noteRadius = 12;
    this.noteTextColor = "#EEEEEE";
    this.rootTextColor = "#EEEEEE";
    this.fretSpace = 66;
    this.nutSize = 10;
    this.fretSize = 2;
    this.fretColor = "#707070";
    this.stringColor = "#a8744d";
    this.noteColor = "#0f267b";
    this.rootColor = "#ba2121";
    this.stringSpace = "40";
    this.referenceRadius = 5;
    this.referenceColor = "#7c27b4";
    this.orientation = "horizontal";
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
    validNumberList(list) {
      return list.match(/^\s*[0-9]+(\s+[0-9]+)*\s*$/);
    },
    validNoteList(list) {
      return list.match(/^\s*[A-F][#b]*(\s+[A-F][#b]*)*\s*$/);
    },
  },
  computed,
};
</script>

<style>
</style>