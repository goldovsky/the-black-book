/**
 * NOTES
 */
import DATA_CHORDS from "./../database/chords.js";
import DATA_SCALES from "./../database/scales.js";
import DATA_TETRACHORDS from "./../database/tetrachords.js";
import DATA_TUNINGS from "./../database/tunings.js";
import { createStore } from "vuex";
import lodash from "lodash";

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
      instrument: {
        leftDominantHand: true,
        type: "guitar",
        strings: 6,
        tuning: {
          type: null,
          tonality: null,
          stringsNotes: [],
          availableTunings: {},
        },
      },
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
    instrumentStringRange(state) {
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
    updateDisplay(state, payload) {
      lodash.merge(state.display, payload); // ≡ Object.assign()

      // SWITCH THEME
      if ("darkMode" in payload) {
        document.documentElement.setAttribute(
          "theme",
          payload.darkMode ? "dark" : "light"
        );
        state.display.darkMode = !state.display.darkMode;
      }
    },
    updateInstrument(state, payload) {
      lodash.merge(state.instrument, payload); // ≡ Object.assign()

      let boolUpdate = false; // update tuning
      // type -> strings -> tuning.type -> tonality -> stringsNotes
      if ("type" in payload) {
        // load minString available in database for this type of instrument
        // todo .str() is deprecated
        state.instrument.strings = parseInt(
          String(
            Object.keys(state.database.tunings[state.instrument.type])[0]
          ).substr(
            Object.keys(state.database.tunings[state.instrument.type])[0]
              .length - 1
          )
        );
        boolUpdate = true;
      }
      if ("strings" in payload && !boolUpdate) {
        boolUpdate = true;
      }
      // if need to u
      if (boolUpdate) {
        // tuning.type
      }
      // tuning.tonality
      if (boolUpdate) {
        // do stuff
      }

      // this.commit("updateTuningAvailableOptions");
    },
    updateInstrumentOldMethod(state) {
      // , payload
      // todo use : state.instrument = Object.assign(state.instrument, payload);

      let boolUpdateAvailableTunings = false;
      let boolUpdateCurrentTuning = false;
      let boolUpdateCurrentTonality = false;
      /**
       * INSTRUMENT TYPE
       */
      // todo update nb Strings
      // todo update tuning options
      // todo update tuning

      /**
       * STRINGS
       */
      // todo update tuning options
      // todo update tuning
      // todo update tonality

      /**
       * TUNING TYPE
       */
      // todo update tuning

      /**
       * Updates
       */
      if (boolUpdateAvailableTunings) {
        this.commit("updateTuningAvailableOptions");
      }
      if (boolUpdateCurrentTonality) {
        console.log("tonality");
        state.instrument.tonality =
          state.instrument.tuning.availableTunings[
            Object.keys(state.instrument.tuning.availableTunings)[0]
          ][0];
        console.log("tonality = " + state.instrument.tonality);
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

      console.log("tmp tonality = " + tmpTonality);
      console.log("condition if");
      console.log(!tmpTuningsAvailable[tmpTonality]);

      // change tonality if it doesn't exist with current instrument.strings
      if (!tmpTuningsAvailable[tmpTonality]) {
        tmpTonality = Object.keys(tmpTuningsAvailable)[0];
        state.instrument.tuning.tonality = tmpTonality;
      }

      state.instrument.tuning.stringsNotes = tmpTuningsAvailable[tmpTonality];
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
    updateDisplay(context, payload) {
      context.commit("updateDisplay", payload);
    },
    updateInstrumentOldMethod(context, payload) {
      context.commit("updateInstrument", payload);
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
  },
});

export default store;
