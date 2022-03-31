/**
 * NOTES
 * todo for tuning maybe do an array of every notes available : ['c0', 'c1'....]
 * and use index from that array so it can easely be shifted up and down
 */
import DATA_CHORDS_DIAGRAMS from "../database/chords_diagrams.js"; // todo is it really chords or chord diagrams? if so e might need another one for chords/arpeggios
import DATA_SCALES from "./../database/scales.js";
import DATA_TETRACHORDS from "./../database/tetrachords.js";
import DATA_TUNINGS from "./../database/tunings.js";
import DATA_NOTES_RELATIONS from "../database/notesrelations.js"; // todo same as arppegios?
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
        chords: DATA_CHORDS_DIAGRAMS,
        scales: DATA_SCALES,
        tetrachords: DATA_TETRACHORDS,
        tunings: DATA_TUNINGS,
        noteRelations: DATA_NOTES_RELATIONS
      },
    };
  },
  methods: {},
  getters: {
    display(state) {
      return state.display;
    },
    instrument(state) {
      return state.instrument;
    },
    database(state) {
      return state.database;
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
      // ? TYPE -> STRINGS -> AVAILABLETUNINGS-> T.TYPE -> T.TONALITY -> STRINGNOTES
      if ("type" in payload) {
        // load minString available in database for this type of instrument
        state.instrument.strings = parseInt(
          String(
            Object.keys(state.database.tunings[state.instrument.type])[0]
          ).substr(
            Object.keys(state.database.tunings[state.instrument.type])[0]
              .length - 1
          )
        ); // todo .str() is deprecated
        this.commit("updateAvailableTunings");
        boolUpdate = true;
      }
      if ("strings" in payload && !boolUpdate) {
        this.commit("updateAvailableTunings");
        boolUpdate = true;
      }
      // tuning.type
      if (boolUpdate && payload["tuning"] === undefined) {
        state.instrument.tuning.type = Object.keys(
          state.instrument.tuning.availableTunings
        )[0];
      }
      // tuning.tonality
      if (boolUpdate && payload["tuning"] === undefined) {
        // check if good
        state.instrument.tuning.tonality =
          state.instrument.tuning.availableTunings[
            state.instrument.tuning.type
          ][0];
      }
      // tuning.stringsNotes
      state.instrument.tuning.stringsNotes =
        state.database.tunings[state.instrument.type][
          "nb_strings_" + state.instrument.strings
        ][state.instrument.tuning.type][
          state.instrument.tuning.tonality.toLowerCase()
        ];
    },
    updateAvailableTunings(state) {
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

      this.commit("updateAvailableTunings");
    },
  },
  actions: {
    updateDisplay(context, payload) {
      context.commit("updateDisplay", payload);
    },
    updateInstrument(context, payload) {
      context.commit("updateInstrument", payload);
    },
    initalizeTuning(context) {
      context.commit("initalizeTuning");
    },
  },
});

export default store;
