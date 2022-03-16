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
      nbStrings: 7,
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
      // todo maybe move this somewhere else?
      // add/remove class to/from html tag
      let htmlElement = document.documentElement;
      
      if (this.darkMode) {
        htmlElement.setAttribute("theme", "light");
      } else {
        htmlElement.setAttribute("theme", "dark");
      }
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
