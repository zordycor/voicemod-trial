<template>
  <div class="nav-component">
    <vm-search-input icon="search" @input-change="textFilter" />
    <div class="filters">
      <vm-select
        :options="voiceCategories"
        icon="filter"
        @select-change="selectFilter"
      />
      <vm-select
        :options="orderOptions"
        icon="order"
        @select-change="selectOrder"
      />
      <div class="icon-random" @click="selectRandom">
        <icon-random />
      </div>
    </div>
  </div>
</template>

<script>
import IconRandom from "./Icon/IconRandom.vue";
import VmSearchInput from "./VmSearchInput.vue";
import VmSelect from "./VmSelect.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "VmNav",

  methods: {
    ...mapActions("voices", ["updateFilters", "selectRandom"]),

    textFilter(text) {
      this.updateFilters({ ...this.filters, name: text });
    },

    selectFilter(option) {
      this.updateFilters({ ...this.filters, tag: option });
    },

    selectOrder(option) {
      this.updateFilters({ ...this.filters, order: option });
    }
  },

  computed: {
    ...mapState("voices", ["filters", "voiceCategories"])
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
  user-select: none;

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
