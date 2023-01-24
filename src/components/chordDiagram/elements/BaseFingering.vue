<template>
    <!-- SINGLE FINGER -->
    <svg v-for="(fret, index) in chord.frets" :key="index" :string="index" :fret="chord['frets'][index]" :x="this.XforMainSVG(index)" :y="YforMainSVG(index)" :width="svgWidth">                
        <!-- <svg viewBox="0 0 100 100" v-if="fret != null && (!isBar(index+indexArrayToStringOffset))" :x="0+0.5" width="13" height="13" >
            <circle cx="50" cy="50" r="49" stroke="var(--diagram-finger)" fill="var(--diagram-finger)" />
            <text class="fingerLabel" x="50" y="70">
                {{ chord.fingers[index] }}
            </text>
        </svg> -->
    </svg>
    
    <!-- BARRED FINGER -->
    <!-- TODO  
        - : y  de barredIndex
        - : add barred.label at the center of the rectangle via <text>
        -->
        <!-- :width="isBar(index) ? svgBarredWidth + this.barWidth() : svgWidth" -->
    <svg v-for="(barred, index) in barredFingering" :key="index" class="BarredFingerMain" :x="this.XforMainSVG(index)" :y="YforMainSVG(index)" width="100">
        <svg viewBox="0 0 100 100" :y="YforBarredSVG(barred.fret)" :x="barred.string[0] +13" width="100" height="100" fill="var(--diagram-finger)">
            <rect x="0" y="40" width="50" height="13" rx="5" ry="5" />

            <!-- TODO  -->
            <svg >
                <text class="fingerLabel" :x="(barred.string[1] - barred.string[0]) * 10 + 5" y="50">
                    {{ barred.label }}
                </text>
            </svg>

        </svg>
    </svg>
</template>

<script>
export default {
    props: [
        'chord'
    ],
    data() {
        return {
            svgBarredWidth : 20,
            svgWidth: 18,
            indexArrayToStringOffset: 1,
            barredFingering: []
        };
    },
    created() {

        // TODO GOAL
        // this.barredFingering = [[2,3], [1.6]];
        this.chord.fingers.forEach((finger, idx) => {
            // used to access chord in the following loop
            let self = this;
            // si ce doigt n'est pas déjà enregistré
            let fingerNotAlreadyRegistered = !this.barredFingering.filter((v) => (v.label === finger)).length  > 0;
            // not null
            if (finger != null && fingerNotAlreadyRegistered) {
                let currentLoop = true;
                // on parcours l'objet finger dans l'autre sens pour trouver la fin
                Object.keys(this.chord.fingers).reverse().forEach(function(reverseIndex) {
                    // si on retrouve le doigt actuellement utilisé et que ce n'est pas le même index
                    if(currentLoop && idx !== reverseIndex && self.chord.fingers[reverseIndex] !== null && self.chord.fingers[reverseIndex] === finger) {
                        let bar = {
                            label: finger,
                            string: [idx, Number(reverseIndex)],
                            fret: self.chord.frets[idx]
                        };
                        
                        self.barredFingering.push(bar);
                        currentLoop = false;
                    }
                });
            }
        });
    },
    methods: {
        isBar(index) {
            let calculateIsBar = this.chord['fingers'].filter((v) => (v === index)).length  > 1;
            return calculateIsBar;
        },
        barLength(finger, index) {
            let length = 0;
            this.chord.fingers.forEach((value, idx) => {
                if (idx >= index) {
                    if(value === finger) {
                        length++;
                    }
                }
            });
            return length;
        },
        XforMainSVG(string) {
            return this.rightDexterity ? 
            // RIGHT HANDED - we use the opposite string from what 'string' is
            -7 + (this.instrument.strings - string - this.$data.indexArrayToStringOffset) * this.$store.getters.display.diagrams.chords.width : 
            // LEFT HANDED
            -7 + string * this.$store.getters.display.diagrams.chords.width;
        },
        YforMainSVG(index) {
            return (this.chord['frets'][index] - this.$data.indexArrayToStringOffset) * 20 + 3.5;
        },
        YforBarredSVG(barredFret) {
            return this.YforMainSVG(barredFret)*barredFret/5 - 9;
        }
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
  font-size: 10px;
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