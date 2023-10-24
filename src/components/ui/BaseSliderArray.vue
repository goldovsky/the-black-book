<template>
  <div class="sliderparentdiv">
    <div class="basesliderarray">
      <div class="labelparent">
        <label
          v-if="currentValue != min"
          class="labelbefore"
          :style="{ visibility: currentValue !== min ? 'visible' : 'hidden' }"
          >{{ values[min] }}</label
        >
        <label class="labelvalue">{{ values[currentValue] }}</label>
        <label
          v-if="currentValue != max"
          class="labelafter"
          :style="{ visibility: currentValue !== max ? 'visible' : 'hidden' }"
          >{{ values[max] }}</label
        >
      </div>
      <input
        type="range"
        :min="min"
        :max="max"
        list="values"
        v-model="currentValue"
      />
      <div class="slidertitle">{{title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "values", "indexInitialValue"],
  emits: ["valueupdate"],
  data() {
    return {
      currentValue: null,
      min: null,
      max: null,
    };
  },
  created() {
    console.log(this.values);
    this.min = 0;
    this.max = this.values.length - 1;
    this.currentValue = this.indexInitialValue;
  },
  watch: {
    currentValue() {
      this.$emit("valueupdate", this.values[this.currentValue]);
    },
  },
};
</script>

<style>
.basesliderarray {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* margin: auto; */
}
.labelparent {
  display: flex;
  align-items: center;
}

.labelvalue {
  font-size: 10vh;
  z-index: 15;
  font-weight: 100;
}

.slidertitle {
  font-weight: 500;
}
.sliderparentdiv {
  display: flex;
  align-items: end;
  justify-content: space-around;
}
</style>