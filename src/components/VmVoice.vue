<template>
  <div class="voice-component" :ref="voice.id" :id="voice.id">
    <div class="voice-fav" @click="toggleFav">
      <component :is="voiceFavHeart" />
    </div>
    <div :class="['voice-image', { active: isSelected }]" @click="voiceClick">
      <img :src="voiceImageUrl" :alt="voice.name" />
    </div>
    <div :class="['voice-name', { active: isSelected }]">
      {{ voice.name }}
    </div>
  </div>
</template>

<script>
import IconFavOn from "./Icon/IconFavOn.vue";
import IconFavOff from "./Icon/IconFavOff.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "VmVoice",

  props: {
    voice: Object
  },

  methods: {
    ...mapActions("voices", ["selectVoice", "updateFavVoices"]),

    toggleFav() {
      this.updateFavVoices(this.voice);
    },

    voiceClick() {
      this.selectVoice(this.voice);
      const position = this.isSelected
        ? this.$refs[this.voiceSelected.id].offsetTop -
          this.$refs[this.voiceSelected.id].clientHeight * 2
        : window.offsetTop;
      window.scroll({
        top: position,
        left: 0,
        behavior: "smooth"
      });
    }
  },

  computed: {
    ...mapState("voices", ["favVoiceList", "voiceSelected"]),

    isSelected() {
      return this.voiceSelected && this.voiceSelected.id === this.voice.id;
    },

    voiceImageUrl() {
      return require("../assets/" + this.voice.icon);
    },

    voiceFavHeart() {
      return `icon-fav-${
        this.favVoiceList.includes(this.voice) ? "on" : "off"
      }`;
    }
  },

  components: {
    IconFavOn,
    IconFavOff
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/variables/_colors.scss";
@import "@/assets/sass/variables/_mixins.scss";

.voice-component {
  position: relative;
  display: inline-block;
  cursor: pointer;
  user-select: none;

  .voice-fav {
    visibility: hidden;
    position: absolute;
    right: 0;
    padding: 8px;
    background-color: $white;
    border-radius: 50%;

    .fav-icon {
      height: 14px;

      &.active {
        animation-name: select;
        animation-duration: 0.5s;
      }
    }
  }

  .voice-image {
    background: $voice-bg;
    border-radius: 50%;
    height: 120px;
    justify-content: center;
    display: flex;
    align-items: center;

    &.active {
      @extend %background-gradient;
    }
  }

  .voice-name {
    text-align: center;
    padding: 10px 0;
    font-weight: bold;
    font-size: 14px;
    color: $light-text;

    &.active {
      color: $blue-text;
    }
  }

  &:hover {
    .voice-fav {
      visibility: visible;
    }

    .voice-image {
      background-color: $white;
    }

    .voice-name:not(.active) {
      color: $white;
    }
  }
}
</style>
