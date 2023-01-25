<template>
    <!-- SINGLE FINGER -->
    <svg v-for="(fret, index) in chord.frets" :key="index" :string="index" :fret="chord['frets'][index]" :x="this.XforMainSVG(index)" :y="YforMainSVG(index)" :width="svgWidth">                
        <svg viewBox="0 0 100 100" v-if="fret != null && !isIncludedInABar(index)" :x="0.5" width="13" height="13" >
            <circle cx="50" cy="50" r="49" stroke="var(--diagram-finger)" fill="var(--diagram-finger)" />
            <text class="fingerLabel" x="50" y="70">
                {{ chord.fingers[index] }}
            </text>
        </svg>
    </svg>
    
    <!-- BARRED FINGER -->
    <!-- TODO  
        - : y  de barredIndex
        - : add barred.label at the center of the rectangle via <text>
        -->
        <!-- :width="isIncludedInABar(index) ? svgBarredWidth + this.barWidth() : svgWidth" -->
    <svg v-for="(barred, index) in barredFingering" :key="index" class="BarredFingerMain" width="100" :x="XforBarredSVG(barred.string)">
        <svg viewBox="0 0 100 100" :y="YforBarredSVG(barred.fret)" width="100" height="100" fill="var(--diagram-finger)">
            <rect x="0" y="0" :width="barWidth(barred.string)" height="13" rx="5" ry="5" />

            <!-- TODO  -->
            <!-- :x="(barred.string[1] - barred.string[0]) * 10 + 5" y="50" -->
            <text class="barredLabel" :x="xforBarredLabel(barred.string)" y="10">{{ barred.label }}</text>

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
        this.buildBarredFingering();
    },
    methods: {
        isIncludedInABar(fingerIndex) {
            let included = this.chord['fingers']
            .filter((v) => (v === this.chord['fingers'][fingerIndex]))
            .length  > 1;
            return included;
        },
        buildBarredFingering() {
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
                        if(currentLoop && idx !== Number(reverseIndex) && self.chord.fingers[Number(reverseIndex)] !== null && self.chord.fingers[Number(reverseIndex)] === finger) {
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
        barWidth(barredString) {
            let valeForSVGWidth = 16;
            let length = (barredString[1] - barredString[0] + 1);
            return valeForSVGWidth * length;
        },
        XforMainSVG(string) {
            return this.rightDexterity ? 
            // RIGHT HANDED - we use the opposite string from what 'string' is
            -7 + string * this.$store.getters.display.diagrams.chords.width :
            // LEFT HANDED
            -7 + (this.instrument.strings - string - this.$data.indexArrayToStringOffset) * this.$store.getters.display.diagrams.chords.width;
        },
        YforMainSVG(index) {
            return (this.chord['frets'][index] - this.$data.indexArrayToStringOffset) * 20 + 3.5;
        },
        YforBarredSVG(barredFret) {
            let yValues = [0, 2.5, 23, 43.5, 63.5, 84];
            return yValues[barredFret]; // this.YforMainSVG(barredFret)*barredFret/5 - 9;
        },
        XforBarredSVG(barredString) {
            let addSymetry =  barredString[1] - this.instrument.strings + 1;
            let diagramWidth = this.$store.getters.display.diagrams.chords.width;
            let barredStringBasedOnDexterity = this.$store.getters.instrument.leftDominantHand ? 
            // LEFT HANDED
            barredString[0] - 1 :
            // RIGHT HANDED - we use the opposite string from what 'string' is
            (barredString[1] + addSymetry);
            return 9 + barredStringBasedOnDexterity * diagramWidth;
            

            /*
            let barredLength = (barredString[1] - barredString[0] + 1);
            console.log("barredLength: " + barredLength);
            let leftValues = [0, 0, 25, -7, -7, -7, -7];
            let rightValues = [0, 0, 25, 40, 25, 7, -7];
            return this.$store.getters.instrument.leftDominantHand ? 
            // LEFT HANDED
            leftValues[barredLength] :
            // RIGHT HANDED - we use the opposite string from what 'string' is
            rightValues[barredLength] + addSymetry ;
            */
        },
        xforBarredLabel(barredString) {
            let xValues = [0, 0, 15, 23, 31.5, 39, 47];
            let barredLength = (barredString[1] - barredString[0] + 1);
            return xValues[barredLength];
        }
    },
    computed: {
        instrument() {
            return this.$store.getters.instrument;
        },
        rightDexterity() {
            return this.$store.getters.instrument.leftDominantHand;  
        }
    }
};
</script>

<style scoped lang="scss">
/* TODO optimize this */
.fingerLabel {
  fill: var(--diagram-finger-indication);
  font-size: 60px;
  font-weight: 500;
  text-anchor: middle;
}

.barredLabel {
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