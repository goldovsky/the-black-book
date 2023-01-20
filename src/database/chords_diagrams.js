/**
 * USAGE
 * import DATA_CHORDS from './.../data/chords.js';
 * 
 * data() {
    return {
      dataChords: DATA_CHORDS,
    };
  },
 */

/**
 * LEVELS
 * 1 : tuning
 * 2 : nb strings
 * 3 : root on which string ([8/7]/6/5/4)
 * 4 : type (major, minor, fifth/powerchord)
 * 5 : inversion: root, 1st, 2nd, 3rd...
 * 6 : [x,x,x,x,x,x] from first to last string
 * 
 * NOTES/TODO
 * OpenD and openE.... based on OpenC shifted
 * 
 * LEXIQUE
 * "fret: 0": open string
 * "fret: null": string not played
 * "interval": used to change shape from circle to intervalBasedShapes
 */

export default {
  tuning_standard: {
    nb_strings_6: {
      root_on_string_6: {
        powerChord: {},
        minor: {},
        major: {
          caged_g: {
            //position_open: true,
            frets: [3,3,0,0,2,3],
            fingers: [4,3,null,null,1,2],
            intervals:['1P','5P','1P','5P','3M','1P']
          },
          caged_e: {
            frets: [0,0,1,2,2,0],
            fingers: [null,null,1,3,2,null]
            // ....
          }
        },
        diminished: {},
        augmented: {},
        major_7th: {},
        major_7th_add9: {},
      },
      root_on_string_5: {},
      root_on_string_4: {},
    },
    nb_strings_7: {
      root_on_string_7: {},
      root_on_string_6: null, // same as bnstring6
      root_on_string_5: null, // same as bnstring6
      root_on_string_4: null, // same as bnstring6
    },
    nb_strings_8: {
      root_on_string_8: {},
      root_on_string_7: {},
      root_on_string_6: null, // same as bnstring6
      root_on_string_5: null, // same as bnstring6
      root_on_string_4: null, // same as bnstring6
    },
  },
  tuning_open_c: { // not specifically C, it coud be D or E for example
    nb_strings_6: {
      root_on_string_6: {},
      root_on_string_5: {},
      root_on_string_4: {},
    },
  },
  tuning_standard_fourth: {},
};

/**
 * {
    "5": [0, 7],
    "6": [0, 4, 7, 9],
    "9": [0, 2, 4, 7, 10],
    "augmented": [0, 4, 8],
    "diminished 7th": [0, 3, 6, 9],
    "major": [0, 4, 7],
    "major 7th": [0, 4, 7, 11],
    "major 7th add 9": [0, 2, 4, 7, 11],
    "major 7th #5": [0, 6, 8, 11],
    "7": [0, 4, 7, 10],
    "7th suspended": [0, 5, 7, 10],
    "7#9": [0, 3, 4, 10],
    "9th": [0, 2, 4, 10],
    "13th": [0, 4, 9, 10],
    "minor": [0, 3, 7],
    "minor 6th": [0, 3, 7, 9],
    "minor 7th": [0, 3, 7, 10],
    "minor 9th": [0, 2, 3, 7, 10],
    "minor 11th": [0, 2, 3, 10],
    "suspended": [0, 5, 7 ],
    "suspended 2nd": [0, 2, 7]
}
 */
