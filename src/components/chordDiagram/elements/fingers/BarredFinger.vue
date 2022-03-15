<template>
<!-- TODO this is not wide enough : it doesn't align with frettednotes -->
  <svg :width="width" :height="height"  stroke="var(--diagram-finger)" fill="var(--diagram-finger)">
    <rect x="0" y="0" :width="width - 7" :height="height" rx="5" ry="5" />

    <base-finger
      :x="this.width / 2 - 9"
      y="0"
      width="10"
      height="10"
      :label="label"
    />
  </svg>
</template>

<script>
/**
 * TODO
 * Check why labl on barreFinger is smaller than the regural
 */
import BaseFinger from "./BaseFinger.vue";

export default {
  components: {
    BaseFinger,
  },
  props: ["label", "width", "height"],
};
</script>

<style scoped>
</style>
