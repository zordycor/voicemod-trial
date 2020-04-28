<template>
  <div class="nav-component">
    <vm-search-input icon="search" />
    <div class="filters">
      <vm-select icon="filter" />
      <vm-select icon="order" />
      <icon-random />
    </div>
  </div>
</template>

<script>
import IconRandom from "@/components/Icon/IconRandom.vue";
import VmSearchInput from "@/components/VmSearchInput.vue";
import VmSelect from "@/components/VmSelect.vue";

export default {
  name: "VmNav",

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
