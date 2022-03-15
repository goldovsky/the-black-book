<template>
  <div class="cardsettings">
    <h1>Settings</h1>
    <base-card>
      <ul>
        <li>Setting 1</li>
        <li>Setting 2</li>
        <li>
          <!-- theme switcher -->
          <input
            type="checkbox"
            id="theme-switch"
            class="theme-switch"
            v-model="darkMode"
          />
          <label for="theme-switch" @click="switchTheme">
            <span v-if="!darkMode">
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
 * - When switching theme, it take a few clicks before being active
 */
export default {
  data() {
    return {
      darkMode: null,
    };
  },
  name: "ViewSettings",
  mounted() {
    this.darkMode = this.$store.getters.darkMode;
  },
  methods: {
    switchTheme() {
      console.log("switch theme!");
      this.$store.dispatch("switchTheme");
      // add/remove class to/from html tag
      let htmlElement = document.documentElement;

      if (this.darkMode) {
        localStorage.setItem("theme", "dark");
        htmlElement.setAttribute("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
        htmlElement.setAttribute("theme", "light");
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
}

.cardsettings {
  padding: 0rem 3rem 0rem 3rem;
}
</style>