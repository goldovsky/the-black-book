<template>
  <div>
    <h1>Diagram</h1>
    <div class="chorddiagramparentdiv">
        <chord-diagram
          :name="chordName"
          nut-position="0"
          :chord="chord"
        ></chord-diagram>
    </div>
    <!-- TODO nut position -->
    <!-- TODO chord name -->

    <!-- <h3>Guitar Chord Editor</h3>
    <div style="width: 250px; height: 250px">
      TODO
      <guitar-chord-editor>
            </guitar-chord-editor>
    </div> -->

    <base-card>
      <chord-diagram-controller />
      <!-- <chord-diagram-controller @chord="setChord"/> -->
    </base-card>
  </div>
</template>

<script>
/**
 * TODO
 * Either do a caroussel or a list of cards...
 */
import ChordDiagram from "../chordDiagram/ChordDiagram.vue";
import ChordDiagramController from "../chordDiagram/ChordDiagramController.vue";
import DATA_CHORDS from './../../database/chords_diagrams.js';

export default {
  components: {
    ChordDiagram,
    ChordDiagramController,
  },
  data() {
    return {
      dataChords: DATA_CHORDS,
      chord: {},
      chordName: ""
    };
  },
  created() {
    // F
    this.setChord(this.dataChords['tuning_standard']['nb_strings_6']['root_on_string_6']['major']['f']);
    // G
    // this.setChord(this.dataChords['tuning_standard']['nb_strings_6']['root_on_string_6']['major']['caged_g']);
    // A
    // this.setChord(this.dataChords['tuning_standard']['nb_strings_6']['root_on_string_5']['major']['caged_a']);
    // Asus4
    // this.setChord(this.dataChords['tuning_standard']['nb_strings_6']['root_on_string_5']['major']['caged_a_sus_4']);
    
    this.setChordName('Asus4');
  },
  methods: {
    setChord(chord) {
      this.chord = chord;
    },
    setChordName(name) {
      this.chordName = name;
    }
  }
};
</script>

<style scoped>
.chorddiagramcard {
  width: fit-content;
}
.chorddiagramparentdiv {
  width: 250px;
  margin: auto;
}
</style>
