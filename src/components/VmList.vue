<template>
  <div class="list-component">
    <div class="fav-list-component" v-show="favVoiceList.length">
      <vm-list-title title="Favourite voices" />
      <div class="fav-list">
        <vm-voice
          v-for="voice in favVoiceList"
          :key="voice.id"
          :voice="voice"
        />
      </div>
    </div>
    <div class="voice-list-component">
      <vm-list-title title="Pro voices" />
      <div class="voice-list" v-if="voiceList">
        <vm-voice v-for="voice in voiceList" :key="voice.id" :voice="voice" />
      </div>
    </div>
  </div>
</template>

<script>
import VmListTitle from "./VmListTitle";
import VmVoice from "./VmVoice";
import { mapState } from "vuex";

export default {
  name: "VmList",

  computed: {
    ...mapState("voices", ["voiceList", "favVoiceList"])
  },
  components: {
    VmListTitle,
    VmVoice
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/variables/_colors.scss";

.list-component {
  color: $title;
  max-width: 1200px;
  margin: 0 auto;

  .fav-list-component,
  .voice-list-component {
    margin: 0 50px;
  }

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
