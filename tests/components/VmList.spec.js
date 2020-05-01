import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VmList from '@/components/VmList.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

const state = {
  voiceList: null,
  favVoiceList: []
}

const store = new Vuex.Store({
  modules: {
    voices: {
      namespaced: true,
      state
    }
  }
})

describe('VmList', () => {
  let wrapper
  let componentData
  window.scroll = jest.fn()

  beforeEach(() => {
    componentData = {
      localVue,
      store
    }
  })

  it('should render correctly', () => {
    wrapper = shallowMount(VmList, componentData)

    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
