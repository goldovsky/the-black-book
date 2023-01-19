<template>
  <div>
    <h1>Diagram</h1>
    <div class="chorddiagramparentdiv">
        <chord-diagram
          name="G"
          nut-position="0"
          :chord="gChordNotes"
        ></chord-diagram>
    </div>

    <!-- <h3>Guitar Chord Editor</h3>
    <div style="width: 250px; height: 250px">
      TODO
      <guitar-chord-editor>
            </guitar-chord-editor>
    </div> -->

    <base-card>
      <chord-diagram-controller @chord="setChord"/>
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

export default {
  components: {
    ChordDiagram,
    ChordDiagramController,
  },
  data() {
    return {
      chord: {},
      // Inspiration from vue-guitar-chord
      // TODO : change chord data to this :
      // "fret: 0": open string
      // "fret: null": string not played
      // "interval": used to change shape from circle to intervalBasedShapes
      // switch strings from starting to 0 to starting to 1
      gMajor: [
        { string: 1, fret: 3, finger: 2, interval: 1 },
        { string: 2, fret: 2, finger: 1, interval: 5 },
        { string: 3, fret: 0, interval: 7 },
        { string: 4, fret: 0, interval: 1 },
        { string: 5, fret: 3, finger: 3, interval: 7 },
        { string: 6, fret: 3, finger: 4, interval: 1 },
      ],
      gChordNotes: [
        { string: 0, fret: 3, finger: 2 },
        { string: 1, fret: 2, finger: 1 },
        { string: 4, fret: 3, finger: 3 },
        { string: 5, fret: 3, finger: 4 },
      ],
      aChordNotes: [{ string: [2, 3, 4], fret: 2, finger: 1 }],
      dChordNotes: [
        { string: [3, 4, 5], fret: 2, finger: 1 },
        { string: 4, fret: 3, finger: 2 },
      ],
    };
  },
  methods: {
    setChord(chord) {
      this.chord = chord;
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
