export default {
  brand: "Digitech",
  model: "Whammy",
  settings: {
    classic_chord_switch: ["Classsic", "Chords"],
    selector_knob: {
      harmony_mode: [
        {
          pedal_up: "-1 Octave",
          pedal_down: "+1 Octave",
        },
        {
          pedal_up: "-5th",
          pedal_down: "-4th",
        },
        {
          pedal_up: "-4th",
          pedal_down: "-3rd",
        },
        {
          pedal_up: "+5th",
          pedal_down: "+7th",
        },
        {
          pedal_up: "+5th",
          pedal_down: "+6th",
        },
        {
          pedal_up: "+4th",
          pedal_down: "+5th",
        },
        {
          pedal_up: "+3rd",
          pedal_down: "+4th",
        },
        {
          pedal_up: "+b3rd",
          pedal_down: "+3rd",
        },
        {
          pedal_up: "+2nd",
          pedal_down: "+3rd",
        },
      ],
      whammy_mode: [
        "+2 Octaves",
        "+1 Octave",
        "+5th",
        "+4th",
        "-2nd",
        "-4th",
        "-5th",
        "-1 Octave",
        "-2 Octaves",
        "Dive Bomb",
      ],
      detune_mode: ["Shallow", "Deep"],
    },
  },
  comments: {
    title: "",
    description: "",
  },
};
