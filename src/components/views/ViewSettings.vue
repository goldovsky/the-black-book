<template>
  <div class="cardsettings">
  <h1>Settings</h1>
    <base-card>
      <ul>
        <li>Setting 1</li>
        <li>Setting 2</li>
      </ul>
    </base-card>
  </div>
</template>

<script>
export default {
  name: "ViewSettings",
};
</script>

<style scoped>
ul {
  list-style: none;
  /* margin: 0; */
  padding: 0;
  /* display: flex; */
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}

.cardsettings {
  padding: 0rem 3rem 0rem 3rem;
}
</style>