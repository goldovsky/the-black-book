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
import Sidebar from './components/menu/TheSidebar.vue'


export default {
  name: 'App',
  components: {
    Sidebar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
