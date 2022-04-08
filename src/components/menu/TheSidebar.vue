<template>
  <link
    href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
    rel="stylesheet"
  />
  <div class="sidebar" :class="{open: sideBarOpened}">
    <div class="logo-details" @click="openMenu">
      <img class="logo-png" src="./../../assets/images/blackPickIcon.png"> 
      <div class="logo_name">{{ display.appTitle }}</div>
      <i class="bx" :class="iconMenu" id="btn"></i>
    </div>
    <ul class="nav-list">
      <li>
        <a href="#">
          <router-link to="/home">
            <i class="bx bx-home"></i>
            <span class="links_name">Home</span>
          </router-link>
        </a>
        <span class="tooltip">Home</span>
      </li>
      <li>
        <a href="#">
          <router-link to="/chordsdiagrams">
            <i class="bx bx-abacus"></i>
            <span class="links_name">Chords Diagrams</span>
          </router-link>
        </a>
        <span class="tooltip">Chords Diagrams</span>
      </li>
      <li>
        <a href="#">
          <router-link to="/fretboard">
            <i class="bx bx-chalkboard"></i>
            <span class="links_name">Fretboard</span>
          </router-link>
        </a>
        <span class="tooltip">Fretboard</span>
      </li>
      <li>
        <a href="#">
          <router-link to="/metronome">
            <i class="bx bx-tachometer"></i>
            <span class="links_name">Metronome</span>
          </router-link>
        </a>
        <span class="tooltip">Metronome</span>
      </li>
       <li>
        <a href="#">
          <router-link to="/playback">
            <i class="bx bx-equalizer"></i>
            <span class="links_name">Playback</span>
          </router-link>
        </a>
        <span class="tooltip">Playback</span>
      </li>
      <li>
        <a href="#">
          <router-link to="/signalchainsketches">
            <i class="bx bx-notepad"></i>
            <span class="links_name">Signal Chain Sketches</span>
          </router-link>
        </a>
        <span class="tooltip">Signal Chain Sketches</span>
      </li>
      <li>
        <a href="#">
          <router-link to="/tonalpackage">
            <i class="bx bx-package"></i>
            <span class="links_name">Tonal Package</span>
          </router-link>
        </a>
        <span class="tooltip">Tonal Package</span>
      </li>
      <li>
        <a href="#">
          <router-link to="/sandbox">
            <i class='bx bx-meteor'></i>
            <span class="links_name">Sandbox</span>
          </router-link>
        </a>
        <span class="tooltip">Sandbox</span>
      </li>
      <li>
        <a href="#">
          <router-link to="/settings">
            <i class="bx bx-cog"></i>
            <span class="links_name">Settings</span>
          </router-link>
        </a>
        <span class="tooltip">Setting</span>
      </li>
    </ul>
  </div>
  <section class="home-section">
    <slot> </slot>
  </section>
</template>

<script>
/**
 * TODO
 * - Cleanup unused CSS properties
 * - Modify generic Icons to definitive ones
 * good icons : hive, atom, brain, box, chalkboard, meteor
 */
export default {
  data() {
    return {
      sideBarOpened: false,
    };
  },
  computed: {
      iconMenu() {
          return this.sideBarOpened ? 'bx-menu-alt-right' : 'bx-menu';
      },
      display() {
        return this.$store.getters.display;
      }
  },
  methods: {
      openMenu() {
          this.sideBarOpened = !this.sideBarOpened;
      }
  },
};
</script>

<style scoped>
/* Google Font Link */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 78px;
  background: var(--sidebar-background);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 6px 14px;
  z-index: 99;
  transition: all 0.5s ease;

  overflow-y:scroll;

}
.sidebar::-webkit-scrollbar {
  display: none;
}

.sidebar.open {
  width: 250px;
}
.sidebar .logo-details {
  height: 60px;
  display: flex;
  align-items: center;
  position: relative;
}
.logo-png {
  height: 54px;
  display: flex;
  align-items: center;
  position: relative;
}
.sidebar .logo-details .icon {
  opacity: 0;
  transition: all 0.5s ease;
}
.sidebar .logo-details .logo_name {
  color: #fff;
  font-size: 17px;
  font-weight: 600;
  opacity: 0;
  transition: all 0.5s ease;
}
.sidebar.open .logo-details .icon,
.sidebar.open .logo-details .logo_name {
  opacity: 1;
}
.sidebar .logo-details #btn {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  font-size: 22px;
  transition: all 0.4s ease;
  font-size: 23px;
  text-align: center;
  cursor: pointer;
  transition: all 0.5s ease;
}
.sidebar.open .logo-details #btn {
  text-align: right;
}
.sidebar i {
  color: #fff;
  height: 60px;
  min-width: 50px;
  font-size: 28px;
  text-align: center;
  line-height: 60px;
}
.sidebar .nav-list {
  margin-top: 20px;
}
.sidebar li {
  position: relative;
  margin: 8px 0;
  list-style: none;
}
.sidebar li .tooltip {
  position: absolute;
  top: -20px;
  left: calc(100% + 15px);
  z-index: 3;
  background: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 400;
  opacity: 0;
  white-space: nowrap;
  pointer-events: none;
  transition: 0s;
}
.sidebar li:hover .tooltip {
  opacity: 1;
  pointer-events: auto;
  transition: all 0.4s ease;
  top: 50%;
  transform: translateY(-50%);
}
.sidebar.open li .tooltip {
  display: none;
}
.sidebar input {
  font-size: 15px;
  color: #fff;
  font-weight: 400;
  outline: none;
  height: 50px;
  width: 100%;
  width: 50px;
  border: none;
  border-radius: 12px;
  transition: all 0.5s ease;
  background: #1d1b31;
}
.sidebar.open input {
  padding: 0 20px 0 50px;
  width: 100%;
}
.sidebar .bx-search {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  font-size: 22px;
  background: #1d1b31;
  color: #fff;
}
.sidebar.open .bx-search:hover {
  background: #1d1b31;
  color: #fff;
}
.sidebar .bx-search:hover {
  background: #fff;
  color: #11101d;
}
.sidebar li a {
  display: flex;
  height: 100%;
  width: 100%;
  border-radius: 12px;
  align-items: center;
  text-decoration: none;
  transition: all 0.4s ease;
  background: var(--sidebar-icon);
}
.sidebar li a:hover {
  background: var(--sidebar-icon-hover);
}
.sidebar li a .links_name {
  color: #fff;
  font-size: 15px;
  font-weight: 400;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: 0.4s;
}
.sidebar.open li a .links_name {
  opacity: 1;
  pointer-events: auto;
}
.sidebar li a:hover .links_name,
.sidebar li a:hover i {
  transition: all 0.5s ease;
  color: #11101d;
}
.sidebar li i {
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  border-radius: 12px;
}
.sidebar li.profile {
  position: fixed;
  height: 60px;
  width: 78px;
  left: 0;
  bottom: -8px;
  padding: 10px 14px;
  background: #1d1b31;
  transition: all 0.5s ease;
  overflow: hidden;
}
.sidebar.open li.profile {
  width: 250px;
}
.sidebar li .profile-details {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}
.sidebar li img {
  height: 45px;
  width: 45px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 10px;
}
.sidebar li.profile .name,
.sidebar li.profile .job {
  font-size: 15px;
  font-weight: 400;
  color: #fff;
  white-space: nowrap;
}
.sidebar li.profile .job {
  font-size: 12px;
}
.sidebar .profile #log_out {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  background: #1d1b31;
  width: 100%;
  height: 60px;
  line-height: 60px;
  border-radius: 0px;
  transition: all 0.5s ease;
}
.sidebar.open .profile #log_out {
  width: 50px;
  background: none;
}
.home-section {
  position: relative;
  /* background: #e4e9f7; */
  min-height: 100vh;
  top: 0;
  left: 78px;
  width: calc(100% - 78px);
  transition: all 0.5s ease;
  z-index: 2;
}
.sidebar.open ~ .home-section {
  left: 250px;
  width: calc(100% - 250px);
}
.home-section .text {
  display: inline-block;
  color: #11101d;
  font-size: 25px;
  font-weight: 500;
  margin: 18px;
}
@media (max-width: 420px) {
  .sidebar li .tooltip {
    display: none;
  }
}
</style>