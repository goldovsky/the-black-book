<template>
<!-- TODO this is not wide enough : it doesn't align with frettednotes -->
  <svg :width="width" :height="height"  stroke="var(--diagram-finger)" fill="var(--diagram-finger)">
    <rect x="0" y="0" :width="width - 7" :height="height" rx="5" ry="5" />

    <svg viewBox="0 0 100 100" :x="this.width / 2 - 9" y="0" width="10" height="10" :label="label" >
        <circle cx="50" cy="50" r="49" stroke="var(--diagram-finger)" fill="var(--diagram-finger)" />
        <text class="fingerLabel" x="50" y="70">
          {{ label }}
        </text>
    </svg>
  </svg>
</template>

<script>
/**
 * TODO
 * Check why label on barreFinger is smaller than the regural
 * the round part isn't perfect, specially on the left side
 */

export default {
  props: ["label", "width", "height"],
};
</script>

<style scoped>
</style>
