<template>
  <div :class="['nav-component', { scrolled: isScrolled }]">
    <div class="filters-container">
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
    <div :class="['nav-fav-list', { show: isScrolled > 500 }]">
      <vm-voice
        v-for="voice in favVoiceList"
        :key="voice.id"
        :voice="voice"
        :isNavList="true"
      />
    </div>
  </div>
</template>

<script>
import IconRandom from "./Icon/IconRandom.vue";
import VmSearchInput from "./VmSearchInput.vue";
import VmSelect from "./VmSelect.vue";
import VmVoice from "./VmVoice.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "VmNav",

  methods: {
    ...mapActions("voices", ["updateFilters", "selectRandom"]),

    selectRandomVoice() {
      this.selectRandom();
      const position = this.voiceSelected
        ? document.getElementById(this.voiceSelected.id).offsetTop -
          document.getElementById(this.voiceSelected.id).clientHeight * 2
        : window.offsetTop;

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
    ...mapState("voices", [
      "filters",
      "voiceCategories",
      "voiceSelected",
      "favVoiceList"
    ])
  },

  components: {
    IconRandom,
    VmSearchInput,
    VmSelect,
    VmVoice
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
  top: -1px;
  padding: 20px 50px 10px;
  z-index: 2;

  &.scrolled {
    box-shadow: 0 4px 4px 0 $black;
  }

  .filters-container {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-evenly;

    .filters {
      display: flex;
      justify-content: space-evenly;

      .icon-random {
        cursor: pointer;
      }
    }
  }

  .nav-fav-list {
    max-height: 0;
    opacity: 0;
    text-align: center;
    transition: max-height 0.5s ease-out, opacity 0.5s ease-out;

    &.show {
      max-height: 850px;
      opacity: 1;
      transition: max-height 0.5s ease-in, opacity 0.25s ease-in 0.25s;
    }
  }

  @media ($mini-device) {
    flex-direction: column;

    .filters-container {
      flex-direction: initial;
    }
  }

  @media ($small-device) {
    flex-direction: column;

    .filters-container {
      flex: initial;
      flex-direction: column;
      justify-content: space-around;
    }
  }

  @media ($medium-device) {
    flex-direction: column;

    .filters-container {
      justify-content: space-between;
      flex-direction: initial;
    }

    .nav-fav-list {
      text-align: initial;
    }
  }
}
</style>
