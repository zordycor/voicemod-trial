import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VmVoice from '@/components/VmVoice.vue'
import IconFavOff from '@/components/Icon/IconFavOff.vue'
import IconFavOn from '@/components/Icon/IconFavOn.vue'
import voices from '../../src/store/voices'

const localVue = createLocalVue()
localVue.use(Vuex)

let store = new Vuex.Store({
  modules: {
    voices
  }
})

describe('VmVoice', () => {
  let wrapper
  let componentData
  window.scroll = jest.fn()

  const voice = {
    name: 'Darth Vader',
    id: 'darth-vader',
    icon: 'VoicesVoiceIcon01.png',
    tags: ['space'],
    fav: false
  }

  beforeEach(() => {
    componentData = {
      propsData: {
        voice
      },
      localVue,
      store
    }
  })

  it('should render correctly', () => {
    wrapper = shallowMount(VmVoice, componentData)

    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should select voice on click', async () => {
    wrapper = shallowMount(VmVoice, componentData)

    await wrapper.find('.voice-image').trigger('click')
    expect(wrapper.find('.voice-image.is-selected').exists()).toBe(true)
  })

  it('should add and remove voice to favorite list on click', async () => {
    wrapper = shallowMount(VmVoice, componentData)

    await wrapper.find('.voice-heart-container').trigger('click')
    expect(wrapper.contains(IconFavOn)).toBe(true)

    await wrapper.find('.voice-heart-container').trigger('click')
    expect(wrapper.contains(IconFavOff)).toBe(true)
  })
})
