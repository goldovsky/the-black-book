export default {
    brand : "Peavey",
    model: "Classic 20 Mini-Head",
    settings:  {
      front: {
        channels: [
          {
            volume: 5
          },
          {
            pre: 5,
            post: 5
          }
        ],
        equalizer: {
          bass: 5,
          middle: 5,
          treble: 5
        },
        reverb: 5
      },
      back: {
        attenuateur: [
          "20W",
          "5W",
          "1W"
        ],
        mic_simulated_direct_interface: {
          speaker: true,
          ground_lift: true
        },
        footswitch: {
          boost: false,
          reverb: false
        }
      }
    },
    comments: {
      title: "",
      description: ""
    }
  };