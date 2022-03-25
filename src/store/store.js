/**
 * NOTES
 *
 */
import DATA_CHORDS from './../database/chords.js';
import DATA_SCALES from './../database/scales.js';
import DATA_TETRACHORDS from './../database/tetrachords.js';
import DATA_TUNINGS from './../database/tunings.js';
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
      tuning: 'standard', // e.g. 'standard'
      tonality: {
        note: 'E', // e.g. Eb
        shift: 0 // e.g. -1
      },
      tuningTest: {
        type: '',
        tonality: '',
        notesByStrings:[]
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
    }
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
    }
  },
  actions: {
    switchTheme(context) {
      context.commit('switchTheme');
    },
    switchDexterity(context) {
      context.commit('switchDexterity');
    },
    switchToBass(context, payload) {
      context.commit('switchToBass', payload);
    },
    updateNbStrings(context, payload) {
      context.commit('updateNbStrings', payload);
    }
  }
});

export default store;
