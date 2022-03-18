<template>
  <div class="cardsettings">
    <h1>Settings</h1>
    <base-card>
      <h2>Instrument</h2>
      <ul>
        <li>Bass/Guitar</li>
        <li>nbStrings | 6--7--8</li>
        <li>Tuning | Standard | E</li>
        <li>Dexterity | Left/Right</li>
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
    };
  },
  name: "ViewSettings",
  created() {
    this.darkMode = this.$store.getters.darkMode;
  },
  methods: {
    switchTheme() {
      this.$store.dispatch("switchTheme");
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
}

.cardsettings {
  padding: 0rem 3rem 0rem 3rem;
}
</style>