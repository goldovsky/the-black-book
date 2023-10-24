<template>
  <div class="sliderparentdiv">
    <div class="basesliderarray">
      <div class="labelparent">
        <label v-for="item in values" :key="item" :class="itemClass(item)">
          {{ item }} 
          <br />
        </label>
      </div>
      <input type="range" list="values" :min="min" :max="max" v-model="currentValue" />
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
    this.min = 0;
    this.max = this.values.length - 1;
    this.currentValue = this.indexInitialValue;
  },
  methods: {
    itemClass(item) {
      return this.values[this.currentValue] == item ? 'labelvalue' : '';
    }
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