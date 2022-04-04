<template>
  <h2>Pedal Example</h2>
  <div class="pedalbox">
    <div class="pedalBody pedalBodyBorder">
      <div style="color: white; margin: auto">
        <div class="knob">
          <div class="knob-inner"></div>
        </div>
      </div>
      <div style="color: white; margin: auto">Delta II</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      controls: {
        depth: 0,
        rate: 0,
        freq: 0,
        lag: 0,
        res: 0,
        switch: true,
        voice: [0, 1, 2],
      },
    };
  },
};
</script>

<style>
.pedalbox {
  display: flex;
  align-items: center;
  justify-content: center;
}
.pedalBody {
  width: 198px; /*  66mm */
  height: 360px; /*  120mm */
  background-color: darkgrey;
  border-radius: 15px;
}
.pedalBodyBorder {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  position: relative;
  /* padding: 30% 2em; */
  box-sizing: border-box;
  background-clip: padding-box;
  border: solid 5px transparent;
  border-radius: 1em;
}
.pedalBodyBorder:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  margin: -5px;
  border-radius: inherit;
  background: linear-gradient(to right, rgb(154, 177, 199), rgb(90, 119, 150));
  /* background: linear-gradient(to right, #8DEBFF, #6CACFF); */
}

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
      50% 7%,
      hsla(0, 0%, 100%, 0.5) 0%,
      hsla(0, 0%, 100%, 0) 100%
    ),
    /* RIGHT HORIZONTAL BAR */
    -webkit-radial-gradient(100% 50%, 50% 5%, hsla(0, 0%, 100%, 0.5) 0%, hsla(
            0,
            0%,
            100%,
            0
          )
          100%),
          /* BACKGROUND CIRCLES */
    -webkit-repeating-radial-gradient(50% 50%, 100% 100%, hsla(0, 0%, 0%, 0) 0%, hsla(
            0,
            0%,
            0%,
            0
          )
          3%, hsla(0, 0%, 0%, 0.1) 3.5%),
          /* WHOLE STUFF */
          -webkit-radial-gradient(
        50% 50%,
        200% 50%,
        hsla(0, 0%, 90%, 1) 5%,
        hsla(0, 0%, 85%, 1) 30%,
        hsla(0, 0%, 60%, 1) 100%
      )
      ;
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