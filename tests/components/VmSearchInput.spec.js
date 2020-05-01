import { shallowMount } from "@vue/test-utils";
import VmSearchInput from "@/components/VmSearchInput.vue";

describe("VmSearchInput", () => {
  let wrapper;

  it("should render correctly", () => {
    wrapper = shallowMount(VmSearchInput);

    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("should emit input text", async () => {
    wrapper = shallowMount(VmSearchInput);

    await wrapper.find("input").setValue("text");
    expect(wrapper.emitted()["input-change"][0][0]).toBe("text");
  });
});
