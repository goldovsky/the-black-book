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
          // TODO not sure of value if they should start at 0 or 1
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
            const tmpIntervalList = obj.buildingbricks.intervals[intervalIndex].values.map((filterInterval) => {
                return filterInterval.short;
            })


            // build list of possibilities of placing the diferent type of intervals together
            //example: [['m3', 'M3'], ['M3', 'm3'], ['m3', 'm3'], ['M3', 'M3']]
            console.log(tmpIntervalList)
        }
        
    }
    console.log(obj);

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
//Copyright (C) 2010 My App Catalog LLC - www.MyAppCatalog.com
// //Do not copy and re-use our code
// //Thank you
// var my_array_tuning_string=[];
// my_array_tuning_string["C"]=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C","C#","D","D#"];
// my_array_tuning_string["C#"]=["C#","D","D#","E","F","F#","G","G#","A","A#","B","C","C#","D","D#","E"];
// my_array_tuning_string["D"]=["D","D#","E","F","F#","G","G#","A","A#","B","C","C#","D","D#","E","F"];
// my_array_tuning_string["D#"]=["D#","E","F","F#","G","G#","A","A#","B","C","C#","D","D#","E","F","F#"];
// my_array_tuning_string["E"]=["E","F","F#","G","G#","A","A#","B","C","C#","D","D#","E","F","F#","G"];
// my_array_tuning_string["F"]=["F","F#","G","G#","A","A#","B","C","C#","D","D#","E","F","F#","G","G#"];
// my_array_tuning_string["F#"]=["F#","G","G#","A","A#","B","C","C#","D","D#","E","F","F#","G","G#","A"];
// my_array_tuning_string["G"]=["G","G#","A","A#","B","C","C#","D","D#","E","F","F#","G","G#","A","A#"];
// my_array_tuning_string["G#"]=["G#","A","A#","B","C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
// my_array_tuning_string["A"]=["A","A#","B","C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C"];
// my_array_tuning_string["A#"]=["A#","B","C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C","C#"];
// my_array_tuning_string["B"]=["B","C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C","C#","D"];
// var my_array_key=["C","C#","Db","D","D#","Eb","E","F","F#","Gb","G","G#","Ab","A","A#","Bb","B"];
// var my_array_chord_type=["maj","maj7","maj9","maj13","maj9(#11)","maj13(#11)","6","add9","6/9","maj7(b5)","maj7(#5)","m","m7","m9","m11","m13","m6","m(add9)","m6/9","m(maj7)","m(maj9)","m7(b5)","m7(#5)","7","9","11","13","7sus4","7(b5)","7(#5)","7(b9)","7(#9)","7(b5,b9)","7(b5,#9)","7(#5,b9)","7(#5,#9)","9(b5)","9(#5)","13(#11)","13(b9)","11(b9)","+","o7","5","sus4","sus2","sus2, sus4"];
// var my_array_chord_type_full=["Major Chords","maj|1","maj7|1","maj9|1","maj13|1","maj9(#11)|1","maj13(#11)|1","6|1","add9|1","6/9|1","maj7(b5)|1","maj7(#5)|1","Minor Chords","m|2","m7|2","m9|2","m11|2","m13|2","m6|2","m(add9)|2","m6/9|2","m(maj7)|2","m(maj9)|2","m7(b5)|2","m7(#5)|2","Dominant Chords","7|3","9|3","11|3","13|3","7sus4|3","Altered Dominant Chords","7(b5)|4","7(#5)|4","7(b9)|4","7(#9)|4","7(b5,b9)|4","7(b5,#9)|4","7(#5,b9)|4","7(#5,#9)|4","9(b5)|4","9(#5)|4","13(#11)|4","13(b9)|4","11(b9)|4","Other Chords","+|5","o7|5","5|5","sus4|5","sus2|5","sus2, sus4|5"];
// var my_array_triad_type_full=["Major","Major, Root Position|1","Major, 1st Inversion|1","Major, 2nd Inversion|1","Minor","Minor, Root Position|2","Minor, 1st Inversion|2","Minor, 2nd Inversion|2","Diminished","Diminished, Root Position|3","Diminished, 1st Inversion|3","Diminished, 2nd Inversion|3","Augmented","Augmented, Root Position|4","Augmented, 1st Inversion|4","Augmented, 2nd Inversion|4"];
// var my_array_arpeggio_type_full=["Major Arpeggios","maj|1","maj7|1","maj9|1","maj13|1","maj9(#11)|1","maj13(#11)|1","6|1","add9|1","6/9|1","maj7(b5)|1","maj7(#5)|1","Minor Arpeggios","m|2","m7|2","m9|2","m11|2","m13|2","m6|2","m(add9)|2","m6/9|2","m(maj7)|2","m(maj9)|2","m7(b5)|2","m7(#5)|2","Dominant Arpeggios","7|3","9|3","11|3","13|3","7sus4|3","Altered Dominant","7(b5)|4","7(#5)|4","7(b9)|4","7(#9)|4","7(b5,b9)|4","7(b5,#9)|4","7(#5,b9)|4","7(#5,#9)|4","9(b5)|4","9(#5)|4","13(#11)|4","13(b9)|4","11(b9)|4","Other Arpeggios","+|5","o7|5","5|5","sus4|5","sus2|5","sus2, sus4|5"];
// var my_array_scale_type_full=["Major Scale Modes","Major|1","Dorian|1","Phrygian|1","Lydian|1","Mixolydian|1","Aeolian|1","Locrian|1","Harmonic Minor Modes","Harmonic Minor|2","Spanish Phrygian|2","Melodic Minor Modes","Melodic Minor|3","Lydian Augmented|3","Dorian b2|3","Lydian Dominant|3","Mixolydian b6|3","Locrian #2|3","Altered|3","Pentatonics","Major Pentatonic|4","Minor Pentatonic|4","Blues Scale|4","Major Blues Scale|4","Egyptian|4","Hirajoshi|4","Pelog|4","Balinese|4","Japanese|4","Chinese|4","Chinese 2|4","Symmetrical Scales","Half/Whole Diminished|5","Whole/Half Diminished|5","Whole Tone|5","Misc.","Bebop Dominant|6","Bebop Major|6","Hungarian Major|6","Hungarian Minor|6","Enigmatic|6","Neopolitan Major|6","Neopolitan Minor|6","Flamenco|6","Arabian|6","Persian|6","Byzantine|6","Jewish|6"];
// var my_array_key1=[];
// my_array_key1[0]="C";
// my_array_key1[1]="D";
// my_array_key1[2]="E";
// my_array_key1[3]="F";
// my_array_key1[4]="G";
// my_array_key1[5]="A";
// my_array_key1[6]="B";
// var my_array_chord_type1=[];
// my_array_chord_type1[0]="maj";
// my_array_chord_type1[1]="m";
// my_array_chord_type1[2]="m7";
// my_array_chord_type1[3]="7";
// my_array_chord_type1[4]="5";
// var my_array_key2=[];
// my_array_key2[0]="C";
// my_array_key2[1]="C#";
// my_array_key2[2]="Db";
// my_array_key2[3]="D";
// my_array_key2[4]="D#";
// my_array_key2[5]="Eb";
// my_array_key2[6]="E";
// my_array_key2[7]="F";
// my_array_key2[8]="F#";
// my_array_key2[9]="Gb";
// my_array_key2[10]="G";
// my_array_key2[11]="G#";
// my_array_key2[12]="Ab";
// my_array_key2[13]="A";
// my_array_key2[14]="A#";
// my_array_key2[15]="Bb";
// my_array_key2[16]="B";
// var my_array_chord_type2=[];
// my_array_chord_type2[0]="maj";
// my_array_chord_type2[1]="maj7";
// my_array_chord_type2[2]="maj9";
// my_array_chord_type2[11]="m";
// my_array_chord_type2[12]="m7";
// my_array_chord_type2[19]="m(maj7)";
// my_array_chord_type2[21]="m7(b5)";
// my_array_chord_type2[22]="m7(#5)";
// my_array_chord_type2[23]="7";
// my_array_chord_type2[27]="7sus4";
// my_array_chord_type2[41]="+";
// my_array_chord_type2[42]="o7";
// my_array_chord_type2[43]="5";
// my_array_chord_type2[44]="sus4";
// my_array_chord_type2[45]="sus2";
// var my_array_key1=[];
// my_array_key1[0]="C";
// my_array_key1[1]="D";
// my_array_key1[2]="E";
// my_array_key1[3]="F";
// my_array_key1[4]="G";
// my_array_key1[5]="A";
// my_array_key1[6]="B";
// var my_array_chord_type1=[];
// my_array_chord_type1[0]="maj";
// my_array_chord_type1[1]="m";
// my_array_chord_type1[2]="m7";
// my_array_chord_type1[3]="7";
// my_array_chord_type1[4]="5";
// var my_array_key2=[];
// my_array_key2[0]="C";
// my_array_key2[1]="C#";
// my_array_key2[2]="Db";
// my_array_key2[3]="D";
// my_array_key2[4]="D#";
// my_array_key2[5]="Eb";
// my_array_key2[6]="E";
// my_array_key2[7]="F";
// my_array_key2[8]="F#";
// my_array_key2[9]="Gb";
// my_array_key2[10]="G";
// my_array_key2[11]="G#";
// my_array_key2[12]="Ab";
// my_array_key2[13]="A";
// my_array_key2[14]="A#";
// my_array_key2[15]="Bb";
// my_array_key2[16]="B";
// var my_array_chord_type2=[];
// my_array_chord_type2[0]="maj";
// my_array_chord_type2[1]="maj7";
// my_array_chord_type2[2]="maj9";
// my_array_chord_type2[11]="m";
// my_array_chord_type2[12]="m7";
// my_array_chord_type2[19]="m(maj7)";
// my_array_chord_type2[21]="m7(b5)";
// my_array_chord_type2[22]="m7(#5)";
// my_array_chord_type2[23]="7";
// my_array_chord_type2[27]="7sus4";
// my_array_chord_type2[41]="+";
// my_array_chord_type2[42]="o7";
// my_array_chord_type2[43]="5";
// my_array_chord_type2[44]="sus4";
// my_array_chord_type2[45]="sus2";
// var my_array_chord_symbol=[];
// my_array_chord_symbol["maj"]="maj|major|M";
// my_array_chord_symbol["maj7"]="maj7|major7|Maj7|MA7|M7|+7";
// my_array_chord_symbol["maj9"]="maj9|maj7(9)|M9";
// my_array_chord_symbol["maj13"]="maj13|maj7(9,13)|maj7(6/9)|M13";
// my_array_chord_symbol["maj9(#11)"]="maj9(#11)|maj7(9,#11)";
// my_array_chord_symbol["maj13(#11)"]="maj13(#11)|maj7(9,#11,13)|maj9(#11,13)";
// my_array_chord_symbol["6"]="6|maj6|add6";
// my_array_chord_symbol["add9"]="add9|sus2";
// my_array_chord_symbol["6/9"]="6/9|add6/9";
// my_array_chord_symbol["maj7(b5)"]="maj7(b5)";
// my_array_chord_symbol["maj7(#5)"]="maj7(#5)|maj7+";
// my_array_chord_symbol["m"]="m|min|-";
// my_array_chord_symbol["m7"]="m7|min7|-7";
// my_array_chord_symbol["m9"]="m9|min9|-9";
// my_array_chord_symbol["m11"]="m11|min11|-11";
// my_array_chord_symbol["m13"]="m13|min13|-13";
// my_array_chord_symbol["m6"]="m6|min6|m(add6)|-6";
// my_array_chord_symbol["m(add9)"]="m(add9)|m9(no 7th)";
// my_array_chord_symbol["m6/9"]="m6/9|min6/9|m(add6,9)|-6/9";
// my_array_chord_symbol["m(maj7)"]="m(maj7)|min(maj7)|-(maj7)";
// my_array_chord_symbol["m(maj9)"]="m(maj9)|min(maj9)|m9(maj7)";
// my_array_chord_symbol["m7(b5)"]="m7(b5)";
// my_array_chord_symbol["m7(#5)"]="m7(#5)|m7+";
// my_array_chord_symbol["7"]="7|dom7";
// my_array_chord_symbol["9"]="9";
// my_array_chord_symbol["11"]="11|9sus4";
// my_array_chord_symbol["13"]="13";
// my_array_chord_symbol["7sus4"]="7sus4|7sus";
// my_array_chord_symbol["7(b5)"]="7(b5)|7(-5)";
// my_array_chord_symbol["7(#5)"]="7(#5)|7(+5)";
// my_array_chord_symbol["7(b9)"]="7(b9)|7(-9)";
// my_array_chord_symbol["7(#9)"]="7(#9)|7(+9)|7(b10)";
// my_array_chord_symbol["7(b5,b9)"]="7(b5,b9)|7(-5,-9)";
// my_array_chord_symbol["7(b5,#9)"]="7(b5,#9)|7(-5,+9)";
// my_array_chord_symbol["7(#5,b9)"]="7(#5,b9)|7(+5,-9)";
// my_array_chord_symbol["7(#5,#9)"]="7(#5,#9)|7(+5,+9)";
// my_array_chord_symbol["9(b5)"]="9(b5)|7(b5,9)|9(-5)";
// my_array_chord_symbol["9(#5)"]="9(#5)|7(#5,9)|9(+5)";
// my_array_chord_symbol["13(#11)"]="13(#11)|7(9,#11,13)|13(+11)|7(9,+11,13)";
// my_array_chord_symbol["13(b9)"]="13(b9)|7(b9,13)|13(-9)|7(-9,13)";
// my_array_chord_symbol["11(b9)"]="11(b9)|7sus4(b9)";
// my_array_chord_symbol["+"]="+";
// my_array_chord_symbol["o7"]="o7|dim7|o";
// my_array_chord_symbol["5"]="5|maj(no 3rd)";
// my_array_chord_symbol["sus4"]="sus4|sus";
// my_array_chord_symbol["sus2"]="sus2";
// my_array_chord_symbol["sus2, sus4"]="sus2, sus4";
// var my_array_chord_name=[];
// my_array_chord_name["maj"]="Major";
// my_array_chord_name["maj7"]="Major 7th";
// my_array_chord_name["maj9"]="Major 9th";
// my_array_chord_name["maj13"]="Major 13th";
// my_array_chord_name["maj9(#11)"]="Major 9, #11";
// my_array_chord_name["maj13(#11)"]="Major 13, #11";
// my_array_chord_name["6"]="Major 6th";
// my_array_chord_name["add9"]="Major add 9";
// my_array_chord_name["6/9"]="Major 6, 9";
// my_array_chord_name["maj7(b5)"]="Major 7, b5";
// my_array_chord_name["maj7(#5)"]="Major 7, #5";
// my_array_chord_name["m"]="Minor";
// my_array_chord_name["m7"]="Minor 7th";
// my_array_chord_name["m9"]="Minor 9th";
// my_array_chord_name["m11"]="Minor 11th";
// my_array_chord_name["m13"]="Minor 13th";
// my_array_chord_name["m6"]="Minor 6th";
// my_array_chord_name["m(add9)"]="Minor add 9";
// my_array_chord_name["m6/9"]="Minor 6, 9";
// my_array_chord_name["m(maj7)"]="Minor, major 7";
// my_array_chord_name["m(maj9)"]="Minor, major 9";
// my_array_chord_name["m7(b5)"]="Minor 7, b5 (or half-diminished)";
// my_array_chord_name["m7(#5)"]="Minor 7, #5";
// my_array_chord_name["7"]="Dominant 7th";
// my_array_chord_name["9"]="Dominant 9th";
// my_array_chord_name["11"]="Dominant 11th";
// my_array_chord_name["13"]="Dominant 13th";
// my_array_chord_name["7sus4"]="Dominant 7th, suspended 4th";
// my_array_chord_name["7(b5)"]="Dominant 7, b5";
// my_array_chord_name["7(#5)"]="Dominant 7, #5";
// my_array_chord_name["7(b9)"]="Dominant 7, b9";
// my_array_chord_name["7(#9)"]="Dominant 7, #9";
// my_array_chord_name["7(b5,b9)"]="Dominant 7, b5, b9";
// my_array_chord_name["7(b5,#9)"]="Dominant 7, b5, #9";
// my_array_chord_name["7(#5,b9)"]="Dominant 7, #5, b9";
// my_array_chord_name["7(#5,#9)"]="Dominant 7, #5, #9";
// my_array_chord_name["9(b5)"]="Dominant 9th, b5";
// my_array_chord_name["9(#5)"]="Dominant 9th, #5";
// my_array_chord_name["13(#11)"]="Dominant 13th, #11";
// my_array_chord_name["13(b9)"]="Dominant 13th, b9";
// my_array_chord_name["11(b9)"]="Dominant 11th, b9";
// my_array_chord_name["+"]="Augmented Triad";
// my_array_chord_name["o7"]="Diminished Seventh";
// my_array_chord_name["5"]="Perfect 5th or Power chord";
// my_array_chord_name["sus4"]="Suspended 4th";
// my_array_chord_name["sus2"]="Suspended 2nd";
// my_array_chord_name["sus2, sus4"]="Suspended 2nd, suspended 4th";
// var my_array_presets=["Lower tunings|0","Baritone|B.E.A.D.F#.B","A# tuning|A#.D#.G#.C#.F.A#","D tuning|D.G.C.F.A.D","D# tuning|D#.G#.C#.F#.A#.D#","C tuning|C.F.A#.D#.G.C","C# tuning|C#.F#.B.E.G#.C#","A tuning|A.D.G.C.E.A","Higher tunings|0","F tuning|F.A#.D#.G#.C.F","F# tuning|F#.B.E.A.C#.F#","Dropped tunings|0","Drop C#|C#.G#.C#.F#.A#.D#","Drop C|C.G.C.F.A.D","Drop B|B.F#.B.E.G#.C#","Drop A#/Bb|A#.F.A#.D#.G.C","Drop A|A.E.A.D.F#.B","Open tunings|0","Open A|E.A.E.A.C#.E","Open E|E.B.E.G#.B.E","Open F|F.A.C.F.C.F","F-Sharp|F#.A#.C#.F#.C#.F#","Dobro Open G|G.B.D.G.B.D","Crossnote tunings|0","Crossnote A|E.A.E.A.C.E","Crossnote A2|E.A.C.E.A.E","Crossnote C|C.G.C.G.C.D#","Crossnote E|E.B.E.G.B.E","Crossnote F|F.G#.C.F.C.F","Modal tunings|0","Asus2|E.A.B.E.A.E","Asus4|E.A.D.E.A.E","C6|C.A.C.G.C.E","Open Page|D.G.C.G.C.D","Csus4|C.G.C.G.C.F","C15|C.G.D.G.C.D","Dsus4|D.A.D.G.A.D","Esus2|E.A.E.F#.B.E","Esus4|E.A.E.A.B.E","G6|D.G.D.G.B.E","Gsus2|D.G.D.G.A.D","E modal|E.B.E.E.B.E","G modal|G.G.D.G.B.D","B modal|B.F#.C#.F#.B.D#","Extended chord tunings|0","Open Dmaj7|D.A.D.F#.A.C#","Open Dmin7|D.A.D.F.A.C","Open Dmin(add9)|D.A.D.F.A.E","Open Emin7|E.B.D.G.B.E","Open G7|D.G.D.G.B.F","Open Gmaj7|D.G.D.F#.B.D","Modal G7|F.G.D.G.C.D","Open G13|F.G.D.G.B.E","Open Cmin7|C.G.C.G.A#.D#","Open Cmaj7|C.G.C.G.B.E","Open C6/9|C.G.C.E.A.C","Open Cmaj9|C.G.D.G.B.E","Csus2add11|C.G.D.F.C.F","Golden Blue|C.C.C.C.A#.F","Miscellaneous tunings|0","Cooder|C#.G#.C#.F.G#.C#","Collins|F.C.F.G#.C.F","CADGBE|C.A.D.G.B.E","DAEAEE|D.A.E.A.E.E"];
// var my_array_list_tuning=[];
// my_array_list_tuning["title_1"]="Standard Tunings";
// my_array_list_tuning["t1"]=["Standard Tuning","E.A.D.G.B.E","The familiar EADGBE tuning is called the Standard tuning. Some tunings are named for the chord that is sounded when the open strings are played (Open G, D Minor). Some are named from an instrument that tunes in that same way (charango, dobro, cittern). Some are named for the structural relationship among the strings (the All Fourths, Minor Sixth). Others are named after a song which uses the tuning (Admiral, Four and Twenty). Everything needs a name."];
// my_array_list_tuning["t39"]=["Custom Tuning","",""];
// my_array_list_tuning["title_2"]="Open Tunings";
// my_array_list_tuning["t2"]=["Open C Tuning","C.G.C.G.C.E","Open C is a deep, rich tuning which can be played in most styles and keys. William Ackerman's Townsend Shuffle and John Fahey's Requiem for Mississippi John Hurt give an idea of the versatility and spaciousness of the C tuning.<br><br>The three C and two G strings can be exploited to provide numerous variations on the chords given in the accompanying chart. For instance, the open C minor chord can be played several ways, since any of the three C strings can be played open or at the third fret."];
// my_array_list_tuning["t3"]=["Open D Tuning","D.A.D.F#.A.D","The three bass strings can be used for powerful root-fifth-octave chords, or they can be used as steady drones beneath a shifting harmony. Almost every chord type has an easy bar-fingering: major, minor, 7th, sus 4, major and minor 6, and 7sus 4. This adds to the versatility of the Open D tuning and makes it possible to play in a variety of styles and keys. Two well known tunes in Open D are Joni Mitchel's Big Yellow Taxi and the Allman Brother's Little Martha. Common variations of the Open D tuning are to tune it down two frets to the key of C (CGCEGD), or to tune it up two frets to the key of E (EBEG#BE).<br><br>As with many open tunings, the multiple D and A strings can be used to easily make up new ways of fingering chords. For more chord fingerings, note that the Open D tuning is sandwiched between the Open D minor and the Modal D tunings. Both of these chord charts can be used for additional Open D chords with only minor modifications."];
// my_array_list_tuning["t4"]=["Modal D Tuning","D.A.D.G.A.D","The open strings of the Modal D tuning form a suspended fourth chord, a striking tonality that is neither major nor minor (due to the lack of a third), though it is certainly possible to play in either major or minor keys.<br><br>The tuning is very close to the Open D major tuning since they differ only in the third string. Consequently, chords from the Open D tuning chart can be played on a guitar tuned to Modal D whenever it's possible to play the third string down one fret. Similarly, chords from the Modal D chart can be played on a guitar tuned to Open D by fingering the third string up one fret. For instance, the open position D minor chords are fingered"];
// my_array_list_tuning["t5"]=["Open D Minor Tuning","D.A.D.F.A.D","The Open D minor tuning has five strings in common with the Open D (major), Modal D, and Pelican tunings, differing only in the third string. Like its sister tunings, Open D minor has three D strings and two A strings, leading to a wide variety of fingering variations for simple chords.<br><br>Chords from the Open D (major) chart can be used in the D minor tuning, with the understanding that notes on the third string need to be played up one fret. Similarly, chords from the Modal D chart can be used by playing up two frets, while chords from the Pelican tuning chart can be used by playing down one fret on the third string."];
// my_array_list_tuning["t6"]=["Open G Tuning","D.G.D.G.B.D","In the Open G tuning, the strings are tuned to a G major chord, making it easy to play in the key of G and in related keys. Though often used in 'folk' music, Jimmy Page's Bron-Y-Aur Stomp shows that this is more a matter of tradition than of necessity.<br><br>The top four strings are the same as the common G tuning for banjo, so banjo players will find it easy. Alternatively, if you find the open G tuning fun, why not give the banjo a try? The second, third, and fourth strings are tuned exactly the same as in the standard EBGDAE tuning. All chord and scale forms on these three strings remain the same, making Open G one of the easiest alternate tunings to play in. As with most open tunings, the multiple D and G strings can be easily used to make up new ways of fingering chords. For more chord forms, note that the Open G tuning is sandwiched between the Open G Minor and the Modal G tunings. Both of these chord charts can be used for additional Open G chords with only minor modifications."];
// my_array_list_tuning["t7"]=["Modal G Tuning","D.G.D.G.C.D","The open strings of a guitar in Modal G sound a suspended texture that is neither major nor minor, neither dark nor light. The two pairs of fifths in strings 3-6 make the low end powerful, while the small separation of the two highest strings make a variety of suspended chords viable and interesting.<br><br>Like other open tunings, it is easy to make up alternate fingerings for chords using the three D and two G strings. In addition, Modal G is closely related to Open G; only the second strings differ, and only by one fret."];
// my_array_list_tuning["t8"]=["Open G Minor Tuning","D.G.D.G.A#.D","Used recently in John Renbourn's Orphan and Mist-Covered Mountains of Home, the Open G Minor guitar tuning is probably a descendant of the G minor banjo tuning DGA#D, with the lowest two strings doubled an octave down. The tuning differs from Open G (major) only in the second string, so facility with one is easily transported to the other. Clearly, any chords not using the second string can be played immediately in either the Open G (major) or Open G Minor tunings. To use Open G (major) chords in the minor tuning, play the second string up one fret. Similarly, Open G minor chords can be used in the major tuning by playing the second string one fret down."];
// my_array_list_tuning["t9"]=["Open A Tuning","E.A.C#.E.A.E","Larry Sandberg says that the Open A tuning is especially useful for the &quot;delta blues sound,&quot; and it is a great bottleneck tuning, since it's easy to slide from minor to major on the fourth string.<br><br>Like most open tunings, it is easy to find alternate chord voicings by taking advantage of the strings that are tuned in octaves. Consider open position A minor 7 chords. The fourth string must be played on the third fret, but any other string can be played either open. or on the third fret. This leads to a wide variety of fingerings."];
// my_array_list_tuning["title_3"]="Instrumental Tunings";
// my_array_list_tuning["t10"]=["Cittern (1) Tuning","C.F.C.G.C.D","The cittern is an overgrown mandolin with an extra pair of strings. They can be tuned in a variety of open tunings, such as CFCGC, DGDAD, or GCGDG, all of which can be played using the fingerings shown here for strings 2 through 6. To play in DGDAD, transpose all chord names down two steps. To play in GCGDG, transpose down 5 steps (or capo up two and five steps, respectively).<br><br>There are several other popular cittern tunings which can be played using the Cittern 2 tuning on the next page. The table &quot;Cross Index of Tunings&quot; contains a complete list and more information."];
// my_array_list_tuning["t11"]=["Cittern (2) Tuning","C.G.C.G.C.G","The three pairs of fifths span three octaves and form a wider tuning than usual. The bass is deeper and the treble is higher. Chords tend to sound very &quot;open&quot; with large spacing between adjacent tones, and scales invariably require sliding up and down the fretboard. The stretches are just too long to comfortably play in a single position.<br><br>Barring a finger across all six strings sounds a chord that is neither major nor minor, and the three fifths tuning lends itself nicely to pieces that are tonally ambiguous."];
// my_array_list_tuning["t12"]=["Dobro Tuning","G.B.D.G.B.D","The dobro is a type of guitar with a metal resonator. It is usually held horizontally on the lap and played with a metal bar that acts like a moveable fret. It is typically tuned to a G major chord that is different from the G major chord of the Open G tuning (DGDGBD), though the three highest strings are identical. Consequently, the high three strings of both tunings can be played the same.<br><br>The dobro tuning offers two triplets of strings tuned an octave apart, which makes it easy to visualize chord forms and to transpose them up and down octaves. For instance, the three note A minor chord can be played either high or low, or the two octaves can be combined to form a more complete version."];
// my_array_list_tuning["t13"]=["Balalaika Tuning","E.A.D.E.E.A","The balalaika is a three stringed Russian folk instrument with a characteristic triangle shaped body. The balalaika family extends from the large bass (tuned EAD) through the tenor, alto, and the prima balalaika (which is tuned EEA). The balalaika tuning concatenates the bass and prima tunings onto one fretboard for an interesting, if not authentic, tuning.<br><br>The strength of the tuning lies in its natural keys, E and A, and in the trance like effect of the two E strings tuned to the same note. Unless you restring the guitar, the second string is very loose, which gives the tuning a &quot;sitar&quot; like quality."];
// my_array_list_tuning["t14"]=["Lefty Tuning","E.B.G.D.A.E","Watch a left handed guitarist play a right handed guitar - they play chords backwards - and finger them strangely, too. You can simulate this left/right confusion by restringing your guitar from high to low (or by programming a MIDI guitar controller). Interestingly, it doesn't take long to become quite proficient at left hand guitar (assuming you start out proficient at right hand guitar!), because the left/right symmetry makes many chords easier to remember. In general, scales are more confusing than chords - the sound often rises when you expect it to fall, and falls when you think it should rise. Many standard strums take on an interesting character because the &quot;alternating bass&quot; turns into an &quot;alternating treble.&quot; Some chords are easier to finger, like the barred E major. Some are more difficult: try to play an E ninth at the 7th fret. There are some surprises, too, some chords that &quot;don't exist&quot; in the standard tuning (note the F minor at the fifth fret). Hmm, I wonder what other tunings would be fun in their &quot;lefty&quot; versions?"];
// my_array_list_tuning["t15"]=["Overtone Tuning","C.E.G.A#.C.D","Built from the 4th through 9th partials of the harmonic series, the overtone tuning is highly compressed - all six strings fall within little more than a single octave. This causes some very tight chords and densely packed clusters of notes. Accordingly, the chord chart emphasizes intervallic chords such as the pandiatonic forms. Many of the major, minor, and seventh chords have repeating tones, which adds an interesting kind of chorus or depth to the sound. The tuning sounds like a &quot;soprano twelve string.&quot;"];
// my_array_list_tuning["t16"]=["Pentatonic Tuning","A.C.D.E.G.A","The six strings of the pentatonic tuning are formed from a single octave of the pentatonic scale. The tuning is highly compressed since all six strings span only a single octave. Chords tend to contain multiple copies of tones which gives an overall impression of chorusing and depth.<br><br>For those using a MIDI guitar controller, this is an excellent opportunity to assign each string to a different sound, since then multiple tones will not be exact copies. Then, changing the inversion or position of the chord changes the timbre."];
// my_array_list_tuning["title_4"]="Regular Tunings";
// my_array_list_tuning["t17"]=["Minor Third Tuning","C.D#.F#.A.C.D#","The strings of the minor third tuning form a C diminished chord. It is a highly compressed tuning since all six strings are tuned within a tenth. This is about the distance most adults can stretch their fingers on a keyboard, and chords tend to be closely voiced, almost keyboard-like. Unlike the piano, however, chords in the minor third tuning often contain multiple copies of a single note. Consider the three barred C major chords: the first and third contain doubled E's while the second contains doubled G's. Similarly, the open position C minor and F minor both contain copies of a C note. This is not necessarily bad. The sound of the two notes invariably differs somewhat due to differences in string widths, tensions and tunings, and the doubled notes reinforce each other, like the doubled strings of a twelve string guitar add chorusing and depth. When picking or arpeggiating chords, the doubled strings can add a unique percussive effect, and it is easy to play extremely fast mandolin-style picking on adjacent doubled notes."];
// my_array_list_tuning["t18"]=["Major Third Tuning","C.E.G#.C.E.G#","The major third tuning could be called the &quot;Open C Augmented&quot; tuning since it contains two octaves of a C augmented chord - two C's, two E's and two G#'s. Such multiple notes give a freedom to chord formation usually found only in open tunings. Whenever a chord is played at a particular fret on (say) the low C string, it can also be fretted at the same fret on the other C string. For example, an open E7 can be alternatively fingered in several ways...<br><br>Like all regular tunings, chords in the major third tuning can be moved across the fretboard (ascending or descending a major third for each string) as well as up and down the fretboard like a normal bar chord."];
// my_array_list_tuning["t19"]=["All Fourths Tuning","E.A.D.G.C.F","The All Fourths tuning is the closest regular tuning to the standard EBGDAE. Given the ease of remembering chord formations in regular tunings, why does tradition tune the highest two strings down a half step?<br><br>One reason may be the distinct lack of full six string major and minor chords in the All Fourths tuning, even in open position. There are, however, numerous easy-to-finger four and five string chords which can be moved readily around the fretboard.<br><br>All chords and scales from the low four strings of standard tuning can be used verbatim, and they can be transposed directly onto the upper two strings. Electric bass players often find this one of the easiest guitar tunings to use, since it is a very simple way to extend the tuning of the four string bass to a six string setting."];
// my_array_list_tuning["t20"]=["Aug Fourths Tuning","C.F#.C.F#.C.F#","The augmented fourth interval is the only interval whose inverse is the same as itself. The augmented fourths tuning is the only tuning (other than the &quot;trivial&quot; tuning CCCCCC) for which all chords forms remain unchanged when the strings are reversed. Thus the augmented fourths tuning is its own &quot;lefty&quot; tuning. If we lived in a world with an equal number of left and right handed guitar players, perhaps this tuning would be the standard!<br><br>There are numerous variants of the fingerings shown in the accompanying chord chart. Any fret played on any C (or F#) string can also be played on any other C (or F#) string. Since there are three C strings and three F# strings, this gives a wealth of possibilities. The five D7 and Dmaj7 chords give an idea of the vast possibilites. How many open position D major chords can you find?"];
// my_array_list_tuning["t21"]=["Mandoguitar Tuning","C.G.D.A.E.B","The four strings of a mandolin (like a violin) are tuned in a sequence of perfect fifths. The mandoguitar tuning expands this to a six string perfect fifth tuning, with one string a fifth below the violin and another string a fifth above. This provides a deeper bass than the guitar and simultaneously a higher treble.<br><br>Because the mandoguitar tuning is regular, you can move any chord both up and down the neck (like a normal bar chord) and you can also move any chord across the strings."];
// my_array_list_tuning["t22"]=["Minor Sixth Tuning","C.G#.E.C.G#.E","Like the major third tuning, this could also be called the &quot;Open C Augmented&quot; tuning, although the strings are ordered differently (CG#E instead of CEG#). Consequently, chord forms are related by swapping the fingerings of the first and fourth strings with those of the second and fifth strings, respectively, whenever this is physically possible.<br><br>Despite this formal similarity, the feel of the two tunings is vastly different. The minor sixth tuning is very wide, spanning over three octaves, while the major third tuning spans only an octave and a half. In practical terms, chords in the minor sixth tuning tend to be wide open, with large intervals between successive notes. They tend to have low basses and high trebles simultaneously. Chords in the major third tuning, on the other hand, tend to be compressed, often with multiple copies of the same note in the same octave."];
// my_array_list_tuning["t23"]=["Major Sixth Tuning","C.A.F#.D#.C.A","Like the minor third tuning, the strings of the major sixth tuning are tuned to a C diminished seventh chord. Both tunings contain the notes CAF#D#, though the strings are in a different order and different tones are doubled.<br><br>Despite this superficial similarity, the tunings are vastly different, primarily because the six strings of the minor third tuning are compressed into little more than an octave, while the major sixth tuning spans over three and a half octaves. As a result, chords in the major sixth tuning tend to sound sparse, with large intervals between successive chord notes. Scales are awkward because they cannot be played in a single position, making certain melodic passages awkward. On the other hand, the range of the tuning is immense, since there are five octaves from the lowest C to the highest C. This is as large a span as most midsized keyboards!"];
// my_array_list_tuning["title_5"]="Special Tunings";
// my_array_list_tuning["t24"]=["Admiral Tuning","C.G.D.G.B.C","Michael Hedge's song Admiral Rickover's Dream is played in this variant of the Open G tuning, in which strings 1 and 6 are tuned down two steps."];
// my_array_list_tuning["t25"]=["Buzzard Tuning","C.F.C.G.A#.F","The Buzzard tuning is from Will Ackerman's song of the same name. The open strings sound a C7sus4 chord, and the multiple C and F strings allow many useful fingering variations."];
// my_array_list_tuning["t26"]=["Drop D Tuning","D.A.D.G.B.E","Artists as diverse as the Beatles, Pete Seeger, John Denver, James Taylor, Happy Traum, and Jorma Kaukonen have all written and/or recorded tunes in the Drop D tuning. It is undeniably the most used alternate tuning, probably because it is so easy to get to (only the low E string needs to be retuned) and because most chords and scales remain unchanged from the familiar standard tuning. Since the only difference lies in the sixth string, the chord chart consists mainly of full six string chords, which should be liberally interspersed with familiar chords from the standard tuning - simply don't strum or pluck the lowest string."];
// my_array_list_tuning["t27"]=["Face Tuning","C.G.D.G.A.D","Michael Hedges tunes to an A minor 7 chord with a suspended 4th (ACGD) in Face Yourself, though it sounds more grounded in C (an incomplete C6add9?) or in G (G with a 4th and 2cnd). Whatever the key, it feels nice."];
// my_array_list_tuning["t28"]=["Four & Twenty Tuning","D.A.D.D.A.D","This tuning was popularized by Crosby, Stills, Nash and Young in their songs Four and Twenty and Suite: Judy Blue Eyes (which was transposed up one whole step). Strumming the open strings of the Four and Twenty tuning sounds a chord that is harmonically ambiguous - neither major nor minor, and perhaps this accounts for some of the charm of these songs. The doubled string adds an interesting flavor to finger picked passages, since the same tones repeat, though with slight timbral differences due to string thickness and weight.<br><br>Since the tuning has multiple D's and A's, there tend to be numerous variants possible on any given chord form. For instance, an open position D minor 7 can be played (along with many other variants) while a B minor 7 could be fingered. The general rule is that whenever a given fret is played on (say) a D string, that same fret can be played on any other D string."];
// my_array_list_tuning["t29"]=["Hot Type Tuning","A.B.E.F#.A.D","This unique tuning is from Michael Hedges song of the same name. String 6 is lowered a full fifth, while string 5 is raised two steps, creating a leap of more than an octave between the two bass strings. In compensation, there are small intervals between the second, third, and fourth strings. Thus the Hot Type tuning has elements of a compressed tuning and elements of a wide tuning. Make sure that you use a heavy guage 6th string or the low A will sound flabby."];
// my_array_list_tuning["t30"]=["Layover Tuning","D.A.C.G.C.E","In his song Layover, Michael Hedges tunes strings 1-5 to an Amin7 chord. The sixth string, a D, officially makes it a suspended fourth chord, but it doesn't sound that way. The notes of the tuning are the same as the notes of the Pentatonic tuning, but they're all scrambled up."];
// my_array_list_tuning["t31"]=["Magic Farmer Tuning","C.F.C.G.A.E","Michael Hedge's Magic Farmer tuning is closely related to his Buzzard tuning; strings 3-6 are identical, while the first two strings are lowered one step. The tunings play similarly, and many of the fingerings on the two chord charts can be interchanged."];
// my_array_list_tuning["t32"]=["Pelican Tuning","D.A.D.E.A.D","This tuning is taken from John Renbourn's song of the same name, in which the strings are tuned to a D suspended second chord that sounds a nice neutral tonality, neither major nor minor, neither soft nor harsh. The Pelican tuning is intimately related to the Open D minor tuning (DADFAD) since five of the strings are tuned identically while the last string is only one half step away. Consequently, chords from the D minor chord chart can often be used when playing in the Pelican tuning, though fingers on the third string need to be moved up the fretboard one position. For instance, open D minor chords are quite similar..."];
// my_array_list_tuning["t33"]=["Processional Tuning","D.G.D.F.A.A#","Will Ackerman's tuning from the song Processional is interesting because the highest strings are only one step apart, allowing some very tightly voiced chords. The tuning is closest to Ackerman's own Triqueen tuning, with strings 1 and 3 differing by only one step."];
// my_array_list_tuning["t34"]=["Slow Motion Tuning","D.G.D.F.C.D","Any tuning with multiple octaves of a single note allows chord variations by moving fingers among the octaves. Will Ackerman's Slow Motion tuning is no exception. The open position D minor chord, for instance, can be varied in sveral ways...<br><br>One quirk of the Slow Motion tuning is the seventh chord form (the second D7 on the chart), which fingers exactly like a 7th chord in Standard tuning. The Fmin7 is also fingered exactly like a Bb major in Standard tuning. Though the fingers remain the same, the sounds are quite different."];
// my_array_list_tuning["t35"]=["Spirit Tuning","C#.A.C#.G#.A.E","In the Spirit tuning, the strings are tuned to an Amaj7 chord. The tuning can be quite uplifting despite Will Ackerman's song Impending Death of the Virgin Spirit for which it is named."];
// my_array_list_tuning["t36"]=["Tarboulton Tuning","C.A#.C.F.A#.F","Taken from John Renbourn's song of the same name, the Tarboulton tuning is one of the more interesting of the modern tunings because of its combination of intervals - a major seventh, a major second, two perfect fourths, and a fifth. The tuning plays easily in both F and A# though the wealth of bar chords ensures that any key is feasible.<br><br>There are three pairs of strings, two C's, two F's and two A#'s. Whenever a given string is played at any fret, its mate can also be played at the same fret. Accordingly, alternate chord forms substitute strings 4 and 6, 1 and 3, and/or 2 and 5."];
// my_array_list_tuning["t37"]=["Toulouse Tuning","E.C.D.F.A.D","The Doobie Brothers used this tuning in their song Toulouse Street. Although the chord forms are quite different from Standard, it's easy to learn the bar chords (and to remember them at the right frets) because the low E string is unchanged."];
// my_array_list_tuning["t38"]=["Triqueen Tuning","D.G.D.F#.A.B","Triqueen is a shortening of Pink Chiffon Tricycle Queen, another of Will Ackerman's songs in an alternate tuning. Triqueen plays smoothly, and there are many fun chord forms lurking in the chord chart that are not shown explicitely. For instance, the open position A7th chord can be moved up two frets to a B7th chord in several ways..."];
// var my_array_scale_altname=[];
// my_array_scale_altname["Major"]="Ionian";
// my_array_scale_altname["Dorian"]="";
// my_array_scale_altname["Phrygian"]="";
// my_array_scale_altname["Lydian"]="";
// my_array_scale_altname["Mixolydian"]="";
// my_array_scale_altname["Aeolian"]="Natural Minor|Pure Minor";
// my_array_scale_altname["Locrian"]="";
// my_array_scale_altname["Harmonic Minor"]="";
// my_array_scale_altname["Spanish Phrygian"]="Gypsy";
// my_array_scale_altname["Melodic Minor"]="Jazz Melodic Minor|Jazz Minor";
// my_array_scale_altname["Dorian b2"]="Phrygian #6|Javanese";
// my_array_scale_altname["Lydian Augmented"]="";
// my_array_scale_altname["Lydian Dominant"]="Mixolydian #4|Overtone";
// my_array_scale_altname["Mixolydian b6"]="Hindu|Spanish";
// my_array_scale_altname["Locrian #2"]="";
// my_array_scale_altname["Altered"]="Super Locrian|Diminished Whole Tone";
// my_array_scale_altname["Major Pentatonic"]="";
// my_array_scale_altname["Minor Pentatonic"]="";
// my_array_scale_altname["Blues Scale"]="";
// my_array_scale_altname["Major Blues Scale"]="";
// my_array_scale_altname["Egyptian"]="";
// my_array_scale_altname["Hirajoshi"]="Kumoi|Iwato";
// my_array_scale_altname["Pelog"]="";
// my_array_scale_altname["Balinese"]="";
// my_array_scale_altname["Japanese"]="In Sen";
// my_array_scale_altname["Chinese"]="";
// my_array_scale_altname["Chinese 2"]="";
// my_array_scale_altname["Half/Whole Diminished"]="";
// my_array_scale_altname["Whole/Half Diminished"]="";
// my_array_scale_altname["Whole Tone"]="";
// my_array_scale_altname["Bebop Dominant"]="";
// my_array_scale_altname["Bebop Major"]="";
// my_array_scale_altname["Hungarian Major"]="";
// my_array_scale_altname["Hungarian Minor"]="Algerian";
// my_array_scale_altname["Enigmatic"]="";
// my_array_scale_altname["Neopolitan Major"]="";
// my_array_scale_altname["Neopolitan Minor"]="";
// my_array_scale_altname["Flamenco"]="";
// my_array_scale_altname["Arabian"]="";
// my_array_scale_altname["Persian"]="";
// my_array_scale_altname["Byzantine"]="";
// my_array_scale_altname["Jewish"]="";

// var chord_progressions_arr = ["Major Triads I-ii-iii-IV-V-vi-vii*","Major 7-th I-ii-iii-IV-V-vi-vii","Major 6-th I-ii-IV-V","Major 9-th I-ii-IV-V-vi","Natural Minor Triads i-ii*-III-iv-v-VI-VII","Harmonic Minor Triad i-ii*-III-iv-V-VI-vii*","Melodic Minor Triad i-ii-III-IV-V-vi*-vii*"];
// var chord_progressions = [];
// chord_progressions[0]=[];
// chord_progressions[1]=[];
// chord_progressions[2]=[];
// chord_progressions[3]=[];
// chord_progressions[4]=[];
// chord_progressions[5]=[];
// chord_progressions[6]=[];

// chord_progressions[0]["C"]=["C maj","D m","E m","F maj","G maj","A m","B dim"];
// chord_progressions[1]["C"]=["C maj7","D m7","E m7","F maj7","G 7","A m7","B m7(b5)"];
// chord_progressions[2]["C"]=["C 6","D m6","F 6","G 6"];
// chord_progressions[3]["C"]=["C maj9","D m9","F maj9","G 9","A m9"];
// chord_progressions[4]["C"]=["C m","D dim","D#/Eb maj","F m","G m","G#/Ab maj","A#/Bb maj"];
// chord_progressions[5]["C"]=["C m","D dim","D#/Eb +","F m","G maj","G#/Ab maj","B dim"];
// chord_progressions[6]["C"]=["C m","D m","D#/Eb +","F maj","G maj","A dim","B dim"];
// chord_progressions[0]["C#"]=["C#/Db maj","D#/Eb m","F m","F#/Gb maj","G#/Ab maj","A#/Bb m","C dim"];
// chord_progressions[0]["Db"]=["C#/Db maj","D#/Eb m","F m","F#/Gb maj","G#/Ab maj","A#/Bb m","C dim"];
// chord_progressions[1]["C#"]=["C#/Db maj7","D#/Eb m7","F m7","F#/Gb maj7","G#/Ab 7","A#/Bb m7","C m7(b5)"];
// chord_progressions[1]["Db"]=["C#/Db maj7","D#/Eb m7","F m7","F#/Gb maj7","G#/Ab 7","A#/Bb m7","C m7(b5)"];
// chord_progressions[2]["C#"]=["C#/Db 6","D#/Eb m6","F#/Gb 6","G#/Ab 6"];
// chord_progressions[2]["Db"]=["C#/Db 6","D#/Eb m6","F#/Gb 6","G#/Ab 6"];
// chord_progressions[3]["C#"]=["C#/Db maj9","D#/Eb m9","F#/Gb maj9","G#/Ab 9","A#/Bb m9"];
// chord_progressions[3]["Db"]=["C#/Db maj9","D#/Eb m9","F#/Gb maj9","G#/Ab 9","A#/Bb m9"];
// chord_progressions[4]["C#"]=["C#/Db m","D#/Eb dim","E maj","F#/Gb m","G#/Ab m","A maj","B maj"];
// chord_progressions[4]["Db"]=["C#/Db m","D#/Eb dim","E maj","F#/Gb m","G#/Ab m","A maj","B maj"];
// chord_progressions[5]["C#"]=["C#/Db m","D#/Eb dim","E +","F#/Gb m","G#/Ab maj","A maj","C dim"];
// chord_progressions[5]["Db"]=["C#/Db m","D#/Eb dim","E +","F#/Gb m","G#/Ab maj","A maj","C dim"];
// chord_progressions[6]["C#"]=["C#/Db m","D#/Eb m","E +","F#/Gb maj","G#/Ab maj","A#/Bb dim","C dim"];
// chord_progressions[6]["Db"]=["C#/Db m","D#/Eb m","E +","F#/Gb maj","G#/Ab maj","A#/Bb dim","C dim"];
// chord_progressions[0]["D"]=["D maj","E m","F#/Gb m","G maj","A maj","B m","C#/Db dim"];
// chord_progressions[1]["D"]=["D maj7","E m7","F#/Gb m7","G maj7","A 7","B m7","C#/Db m7(b5)"];
// chord_progressions[2]["D"]=["D 6","E m6","G 6","A 6"];
// chord_progressions[3]["D"]=["D maj9","E m9","G maj9","A 9","B m9"];
// chord_progressions[4]["D"]=["D m","E dim","F maj","G m","A m","A#/Bb maj","C maj"];
// chord_progressions[5]["D"]=["D m","E dim","F +","G m","A maj","A#/Bb maj","C#/Db dim"];
// chord_progressions[6]["D"]=["D m","E m","F +","G maj","A maj","B dim","C#/Db dim"];
// chord_progressions[0]["D#"]=["D#/Eb maj","F m","G m","G#/Ab maj","A#/Bb maj","C m","D dim"];
// chord_progressions[0]["Eb"]=["D#/Eb maj","F m","G m","G#/Ab maj","A#/Bb maj","C m","D dim"];
// chord_progressions[1]["D#"]=["D#/Eb maj7","F m7","G m7","G#/Ab maj7","A#/Bb 7","C m7","D m7(b5)"];
// chord_progressions[1]["Eb"]=["D#/Eb maj7","F m7","G m7","G#/Ab maj7","A#/Bb 7","C m7","D m7(b5)"];
// chord_progressions[2]["D#"]=["D#/Eb 6","F m6","G#/Ab 6","A#/Bb 6"];
// chord_progressions[2]["Eb"]=["D#/Eb 6","F m6","G#/Ab 6","A#/Bb 6"];
// chord_progressions[3]["D#"]=["D#/Eb maj9","F m9","G#/Ab maj9","A#/Bb 9","C m9"];
// chord_progressions[3]["Eb"]=["D#/Eb maj9","F m9","G#/Ab maj9","A#/Bb 9","C m9"];
// chord_progressions[4]["D#"]=["D#/Eb m","F dim","F#/Gb maj","G#/Ab m","A#/Bb m","B maj","C#/Db maj"];
// chord_progressions[4]["Eb"]=["D#/Eb m","F dim","F#/Gb maj","G#/Ab m","A#/Bb m","B maj","C#/Db maj"];
// chord_progressions[5]["D#"]=["D#/Eb m","F dim","F#/Gb +","G#/Ab m","A#/Bb maj","B maj","D dim"];
// chord_progressions[5]["Eb"]=["D#/Eb m","F dim","F#/Gb +","G#/Ab m","A#/Bb maj","B maj","D dim"];
// chord_progressions[6]["D#"]=["D#/Eb m","F m","F#/Gb +","G#/Ab maj","A#/Bb maj","C dim","D dim"];
// chord_progressions[6]["Eb"]=["D#/Eb m","F m","F#/Gb +","G#/Ab maj","A#/Bb maj","C dim","D dim"];
// chord_progressions[0]["E"]=["E maj","F#/Gb m","G#/Ab m","A maj","B maj","C#/Db m","D#/Eb dim"];
// chord_progressions[1]["E"]=["E maj7","F#/Gb m7","G#/Ab m7","A maj7","B 7","C#/Db m7","D#/Eb m7(b5)"];
// chord_progressions[2]["E"]=["E 6","F#/Gb m6","A 6","B 6"];
// chord_progressions[3]["E"]=["E maj9","F#/Gb m9","A maj9","B 9","C#/Db m9"];
// chord_progressions[4]["E"]=["E m","F#/Gb dim","G maj","A m","B m","C maj","D maj"];
// chord_progressions[5]["E"]=["E m","F#/Gb dim","G +","A m","B maj","C maj","D#/Eb dim"];
// chord_progressions[6]["E"]=["E m","F#/Gb m","G +","A maj","B maj","C#/Db dim","D#/Eb dim"];
// chord_progressions[0]["F"]=["F maj","G m","A m","A#/Bb maj","C maj","D m","E dim"];
// chord_progressions[1]["F"]=["F maj7","G m7","A m7","A#/Bb maj7","C 7","D m7","E m7(b5)"];
// chord_progressions[2]["F"]=["F 6","G m6","A#/Bb 6","C 6"];
// chord_progressions[3]["F"]=["F maj9","G m9","A#/Bb maj9","C 9","D m9"];
// chord_progressions[4]["F"]=["F m","G dim","G#/Ab maj","A#/Bb m","C m","C#/Db maj","D#/Eb maj"];
// chord_progressions[5]["F"]=["F m","G dim","G#/Ab +","A#/Bb m","C maj","C#/Db maj","E dim"];
// chord_progressions[6]["F"]=["F m","G m","G#/Ab +","A#/Bb maj","C maj","D dim","E dim"];
// chord_progressions[0]["F#"]=["F#/Gb maj","G#/Ab m","A#/Bb m","B maj","C#/Db maj","D#/Eb m","F dim"];
// chord_progressions[0]["Gb"]=["F#/Gb maj","G#/Ab m","A#/Bb m","B maj","C#/Db maj","D#/Eb m","F dim"];
// chord_progressions[1]["F#"]=["F#/Gb maj7","G#/Ab m7","A#/Bb m7","B maj7","C#/Db 7","D#/Eb m7","F m7(b5)"];
// chord_progressions[1]["Gb"]=["F#/Gb maj7","G#/Ab m7","A#/Bb m7","B maj7","C#/Db 7","D#/Eb m7","F m7(b5)"];
// chord_progressions[2]["F#"]=["F#/Gb 6","G#/Ab m6","B 6","C#/Db 6"];
// chord_progressions[2]["Gb"]=["F#/Gb 6","G#/Ab m6","B 6","C#/Db 6"];
// chord_progressions[3]["F#"]=["F#/Gb maj9","G#/Ab m9","B maj9","C#/Db 9","D#/Eb m9"];
// chord_progressions[3]["Gb"]=["F#/Gb maj9","G#/Ab m9","B maj9","C#/Db 9","D#/Eb m9"];
// chord_progressions[4]["F#"]=["F#/Gb m","G#/Ab dim","A maj","B m","C#/Db m","D maj","E maj"];
// chord_progressions[4]["Gb"]=["F#/Gb m","G#/Ab dim","A maj","B m","C#/Db m","D maj","E maj"];
// chord_progressions[5]["F#"]=["F#/Gb m","G#/Ab dim","A +","B m","C#/Db maj","D maj","F dim"];
// chord_progressions[5]["Gb"]=["F#/Gb m","G#/Ab dim","A +","B m","C#/Db maj","D maj","F dim"];
// chord_progressions[6]["F#"]=["F#/Gb m","G#/Ab m","A +","B maj","C#/Db maj","D#/Eb dim","F dim"];
// chord_progressions[6]["Gb"]=["F#/Gb m","G#/Ab m","A +","B maj","C#/Db maj","D#/Eb dim","F dim"];
// chord_progressions[0]["G"]=["G maj","A m","B m","C maj","D maj","E m","F#/Gb dim"];
// chord_progressions[1]["G"]=["G maj7","A m7","B m7","C maj7","D 7","E m7","F#/Gb m7(b5)"];
// chord_progressions[2]["G"]=["G 6","A m6","C 6","D 6"];
// chord_progressions[3]["G"]=["G maj9","A m9","C maj9","D 9","E m9"];
// chord_progressions[4]["G"]=["G m","A dim","A#/Bb maj","C m","D m","D#/Eb maj","F maj"];
// chord_progressions[5]["G"]=["G m","A dim","A#/Bb +","C m","D maj","D#/Eb maj","F#/Gb dim"];
// chord_progressions[6]["G"]=["G m","A m","A#/Bb +","C maj","D maj","E dim","F#/Gb dim"];
// chord_progressions[0]["G#"]=["G#/Ab maj","A#/Bb m","C m","C#/Db maj","D#/Eb maj","F m","G dim"];
// chord_progressions[0]["Ab"]=["G#/Ab maj","A#/Bb m","C m","C#/Db maj","D#/Eb maj","F m","G dim"];
// chord_progressions[1]["G#"]=["G#/Ab maj7","A#/Bb m7","C m7","C#/Db maj7","D#/Eb 7","F m7","G m7(b5)"];
// chord_progressions[1]["Ab"]=["G#/Ab maj7","A#/Bb m7","C m7","C#/Db maj7","D#/Eb 7","F m7","G m7(b5)"];
// chord_progressions[2]["G#"]=["G#/Ab 6","A#/Bb m6","C#/Db 6","D#/Eb 6"];
// chord_progressions[2]["Ab"]=["G#/Ab 6","A#/Bb m6","C#/Db 6","D#/Eb 6"];
// chord_progressions[3]["G#"]=["G#/Ab maj9","A#/Bb m9","C#/Db maj9","D#/Eb 9","F m9"];
// chord_progressions[3]["Ab"]=["G#/Ab maj9","A#/Bb m9","C#/Db maj9","D#/Eb 9","F m9"];
// chord_progressions[4]["G#"]=["G#/Ab m","A#/Bb dim","B maj","C#/Db m","D#/Eb m","E maj","F#/Gb maj"];
// chord_progressions[4]["Ab"]=["G#/Ab m","A#/Bb dim","B maj","C#/Db m","D#/Eb m","E maj","F#/Gb maj"];
// chord_progressions[5]["G#"]=["G#/Ab m","A#/Bb dim","B +","C#/Db m","D#/Eb maj","E maj","G dim"];
// chord_progressions[5]["Ab"]=["G#/Ab m","A#/Bb dim","B +","C#/Db m","D#/Eb maj","E maj","G dim"];
// chord_progressions[6]["G#"]=["G#/Ab m","A#/Bb m","B +","C#/Db maj","D#/Eb maj","F dim","G dim"];
// chord_progressions[6]["Ab"]=["G#/Ab m","A#/Bb m","B +","C#/Db maj","D#/Eb maj","F dim","G dim"];
// chord_progressions[0]["A"]=["A maj","B m","C#/Db m","D maj","E maj","F#/Gb m","G#/Ab dim"];
// chord_progressions[1]["A"]=["A maj7","B m7","C#/Db m7","D maj7","E 7","F#/Gb m7","G#/Ab m7(b5)"];
// chord_progressions[2]["A"]=["A 6","B m6","D 6","E 6"];
// chord_progressions[3]["A"]=["A maj9","B m9","D maj9","E 9","F#/Gb m9"];
// chord_progressions[4]["A"]=["A m","B dim","C maj","D m","E m","F maj","G maj"];
// chord_progressions[5]["A"]=["A m","B dim","C +","D m","E maj","F maj","G#/Ab dim"];
// chord_progressions[6]["A"]=["A m","B m","C +","D maj","E maj","F#/Gb dim","G#/Ab dim"];
// chord_progressions[0]["A#"]=["A#/Bb maj","C m","D m","D#/Eb maj","F maj","G m","A dim"];
// chord_progressions[0]["Bb"]=["A#/Bb maj","C m","D m","D#/Eb maj","F maj","G m","A dim"];
// chord_progressions[1]["A#"]=["A#/Bb maj7","C m7","D m7","D#/Eb maj7","F 7","G m7","A m7(b5)"];
// chord_progressions[1]["Bb"]=["A#/Bb maj7","C m7","D m7","D#/Eb maj7","F 7","G m7","A m7(b5)"];
// chord_progressions[2]["A#"]=["A#/Bb 6","C m6","D#/Eb 6","F 6"];
// chord_progressions[2]["Bb"]=["A#/Bb 6","C m6","D#/Eb 6","F 6"];
// chord_progressions[3]["A#"]=["A#/Bb maj9","C m9","D#/Eb maj9","F 9","G m9"];
// chord_progressions[3]["Bb"]=["A#/Bb maj9","C m9","D#/Eb maj9","F 9","G m9"];
// chord_progressions[4]["A#"]=["A#/Bb m","C dim","C#/Db maj","D#/Eb m","F m","F#/Gb maj","G#/Ab maj"];
// chord_progressions[4]["Bb"]=["A#/Bb m","C dim","C#/Db maj","D#/Eb m","F m","F#/Gb maj","G#/Ab maj"];
// chord_progressions[5]["A#"]=["A#/Bb m","C dim","C#/Db +","D#/Eb m","F maj","F#/Gb maj","A dim"];
// chord_progressions[5]["Bb"]=["A#/Bb m","C dim","C#/Db +","D#/Eb m","F maj","F#/Gb maj","A dim"];
// chord_progressions[6]["A#"]=["A#/Bb m","C m","C#/Db +","D#/Eb maj","F maj","G dim","A dim"];
// chord_progressions[6]["Bb"]=["A#/Bb m","C m","C#/Db +","D#/Eb maj","F maj","G dim","A dim"];
// chord_progressions[0]["B"]=["B maj","C#/Db m","D#/Eb m","E maj","F#/Gb maj","G#/Ab m","A#/Bb dim"];
// chord_progressions[1]["B"]=["B maj7","C#/Db m7","D#/Eb m7","E maj7","F#/Gb 7","G#/Ab m7","A#/Bb m7(b5)"];
// chord_progressions[2]["B"]=["B 6","C#/Db m6","E 6","F#/Gb 6"];
// chord_progressions[3]["B"]=["B maj9","C#/Db m9","E maj9","F#/Gb 9","G#/Ab m9"];
// chord_progressions[4]["B"]=["B m","C#/Db dim","D maj","E m","F#/Gb m","G maj","A maj"];
// chord_progressions[5]["B"]=["B m","C#/Db dim","D +","E m","F#/Gb maj","G maj","A#/Bb dim"];
// chord_progressions[6]["B"]=["B m","C#/Db m","D +","E maj","F#/Gb maj","G#/Ab dim","A#/Bb dim"];

// myStartUp=true;
