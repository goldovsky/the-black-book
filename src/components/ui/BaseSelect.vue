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
    },
    initialValue: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      selectedOption: null,
    };
  },
  watch: {
    initialValue(val) {
      this.selectedOption = val;
    },
    selectedOption() {
      this.$emit("select", this.selectedOption);
    },
  },
  beforeMount() {
      if (this.initialValue !== undefined) {
          this.selectedOption = this.initialValue;
      } else if (Object.keys(this.options).length > 0) {
      this.selectedOption = this.valueInsteadOfKey ? this.options[0] : Object.keys(this.options)[0];
    }
  },
};
</script>

<style>
</style>