<template>
  <div :class="['nav-component', { scrolled: isScrolled }]">
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
      <div class="icon-random" @click="selectRandomVoice">
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

    selectRandomVoice() {
      this.selectRandom();
      const position =
        document.getElementById(this.voiceSelected.id).offsetTop -
        document.getElementById(this.voiceSelected.id).clientHeight * 2;

      window.scroll({
        top: position,
        left: 0,
        behavior: "smooth"
      });
    },
    textFilter(text) {
      this.updateFilters({ ...this.filters, name: text });
    },

    selectFilter(option) {
      this.updateFilters({ ...this.filters, tag: option });
    },

    selectOrder(option) {
      this.updateFilters({ ...this.filters, order: option });
    },

    handleScroll(e) {
      this.isScrolled = e.path[1].scrollY;
    }
  },

  computed: {
    ...mapState("voices", ["filters", "voiceCategories", "voiceSelected"])
  },

  components: {
    IconRandom,
    VmSearchInput,
    VmSelect
  },

  created() {
    window.addEventListener("scroll", this.handleScroll);
  },

  data() {
    return {
      orderOptions: [
        { label: "Ascending", value: "asc" },
        { label: "Descending", value: "desc" }
      ],
      isScrolled: false
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/variables/_breakpoints.scss";
@import "@/assets/sass/variables/_colors.scss";

.nav-component {
  display: flex;
  flex-direction: column;
  user-select: none;
  position: sticky;
  background: $dark-bg;
  top: 0px;
  padding: 20px 50px 0;
  z-index: 2;

  &.scrolled {
    box-shadow: 0 4px 4px 0 $black;
  }

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
