/**
 * LEVELS
 * 1 : interval chords are build upons
 * 2 : number of notes
 * 
 * NOTE
 * - C/A = CHORDS/ARPEGGIOS
 */
function initNoteRelations() {
    let obj =  {
      notes: {
        list: [
          {
            name: "C",
            value: 1,
          },
          {
            name: "D",
            value: 3,
          },
          {
            name: "E",
            value: 5,
          },
          {
            name: "F",
            value: 6,
          },
          {
            name: "G",
            value: 9,
          },
          {
            name: "A",
            value: 11,
          },
          {
            name: "B",
            value: 12,
          },
        ],
        alterations: {
          doubleflat: {
            symbol: "𝄫",
            value: -2,
          },
          flat: {
            symbol: "♭",
            value: -1,
          },
          becare: {
            symbol: "♮",
            value: 0,
          },
          Sharp: {
            symbol: "♯",
            value: +1,
          },
          doubleSharp: {
            symbol: "𝄪", //𝄪
            value: +2,
          },
        },
      },
      buildingbricks: {
        intervals: [
          {
            type: "Primal",
            values: [
              {
                interval: "Perfect Unison",
                short: "P1",
                semitones: 0,
              },
            ],
          },
          {
            type: "Secundal",
            values: [
              {
                interval: "Minor second",
                short: "m2",
                semitones: 1,
              },
              {
                interval: "Major second",
                short: "M2",
                semitones: 2,
              },
            ],
          },
          {
            type: "Tertian",
            values: [
              {
                interval: "Minor third",
                short: "m3",
                semitones: 3,
              },
              {
                interval: "Major third",
                short: "M3",
                semitones: 4,
              },
            ],
          },
          {
            type: "Quartal",
            values: [
              {
                interval: "Perfect Fourth",
                short: "P4",
                semitones: 5,
              },
              {
                interval: "Augmented Fourth",
                short: "A4",
                semitones: 6,
              },
            ],
          },
          {
            type: "Quintal",
            values: [
              {
                interval: "Diminished fifth",
                short: "d5",
                semitones: 6,
              },
              {
                interval: "Perfect fifth",
                short: "P5",
                semitones: 7,
              },
            ],
          },
          {
            type: "Sextal",
            values: [
              {
                interval: "Minor Sixth",
                short: "m6",
                semitones: 8,
              },
              {
                interval: "Major Sixth",
                short: "M6",
                semitones: 9,
              },
            ],
          },
          {
            type: "Septimal",
            values: [
              {
                interval: "Minor Seventh",
                short: "m7",
                semitones: 10,
              },
              {
                interval: "Major Seventh",
                short: "M7",
                semitones: 11,
              },
            ],
          },
          {
            type: "Octavial",
            values: [
              {
                interval: "perfect Octave",
                short: "P8",
                semitones: 12,
              },
            ],
          },
        ],
        chordTypeByNumberOfNotes: {
          1: "monad", // Monochord
          2: "dyad", // Dichord
          3: "triad", // Trichord
          4: "tetrad", // Tetrachord
          5: "pentad", // Pentachord
          6: "hexad", // Hexachord
          7: "heptad", // Heptachord
          8: "octad", // Octachord
          9: "ennead", // Nonachord
          10: "decad", // Decachord
        },
      },
      //arpeggiosOrChords
      data: {},
    }

    // TODO INFO : Below code put on hold as we switch to using @goldovsky/tonal package 
    /**
     * * LOOP on INTERVAL TYPE which C/A will be build upon
     * e.g. Tertian (empilement de tierce)
     */
    for (const intervalIndex in obj.buildingbricks.intervals) {
        const intervalType = obj.buildingbricks.intervals[intervalIndex].type;
        // init key
        obj.data[intervalType] = {};
        /**
         * * LOOP on NUMBER OF NOTES BY C/A C/A will be build upon
         * e.g; triad (3 notes chords)
         */
        for (const nbNotesKey in obj.buildingbricks.chordTypeByNumberOfNotes) {
            const chordType = obj.buildingbricks.chordTypeByNumberOfNotes[nbNotesKey];
            // init key
            obj.data[intervalType][chordType] = {};

            // fetch available intervals
            // example: ['m3','M3']
            // const tmpIntervalList = obj.buildingbricks.intervals[intervalIndex].values.map((filterInterval) => {
            //     return filterInterval.short;
            // })


            // build list of possibilities of placing the diferent type of intervals together
            //example: [['m3', 'M3'], ['M3', 'm3'], ['m3', 'm3'], ['M3', 'M3']]
            // console.log("not yet : " + tmpIntervalList)
        }
        
    }
    // console.log(obj);

    return obj;
}

export default initNoteRelations();
// *https://en.wikipedia.org/wiki/Chord_(music)
// * https://en.wikipedia.org/wiki/Interval_(music)#Number

/**
 * TODO NOTES
 * * I) See if chords.json is only for diagrams or if it can be merged with this file
 * * (symbols : ♭5, ♯5,  o...)
 * succession de tierces
 * m + M + m + M...
 * M + m + M + m...
 * M + M + M + M ?
 * m + l + m + m ?
 *
 * -------------------
 * b3 -> minor (m)
 * 3 -> Major (M if (dans quel cas on précise déjà? xD))
 * b5 -> b5
 * ...
 * b7 -> m7
 * 7 -> M7 dans quel cas?
 *
 *
 *  build interval-mixed chords
 *
 * *example ? [1, b3, 5, 13]
 * 5? nothing, b5 -> b5
 *
 * quid des inversions?
 */

// https://www.guitaristsreference.com/index.php?action=arpeggios&id=122

// my_array_scale_altname["Major"]="Ionian";
// my_array_scale_altname["Aeolian"]="Natural Minor|Pure Minor";
// my_array_scale_altname["Spanish Phrygian"]="Gypsy";
// my_array_scale_altname["Melodic Minor"]="Jazz Melodic Minor|Jazz Minor";
// my_array_scale_altname["Dorian b2"]="Phrygian #6|Javanese";
// my_array_scale_altname["Lydian Dominant"]="Mixolydian #4|Overtone";
// my_array_scale_altname["Mixolydian b6"]="Hindu|Spanish";
// my_array_scale_altname["Altered"]="Super Locrian|Diminished Whole Tone";
// my_array_scale_altname["Hirajoshi"]="Kumoi|Iwato";
// my_array_scale_altname["Japanese"]="In Sen";
// my_array_scale_altname["Hungarian Minor"]="Algerian";
