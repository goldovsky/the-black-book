<template>
  <h1>Keys</h1>
  <div className="Key">
    <h6>key</h6>
    <!-- <h1>{{keyName}}</h1> -->

    <div className="row">
      <div className="column column-5">
        <p>
          <label>Accidentals:</label>
          <!-- {{props.acc}}&nbsp; -->
          <label>Altered notes:</label>
          <!-- {{Key.alteredNotes(keyName).join(" ")}} -->
        </p>
      </div>
      <div className="column column-5">
        <p>
          <label>Intervals:</label>
          <!-- {{props.intervals.join(" ")}} -->
          <label>Scale:</label>
          <!-- {{props.scale.join(" ")}} -->
        </p>
      </div>
    </div>

    <div className="KeyScale">
      <h3>Scale</h3>
      <!-- <Score keyTonic={Key.props(major).tonic} notes={notes} /> -->
    </div>
    <!-- <RelatedKeys keyName={keyName} /> -->
    <!-- <KeyChords keyName={keyName} /> -->

    <h3>Code examples</h3>
    <!-- <Code lines={[`Tonal.Scale.props("${keyName}") // => ${json(props)}`]} /> -->
  </div>
</template>

<script>
/**
 * TODO
 * Use goldovsky-tonal instead of @tonaljs
 */
//import { Note, Interval, Key } from "@tonaljs/tonal";
export default {
  data() {
    return {
      //api: {key: Key},
      //note: 'B',
      //id: 'major',
      //tonic: Tonal.note.pc(this.note),
      // keyName: this.tonic + " " + this.name,
      //props: Key.props(this.keyName),
      //major: Key.relative("major", this.keyName),
      //notes: Interval.map(Tonal.transpose(this.center(this.tonic)))
    };
  },
  methods: {
    center(pc) {
      return pc ? (pc[0] === "A" || pc[0] === "B" ? pc + 3 : pc + 4) : null;
    },
  },
};
</script>

<style>
</style>