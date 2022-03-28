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
      this.selectedOption = this.valueInsteadOfKey
        ? this.options[0]
        : Object.keys(this.options)[0];
    }
  },
};
</script>

<style scoped>
select {
  font-weight: bold;
  background-color: white;
  color: gray;
  padding: 10px;
  cursor: pointer;
  border: none;
  border-radius: 20px;
  appearance: none;
  outline: 0;
  text-align: center;
}

option {
  font-weight: bold;
  /* text-align: left; */
  color: var(--select-color-active);
  background-color: var(--select-background-color-active);
}

select:hover,
select:active {
  color: var(--select-color-active);
  background-color: var(--select-background-color-active);
}
</style>