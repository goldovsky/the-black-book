/**
 * NOTES
 *
 */
import DATA_CHORDS from "./../database/chords.js";
import DATA_SCALES from "./../database/scales.js";
import DATA_TETRACHORDS from "./../database/tetrachords.js";
import DATA_TUNINGS from "./../database/tunings.js";
import { createStore } from "vuex";

const store = createStore({
  modules: {},
  state() {
    return {
      // App Related
      appTitle: "TheBlackBook",
      darkMode: false,
      chordDiagramWidth: 16, // de base à 20
      fretboardSwitchStringSymmetry: false,
      // instrument Related
      switchToBass: false,
      leftDexterity: true,
      nbStrings: 6,
      // Tuning Related
      tuning: {
        type: "standard",
        tonality: "E",
        stringsNotes: ["E4", "B3", "G3", "D3", "A2", "E2"],
      },
      //database
      dataChords: DATA_CHORDS,
      dataScales: DATA_SCALES,
      dataTetrachords: DATA_TETRACHORDS,
      dataTunings: DATA_TUNINGS,
    };
  },
  getters: {
    // App Related
    appTitle(state) {
      return state.appTitle;
    },
    darkMode(state) {
      return state.darkMode;
    },
    fretboardSwitchStringSymmetry(state) {
      return state.fretboardSwitchStringSymmetry;
    },
    // Instrument Related
    switchToBass(state) {
      return state.switchToBass;
    },
    leftDexterity(state) {
      return state.leftDexterity;
    },
    nbStrings(state) {
      return state.nbStrings;
    },
    // Tuning Related
    tuning(state) {
      return state.tuning;
    },
    //database
    dataChords(state) {
      return state.dataChords;
    },
    dataScales(state) {
      return state.dataScales;
    },
    dataTetrachords(state) {
      return state.dataTetrachords;
    },
    dataTunings(state) {
      return state.dataTunings;
    },
  },
  mutations: {
    switchTheme(state) {
      // todo maybe move this somewhere else?
      // add/remove class to/from html tag
      let htmlElement = document.documentElement;

      if (state.darkMode) {
        htmlElement.setAttribute("theme", "light");
      } else {
        htmlElement.setAttribute("theme", "dark");
      }
      state.darkMode = !state.darkMode;
    },
    switchDexterity(state) {
      state.leftDexterity = !state.leftDexterity;
    },
    switchToBass(state, payload) {
      state.switchToBass = payload.value;
    },
    updateNbStrings(state, payload) {
      state.nbStrings = payload.value;
    },
    updateTuning(state, payload) {
      let tmpPayloadValue = payload.value;
      let tmpTonality = tmpPayloadValue.tonality.toLowerCase();
      // todo use of switch to bass not the best way to do it

      let tmpTuningsAvailable =
        state.dataTunings[state.switchToBass ? "bass" : "guitar"][
          "nb_strings_" + state.nbStrings
        ][tmpPayloadValue.type];

      // change tonality if it doesn't exist with current nbStrings
      if (!tmpTuningsAvailable[tmpTonality]) {
        tmpTonality = Object.keys(tmpTuningsAvailable)[0];
        tmpPayloadValue.tonality = tmpTonality;
      }

      tmpPayloadValue.stringsNotes = tmpTuningsAvailable[tmpTonality];

      state.tuning = tmpPayloadValue;
    },
  },
  actions: {
    switchTheme(context) {
      context.commit("switchTheme");
    },
    switchDexterity(context) {
      context.commit("switchDexterity");
    },
    switchToBass(context, payload) {
      context.commit("switchToBass", payload);
    },
    updateNbStrings(context, payload) {
      context.commit("updateNbStrings", payload);
    },
    updateTuning(context, payload) {
      context.commit("updateTuning", payload);
    },
  },
});

export default store;
