/**
 * USAGE
 * import DATA_SCALES from './.../data/scales.js';
 * 
 * data() {
    return {
      dataChords: DATA_SCALES,
    };
  },
 */

/**
 * LEVELS
 * 1 : nb notes
 * 2 : scale
 * 3 : modes | intervals
 */

export default [
  {
    nb_strings_5: {},
    nb_strings_7: {
      major: {
        modes: [
          "Ionian",
          "Dorian",
          "Phrygian",
          "Lydian",
          "Mixolydian",
          "Aeolian",
          "Locrian",
        ],
        intervals: [0, 2, 4, 5, 7, 9, 11],
      },
    },
  },
];

/**
   * {
    "major / ionian": [0, 2, 4, 5, 7, 9, 11],
    "minor / aeolian": [0, 2, 3, 5, 7, 8, 10],
    "akebono": [0, 2, 3, 7, 9],
    "blues": [0, 3, 5, 6, 7, 10],
    "byzantine / double harmonic": [0, 1, 4, 5, 7, 8, 11],
    "chinese": [0, 4, 6, 7, 11],
    "augmented": [0, 3, 4, 7, 8, 11],
    "diminished / arabian": [0, 2, 3, 5, 6, 8, 9, 11],
    "diminished (half whole / dominant)": [0, 1, 3, 4, 6, 7, 9, 10],
    "dorian": [0, 2, 3, 5, 7, 9, 10],
    "enigmatic": [0, 1, 4, 6, 8, 10, 11],
    "egyptian pentatonic / jin yu": [0, 2, 5, 7, 10],
    "han kumoi": [0, 2, 5, 7, 8 ],
    "harmonic minor": [0, 2, 3, 5, 7, 8, 11],
    "hatakambari": [0, 1, 4, 5, 7, 10, 11],
    "hijaz": [0, 1, 4, 5, 7, 8, 10],
    "hirajoshi": [0, 2, 3, 7, 8],
    "hungarian gypsy": [0, 2, 3, 6, 7, 8, 11],
    "indian (raga asavari) ascending": [0, 1, 5, 7, 8],
    "indian (raga asavari) descending": [0, 1, 3, 5, 7, 8, 10],
    "iwato": [0, 1, 5, 6, 10],
    "kokin-joshi": [0, 1, 5, 7, 10],
    "locrian": [0, 1, 3, 5, 6, 8, 10],
    "lydian": [0, 2, 4, 6, 7, 9, 11],
    "lydian augmented": [0, 2, 4, 6, 8, 9, 11],
    "mixolydian": [0, 2, 4, 5, 7, 9, 10],
    "mongolian": [0, 2, 4, 7, 9],
    "oriental": [0, 1, 4, 5, 6, 9, 10],
    "pentatonic major": [0, 2, 4, 7, 9],
    "pentatonic minor": [0, 3, 5, 7, 10],
    "persian": [0, 1, 4, 5, 6, 8, 11],
    "phrygian": [0, 1, 3, 5, 7, 8, 10],
    "phrygian dominant / freygish": [0, 1, 4, 5, 7, 8, 10 ],
    "prometheus": [0, 2, 4, 6, 9, 10],
    "prometheus neapolitan": [0, 1, 4, 6, 9, 10],
    "romanian / ukranian dorian": [0, 2, 3, 6, 7, 9, 10],
    "whole tone": [0, 2, 4, 6, 8, 10]
  }
   */
