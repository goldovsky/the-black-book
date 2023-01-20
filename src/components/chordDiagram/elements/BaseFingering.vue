<template>
    <!-- BASE FINGERING -->
    <svg v-for="(fingers, index) in chord.frets" :key="index" :string="index" :fret="chord['frets'][index]" :x="this.calculatedX(index)-2" :y="calculatedY(index)-1.5" :width="isBar(index) ? svgBarredWidth + this.barWidth() : svgWidth">
        <!-- BARRED FINGER -->
        <!-- <barred-finger :y="0 + 1.5" :x="0 + 1.5" v-if="isBar" :label="finger"
                :width="barWidth" height="10"/> -->
                
        <!-- SINGLE FINGER -->
        <base-finger v-if="fingers != null" :x="0+0.5" width="13" height="13" :label="chord['fingers'][index]"/>
    </svg>
</template>

<script>
/**
 * TODO
 * Merge base finger and base fingering here
 */
import BaseFinger from './fingers/BaseFinger.vue';
// import BarredFinger from './fingers/BarredFinger.vue';

export default {
    components: {
        BaseFinger,
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
        },
        calculatedX(string) {
            return -5 + string * this.$store.getters.display.diagrams.chords.width;
        },
        calculatedY(index) {
            return (this.chord['frets'][index] - 1) * 20 + 5;
            // return (this.fret - 1) * 20 + 5;
        }
    }
};
</script>
