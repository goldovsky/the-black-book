<template>
  <!-- <select v-model="currentValue">
    <option
      v-for="(value, index) in values"
      :key="value"
      :value="value"
      v-bind:selected="index === 0"
    >
      {{ value }}
    </option>
  </select> -->
  <div>
    <div class="menu">
      <div class="title" @click="toggleDropdown">
        {{ currentValue }}
        <div class="arrow" :class="{ gone: dropdownclassdown }"></div>
      </div>
      <!-- :style="{ overflow: dropdownclassdown ? 'auto' : 'hidden' }" -->
      <div
        class="dropdown"
        :class="{ down: dropdownclassdown }"
      >
        <p v-for="value in values" :key="value" @click="setValue(value)">{{ value }}</p>
      </div>
    </div>
    <div class="dropdowntitle">Type</div>
  </div>
</template>

<script>
/**
 * TODO
 * Do it from scratch
 * - source : https://codetea.com/pretty-dropdown-menu/
 */
export default {
  props: ["values"],
  emits: ["dropdownupdate"],
  data() {
    return {
      currentValue: null,
      dropdownclassdown: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownclassdown = !this.dropdownclassdown;
    },
    setValue(val) {
      this.currentValue = val;
      this.$emit('dropdownupdate', val)
      this.toggleDropdown();
    }
  },
  created() {
    this.currentValue = this.values[0];
  },
};
</script>

<style scoped>
@import "https://fonts.googleapis.com/css?family=Montserrat";
body {
  background: #ff7f50;
  font-family: "Montserrat", sans-serif;
}
.menu {
  width: 260px;
  margin: 60px auto 0;
  cursor: pointer;
}
.title {
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  padding: 14px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  position: relative;
  color: #505050;
}
span {
  float: right;
  font-size: 18px !important;
}
.dropdown {
  width: 100%;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
  color: #505050;
  margin-top: 24px;
  max-height: 0;
  overflow: hidden;
  transition: all 0.5s;
}
.down {
  /* TODO reduce and une scroll instead */
  /* max-height: 150px; */
  max-height: fit-content;
}
.arrow {
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #fff;
  position: absolute;
  right: 20px;
  bottom: -24px;
  display: none;
}
.arrow.gone {
  display: block;
}
p {
  padding: 15px 14px;
  margin: 0;
  transition: all 0.1s;
}
p:hover {
  background: coral;
  transform: scale(1.05);
  color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}

.dropdowntitle {
  font-weight: 500;
}
</style>