<template>
<!-- TODO 6 change by nmStrings global variable -->
  <line v-if="i === 0 || i === 6 -1"
    class="string"
    :x1="x"
    y1="0"
    :x2="x"
    y2="95"
    :style="{ strokeWidth: strokeWidth }"
  />
  <line v-else
    class="string"
    :x1="x"
    y1="0"
    :x2="x"
    y2="99"
    :style="{ strokeWidth: strokeWidth }"
  />
</template>

<script>
export default {
  props: ["i"],
  computed: {
    x() {
      return this.$store.state.chordDiagramWidth * this.i;
    },
    strokeWidth() {
        const standardStrokeWith = 0.5;
        
      // todo get leftDexterity store data
      const notRealLeftDexterity = false;
      const calculatedWidth = notRealLeftDexterity
        ? (1 / (this.i + 1)) * 2
        : (this.i + 1) * 2;

      // todo 2 add option in store data to not differenciate the string size
      const notRealActivateStringSize = false;
      return notRealActivateStringSize ? calculatedWidth : standardStrokeWith;
    //   return (1 / (this.i + 1)) * 2;
    },
  },
};
</script>

<style>
.string {
  stroke: black;
  /* stroke-width: 0.5; */
  /* stroke-dasharray: 1, 0.2; */
}
</style>

