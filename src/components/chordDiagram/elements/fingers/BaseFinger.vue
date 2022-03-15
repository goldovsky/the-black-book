<template>
  <svg viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="49" stroke="var(--diagram-finger)" fill="var(--diagram-finger)" />
    <text class="fingerLabel" x="50" y="70">
      {{ label }}
    </text>
  </svg>
</template>

<script>
export default {
  props: ["label"],
};
</script>
<style scoped>
.fingerLabel {
  fill: white;
  font-size: 65px;
  font-weight: 500;
  text-anchor: middle;
}
/* .interval1 {} */
/* .interval2 {} */
/* .interval3 {} */
/* .interval4 {} */
/* .interval5 {} */
/* .interval6 {} */
/* .interval7 {} */
/* .interval8 {} */
/* .interval9 {} */
/* .interval10 {} */
/* .interval11 {} */
/* .interval12 {} */
</style>
