<template>
  <div class="cardsettings">
    <h1>Settings</h1>
    <base-card>
      <h2>Instrument</h2>
      <ul>
        <li>
          <base-button
            :mode="{ flat: !switchToBass }"
            @click="switchInstrumentToBass(true)"
            >Bass</base-button
          >
          <base-button
            :mode="{ flat: switchToBass }"
            @click="switchInstrumentToBass(false)"
            >Guitar</base-button
          >
        </li>
        <li>
          <div>nbStrings |</div>
        </li>
        <li>Tuning | Standard | E</li>
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
 */
export default {
  data() {
    return {
      darkMode: null,
      leftDexterity: null,
      switchToBass: null,
    };
  },
  name: "ViewSettings",
  created() {
    this.darkMode = this.$store.getters.darkMode;
    this.leftDexterity = this.$store.getters.leftDexterity;
    this.switchToBass = this.$store.getters.switchToBass;
  },
  methods: {
    switchTheme() {
      this.$store.dispatch("switchTheme");
    },
    switchDexterity() {
      this.$store.dispatch("switchDexterity");
    },
    switchInstrumentToBass(s) {
      this.$store.dispatch({
        type: "switchToBass",
        value: s,
      });
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