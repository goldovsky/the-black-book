/**
 * USAGE
 * import DATA_TETRACHORDS from './.../data/tetrachords.js';
 * 
 * data() {
    return {
      dataChords: DATA_TETRACHORDS,
    };
  },
 */

/**
 * LEVELS
 * 1 : x
 * 2 : x
 * 3 : x
 */
// check https://www.learnjazzstandards.com/blog/17-important-scales-tetrachords/
export default {
  primary: {
    major: [0, 2, 4, 5], // dominant
    minor: [0, 2, 3, 5], // dorian
    phrygian_locrian: [0, 1, 3, 5] // one or the other
  },
  extended_definition: {
    lydian: [0, 2, 4, 6], // whole tone
    diminished: [0, 2, 3, 6],
    gypsy: [0, 1, 4, 5]
  },
};

// 10 Important Tetrachords
// Name of Tetrachord                               Intervals           Numbers

// Major Tetrachord                              WWH                 1 2 3 4

// Minor Tetrachord                              WHW                 1 2 b3 4

// Phrygian Tetrachord                        HWW                 1 b2 b3 4

// Whole-Tone Tetrachord                 WWW                1 2 3 #4

// Diminished Tetrachord                   HWH                  1 b2 b3 3

// Harmonic Tetrachord                      Hb3H                 1 b2 3 4

// Mixolydian Blues Tetrachord       WHH                 1 2 b3 3

// Blues 1 Tetrachord                            b3WH                 1 b3 4 #4

// Blues 2 Tetrachord                           Hb3W                  1 b2 3 #4

// Chromatic Tetrachord                     HHH                     1 b2 2 b3
