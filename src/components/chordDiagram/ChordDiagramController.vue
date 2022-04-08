<template>
  <h4>Controller</h4>
  <div class="diagramcontrollerparentdiv">
    <base-slider title="Root" :values="root.list" @valueupdate="setRoot"  :inittolastvalue="true"></base-slider>
    <base-dropdown :values="type.list" @dropdownupdate="setType"></base-dropdown>
  </div>

  
</template>

<script>
export default {
  emits: ["chord"],
  data() {
    return {
      chord: {
        selected: null,
        list: [], // extract from database @tuning/nb_strings_x
      },
      root: {
        selected: null,
        list: [], // 6,5,4...
      },
      type: {
        // minor, major....
        selected: null,
        list: [],
      },
    };
  },
  computed: {
    display() {
      return this.$store.getters.display;
    },
    instrument() {
      return this.$store.getters.instrument;
    },
    database() {
      return this.$store.getters.database;
    },
  },
  created() {
    // get data
    this.chord.list =
      this.database.chords["tuning_" + this.instrument.tuning.type][
        "nb_strings_" + this.instrument.strings
      ];

    // get available roots
    for (let item in this.chord.list) {
      this.root.list.push(item.substr(item.length - 1));
    }
    this.root.list = this.root.list.reverse();
    this.root.selected = this.root.list[0];

    // init type
    for (const tp in this.chord.list[
      "root_on_string_" + this.instrument.strings
    ]) {
      this.type.list.push(tp);
    }
    this.type.selected = this.type.list.includes("major")
      ? "major"
      : this.type.list[0];

      // set chord
      this.chord.selected = this.chord.list['root_on_string_' + this.instrument.strings][this.type.selected] // TODO check that once chord structure is done

      // send it to parent
      this.emitChord();
  },
  methods: {
    setType(tp) {
      this.type.selected = tp;
      //...
      this.emitChord();
    },
    setRoot(root) {
      this.root.selected = root;
      //...
      this.emitChord();
    },
    emitChord() {
        this.$emit('chord', this.chord.selected);
    }
  },
};
</script>

<style>
.diagramcontrollerparentdiv {
  display: flex;
  /* flex-direction: column; */
  align-items: end;
  justify-content: space-around;
  margin: auto;
}
</style>