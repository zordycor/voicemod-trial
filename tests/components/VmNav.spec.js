import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VmNav from "@/components/VmNav.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

const actions = {
  updateFilters: jest.fn(),
  selectRandom: jest.fn()
};

const state = {
  voiceCategories: ["Horror", "Space", "Human"],
  filters: { name: "", tag: "", order: "asc" },
  voiceSelected: null
};

const store = new Vuex.Store({
  actions,
  state
});

describe("VmNav", () => {
  let wrapper;
  let componentData;
  window.scroll = jest.fn();

  beforeEach(() => {
    componentData = {
      localVue,
      store
    };
  });

  it("should render correctly", () => {
    wrapper = shallowMount(VmNav, componentData);

    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("should select a random voice", async () => {
    wrapper = shallowMount(VmNav, componentData);
    await wrapper.find(".icon-random").trigger("click");
    console.log(actions);
    expect(actions.selectRandom).toHaveBeenCalled();
  });

  it("should update filters on store", async () => {
    wrapper = shallowMount(VmNav, componentData);
    await wrapper.find(".icon-random").trigger("click");
    console.log(actions);
    expect(actions.updateFilters).toHaveBeenCalled();
  });
});
