<template>
  <div class="voice-component" v-click-outside="disableVoice">
    <div class="voice-fav" @click="toggleFav">
      <component :is="voiceFavHeart" />
    </div>
    <div :class="['voice-image', { active: activeVoice }]" @click="toggleVoice">
      <img :src="voiceUrl" :alt="voice.name" />
    </div>
    <div :class="['voice-name', { active: activeVoice }]">{{ voice.name }}</div>
  </div>
</template>

<script>
import IconFavOn from "./Icon/IconFavOn.vue";
import IconFavOff from "./Icon/IconFavOff.vue";

export default {
  name: "VmVoice",

  props: {
    voice: Object
  },

  methods: {
    toggleFav() {
      this.isFav = !this.isFav;
      this.$emit("toggle-fav", this.voice, this.isFav);
    },

    toggleVoice() {
      this.activeVoice = !this.activeVoice;
    },

    disableVoice() {
      this.activeVoice = false;
    }
  },

  computed: {
    voiceUrl() {
      return require("../assets/" + this.voice.icon);
    },

    voiceFavHeart() {
      return `icon-fav-${this.isFav ? "on" : "off"}`;
    }
  },

  components: {
    IconFavOn,
    IconFavOff
  },

  data() {
    return {
      activeVoice: false,
      isFav: this.voice.fav
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/variables/_colors.scss";

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
  }

  .voice-image {
    background-color: $voice-bg;
    border-radius: 50%;

    &.active {
      background: linear-gradient(
        219deg,
        rgba(0, 227, 255, 1) 0%,
        rgba(0, 187, 255, 1) 100%
      );
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
