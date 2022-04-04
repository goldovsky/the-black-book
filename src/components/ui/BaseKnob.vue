<template>
  <div class="knob">
  <svg viewBox="-3 -3 106 106">
    <defs>
      <mask id="m">
        <rect x="-3" y="-2" width="100%" height="100%" fill="white" />
        <!-- update the 120 below to increase/decrease the visible part-->
        <circle
          cx="50"
          cy="50"
          r="50"
          stroke-dasharray="120, 1000"
          fill="transparent"
          stroke="black"
          stroke-width="8"
        />
      </mask>
    </defs>
    <!-- 
    The circumference of the circle is 2*PI*R ~ 314.16
    if we want N dashed we use d=314.16/N
    For N = 20 we have d=15.71
    For a gap of 5 we will have "10.71,5" (d - gap,gap)
  -->
    <circle
      cx="50"
      cy="50"
      r="50"
      stroke-dasharray="10.71, 5"
      fill="transparent"
      stroke="red"
      stroke-width="5"
      mask="url(#m)"
    />
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
  position: fixed;
  width: 65px;
  transform: rotate(25deg); /* control the rotation here */
}
</style>