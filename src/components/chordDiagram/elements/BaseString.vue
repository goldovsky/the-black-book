<template>
  <line
    class="string"
    :x1="stringX"
    y1="0"
    :x2="stringX"
    :y2="i === 0 || i === nbStrings - 1 ? 95 : 99"
    :style="{ strokeWidth: strokeWidth }"
  />
</template>

<script>
/**
 * TODO
 * @1)  add option in store data to not differenciate the string size
 * - if we differenciate the string size, calculate the placement for the last string to match the width of the string
 */
export default {
  props: ["i", "nbStrings", "leftDexterity"],
  computed: {
    stringX() {
      return this.$store.state.chordDiagramWidth * this.i;
    },
    strokeWidth() {
      // @1
      const activateDifferentStringSize = false;
      if (!activateDifferentStringSize) {
        return 0.5;
      }

      // return calculated Width based on the selected dexterity
      return this.leftDexterity ? (1 / (this.i + 1)) * 2 : (this.i + 1) * 2;
    },
  },
};
</script>

<style>
.string {
  stroke: var(--diagram-string);
  /* stroke-width: 0.5; */
  /* stroke-dasharray: 1, 0.2; */
}
</style>

