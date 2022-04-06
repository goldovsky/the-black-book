<template>
  <h2>Pedal Example</h2>
  <div class="pedalbox">
    <div class="pedalBody pedalBodyBorder">
      <div class="controls" style="color: white; margin: auto">
        <div class="controlcolumn">
          <base-knob-spaceman-big title="DEPTH" />
          <base-knob-spaceman-small title="LAG" />
        </div>
        <div  class="controlcolumn">
          <div>VOICE</div>
          <base-knob-spaceman-big title="RATE" />
        </div>
        <div  class="controlcolumn">
          <base-knob-spaceman-big title="FREQ" />
          <base-knob-spaceman-small title="RES" />
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

<style scoped>
.pedalbox {
  display: flex;
  align-items: center;
  justify-content: center;
}
.pedalBody {
  width: 198px; /*  66mm */
  height: 360px; /*  120mm */
  background-color: #777777;
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
.controls {
  display: flex;
}

.controlcolumn{
  display:flex;
  flex-direction: column;
  align-items: center;
}
</style>