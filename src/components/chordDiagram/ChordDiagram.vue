<template>
  <base-chord :name="name" :nut-position="nutPosition">
    <!-- @1 -->
    <base-string v-for="n in nbStrings" :key="n - 1" :i="n - 1" :nbStrings="nbStrings" :leftDexterity="leftDexterity"></base-string>
    <base-fingering
      v-for="note in dexterityCorrectedChord"
      :key="note"
      :string="note.string"
      :fret="note.fret"
      :finger="note.finger"
    >
    </base-fingering>
  </base-chord>
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
 */
import BaseChord from "./elements/BaseChord.vue";
import BaseFingering from "./elements/BaseFingering.vue";
import BaseString from "./elements/BaseString.vue";
import { useStore } from "vuex";

export default {
  components: {
    BaseChord,
    BaseFingering,
    BaseString,
  },
  props: ["name", "chord", "nutPosition"],
  data() {
    return {
      dexterityCorrectedChord: null,
      nbStrings: null,
      leftDexterity: null
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
  },
};
</script>
