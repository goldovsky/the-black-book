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
 * 3 : name
 * 4 : strings (from high to low)
 *
 * NOTES/TODO
 * change E by E4...
 */

export default [
    {
      guitar: {
        nb_strings_6: {
            standard: [ "E4", "B3", "G3", "D3", "A2", "E2" ]
        },
        nb_strings_7: {},
        nb_strings_8: {}
      },
      bass: {
        nb_strings_5: {}
      }
    },
  ];

 /* 
 * NOTE: strings are inverted from the format I wanna use
 [
    { "type": "guitar",  "name": "Standard",       "strings": [ "E", "A", "D", "G", "B", "E" ] },
    { "type": "guitar",  "name": "Open A",         "strings": [ "E", "A", "C#", "E", "A", "E" ] },
    { "type": "guitar",  "name": "Open B",         "strings": [ "B", "F#", "B", "F#", "B", "D#" ] },
    { "type": "guitar",  "name": "Open C",         "strings": [ "C", "G", "C", "G", "C", "E" ] },
    { "type": "guitar",  "name": "Open D",         "strings": [ "D", "A", "D", "F#", "A", "D" ] },
    { "type": "guitar",  "name": "Open D minor",   "strings": [ "D", "A", "D", "F", "A", "D" ] },
    { "type": "guitar",  "name": "Open E",         "strings": [ "E", "B", "E", "G#", "B", "E" ] },
    { "type": "guitar",  "name": "Open F",         "strings": [ "C", "F", "C", "F", "A", "C" ] },
    { "type": "guitar",  "name": "Open G",         "strings": [ "D", "G", "D", "G", "B", "D" ] },
    { "type": "guitar",  "name": "Half step down", "strings": [ "D#", "G#", "C#", "F#", "A#", "D#" ] },
    { "type": "guitar",  "name": "Full step down", "strings": [ "D", "G", "C", "F", "A", "D" ] },
    { "type": "guitar",  "name": "Drop D",         "strings": [ "D", "A", "D", "G", "B", "E" ] },
    { "type": "guitar",  "name": "Drop C#",        "strings": [ "C#", "G#", "C#", "F#", "A#", "D#" ] },
    { "type": "guitar",  "name": "Drop C",         "strings": [ "C", "G", "C", "F", "A", "D" ] },
    { "type": "guitar",  "name": "Drop B",         "strings": [ "B", "F#", "B", "E", "G#", "C#" ] },
    { "type": "guitar",  "name": "Drop A",         "strings": [ "A", "E", "A", "D", "F#", "B" ] },
    { "type": "guitar",  "name": "Baritone 4th",   "strings": [ "B", "E", "A", "D", "F#", "B" ] },
    { "type": "guitar",  "name": "Baritone 5th",   "strings": [ "A", "D", "G", "C", "E", "A" ] },
  
    { "type": "guitar",  "name": "Standard",       "strings": [ "B", "E", "A", "D", "G", "B", "E" ] },
    { "type": "guitar",  "name": "Full step down", "strings": [ "A", "D", "G", "C", "F", "A", "D" ] },
    { "type": "guitar",  "name": "Standard",       "strings": [ "F#", "B", "E", "A", "D", "G", "B", "E" ] },
    { "type": "guitar",  "name": "Drop E",         "strings": [ "E", "B", "E", "A", "D", "G", "B", "E" ] },
    { "type": "guitar",  "name": "Standard",       "strings": [ "C#", "F#", "B", "E", "A", "D", "G", "B", "E" ] },
  
    { "type": "bass",    "name": "Standard",          "strings": [ "E", "A", "D", "G" ] },
    { "type": "bass",    "name": "Drop D",            "strings": [ "D", "A", "D", "G" ] },
    { "type": "bass",    "name": "Standard (low B)",  "strings": [ "B", "E", "A", "D", "G" ] },
    { "type": "bass",    "name": "Standard (high C)", "strings": [ "E", "A", "D", "G", "C" ] },
    { "type": "bass",    "name": "Standard",          "strings": [ "B", "E", "A", "D", "G", "C" ] },
  
    { "type": "ukelele", "name": "Standard",       "strings": [ "G", "C", "E", "A" ] },
    { "type": "ukelele", "name": "Guitar",         "strings": [ "D", "G", "B", "E" ] },
    { "type": "ukelele", "name": "D tuning",       "strings": [ "A", "D", "F#", "B" ] }
  ]
  */