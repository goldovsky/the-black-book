/**
 * USAGE
 * import DATA_SCALES from './.../data/scales.js';
 * 
 * data() {
    return {
      dataScales: DATA_SCALES,
    };
  },
 */

/**
 * LEVELS
 * 1 : nb notes
 * 2 : scale
 * 3 : modes | intervals
 */

/**
 * TODO
 * - in pentatonic add japanese scale
 * 
 * use an attribute to describe each chrods build from each note?
 * or use chordIdentifier.js to determine it dynamically
 */

// nb of notes by scale
// 2 Ditonic
// 3 Tritonic
// 4 Tetratonic
// 5 Pentatonic
// 6 Hexatonic
// 7 Heptatonic
// 8 Octatonic
// 9 Nonatonic
// 12 Chromatic/Dodecatonic
export default {
  pentatonic: { //nb_notes_5
    pentatonic: {
      modes: [
        "Major",
        "Egyptian/suspended/jin yu",
        "Blues minor/Man Gong",
        "Blues Major/Ritsusen/Scotish Pentatonic",
        "Minor",
      ],
      intervals: [0, 2, 4, 7, 9],
    },
  },
  hexatonic: { //nb_notes_6
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
    augmented: {
      modes: ["Augmented","?","?","?","?","?"],
      intervals: [0, 3, 4, 7, 8, 11]
    },
    prometheus: {
      modes: ["Prometheus","?","?","?","?","?"],
      intervals: [0, 2, 4, 6, 9, 10]
    },
    blues: {
      modes: ["Blues","?","?","?","?","?"],
      intervals: [0, 3, 5, 6, 7, 10]
    },
    tritone: {
      modes: ["Tritone","?","?","?","?","?"],
      intervals: [0, 1, 3, 5, 6, 10]
    },
    two_semitone_tritone: {
      modes: ["two_semitone_tritone","?","?","?","?","?"],
      intervals: [0, 1, 2, 5, 6, 7]
    }
  },
  heptatonic: { //nb_notes_7
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
    natural_minor: {
      modes: [
        "Aeolian",
        "Locrian",
        "Ionian",
        "Dorian",
        "Phrygian",
        "Lydian",
        "Mixolydian",
      ],
      intervals: [0, 2, 3, 5, 7, 8, 10],
    },
    melodic_minor: {
      modes: [
        "Melodic minor",
        "Dorian b2",
        "Lydian augmented",
        "Lydian dominant",
        "Mixolydian b6",
        "Locrian natural 2",
        "Super locrian/Altered scale",
      ],
      intervals: [0, 2, 3, 5, 7, 9, 11],
    },
    harmonic_minor: {
      modes: [
        "harmonic minor/Aeolian #7",
        "Locrian ♮6",
        "Ionian ♯5/Augmented major",
        "Ukrainian Dorian scale",
        "Phrygian dominant scale",
        "Lydian ♯2",
        "Superlocrian double flat7/Altered diminished",
      ],
      intervals: [0, 2, 3, 5, 6, 9, 11],
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
