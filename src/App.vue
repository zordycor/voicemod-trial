<template>
  <div id="app">
    <div class="container">
      <vm-nav
        :options="voiceTags"
        @input-change="searchFilter"
        @filter-change="filterVoices"
        @order-change="orderVoices"
        @select-random="selectRandomVoice"
      />
      <vm-list :voices="voices" :randomVoice="randomVoice" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import VmNav from "@/components/VmNav.vue";
import VmList from "@/components/VmList.vue";
import VoicesApi from "@/api/VoicesApi.js";

export default {
  name: "App",

  components: {
    VmNav,
    VmList
  },

  methods: {
    getVoicesList(params) {
      this.voices = VoicesApi.getVoices(params);
    },

    searchFilter(searchText) {
      this.getVoicesList({ ...this.params, name: searchText.toLowerCase() });
    },

    selectRandomVoice() {
      this.randomVoice = this.voices[Math.random() * this.voices.length - 1];
    },

    filterVoices(category) {
      this.getVoicesList({ ...this.params, tag: category });
    },
    orderVoices(order) {
      this.getVoicesList({ ...this.params, order: order });
    }
  },

  computed: {
    ...mapState(["voices"]),

    voiceTags() {
      return [...new Set(this.voices.map(voice => voice.tags.toString()))];
    }
  },

  created() {
    this.getVoicesList(this.params);
  },

  data() {
    return {
      allVoices: [],
      randomVoice: null,
      params: {
        name: "",
        tag: "",
        order: "asc"
      }
    };
  }
};
</script>

<style lang="scss">
@import "@/assets/sass/variables/_colors.scss";

#app {
  font-family: "Barlow", sans-serif;
  background-color: $dark-bg;
  font-size: 15px;

  .container {
    padding: 13px 25px;
    max-width: 1100px;
  }
}
</style>
