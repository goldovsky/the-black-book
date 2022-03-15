<template>
  <sidebar>
    <router-view></router-view>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  </sidebar>
</template>

<script>
/**
 * * INFORMATION
 *  CSS background via this website!
 * ? https://csshero.org/mesher/
 */
import Sidebar from "./components/menu/TheSidebar.vue";

export default {
  name: "App",
  components: {
    Sidebar,
  },
  mounted() {
    /**
     * NOTE : Use for theme Switching 
     */
    console.log("App.mounted())");
    // set 'app-background' class to body tag
    let bodyElement = document.body;
    bodyElement.classList.add("app-background");

    // check for active theme
    let htmlElement = document.documentElement;
    let theme = localStorage.getItem("theme");

    if (theme === "dark") {
      htmlElement.setAttribute("theme", "dark");
      this.$store.dispatch("switchTheme");
    } else {
      htmlElement.setAttribute("theme", "light");
      this.$store.dispatch("switchTheme");
    }
    // END NOTE
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h1 {
  color: var(--dynamic-h1-color)
}
h2 {
  color: var(--dynamic-h2-color)
}
h3 {
  color: var(--dynamic-h3-color)
}
h4 {
  color: var(--dynamic-h4-color)
}
h5 {
  color: var(--dynamic-h5-color)
}
h6 {
  color: var(--dynamic-h6-color)
}
</style>
