<template>
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

    <svg  viewBox="0 0 500 500">
      <g
        transform="translate(82.453 82.563)"
        style="stroke: orange; stroke-width: 3; stroke-linejoin: bevel"
      >
        <!-- <g id="e"> -->
          <g id="d">
            <g id="c">
              <g id="b">
                <g id="f">
                  <path id="a" d="M70.5-.502h9V.503h-9z" />
                  <use xlink:href="#a" transform="rotate(5.37)" />
                  <use xlink:href="#a" transform="rotate(10.75)" />
                </g>
                <use xlink:href="#a" transform="rotate(16.12)" />
              </g>
              <use xlink:href="#b" transform="rotate(21.49)" />
            </g>
            <use xlink:href="#c" transform="rotate(42.99)" />
          </g>
          <use xlink:href="#d" transform="rotate(85.97)" />
        <!-- </g> -->
        <!-- <use xlink:href="#e" transform="rotate(171.94)" /> -->
        <!-- <use xlink:href="#f" transform="rotate(343.88)" /> -->
      </g>
    </svg>
    

    <div class="knob-inner">
      <div class="knobline"></div>
    </div>
  </div>
  <div class="knobtitle">{{ title }}</div>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style>
.knob {
  /* position: absolute; */
  display: flex;
  background: #222;
  height: 3.5em;
  width: 3.5em;
  left: -1.75em;
  top: 0.125em;
  border-radius: 50%;
  /* margin-left: 50%; */
  animation: rotate 5s infinite;
}

.knob-inner {
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
  height: 0.5em;
  border-top-left-radius: 0.125em;
  border-top-right-radius: 0.125em;
  background: #fff;
  margin-left: -0.06em;
}

svg {
  position: absolute;
  width: 100%;
  /* transform: rotate(25deg); control the rotation here */
}
</style>