<template>
  <sidebar>
    <router-view></router-view>
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
    // set 'app-background' class to body tag
    let bodyElement = document.body;
    bodyElement.classList.add("app-background");

    // check for active theme
    let htmlElement = document.documentElement;
    let storeDarkMode = this.$store.getters.darkMode;

    htmlElement.setAttribute("theme", storeDarkMode ? "dark" : "light");
    // END NOTE
  }
};
</script>

<style>
/* All of style are in ./assets/css/style.scss */
</style>
