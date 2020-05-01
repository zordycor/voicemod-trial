<template>
  <div
    :class="['voice-component', { 'voice-on-nav': isNavList }]"
    :id="voice.id"
    :ref="voice.id"
  >
    <div
      v-if="!isNavList"
      :class="['voice-heart-container', { 'is-fav': isProList && isVoiceFav }]"
      @click="toggleFav"
    >
      <component :is="voiceFavHeart" />
    </div>
    <div
      :class="['voice-image', { 'is-selected': isSelected }]"
      @click="voiceClick"
    >
      <img :src="voiceImageUrl" :alt="voice.name" />
    </div>
    <div
      v-if="!isNavList"
      :class="['voice-name', { 'is-selected': isSelected }]"
    >
      {{ voice.name }}
    </div>
  </div>
</template>

<script>
import IconFavOn from './Icon/IconFavOn.vue'
import IconFavOff from './Icon/IconFavOff.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'VmVoice',

  props: {
    voice: Object,
    isNavList: { type: Boolean, default: false },
    isProList: { type: Boolean, default: false }
  },

  methods: {
    ...mapActions('voices', ['selectVoice', 'updateFavVoices']),

    toggleFav() {
      this.updateFavVoices(this.voice)
    },

    voiceClick() {
      this.selectVoice(this.voice)
      const position = this.isSelected
        ? this.$refs[this.voiceSelected.id].offsetTop -
          this.$refs[this.voiceSelected.id].clientHeight * 2
        : window.offsetTop
      window.scroll({
        top: position,
        left: 0,
        behavior: 'smooth'
      })
    }
  },

  computed: {
    ...mapState('voices', ['favVoiceList', 'voiceSelected']),

    isSelected() {
      return this.voiceSelected && this.voiceSelected.id === this.voice.id
    },

    voiceImageUrl() {
      return require('../assets/' + this.voice.icon)
    },

    isVoiceFav() {
      return this.favVoiceList.includes(this.voice)
    },

    voiceFavHeart() {
      return `icon-fav-${this.isVoiceFav ? 'on' : 'off'}`
    }
  },

  components: {
    IconFavOn,
    IconFavOff
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/variables/_colors.scss';
@import '@/assets/sass/variables/_mixins.scss';

.voice-component {
  position: relative;
  display: inline-block;
  cursor: pointer;
  user-select: none;

  .voice-heart-container {
    visibility: hidden;
    position: absolute;
    right: 0;
    padding: 8px;
    background-color: $voice-bg;
    border-radius: 50%;

    &.is-fav {
      visibility: visible;
    }
  }

  .voice-image {
    background: $voice-bg;
    border-radius: 50%;
    height: 120px;
    justify-content: center;
    display: flex;
    align-items: center;

    &.is-selected {
      @extend %background-gradient;
    }
  }

  .voice-name {
    text-align: center;
    padding: 10px 0;
    font-weight: bold;
    font-size: 14px;
    color: $light-text;

    &.is-selected {
      color: $blue-text;
    }
  }

  &:hover {
    .voice-heart-container {
      visibility: visible;
      background-color: $white;
      transition: background-color 0.1s ease-in;
    }

    .voice-image {
      background-color: $white;
      transition: background-color 0.1s ease-in;
    }

    .voice-name:not(.is-selected) {
      color: $white;
    }
  }

  &.voice-on-nav {
    padding: 10px 5px;

    .voice-image {
      height: 30px;
      width: 30px;

      img {
        height: 30px;
      }
    }
  }
}
</style>
