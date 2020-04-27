<template>
  <div class="menu-component">
    <vm-input icon="search" />
    <div class="filters">
      <vm-select icon="filter" />
      <vm-select icon="order" />
      <icon-random />
    </div>
  </div>
</template>

<script>
import IconRandom from "@/components/Icon/IconRandom.vue";
import VmInput from "@/components/VmInput.vue";
import VmSelect from "@/components/VmSelect.vue";

export default {
  name: "VmNav",

  components: {
    IconRandom,
    VmInput,
    VmSelect
  }
};
</script>

<style lang="scss">
@import "@/assets/sass/variables/_colors.scss";

.menu-component {
  display: flex;
  justify-content: space-between;
  margin-bottom: 35px;

  .filters {
    display: flex;
  }

  .form-item {
    height: 20px;
    background-color: $black;
    border: none;

    &:focus {
      outline: none;
    }
  }
}
</style>
