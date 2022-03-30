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
      display: {
        appTitle: "TheBlackBook",
        darkMode: false,
        diagrams: {
          chords: {
            verticalOrientation: true,
            width: 16, // de base à 20
          },
          fretboard: {
            horizontalOrientation: true,
            switchStringSymmetry: false,
          },
        },
      },
      // todo implement this object
      instrument: {
        type: "guitar",
        leftDominantHand: true,
        strings: 6,
        tuning: {
          type: null,
          tonality: null,
          stringsNotes: [],
          availableTunings: {},
        },
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
  methods: {},
  getters: {
    // App Related
    display(state) {
      return state.display;
    },
    // Instrument Related
    instrument(state) {
      return state.instrument;
    },
    database(state) {
      return state.database;
    },
    stringRangeByInstrument(state) {
      // todo move into a method?
      let response = {
        minStrings: null,
        maxStrings: null,
      };

      // todo get the info from database
      switch (state.instrument.type) {
        case "bass":
          response.minStrings = 4;
          response.maxStrings = 5;
          break;
        case "guitar":
          response.minStrings = 6;
          response.maxStrings = 8;
          break;
        default:
          response.minStrings = 6;
          response.maxStrings = 8;
          break;
      }

      return response;
    },
  },
  mutations: {
    switchTheme(state) {
      // todo maybe move this somewhere else?
      // add/remove class to/from html tag
      let htmlElement = document.documentElement;

      if (state.display.darkMode) {
        htmlElement.setAttribute("theme", "light");
      } else {
        htmlElement.setAttribute("theme", "dark");
      }
      const tmpDarkMode = state.display.darkMode;
      state.display.darkMode = tmpDarkMode;
    },
    updateInstrument(state, payload) {
      let boolUpdateAvailableTunings = false;
      let boolUpdateCurrentTuning = false;
      let boolUpdateCurrentTonality = false;
      /**
       * INSTRUMENT TYPE
       */
      if (
        payload.instrument["type"] !== undefined &&
        state.instrument.type !== payload.instrument.type
      ) {
        state.instrument.type = payload.instrument.type;
        // todo update nb Strings
        state.instrument.strings =
          this.getters.stringRangeByInstrument.minStrings;

        // todo update tuning options
        boolUpdateAvailableTunings = true;
        // todo update tuning
        boolUpdateCurrentTuning = true;
      }
      /**
       * STRINGS
       */
      if (
        payload.instrument["strings"] !== undefined &&
        state.instrument.strings !== payload.instrument.srings
      ) {
        state.instrument.strings = payload.instrument.strings;
        // todo update tuning options
        boolUpdateAvailableTunings = true;

        // todo update tuning
        boolUpdateCurrentTuning = true;
        // todo update tonality
        boolUpdateCurrentTonality = true;
      }

      /**
       * DOMINANT HAND
       */
      if (payload.instrument["leftDominantHand"] !== undefined) {
        state.instrument.leftDominantHand = payload.instrument.leftDominantHand;
      }

      /**
       * TUNING TYPE
       */

      if (payload.instrument["tuning"] !== undefined) {
        if (payload.instrument.tuning["type"] !== undefined) {
          state.instrument.tuning.type = payload.instrument.tuning.type;
          //update current tonality to first of the list
          boolUpdateCurrentTonality = true;
          // todo move what is in the if directly here
        }
        if (payload.instrument.tuning["tonality"] !== undefined) {
          state.instrument.tuning.tonality = payload.instrument.tuning.tonality;
        }
        // todo update tuning
        boolUpdateCurrentTuning = true;
      }

      /**
       * Updates
       */
      if (boolUpdateAvailableTunings) {
        this.commit("updateTuningAvailableOptions");
      }
      if (boolUpdateCurrentTonality) {
        console.log('tonality')
        state.instrument.tonality =
        state.instrument.tuning.availableTunings[
          Object.keys(state.instrument.tuning.availableTunings)[0]
        ][0];
        console.log('tonality = ' + state.instrument.tonality)
      }
      if (boolUpdateCurrentTuning) {
        this.commit("updateTuning");
      }
    },
    updateTuning(state) {
      let tmpTonality = state.instrument.tuning.tonality.toLowerCase();
      // todo use of switch to bass not the best way to do it

      let tmpTuningsAvailable =
        state.database.tunings[state.instrument.type][
          "nb_strings_" + state.instrument.strings
        ][state.instrument.tuning.type];

        console.log('tmp tonality = ' + tmpTonality)
        console.log('condition if')
        console.log(!tmpTuningsAvailable[tmpTonality])

      // change tonality if it doesn't exist with current instrument.strings
      if (!tmpTuningsAvailable[tmpTonality]) {
        tmpTonality = Object.keys(tmpTuningsAvailable)[0];
        state.instrument.tuning.tonality = tmpTonality;
      }

      state.instrument.tuning.stringsNotes = tmpTuningsAvailable[tmpTonality];
    },
    updateDiagramOrientation(state, payload) {
      // todo do a general update display function
      if (payload.display.diagrams["chords"] !== undefined) {
        state.display.diagrams.chords.verticalOrientation =
          payload.display.diagrams.chords.verticalOrientation;
      }
      if (payload.display.diagrams["fretboard"] !== undefined) {
        state.display.diagrams.fretboard.horizontalOrientation =
          payload.display.diagrams.fretboard.horizontalOrientation;
      }
    },
    updateTuningAvailableOptions(state) {
      state.instrument.tuning.availableTunings = {};

      const stateDatabaseTunings =
        state.database.tunings[state.instrument.type];
      // loop on number of strings available
      for (const HowManyStrings in stateDatabaseTunings) {
        // skip loop if not in right nb of strings
        if (
          parseInt(HowManyStrings.substr(HowManyStrings.length - 1)) !==
          state.instrument.strings
        ) {
          continue;
        }
        // loop on type of tuning
        for (const tuning in stateDatabaseTunings[HowManyStrings]) {
          let tmpTuningTonalities = [];
          // loop on each tuning Tonality available
          for (const tonality in stateDatabaseTunings[HowManyStrings][tuning]) {
            tmpTuningTonalities.push(
              tonality.charAt(0).toUpperCase() + tonality.slice(1).toLowerCase()
            );
          }
          state.instrument.tuning.availableTunings[tuning] =
            tmpTuningTonalities;
        }
      }
    },
    initalizeTuning(state) {
      // todo use updateTuning instead
      // initialise the app with standard E
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

      this.commit("updateTuningAvailableOptions");
    },
  },
  actions: {
    switchTheme(context) {
      context.commit("switchTheme");
    },
    updateInstrument(context, payload) {
      context.commit("updateInstrument", payload);
    },
    updateTuning(context) {
      context.commit("updateTuning");
    },
    initalizeTuning(context) {
      context.commit("initalizeTuning");
    },
    updateDiagramOrientation(context, payload) {
      context.commit("updateDiagramOrientation", payload);
    },
  },
});

export default store;
