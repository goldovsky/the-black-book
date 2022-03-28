<template>
  <select v-model="selectedOption">
    <option v-for="(value, key) in options" :key="key">
      {{ valueInsteadOfKey ? value : key }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      required: true,
    },
    valueInsteadOfKey: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      selectedOption: null,
    };
  },
  watch: {
    selectedOption() {
      console.log("selectedOption watcher -> " + this.selectedOption);
      this.$emit("select", this.selectedOption);
    },
  },
  beforeMount() {
    if (Object.keys(this.options).length > 0) {
        console.log("gdy gdy gdy")
      this.selectedOption = this.valueInsteadOfKey ? this.options[0] : Object.keys(this.options)[0];
    }
  },
};
</script>

<style>
</style>