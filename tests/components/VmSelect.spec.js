import { shallowMount, createLocalVue } from '@vue/test-utils'
import VmSelect from '@/components/VmSelect.vue'
import capitalize from '@/filters/capitalizeText.js'

const localVue = createLocalVue()
localVue.filter('capitalize', capitalize)

const options = [
  { label: 'Category 1', value: '1' },
  { label: 'Category 2', value: '2' },
  { label: 'Category 3', value: '3' }
]

describe('VmSelect', () => {
  let wrapper
  let componentData
  const clickOutside = jest.fn()

  beforeEach(() => {
    componentData = {
      propsData: {
        options
      },
      directives: {
        clickOutside
      },
      localVue
    }
  })

  it('should render correctly', () => {
    wrapper = shallowMount(VmSelect, componentData)

    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should show and hide options on click', async () => {
    wrapper = shallowMount(VmSelect, componentData)
    await wrapper.find('.select-toggle').trigger('click')

    expect(wrapper.find('.select-options.is-visible').exists()).toBe(true)
    expect(
      wrapper
        .findAll('.option')
        .at(0)
        .text()
    ).toBe('Category 1')
    expect(
      wrapper
        .findAll('.option')
        .at(1)
        .text()
    ).toBe('Category 2')
    expect(
      wrapper
        .findAll('.option')
        .at(2)
        .text()
    ).toBe('Category 3')

    await wrapper.find('.select-toggle').trigger('click')

    expect(wrapper.find('.select-options').exists()).toBe(true)
  })
})
