<template>
  <div id="app">
    <div class="container">
      <vm-nav @input-change="filteredList" />
      <vm-list :voices="voices" />
    </div>
  </div>
</template>

<script>
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
    filteredList(searchText) {
      console.log(searchText);
      this.voices = this.voices.filter(voice =>
        voice.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
  },
  created() {
    this.voices = VoicesApi.getVoices();
  },

  data() {
    return {
      voices: []
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
