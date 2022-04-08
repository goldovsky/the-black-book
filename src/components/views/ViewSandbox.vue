<template>
  <div>
    <h1>Sandbox/Tools</h1>

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
      <div v-if="display.carousel">
        <h2>Carousel For displaying Chord Diagrams</h2>
        <a href="https://wlada.github.io/vue-carousel-3d/">vue-carousel-3d</a>
        <br />
        <a href="https://codepen.io/EJ92/pen/BaBvqOK?editors=1010">EJ92</a>
      </div>
      <string-tension v-if="display.stringtension" />
    </base-card>
  </div>
</template>

<script>
/**
 * TODO
 * - Import a carousel for Chord Diagram?
 * - do a similar nav bar from tonal package
 */
export default {
  data() {
    return {
      display: {
        carousel: true,
        stringtension: false,
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