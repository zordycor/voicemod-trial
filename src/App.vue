<template>
  <div id="app">
    <div class="container">
      <vm-nav />
    </div>
  </div>
</template>

<script>
import VmNav from "@/components/VmNav.vue";

export default {
  name: "App",
  components: {
    VmNav
  }
};
</script>

<style lang="scss">
@import "@/assets/sass/variables/_colors.scss";

#app {
  font-family: "Barlow", sans-serif;
  background-color: $dark-bg;
  font-size: 15px;

  .container {
    padding: 13px 25px;
    max-width: 1100px;
  }
}
</style>
