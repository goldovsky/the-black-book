<template>
   <select v-model="selectedOption">
            <option v-for="(value, key) in options" :key="key">
              {{ key }}
            </option>
          </select>
</template>

<script>
export default {
  props: {
    options : {
      type: Array,
      required: true
    }
  },
  data() {
      return {
          selectedOption: null
      }
  }
};
</script>

<style>

</style>