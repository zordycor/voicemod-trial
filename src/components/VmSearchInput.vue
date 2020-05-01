<template>
  <div class="search-component">
    <icon-search class="icon icon-search" />
    <input
      v-on:input="searchText = $event.target.value"
      class="form-item search"
    />
    <div class="icon icon-close" @click="emptyInput">
      <icon-close :color="searchText ? '#FFF' : '#000'" />
    </div>
  </div>
</template>

<script>
import IconSearch from "./Icon/IconSearch.vue";
import IconClose from "./Icon/IconClose.vue";

export default {
  name: "VmSearchInput",

  props: {
    icon: String
  },

  watch: {
    searchText(text) {
      this.$emit("input-change", text.toLowerCase());
    }
  },

  methods: {
    emptyInput() {
      this.searchText = "";
    }
  },

  components: {
    IconSearch,
    IconClose
  },

  data() {
    return {
      searchText: ""
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/variables/_colors.scss";
@import "@/assets/sass/variables/_breakpoints.scss";

.search-component {
  display: flex;

  .icon {
    background-color: $black;
  }

  .icon-search {
    border-bottom-left-radius: 18px;
    border-top-left-radius: 18px;
    height: 32px;
    padding: 0 3px;
  }

  .icon-close {
    border-bottom-right-radius: 18px;
    border-top-right-radius: 18px;
    height: 18px;
    padding: 7px 12px;
  }

  .search {
    flex: 1;
    color: $white;
    font-size: 16px;
    padding: 6px 0;
    margin-bottom: 15px;

    @media ($mini-device) {
      margin-bottom: 35px;
    }

    @media ($medium-device) {
      flex: auto;
    }
  }
}
</style>
