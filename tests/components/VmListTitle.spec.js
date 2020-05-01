import { shallowMount } from "@vue/test-utils";
import VmListTitle from "@/components/VmListTitle.vue";

describe("VmSearchInput", () => {
  let wrapper;
  let componentData;
  const title = "Dark voices";

  beforeEach(() => {
    componentData = {
      propsData: {
        title
      }
    };
  });

  it("should render correctly", () => {
    wrapper = shallowMount(VmListTitle, componentData);

    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("should show title", async () => {
    wrapper = shallowMount(VmListTitle, componentData);
    expect(wrapper.find(".title").text()).toBe("DARK VOICES");
  });
});
