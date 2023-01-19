export default {
  brand: "Loco",
  model: "Sensei",
  settings: {
    channels: {
      1: {
        blue_gain: 0,
      },
      2: {
        red_gain: 0,
      },
    },
    dynamic_switch: ['on', 'off'],
    volume: 0,
    clipping_switch: ["Mosfet", "0", "Custom"],
    harmony: 0,
    channel_switch: ["Full Boost", "0", "Bright"],
    zen: 0,
    treble: ["Normal", "Boost", "Cut"],
    bass: ["Normal", "Cut", "Boost"],
    internal_dip_switch: {
      1: false,
      2: false,
      3: false,
      4: false,
    },
    internal_clipping_modules: [
      "Symmetry | SY",
      "Wrecked Asymmetry | WA",
      "Symmetry + Germanium | SG",
      "Scrambled Rat | SR",
    ],
    internal_filter_modules: [
      "DumDum | DD",
      "Pedal to the Metal | PM",
      "Link Wrath | LW",
    ],
  },
};
// TODO add manual and info from webpage/notion
