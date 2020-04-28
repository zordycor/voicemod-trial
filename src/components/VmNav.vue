<template>
  <div class="nav-component">
    <vm-search-input icon="search" @input-change="emitSearch" />
    <div class="filters">
      <vm-select icon="filter" />
      <vm-select icon="order" />
      <icon-random />
    </div>
  </div>
</template>

<script>
import IconRandom from "./Icon/IconRandom.vue";
import VmSearchInput from "./VmSearchInput.vue";
import VmSelect from "./VmSelect.vue";

export default {
  name: "VmNav",

  methods: {
    emitSearch(searchText) {
      this.$emit("input-change", searchText);
    }
  },

  components: {
    IconRandom,
    VmSearchInput,
    VmSelect
  }
};
</script>

<style lang="scss" scoped>
.nav-component {
  display: flex;
  justify-content: space-between;
  margin-bottom: 35px;

  .filters {
    display: flex;
  }
}
</style>
