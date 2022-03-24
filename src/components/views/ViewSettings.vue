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
          ></base-input-number>
        </li>
        <li>
          <!-- @3 -->
          <div>Tuning</div>
          <select v-model="tuning">
            <option
              v-for="optionTuning in availableTunings"
              :key="optionTuning"
            >
              {{ optionTuning }}
            </option>
          </select>
          <!-- @4 -->
          <div>In</div>
          <select v-model="tonality.note">
            <option
              v-for="optionTonality in availableTonalities"
              :key="optionTonality"
            >
              {{ optionTonality }}
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
      tonality: {
        note: "", // e.g. Eb
        shift: 0, // e.g. -1
      },
      // scoped variables
      availableTunings: ["tuning A", "tuning B"],
      availableTonalities: ["E", "Eb"],
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
    updateNbStrings(numberValue) {
      this.$store.dispatch({
        type: "updateNbStrings",
        value: numberValue,
      });
    },
    loadAvailableTunings() {
      // todo build tuning
      console.log("loadAvailableTunings");
      //const guitarTunings = this.$store.getters.dataTunings.guitar;
      //console.log(guitarTunings);
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