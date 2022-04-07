<template>
  <div class="baseslider">
    <div class="labelparent">
      <label class="labelbefore" v-if="currentValue !== min">{{ min }}</label>
      <label class="labelvalue">{{ currentValue }}</label>
      <label class="labelafter" v-if="currentValue !== max">{{ max }}</label>
    </div>
    <input type="range" :min="min" :max="max" step="1" v-model="currentValue" />
    <div class="slidertitle">Root</div>
  </div>
</template>

<script>
export default {
  props: ["values", "inittolastvalue"],
  emits: ["valueupdate"],
  data() {
    return {
      currentValue: null,
      min: null,
      max: null,
    };
  },
  created() {
    this.min = this.values[0];
    this.max = this.values[this.values.length - 1];
    this.currentValue = this.inittolastvalue ? this.max : this.min;
  },
  watch: {
    currentValue() {
      this.$emit('valueupdate', this.currentValue)
    },
  },
};
</script>

<style>
.baseslider {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
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
</style>