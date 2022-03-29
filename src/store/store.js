/**
 * NOTES
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
      // todo implement this object
      instrument: {
        type: "guitar",
        leftDominantHand: true, // leftDominantHand
        strings: 6,
        tuning: {
          type: null,
          tonality: null,
          stringsNotes: [],
          availableOptions: {},
        },
      },
      nbStrings: 6,
      // Tuning Related
      tuning: {
        type: null,
        tonality: null,
        stringsNotes: [],
      },
      //database
      database: {
        chords: DATA_CHORDS,
        scales: DATA_SCALES,
        tetrachords: DATA_TETRACHORDS,
        tunings: DATA_TUNINGS,
      },
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
    instrument(state) {
      return state.instrument;
    },
    database(state) {
      return state.database;
    },
    nbStrings(state) {
      return state.nbStrings;
    },
    // Tuning Related
    tuning(state) {
      return state.tuning;
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
    updateInstrument(state, payload) {
      /**
       * TYPE
       */
      if (payload.instrument['type'] !== undefined && (state.instrument.type !== payload.instrument.type)) {
        state.instrument.type = payload.instrument.type;
        // todo update nb Strings
        // todo update tuning options
        // todo update tuning
      }
      /**
       * DOMINANT HAND
       */
      if (payload.instrument['leftDominantHand'] !== undefined) {
        state.instrument.leftDominantHand = payload.instrument.leftDominantHand;
      }
    },
    updateNbStrings(state, payload) {
      state.nbStrings = payload.value;
    },
    updateTuning(state, payload) {
      let tmpPayloadValue = payload.value;
      let tmpTonality = tmpPayloadValue.tonality.toLowerCase();
      // todo use of switch to bass not the best way to do it

      let tmpTuningsAvailable =
        state.database.tunings[state.instrument.type][
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
    initalizeTuning(state) {
      // todo use updateTuning instead
      // initialise the app with standard E

      // todo below to be removed once instrument object is in use
      state.tuning.type = "standard";
      state.tuning.tonality = "E";
      state.tuning.stringsNotes = ["E4", "B3", "G3", "D3", "A2", "E2"];

      state.instrument.tuning.type = "standard";
      state.instrument.tuning.tonality = "E";
      state.instrument.tuning.stringsNotes = [
        "E4",
        "B3",
        "G3",
        "D3",
        "A2",
        "E2",
      ];
    },
  },
  actions: {
    switchTheme(context) {
      context.commit("switchTheme");
    },
    updateInstrument(context, payload) {
      context.commit("updateInstrument", payload);
    },
    updateNbStrings(context, payload) {
      context.commit("updateNbStrings", payload);
    },
    updateTuning(context, payload) {
      context.commit("updateTuning", payload);
    },
    initalizeTuning(context) {
      context.commit("initalizeTuning");
    },
  },
});

export default store;
