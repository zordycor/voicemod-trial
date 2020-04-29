<template>
  <div class="select-component">
    <div
      class="selector"
      @click="toggleDropdown"
      v-click-outside="closeDropdown"
    >
      <component v-if="icon" :is="`icon-${icon}`" class="icon" />
      <div :class="['form-item', 'select', icon]">
        {{ selectedOption ? selectedOption : placeholder | capitalize }}
        <component
          :is="'icon-arrow'"
          :class="['select-arrow', { active: dropdown }]"
        />
      </div>
    </div>
    <div v-if="dropdown" class="options">
      <div
        v-for="option in formattedOptions"
        :key="option.value"
        class="option"
        @click="selectOption(option.value)"
      >
        {{ option.label | capitalize }}
      </div>
    </div>
  </div>
</template>

<script>
import IconFilter from "./Icon/IconFilter.vue";
import IconOrder from "./Icon/IconOrder.vue";
import IconArrow from "./Icon/IconArrow.vue";
import IconSearch from "./Icon/IconSearch.vue";

export default {
  name: "VmSelect",

  components: {
    IconFilter,
    IconOrder,
    IconArrow,
    IconSearch
  },

  props: {
    options: { type: [Array, Object], required: true },
    icon: String,
    placeholder: String
  },

  methods: {
    toggleDropdown() {
      this.dropdown = !this.dropdown;
    },

    closeDropdown() {
      this.dropdown = false;
    },

    selectOption(optionValue) {
      this.selectedOption = optionValue;
      this.$emit("select-change", optionValue);
      this.closeDropdown();
    }
  },

  computed: {
    formattedOptions() {
      let arr = [];
      typeof this.options[0].label === "undefined"
        ? [...this.options.map(o => arr.push({ label: o, value: o }))]
        : (arr = this.options);
      return arr;
    }
  },

  data() {
    return {
      dropdown: false,
      selectedOption: null
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/variables/_colors.scss";
@import "@/assets/sass/variables/_breakpoints.scss";

.select-component {
  position: relative;
  display: flex;

  .icon {
    margin-right: 10px;
    cursor: pointer;
  }

  .selector {
    display: flex;
    width: 100%;
    user-select: none;

    .select {
      display: none;
      justify-content: space-between;
      min-width: 130px;
      flex: 1;
      padding: 6px 10px;
      border-radius: 5px;
      color: $dark-text;
      cursor: pointer;

      .select-arrow.active {
        transform: rotateZ(180deg);
      }
    }
  }

  .options {
    position: absolute;
    min-width: 120px;
    left: -40px;
    top: 35px;
    color: $dark-text;
    z-index: 1;
    border-radius: 5px;
    box-shadow: 0 4px 4px 0 $light-dark;

    .option {
      background-color: $light-dark;
      padding: 7px 15px;
      border-top: 1px solid $separator;
      cursor: pointer;

      &:hover {
        color: $white;
      }

      &:first-child {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        border: none;
      }

      &:last-child {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }
  }

  @media ($small-device) {
    flex: 1;

    .selector {
      .select {
        display: flex;
        margin-right: 20px;
      }
    }

    .options {
      width: calc(100% - 65px);
      left: 44px;
    }
  }
}
</style>
