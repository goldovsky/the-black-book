<template>
  <svg viewBox="0 0 100 100">
    <!-- Top Diagram | @1-->
    <line v-if="nutline" x1="0" y1="0" :x2="x2" y2="0" class="topDiagram" />

    <!-- Frets -->
    <line x1="0" y1="20" :x2="x2" y2="20" class="fret" />
    <line x1="0" y1="40" :x2="x2" y2="40" class="fret" />
    <line x1="0" y1="60" :x2="x2" y2="60" class="fret" />
    <line x1="0" y1="80" :x2="x2" y2="80" class="fret" />

    <!-- Bottom diagram -->
    <path class="bottomDiagram" :d="bottomDiagramPath"></path>

    <!-- Finger placement -->
    <slot></slot>
  </svg>
</template>

<script>
/**
 * TODO
 * @1) TODO : use his if nut isn't part of the diagram
 */
export default {
  props: ["nutline"],
  data() {
    return {
      x2: 100,
      bottomDiagramPath: null,
    };
  },
  created: function () {
    this.bottomDiagramPath = `M0,94
       q 0,5 5,5
       h70
       q 5,0 5,-5
       q 0,5 -5,5
       v0
       h-70`; // `h90 h-90`  when chordDiagramWidth is at 20
    this.x2 = this.$store.state.chordDiagramWidth * 5;
  },
};
</script>

<style scoped>
.topDiagram {
  stroke: var(--diagram-stroke);
  /* stroke: rgba(0, 0, 0, 0.1); */
  stroke-width: 4;
  stroke-dasharray: 4, 3;
}

.bottomDiagram {
  fill: none;
  stroke: var(--diagram-stroke);
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 0.5;
  /* transition: 0.2s; */
}

.fret {
  stroke: var(--diagram-fret);
  stroke-width: 4;
}
.lastFret {
  stroke: var(--diagram-stroke);
  stroke-width: 0.5;
}
</style>