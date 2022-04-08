<template>
  <h1>String Tension</h1>
</template>

<script>
/**
 * TODO
 * Creat view for calculation string tension
 * -https://github.com/rodrigocfd/string-tension-calc
 */
export default {
  methods: {
    stringtensionformula(unitweight, scalelength, frequency) {
      // source : https://www.liutaiomottola.com/formulae/tension.htm
      const doublesltimef = 2 * scalelength * frequency;

      const tensionInPounds =
        (unitweight * (doublesltimef * doublesltimef)) / 386.4;
      // (gramsconversions)/tokilo
      return (tensionInPounds * 453.59237) / 1000;
    },
  },
};
</script>

<style>
</style>