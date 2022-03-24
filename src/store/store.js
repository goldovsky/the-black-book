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
      switchToBass: false,
      nbStrings: 6,
      chordDiagramWidth: 16, // de base à 20
      fretboardSwitchStringSymmetry: false,
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
    fretboardSwitchStringSymmetry(state) {
      return state.fretboardSwitchStringSymmetry;
    },
    switchToBass(state) {
      return state.switchToBass;
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
