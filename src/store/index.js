import Vue from 'vue'
import Vuex from 'vuex'
import voices from './voices.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { voices }
})
