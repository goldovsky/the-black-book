<template>
  <sidebar>
    <router-view></router-view>
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </sidebar>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import Sidebar from './components/menu/TheSidebar.vue'


export default {
  name: 'App',
  components: {
    //HelloWorld,
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
