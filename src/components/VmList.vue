<template>
  <div class="list-component">
    <div v-show="favVoiceList.length" class="list-container">
      <vm-list-title title="Favorite voices" />
      <div class="list-voices">
        <vm-voice
          v-for="voice in favVoiceList"
          :key="voice.id"
          :voice="voice"
        />
      </div>
    </div>
    <div class="list-container">
      <vm-list-title title="Pro voices" />
      <div class="list-voices" v-if="voiceList">
        <vm-voice
          v-for="voice in voiceList"
          :key="voice.id"
          :voice="voice"
          :isProList="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VmListTitle from './VmListTitle'
import VmVoice from './VmVoice'
import { mapState } from 'vuex'

export default {
  name: 'VmList',

  computed: {
    ...mapState('voices', ['voiceList', 'favVoiceList'])
  },
  components: {
    VmListTitle,
    VmVoice
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/variables/_colors.scss';

.list-component {
  color: $title;
  max-width: 1200px;
  margin: 0 auto;

  .list-container {
    margin: 0 50px;
  }

  .list-voices {
    display: grid;
    grid-template-columns: repeat(auto-fill, 120px);
    grid-column-gap: 50px;
    grid-row-gap: 20px;
    padding-bottom: 20px;
    justify-content: center;
  }
}
</style>
