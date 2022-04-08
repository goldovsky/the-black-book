<template>
  <div class="parenttitle">
    <span
      v-for="(letter, index) in title"
      :key="index"
      :style="{
        transform:
          'translatex(' +
          letterPosition(index) +
          'px) rotate(' +
          letterRotation(index) +
          'deg)',
      }"
      class="letterspan"
      >{{ letter }}</span
    >
  </div>
  <div class="knob">
    <!-- <svg>
          <circle
          cx="28"
          cy="28"
          r="27"
          fill="transparent"
          stroke="red"
          stroke-width="2"
          strokeDasharray= "1150"
          stroke-dashoffset="890"
        />
      </svg> -->

    <!-- viewBox="0 0 500 500" -->
    <svg class="svgclass" viewBox="-82 -83 550 550">
      <!-- transform="translate(82.453 82.563)" -->
      <g style="stroke-width: 3; stroke-linejoin: bevel">
        <g :style="{ transform: 'rotate(' + (180 - 85 / 2) + 'deg)' }">
          <g v-for="(nb, index) in 11" :key="index" :id="'dash' + (nb + 3)">
            <g id="dash3">
              <!-- LONG DASH -->
              <path id="dash1" d="M70.5-.502h15V.503h-9z" class="longdash" />
              <!-- SHORT DASH -->
              <path id="dash2" d="M70.5-.502h5V.503h-5z" class="shortdash" />
            </g>
            <use
              xlink:href="#dash3"
              :style="{ transform: 'rotate(' + 22 * nb + 'deg)' }"
            />
          </g>
          <!-- LAST LONG DASH -->
          <path
            id="dash23"
            d="M70.5-.502h12V.503h-9z"
            :style="{ transform: 'rotate(' + 11 * 24 + 'deg)' }"
            class="longdash"
          />
        </g>
      </g>
    </svg>

    <div class="knob-edge">
      <div class="knob-top-metal">
        <div class="knobline"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title"],
  methods: {
    letterPosition(index) {
      let response = 1 + index + this.title.length / 2;
      return response * 8 -40;
    },
    letterRotation(index) {
      let singleAngle = 10;
      return singleAngle * -(index + -this.title.length / 2);
    },
  },
};
</script>

<style>
.knob {
  /* position: absolute; */
  display: flex;
  /* background: #222; */
  height: 3.5em;
  width: 3.5em;
  left: -1.75em;
  top: 0.125em;
  border-radius: 50%;
  /* margin-left: 50%; */
  animation: rotate 5s infinite;
}
.knob-edge {
  display: flex;
  background-color: black;
  border-radius: 50%;
  height: 80%;
  width: 80%;
  margin: auto;
}

.knob-top-metal {
  /* position: absolute; */
  width: 80%; /* 2.5em */
  height: 80%; /* 2.5em */
  border-radius: 50%;
  left: 0.5em;
  top: 0.5em;
  margin: auto;
  background: #999;
  background-image: 
          /* LEFT HORIZONTAL BAR */ -webkit-radial-gradient(
      0% 50%,
      50% 15%,
      hsla(0, 0%, 100%, 0.9) 0%,
      hsla(0, 0%, 100%, 0) 100%
    ),
    /* RIGHT HORIZONTAL BAR */ -webkit-radial-gradient(100% 50%, 50% 15%, hsla(
            0,
            0%,
            100%,
            0.9
          )
          0%, hsla(0, 0%, 100%, 0) 100%),
    /* BACKGROUND CIRCLES */ -webkit-repeating-radial-gradient(50% 50%, 100%
          100%, hsla(0, 0%, 0%, 0) 0%, hsla(0, 0%, 0%, 0) 3%, hsla(
            0,
            0%,
            0%,
            0.1
          )
          3.5%),
    /* WHOLE STUFF */ -webkit-radial-gradient(50% 50%, 200% 50%, hsla(
            0,
            0%,
            90%,
            1
          )
          5%, hsla(0, 0%, 85%, 1) 30%, hsla(0, 0%, 60%, 1) 100%);
  animation: no-rotate 5s infinite;
}

.knobline {
  display: inline;
  content: "";
  position: fixed;
  width: 0.125em;
  height: 0.8em;
  border-top-left-radius: 0.125em;
  border-top-right-radius: 0.125em;
  background: #fff;
  margin-left: -0.06em;
}

.svgclass {
  position: absolute;
  width: 100%;
  /* transform: rotate(25deg); control the rotation here */
}

.longdash {
  stroke: white;
}
.shortdash {
  stroke: white;
  transform: translateX(8px) rotate(12deg);
}

.parenttitle {
  display:flex;
  align-items: flex-start;
  align-content:center;
  justify-content: center;
}
.letterspan {
  font: 13px Monaco, MonoSpace;
  position: absolute;
  /* padding-top: 15px; */
  margin-top: 50px;
  display: block;
  transform-origin: top center;
}
</style>