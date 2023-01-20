<template>
    <!-- BASE FINGERING -->
    <!-- :width="isBar(index) ? svgBarredWidth + this.barWidth() : svgWidth" -->
    <svg v-for="(fingers, index) in chord.frets" :key="index" :string="index" :fret="chord['frets'][index]" :x="this.calculatedX(index)-2" :y="calculatedY(index)-1.5" :width="svgWidth">
        <!-- BARRED FINGER -->
        <!-- <barred-finger :y="0 + 1.5" :x="0 + 1.5" v-if="isBar" :label="finger"
                :width="barWidth" height="10"/> -->
                
        <!-- SINGLE FINGER -->
        <!-- v-if="fingers != null && (not part of barred chord)" -->
        <svg viewBox="0 0 100 100" v-if="fingers != null" :x="0+0.5" width="13" height="13" >
            <circle cx="50" cy="50" r="49" stroke="var(--diagram-finger)" fill="var(--diagram-finger)" />
            <text class="fingerLabel" x="50" y="70">
            {{ chord['fingers'][index] }}
            </text>
        </svg>
    </svg>
</template>

<script>
/**
 * TODO merge barred-finger here
 */
// import BarredFinger from './fingers/BarredFinger.vue';

export default {
    components: {
        // BarredFinger,
    },
    props: [
        'chord'
    ],
    data() {
        return {
            svgBarredWidth : 20,
            svgWidth: 18
        };
    },
    methods: {
        isBar(index) {
            return this.chord['fingers'].filter((v) => (v === index)).length > 1;
        },
        barWidth() {
            return (15.5 + this.string.length/2) * this.string.length;
            // return (15.5 + this.string.length/2) * this.string.length;
        },
        calculatedX(string) {
            return this.rightDexterity ? 
            // RIGHT HANDED - we use the opposite string from what 'string' is
            -5 + (this.instrument.strings - string - 1) * this.$store.getters.display.diagrams.chords.width : 
            // LEFT HANDED
            -5 + string * this.$store.getters.display.diagrams.chords.width;
        },
        calculatedY(index) {
            return (this.chord['frets'][index] - 1) * 20 + 5;
        },
    },
    computed: {
        instrument() {
            return this.$store.getters.instrument;
        },
        rightDexterity() {
            return this.$store.getters.leftDominantHand;  
        }
    }
};
</script>

<style scoped>
.fingerLabel {
  fill: var(--diagram-finger-indication);
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