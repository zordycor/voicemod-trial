<template>
  <div id="app">
    <div class="container">
      <vm-nav />
      <vm-list />
      <div
        :class="['arrow', { 'is-visible': isScrolled, bounce: addedFavVoice }]"
        @click="toTop"
      >
        <icon-arrow />
      </div>
      <div
        v-if="lastFavVoiceAdded"
        :class="['snackbar', { 'is-visible': isAddedToFavs }]"
      >
        <pre>Added <b>{{ lastFavVoiceAdded.name }}</b> voice to favorites!</pre>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import VmNav from '@/components/VmNav.vue'
import VmList from '@/components/VmList.vue'
import IconArrow from './components/Icon/IconArrow.vue'

export default {
  name: 'App',

  methods: {
    ...mapActions('voices', ['initStore']),

    toTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    },

    handleScroll(e) {
      this.isScrolled = e.path[1].scrollY > 200
    }
  },

  computed: {
    ...mapState('voices', ['voiceList', 'favVoiceList', 'lastFavVoiceAdded'])
  },

  watch: {
    favVoiceList() {
      this.favVoiceList.length
        ? (this.addedFavVoice = true)
        : (this.addedFavVoice = false)
    },

    lastFavVoiceAdded() {
      if (this.lastFavVoiceAdded !== null) {
        this.isAddedToFavs = true
        setTimeout(() => (this.isAddedToFavs = false), 2000)
      }
    }
  },

  components: {
    VmNav,
    VmList,
    IconArrow
  },

  created() {
    this.initStore()
    window.addEventListener('scroll', this.handleScroll)
  },

  data() {
    return {
      showArrowToTop: false,
      isScrolled: false,
      addedFavVoice: false,
      isAddedToFavs: false
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/sass/variables/_colors.scss';
@import '@/assets/sass/variables/_mixins.scss';
@import '@/assets/sass/variables/_breakpoints.scss';

#app {
  font-family: 'Barlow', sans-serif;
  background-color: $dark-bg;
  font-size: 15px;
  min-height: 100vh;

  .container {
    .arrow {
      position: fixed;
      opacity: 0;
      transition: opacity 0.15s ease-out;
      @extend %background-gradient;
      width: 50px;
      height: 50px;
      bottom: 25px;
      border-radius: 50%;
      right: 25px;

      &.is-visible {
        opacity: 1;
        transition: opacity 0.15s ease-in;
      }

      &.bounce {
        animation-name: bounce;
        animation-duration: 1.5s;
      }

      svg {
        transform: rotate(180deg);
        padding: 15px;
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
    }

    .snackbar {
      position: fixed;
      opacity: 0;
      display: flex;
      width: auto;
      align-items: center;
      bottom: 25px;
      right: 100px;
      border-radius: 25px;
      padding: 0 15px;
      font-weight: 500;
      transition: opacity 0.5s ease-out;
      @extend %background-gradient;

      &.is-visible {
        opacity: 0;

        @media ($small-device) {
          opacity: 1;
          transition: opacity 0.5s ease-in;
        }
      }
    }
  }
}
</style>
