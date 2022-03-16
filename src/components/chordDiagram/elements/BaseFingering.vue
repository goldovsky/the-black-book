<template>
<!-- TODO did change position with (x)-2, (y)-1 and with/height at 13 instead of 10 -->
    <svg :x="x-2" :y="y-1.5" :width="isBar ? barWidth + 20 : 18">
        <barred-finger :y="0 + 1.5" :x="0 + 1.5" v-if="isBar" :label="finger"
            :width="barWidth" height="10"/>
        <base-finger :x="0+0.5" v-else width="13" height="13" :label="finger"/>
    </svg>
</template>

<script>
/**
 * TODO
 * Merge base finger and base fingering here
 */
import BarredFinger from './fingers/BarredFinger.vue';
import BaseFinger from './fingers/BaseFinger.vue';

export default {
    components: {
        BarredFinger,
        BaseFinger,
    },
    props: [
        'string',
        'fret',
        'finger',
    ],
    computed: {
        isBar() {
            return Array.isArray(this.string);
        },

        barWidth() {
            return (15.5 + this.string.length/2) * this.string.length;
        },

        x () {
            let string = this.isBar
                ? this.string[0]
                : this.string;
            return -5 + string * this.$store.state.chordDiagramWidth;
        },

        y () {
            return (this.fret - 1) * 20 + 5;
        },
    }
};
</script>
