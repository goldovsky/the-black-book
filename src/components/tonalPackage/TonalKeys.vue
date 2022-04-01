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
//import tonal from '@goldovsky/tonal';
//import tonal from './../../../node_modules/@goldovsky/tonal/packages/tonal/index';
export default {
  data() {
    return {
      // api: {key: tonal.key},
      // note: 'B',
      // id: 'major',
      // tonic: tonal.note.pc(this.note),
      // keyName: this.tonic + " " + this.name,
      // props: tonal.key.props(this.keyName),
      // major: tonal.key.relative("major", this.keyName),
      // notes: this.props.intervals.map(tonal.transpose(this.center(this.tonic)))
    }
  },
  methods: {
    center(pc) {
      return pc ? (pc[0] === "A" || pc[0] === "B" ? pc + 3 : pc + 4) : null;
    }
  }
}
</script>

<style>

</style>