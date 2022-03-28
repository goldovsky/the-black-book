<template>
  <div class="cardsettings">
    <h1>Settings</h1>
    <base-card>
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
          <!-- @3 -->
          <div>Tuning</div>
          <!-- <base-select :options="tuningOptions" /> -->
          <select v-model="tuning">
            <option v-for="(value, key) in tuningOptions" :key="key">
              {{ key }}
            </option>
          </select>
          <!-- @4 -->
          <div>In</div>
          <select v-model="tonality">
            <option v-for="(value, key) in tuningOptions[tuning]" :key="key">
              {{ value }}
            </option>
          </select>
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
    <base-card>
      <ul>
        <div>
          <span>Diagrams Orientations</span>
          <li>Chords | Horizontal | Vertical</li>
          <li>Fretboard | Horizontal | Vertical</li>
        </div>
        <li>Setting 2</li>
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
              <img alt="logo" src="./../../assets/images/sun.png" width="40" />
            </span>
            <span v-else>
              <img alt="logo" src="./../../assets/images/moon.png" width="40" />
            </span>
          </label>
        </li>
      </ul>
    </base-card>
  </div>
</template>

<script>
/**
 * TODO
 * at first page loading, icon get set to dark whatever the current theme is. check created method
 * @1) not sure it is the best way, but as we associate the value at created we might need to do something so it is updated as the store change state
 * @2 switch tuning to bass ones
 * @3 && @4 : update tuning and tonality accordingly
 * @3 && @4 : select first value of list @ loading
 */
export default {
  data() {
    return {
      darkMode: null,
      leftDexterity: null,
      switchToBass: null,
      nbStrings: 6,
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

    this.loadAvailableTunings();
    // todo build tonality
  },
  watch: {
    tuning() {
      if (
        this.tuning !== undefined &&
        Object.keys(this.tuningOptions).length > 0
      ) {
        this.tonality = this.tuningOptions[this.tuning][0];
      }
      // doesn't need to call this function as we do with the tonality watcher we did call by modifying tonality value
      //this.updateGlobalTuning();
    },
    tonality() {
      this.updateGlobalTuning();
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
    updateTuning(value) {
      // todo check if used, as well as updatetonality
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
      this.updateGlobalTuning();
    },
    updateGlobalTuning() {
      this.$store.dispatch({
        type: "updateTuning",
        value: {
          type: this.tuning.length > 0 ? this.tuning : "standard",
          tonality: this.tonality.length > 0 ? this.tonality : "E",
          stringsNotes: null,
        },
      });
    },
    loadAvailableTunings() {
      const storeGuitarTunings = this.$store.getters.dataTunings.guitar;
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

            // auto-select standard tuning on launch
            if (tuning === "standard" && tonality === "e") {
              this.tuning = tuning;
              this.tonality = tonality.toUpperCase();
            }
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
</style>