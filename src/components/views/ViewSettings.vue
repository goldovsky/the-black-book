<template>
  <div class="cardsettings">
    <h1>Settings</h1>
    <div class="divbasecards">
      <base-card class="individualbasecard">
        <h2>Instrument</h2>
        <ul>
          <li>
            <base-button
              :mode="!switchToBass ? 'flat' : ''"
              @click="switchInstrumentToBass(true)"
              >Bass</base-button
            >
            <base-button
              :mode="switchToBass ? 'flat' : ''"
              @click="switchInstrumentToBass(false)"
              >Guitar</base-button
            >
          </li>
          <li>
            <div>nbStrings |</div>
            <base-input-number
              v-model="nbStrings"
              :min="switchToBass ? 4 : 6"
              :max="switchToBass ? 6 : 8"
              :value="nbStrings"
              @input="updateNbStrings"
            />
          </li>
          <li>
            <div>Tuning</div>
            <base-select
              :options="tuningOptions"
              :valueInsteadOfKey="false"
              :initialValue="tuning"
              @select="updateTuning"
            />
            <div>|</div>
            <base-select
              :options="tuningOptions[tuning]"
              :valueInsteadOfKey="true"
              :initialValue="tonality"
              @select="updateTonality"
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
            <div>Right</div>
            <div title="Dexterity">
              <div
                class="slideDexterity"
                :style="{
                  background: `var(--switch-background-${
                    leftDexterity ? 'left' : 'right'
                  })`,
                }"
              >
                <input
                  type="checkbox"
                  value="None"
                  id="slideDexterity"
                  name="check"
                  v-model="leftDexterity"
                  @click="switchDexterity"
                />
                <label for="slideDexterity"></label>
              </div>
            </div>
            <div>Left</div>
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
              v-model="darkMode"
            />
            <label for="theme-switch" @click="switchTheme">
              <span v-if="darkMode">
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
 * @2) switch tuning to bass ones (1: change nbStrings ? should be automatic, 2: lload new tunings and update the selects)
 * @3) do the switch in store
 * Tuning doesn't update when changing nbStrings, tonality does
 */
export default {
  data() {
    return {
      darkMode: null,
      leftDexterity: null,
      chordDiagramHorizontal: false,
      fretboardDiagramHorizontal: true,
      switchToBass: null,
      nbStrings: null,
      tuning: "",
      tonality: "",
      // scoped variables
      tuningOptions: {},
    };
  },
  name: "ViewSettings",
  created() {
    this.darkMode = this.$store.getters.darkMode;
    this.leftDexterity = this.$store.getters.leftDexterity;
    this.switchToBass = this.$store.getters.switchToBass;
    this.nbStrings = this.$store.getters.nbStrings;

    this.loadAvailableTunings("guitar");

    const storeTuning = this.$store.getters.tuning;
    if (storeTuning.type !== null) {
      this.tuning = storeTuning.type;
      this.tonality = storeTuning.tonality;
    }
  },
  watch: {
    tuning() {
      if (
        this.tuning !== undefined &&
        Object.keys(this.tuningOptions).length > 0
      ) {
        this.tonality = this.tuningOptions[this.tuning][0]; // watcher call tonality() then updateGlobalTuning()
      }
    },
    tonality() {
      this.updateGlobalTuning(false);
    },
  },
  methods: {
    switchTheme() {
      this.$store.dispatch("switchTheme");
    },
    switchDexterity() {
      this.$store.dispatch("switchDexterity");
    },
    switchInstrumentToBass(booleanValue) {
      this.$store.dispatch({
        type: "switchToBass",
        value: booleanValue,
      });
      this.switchToBass = !this.switchToBass; // @1
      // @2
    },
    switchChordDiagramOrientation() {
      //@3
      this.chordDiagramHorizontal = !this.chordDiagramHorizontal;
    },
    switchFretboardDiagramOrientation() {
      //@3
      this.fretboardDiagramHorizontal = !this.fretboardDiagramHorizontal;
    },
    updateTuning(value) {
      this.tuning = value;
    },
    updateTonality(value) {
      this.tonality = value;
    },
    updateNbStrings(numberValue) {
      this.$store.dispatch({
        type: "updateNbStrings",
        value: numberValue,
      });
      this.nbStrings = this.$store.getters.nbStrings;
      this.loadAvailableTunings("guitar"); //todo
      this.updateGlobalTuning(true);
    },
    updateGlobalTuning(updatedNbStrings) {
      let tmpValue = {};
      if (updatedNbStrings) {
        let tmpType = Object.keys(this.tuningOptions)[0];
        tmpValue = {
          type: tmpType,
          tonality: this.tuningOptions[tmpType][0],
          stringsNotes: null,
        };
      } else {
        tmpValue = {
          type: this.tuning.length > 0 ? this.tuning : "standard",
          tonality: this.tonality.length > 0 ? this.tonality : "E",
          stringsNotes: null,
        };
      }

      this.$store.dispatch({
        type: "updateTuning",
        value: tmpValue,
      });

      this.tonality = this.$store.getters.tuning.tonality;
    },
    loadAvailableTunings(instrument) {
      this.tuningOptions = {};
    
      const storeGuitarTunings = this.$store.getters.dataTunings[instrument];
      // loop on number of strings available
      for (const HowManyStrings in storeGuitarTunings) {
        // skip loop if not in right nb of strings
        if (
          parseInt(HowManyStrings.substr(HowManyStrings.length - 1)) !==
          this.nbStrings
        ) {
          continue;
        }
        // loop on type of tuning
        for (const tuning in storeGuitarTunings[HowManyStrings]) {
          let tmpTuningTonalities = [];
          // loop on each tuning Tonality available
          for (const tonality in storeGuitarTunings[HowManyStrings][tuning]) {
            tmpTuningTonalities.push(
              tonality.charAt(0).toUpperCase() + tonality.slice(1).toLowerCase()
            );
          }
          this.tuningOptions[tuning] = tmpTuningTonalities;
        }
      }
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