<template>
  <div class="list-component">
    <vm-list-title title="Favourite voices" />
    <div class="fav-list"></div>
    <vm-list-title title="Pro voices" />
    <div class="voice-list"></div>
  </div>
</template>

<script>
import VmListTitle from "./VmListTitle";

export default {
  name: "VmList",

  components: {
    VmListTitle
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/variables/_colors.scss";

.list-component {
  margin: 0 50px;
  color: $title;

  .fav-list,
  .voice-list {
    min-height: 200px;
  }
}
</style>
