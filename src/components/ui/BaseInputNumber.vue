<template>
  <div class="control number">
    <button
      class="decrement-button hiddearrows"
      :disabled="decrementDisabled"
      @click="decrement"
    >
      −
    </button>
    <input
      class="input-number"
      type="number"
      :disabled="inputDisabled"
      :min="min"
      :max="max"
      :step="step"
      v-model.number="currentValue"
      @blur="currentValue = value"
      @keydown.esc="currentValue = value"
      @keydown.enter="currentValue = value"
      @keydown.up.prevent="increment"
      @keydown.down.prevent="decrement"
    />
    <button
      class="increment-button"
      :disabled="incrementDisabled"
      @click="increment"
    >
      +
    </button>
  </div>
</template>

<script>
export default {
  props: {
    disabled: Boolean,
    max: {
      type: Number,
      default: Infinity,
    },
    min: {
      type: Number,
      default: -Infinity,
    },
    value: {
      required: true,
    },
    step: {
      type: Number,
      default: 1,
    },
  },

  data() {
    return {
      currentValue: this.value,
      decrementDisabled: false,
      incrementDisabled: false,
      inputDisabled: false,
    };
  },

  watch: {
    value(val) {
      this.currentValue = val;
    },
  },

  methods: {
    increment() {
      if (this.disabled || this.incrementDisabled) {
        return;
      }

      let newVal = this.currentValue + 1 * this.step;
      this.decrementDisabled = false;

      this._updateValue(newVal);
    },
    decrement() {
      if (this.disabled || this.decrementDisabled) {
        return;
      }

      let newVal = this.currentValue + -1 * this.step;
      this.incrementDisabled = false;

      this._updateValue(newVal);
    },
    _updateValue(newVal) {
      const oldVal = this.currentValue;

      if (oldVal === newVal || typeof this.value !== "number") {
        return;
      }
      if (newVal <= this.min) {
        newVal = this.min;
        this.decrementDisabled = true;
      }
      if (newVal >= this.max) {
        newVal = this.max;
        this.incrementDisabled = true;
      }
      this.currentValue = newVal;
      this.$emit("input", this.currentValue);
    },
  },

  mounted() {
    if (this.value == this.min) {
      this.decrementDisabled = true;
    }
  },
};
</script>

<style scoped>
/* remove arrows in input field */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}

.input-number {
  position: relative;
  width: 30px;
  background-color: transparent;
  overflow: hidden;
  border: none;
  border-radius: 20px;
  margin: 2px;
  text-align: center;
  background-color: white;
  line-height: 20px;
  font-size: 16px;
  letter-spacing: -1px;
}

.increment-button,
.decrement-button {
  display: inline-block;
  width: 50px;
  height: 100%;
  border: none;
  border-radius: 20px;
  font-size: 20px;
  cursor: pointer;
  
}
.increment-button {
  padding-right: 20px;
}

.decrement-button {
  padding-left: 20px;
}

.increment-button:hover,
.increment-button:active,
.decrement-button:hover,
.decrement-button:active {
  background-color: rgba(255, 255, 255, 0.25);
}
</style>