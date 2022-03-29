<template>
  <div class="cardsettings">
    <h1>Settings</h1>
    <div class="divbasecards">
      <base-card class="individualbasecard">
        <h2>Instrument</h2>
        <ul>
          <li>
            <base-button
              :mode="this.instrument.type === 'bass' ? '' : 'flat'"
              @click="updateInstrumentType('bass')"
              >Bass</base-button
            >
            <base-button
              :mode="this.instrument.type === 'guitar' ? '' : 'flat'"
              @click="updateInstrumentType('guitar')"
              >Guitar</base-button
            >
          </li>
          <li>
            <div>Strings |</div>
            <!-- v-model="nbStrings" -->
            <base-input-number
              :min="this.stringRangeByInstrument.minStrings"
              :max="this.stringRangeByInstrument.maxStrings"
              :value="this.instrument.strings"
              @input="updateInstrumentStrings"
            />
          </li>
          <li>
            <div>Tuning</div>
            <base-select
              :options="this.instrument.tuning.availableTunings"
              :valueInsteadOfKey="false"
              :initialValue="this.instrument.tuning.type"
              @select="updateInstrumentTuningType"
            />
            <div>|</div>
            <base-select
              :options="this.instrument.tuning.availableTunings[this.instrument.tuning.type]"
              :valueInsteadOfKey="true"
              :initialValue="this.instrument.tuning.tonality"
              @select="updateInstrumentTuningTonality"
            />
          </li>
        </ul>
      </base-card>
      <base-card class="individualbasecard">
        <h2>Diagrams</h2>
        <ul>
          <li>
            <div>Chord Diagrams</div>
            <base-button @click="switchChordDiagramOrientation">{{
              chordDiagramHorizontal ? "Horizontal" : "Vertical"
            }}</base-button>
          </li>
          <li>
            <div>Fretboard Diagram</div>
            <base-button @click="switchFretboardDiagramOrientation">{{
              fretboardDiagramHorizontal ? "Horizontal" : "Vertical"
            }}</base-button>
          </li>
          <li>
            <div>Dexterity |</div>
            <div>Left</div>
            <div title="Dexterity">
              <div
                class="slideDexterity"
                :style="{
                  background: `var(--switch-background-${
                    instrument.leftDominantHand ? 'left' : 'right'
                  })`,
                }"
              >
                <!-- v-model="leftDominantHand" -->
                <!-- value="None" -->
                <input
                  type="checkbox"
                  :checked="!instrument.leftDominantHand"
                  id="slideDexterity"
                  name="check"
                  @click="switchDominantHand"
                />
                <label for="slideDexterity"></label>
              </div>
            </div>
            <div>Right</div>
          </li>
        </ul>
      </base-card>
      <base-card class="individualbasecard">
        <h2>App</h2>
        <ul>
          <li>
            <span>Theme</span>
            <!-- theme switcher -->
            <input
              type="checkbox"
              id="theme-switch"
              class="theme-switch"
              v-model="display.darkMode"
            />
            <label for="theme-switch" @click="switchTheme">
              <span v-if="display.darkMode">
                <img
                  alt="logo"
                  src="./../../assets/images/sun.png"
                  width="40"
                />
              </span>
              <span v-else>
                <img
                  alt="logo"
                  src="./../../assets/images/moon.png"
                  width="40"
                />
              </span>
            </label>
          </li>
        </ul>
      </base-card>
    </div>
  </div>
</template>

<script>
/**
 * TODO
 * at first page loading, icon get set to dark whatever the current theme is. check created method
 * @1) not sure it is the best way, but as we associate the value at created we might need to do something so it is updated as the store change state
 * @2) switch tuning to bass ones (1: change nb Strings ? should be automatic, 2: lload new tunings and update the selects)
 * @3) do the switch in store
 *  when selecting drop and changing nb Strings, tonality doesn't update
 */
export default {
  data() {
    return {
      chordDiagramHorizontal: false,
      fretboardDiagramHorizontal: true,
    };
  },
  name: "ViewSettings",
  computed: {
    display() {
      return this.$store.getters.display;
    },
    instrument() {
      return this.$store.getters.instrument;
    },
    stringRangeByInstrument() {
      return this.$store.getters.stringRangeByInstrument;
    },
  },
  methods: {
    switchTheme() {
      this.$store.dispatch("switchTheme");
    },
    switchDominantHand() {
      const tmpLeftDominantHand = !this.instrument.leftDominantHand;
      this.$store.dispatch("updateInstrument", {
        instrument: {
          leftDominantHand: tmpLeftDominantHand,
        },
      });
    },
    // todo should do a single method, get another parameter to use as a key
    updateInstrumentType(value) {
      this.$store.dispatch("updateInstrument", {
        instrument: {
          type: value,
        },
      });
      // @2
    },
    updateInstrumentStrings(value) {
      this.$store.dispatch("updateInstrument", {
        instrument: {
          strings: value,
        },
      });
    },
    updateInstrumentTuningType(value) {
      this.$store.dispatch("updateInstrument", {
        instrument: {
          tuning: {
            type: value,
          },
        },
      });
    },
    updateInstrumentTuningTonality(value) {
      this.$store.dispatch("updateInstrument", {
        instrument: {
          tuning: {
            tonality: value,
          },
        },
      });
    },
    switchChordDiagramOrientation() {
      //@3
      this.chordDiagramHorizontal = !this.chordDiagramHorizontal;
    },
    switchFretboardDiagramOrientation() {
      //@3
      this.fretboardDiagramHorizontal = !this.fretboardDiagramHorizontal;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  /* margin: 0; */
  padding: 0;
  /* display: flex; */
  justify-content: center;
  align-items: center;
}
li {
  margin: 0 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.cardsettings {
  padding: 0rem 3rem 0rem 3rem;
}
.divbasecards {
  display: flex;
  flex-wrap: wrap;
}
.individualbasecard {
  width: 40%;
}
</style>