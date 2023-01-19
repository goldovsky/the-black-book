/**
 * USAGE
 * import DATA_TUNINGS from './.../data/tunings.js';
 * 
 * data() {
    return {
      dataTunings: DATA_TUNINGS,
    };
  },
 */

/**
 * LEVELS
 * 1 : instrument
 * 2 : nb strings
 * 3 : type of tuning (Standard, drop, open, 4th...)
 * 4 : tonality
 * 5 : strings (from high to low)
 *
 * TODO
 * add different tuning
 */

/**
 * NOTES
 * todo for tuning maybe do an array of every notes available : ['c0', 'c1'....]
 * and use index from that array so it can easely be shifted up and down
 */

export default {
      guitar: {
        nb_strings_6: {
          standard: {
            e: [ "E4", "B3", "G3", "D3", "A2", "E2" ],
            eb: [ "Eb4", "Bb3", "Gb3", "Db3", "Ab2", "Eb2" ],
            d: [ "D4", "A3", "F3", "C3", "G2", "D2" ],
            db: [ "Db4", "Ab3", "E3", "B2", "Gb2", "Db2" ],
            c: [ "C4", "G3", "Eb3", "Bb2", "F2", "C2" ],
            b: [ "B4", "Gb3", "D3", "A2", "E2", "B1" ],
            bb: [ "Bb4", "F3", "Db3", "Ab2", "Eb2", "Bb1" ],
            a: [ "A4", "E3", "C3", "G2", "D2", "A1" ]
          },
          drop: {
            d: [ "E4", "B3", "G3", "D3", "A2", "D2" ],
            Db: [ "Eb4", "Bb3", "Gb3", "Db3", "Ab2", "Db2" ],
            c: [ "D4", "A3", "F3", "C3", "G2", "C2" ]
          },
          open: {
            e: [ "E4", "B3", "G#3", "E3", "G2", "E2" ],
            d: [ "D4", "A3", "F#3", "D3", "A2", "D2" ],
            c: [ "C4", "G3", "E3", "C3", "G2", "C2" ],
            ctownsend: [ "E4", "C4", "G3", "C3", "G2", "C2" ],
          }
        },
        nb_strings_7: {
          standard: {
            b: [ "E4", "B3", "G3", "D3", "A2", "E2", "B1" ],
            bb: [ "Eb4", "Bb3", "Gb3", "Db3", "Ab2", "Eb2", "Bb1" ],
            a: [ "d4", "A3", "F3", "C3", "G2", "D2", "A1" ],
          },
          drop: {
            a: [ "E4", "B3", "G3", "D3", "A2", "E2", "A1" ],
          }
        },
        nb_strings_8: {
          standard: {
            gb: [ "E4", "B3", "G3", "D3", "A2", "E2", "B1", "Gb1" ]
          },
          drop: {
            e: [ "E4", "B3", "G3", "D3", "A2", "E2", "B1", "E1" ],
          }
        }
      },
      bass: {
        nb_strings_4: {
          standard: {
            e: [ "D2", "A1", "E1", "B0" ],
          },
        },
        nb_strings_5: {
          standard: {
            b: [ "G2", "D2", "A1", "E1", "B0" ],
          },
        }
      }
    };