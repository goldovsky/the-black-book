<template>
  <div>
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
    <base-card>
      <tonal-tonal v-if="display.tonal" />
      <tonal-notes v-if="display.notes" />
      <tonal-intervals v-if="display.intervals" />
      <tonal-scales v-if="display.scales" />
      <tonal-chords v-if="display.chords" />
      <tonal-keys v-if="display.keys" />
    </base-card>
  </div>
</template>

<script>
/**
 * TODO
 * do a component for thefakenavbar
 */
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
        this.display[key] = key === val ? true : false;
      });
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