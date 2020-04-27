<template>
  <div class="input-component">
    <icon-search class="icon" />
    <input type="text" class="form-item search" />
  </div>
</template>

<script>
import IconSearch from "@/components/Icon/IconSearch.vue";

export default {
  name: "VmSearchInput",

  props: {
    icon: String
  },

  components: {
    IconSearch
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/variables/_colors.scss";

.input-component {
  display: flex;

  .icon {
    background-color: $black;
    border-bottom-left-radius: 18px;
    border-top-left-radius: 18px;
    height: 32px;
    padding: 0 3px;
  }

  .search {
    border-bottom-right-radius: 18px;
    border-top-right-radius: 18px;
    color: $white;
    font-size: 16px;
    padding: 6px 0;
  }
}
</style>
