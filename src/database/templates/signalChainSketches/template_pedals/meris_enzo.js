export default {
  brand: "Meris",
  model: "Enzo",
  settings: {
    pitch: {
      value: 0,
      alt: {
        portamento: 0,
      },
    },
    filter: {
      value: 0,
      alt: {
        filter_type: [
          "Ladder Lowpass",
          "Ladder Shelving Bandpass",
          "Ladder Highpass",
          "State Variable LowPass",
          "State Variable BandPass",
          "State Variable HighPass",
        ],
      },
    },
    mix: {
      value: 0,
      alt: {
        delay_level: 0,
      },
    },
    Sustain: {
      value: 0,
      alt: {
        ring_modulation: 0,
      },
    },
    filter_envelope: {
      value: 0,
      alt: {
        filterBandWidth: 0, //  [Resonance]
      },
    },
    Modulation: {
      values: 0,
      alt: {
        delay_eedback: 0,
      },
    },
    tap: {
      value: 120,
      alt: {
        envelope_type: ["Triggered Envelope", "Envelope Follower"],
      },
      hold: false,
    },
    bypass: {
      state: true,
      alt: {
        synth_waveshape: ["Sawtooth", "Square"],
      },
    },
    poly_mono: ["Poly", "Mono", "Arp", "Dry"],
  },
  comments: {
    title: "",
    description: "",
  },
};
