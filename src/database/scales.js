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

// "pentatonic major": [0, 2, 4, 7, 9],
// "pentatonic minor": [0, 3, 5, 7, 10],
export default {
  nb_notes_5: {
    pentatonic: {
      modes: [
        "Major",
        "Egyptian/suspended/jin yu",
        "Blues minor/Man Gong",
        "Blues Major/Ritsusen/Scotish Pentatonic",
        "minor",
      ],
      intervals: [0, 2, 4, 7, 9],
    },
  },
  nb_notes_6: {
    whole_tone: {
      modes: [
        "whole_tone",
        "whole_tone",
        "whole_tone",
        "whole_tone",
        "whole_tone",
        "whole_tone",
      ],
      intervals: [0, 2, 4, 6, 8, 10],
    },
  },
  nb_notes_7: {
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
};

/**
   * {
    "akebono": [0, 2, 3, 7, 9],
    "blues": [0, 3, 5, 6, 7, 10],
    "byzantine / double harmonic": [0, 1, 4, 5, 7, 8, 11],
    "chinese": [0, 4, 6, 7, 11],
    "augmented": [0, 3, 4, 7, 8, 11],
    "diminished / arabian": [0, 2, 3, 5, 6, 8, 9, 11],
    "diminished (half whole / dominant)": [0, 1, 3, 4, 6, 7, 9, 10],
    "enigmatic": [0, 1, 4, 6, 8, 10, 11],
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
    "lydian augmented": [0, 2, 4, 6, 8, 9, 11],
    "mongolian": [0, 2, 4, 7, 9],
    "oriental": [0, 1, 4, 5, 6, 9, 10],
    "persian": [0, 1, 4, 5, 6, 8, 11],
    "phrygian": [0, 1, 3, 5, 7, 8, 10],
    "phrygian dominant / freygish": [0, 1, 4, 5, 7, 8, 10 ],
    "prometheus": [0, 2, 4, 6, 9, 10],
    "prometheus neapolitan": [0, 1, 4, 6, 9, 10],
    "romanian / ukranian dorian": [0, 2, 3, 6, 7, 9, 10],
  }
   */
