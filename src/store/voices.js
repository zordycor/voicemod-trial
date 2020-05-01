import VoicesApi from '@/api/VoicesApi.js'

const defaultFilters = () => {
  return {
    name: '',
    tag: '',
    order: 'asc'
  }
}

const store = {
  namespaced: true,

  state: {
    voiceList: null,
    voiceCategories: [],
    favVoiceList: [],
    voiceSelected: null,
    filters: defaultFilters()
  },

  mutations: {
    SET_VOICES: (state, voices) => {
      state.voiceList = voices.length ? voices : []
    },
    SET_FILTERS: (state, filters) => {
      state.filters = filters
    },
    SET_VOICE_SELECTED: (state, voiceSelected) => {
      state.voiceSelected = voiceSelected
    },
    SET_FAV_VOICE: (state, voice) => {
      voice.fav = !voice.fav
      state.favVoiceList.filter(v => v.id === voice.id).length
        ? (state.favVoiceList = state.favVoiceList.filter(
            v => v.id !== voice.id
          ))
        : state.favVoiceList.push(voice)
    },
    SET_CATEGORIES: state => {
      state.voiceCategories = [{ label: 'All', value: '' }].concat(
        [
          ...new Set(state.voiceList.map(voice => voice.tags.toString()))
        ].reduce(function(a, v) {
          a.push({ label: v, value: v })
          return a
        }, [])
      )
    }
  },

  actions: {
    initStore({ state, dispatch, commit }) {
      if (state.voiceList === null) dispatch('updateVoices')
      commit('SET_CATEGORIES')
    },

    updateFilters({ dispatch, commit }, newFilters) {
      commit('SET_FILTERS', newFilters)
      dispatch('updateVoices')
    },

    selectVoice({ state, commit }, voice) {
      commit(
        'SET_VOICE_SELECTED',
        state.voiceSelected?.id === voice.id ? null : voice
      )
    },

    selectRandom({ state, commit }) {
      const rand = Math.floor(Math.random() * state.voiceList.length - 1)
      commit(
        'SET_VOICE_SELECTED',
        state.voiceList[rand === -1 ? state.voiceList.length - 1 : rand]
      )
    },

    updateFavVoices({ commit }, voice) {
      commit('SET_FAV_VOICE', voice)
    },

    updateVoices({ commit, state }) {
      let voices = VoicesApi.getVoices(state.filters)
      commit('SET_VOICES', voices)
    }
  }
}

export default store
