import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VmNav from '@/components/VmNav.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

const actions = {
  selectRandom: jest.fn()
}

const state = {
  voiceCategories: ['Horror', 'Space', 'Human']
}

const store = new Vuex.Store({
  modules: {
    voices: {
      namespaced: true,
      actions,
      state
    }
  }
})

describe('VmNav', () => {
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
    wrapper = shallowMount(VmNav, componentData)

    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should select a random voice', async () => {
    wrapper = shallowMount(VmNav, componentData)
    await wrapper.find('.icon-random').trigger('click')
    expect(actions.selectRandom).toHaveBeenCalled()
  })
})
