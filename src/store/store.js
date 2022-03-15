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
      darkMode: false,
      leftDexterity: true,
      nbStrings: 6,
      chordDiagramWidth: 16, // TODO base 20
    };
  },
  getters: {
    appTitle(state) {
      return state.appTitle;
    },
    darkMode(state) {
      return state.darkMode;
    },
    leftDexterity(state) {
      return state.leftDexterity;
    },
    nbStrings(state) {
      return state.nbStrings;
    },
  },
  mutations: {
    switchTheme() {
      this.darkMode = !this.darkMode;
    }
  },
  actions: {
    switchTheme(context) {
      context.commit('switchTheme');
    }
  }
});

export default store;
