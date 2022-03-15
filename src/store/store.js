/**
 * NOTES
 *
 */

import { createStore } from "vuex";

const store = createStore({
  modules: {},
  state() {
    return {
      appTitle: "TheBlackBook",
      leftDexterity: true,
      nbStrings: 6,
      chordDiagramWidth: 16, // TODO base 20
    };
  },
  getters: {
    appTitle(state) {
      return state.appTitle;
    },
    leftDexterity(state) {
      // useful?
      return state.leftDexterity;
    },
    nbStrings(state) {
      // useful?
      return state.nbStrings;
    },
  },
});

export default store;
