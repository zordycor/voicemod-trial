<template>
  <div class="nav-component">
    <vm-search-input icon="search" @input-change="emitSearch" />
    <div class="filters">
      <vm-select
        :options="options"
        placeholder="All"
        icon="filter"
        @select-change="filterChange"
      />
      <vm-select
        :options="orderOptions"
        placeholder="Order"
        icon="order"
        @select-change="orderChange"
      />
      <div class="icon-random" @click="randomVoice">
        <icon-random />
      </div>
    </div>
  </div>
</template>

<script>
import IconRandom from "./Icon/IconRandom.vue";
import VmSearchInput from "./VmSearchInput.vue";
import VmSelect from "./VmSelect.vue";

export default {
  name: "VmNav",

  props: {
    options: { type: [Array, Object], required: true }
  },

  methods: {
    emitSearch(searchText) {
      this.$emit("input-change", searchText);
    },

    randomVoice() {
      this.$emit("select-random");
    },

    filterChange(option) {
      this.$emit("filter-change", option);
    },

    orderChange(option) {
      this.$emit("order-change", option);
    }
  },

  components: {
    IconRandom,
    VmSearchInput,
    VmSelect
  },

  data() {
    return {
      orderOptions: [
        { label: "Ascending", value: "asc" },
        { label: "Descending", value: "desc" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/variables/_breakpoints.scss";

.nav-component {
  display: flex;
  flex-direction: column;

  .filters {
    display: flex;
    flex: 1;
    flex-direction: initial;
    justify-content: space-evenly;

    .icon-random {
      cursor: pointer;
    }
  }

  @media ($mini-device) {
    flex-direction: initial;
  }

  @media ($small-device) {
    flex-direction: column;

    .filters {
      flex: initial;
      flex-direction: initial;
      justify-content: space-around;
    }
  }

  @media ($medium-device) {
    justify-content: space-between;
    flex-direction: initial;

    .filters {
      justify-content: initial;
    }
  }
}
</style>
