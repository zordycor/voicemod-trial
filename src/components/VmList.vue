<template>
  <div class="list-component">
    <div class="fav-list-component" v-show="favVoices.length">
      <vm-list-title title="Favourite voices" />
      <div class="fav-list">
        <vm-voice
          v-for="voice in favVoices"
          :key="voice.id"
          :voice="voice"
          @toggle-fav="toggleFavVoice"
        />
      </div>
    </div>
    <div class="voice-list-component">
      <vm-list-title title="Pro voices" />
      <div class="voice-list" v-if="voices">
        <vm-voice
          v-for="voice in voices"
          :key="voice.id"
          :voice="voice"
          @toggle-fav="toggleFavVoice"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VmListTitle from "./VmListTitle";
import VmVoice from "./VmVoice";

export default {
  name: "VmList",

  props: {
    voices: Array,
    randomVoice: Object
  },

  components: {
    VmListTitle,
    VmVoice
  },

  methods: {
    toggleFavVoice(voice, isFav) {
      isFav
        ? this.favVoices.push({ ...voice, fav: isFav })
        : (this.favVoices = this.favVoices.filter(v => v.id !== voice.id));
    }
  },

  computed: {
    voiceFavCheck(voice) {
      return this.favVoices.filter(v => v.id === voice.id).length > 0;
    }
  },

  data() {
    return {
      favVoices: []
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/variables/_colors.scss";

.list-component {
  margin: 0 50px;
  color: $title;

  .fav-list,
  .voice-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, 120px);
    grid-column-gap: 50px;
    grid-row-gap: 20px;
    padding-bottom: 20px;
    justify-content: center;
  }
}
</style>
