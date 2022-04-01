<template>
  <h1>Tonal Package</h1>
  <div class="fakeNav">
    <a
      v-for="(screenValue, screenKey) in display"
      :key="screenKey"
      :class="{ fakeNavActive: this.display[screenKey] }"
      @click="switchScreen(screenKey)"
      >{{ screenKey }}</a
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      display: {
        tonal: false,
        notes: false,
        intervals: false,
        scales: false,
        chords: false,
        keys: true,
      },
    };
  },
  methods: {
    switchScreen(val) {
      Object.keys(this.display).forEach((key) => {
        this.display[key] = false;
      });
      this.display[val] = true;
    },
  },
  computed: {},
};
</script>

<style scoped>
.fakeNav {
  font-weight: 700;
}
.fakeNav a {
  margin: 10px;
}
.fakeNavActive {
  color: var(--secondary-color);
}
</style>