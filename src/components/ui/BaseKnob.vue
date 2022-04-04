<template>
  <div class="knob">
          <div class="knob-inner"></div>
        </div>
</template>

<script>
export default {

}
</script>

<style>
.knob {
  position: absolute;
  background: #222;
  height: 3.5em;
  width: 3.5em;
  left: -1.75em;
  top: 0.125em;
  border-radius: 50%;
  margin-left: 50%;
  /*box-shadow: 4px 6px 8px rgba(0,0,0,0.5);*/
  animation: rotate 5s infinite;
}

.knob-inner {
  position: absolute;
  width: 2.5em;
  height: 2.5em;
  border-radius: 50%;
  left: 0.5em;
  top: 0.5em;
  background: #999;
  background-image: 
          /* LEFT HORIZONTAL BAR */
          -webkit-radial-gradient(
      0% 50%,
      50% 15%,
      hsla(0, 0%, 100%, 0.9) 0%,
      hsla(0, 0%, 100%, 0) 100%
    ),
    /* RIGHT HORIZONTAL BAR */
    -webkit-radial-gradient(100% 50%, 50% 15%, hsla(0, 0%, 100%, 0.9) 0%, hsla(
            0,
            0%,
            100%,
            0
          )
          100%),
          /* BACKGROUND CIRCLES */ -webkit-repeating-radial-gradient(
      50% 50%,
      100% 100%,
      hsla(0, 0%, 0%, 0) 0%,
      hsla(0, 0%, 0%, 0) 3%,
      hsla(0, 0%, 0%, 0.1) 3.5%
    ),
    /* WHOLE STUFF */ -webkit-radial-gradient(50% 50%, 200% 50%, hsla(
            0,
            0%,
            90%,
            1
          )
          5%, hsla(0, 0%, 85%, 1) 30%, hsla(0, 0%, 60%, 1) 100%);
  animation: no-rotate 5s infinite;
}

.knob:before {
  content: "";
  position: absolute;
  width: 0.125em;
  height: 0.5em;
  top: 0;
  left: 50%;
  border-top-left-radius: 0.125em;
  border-top-right-radius: 0.125em;
  margin-left: -0.06em;
  background: #fff;
}
</style>