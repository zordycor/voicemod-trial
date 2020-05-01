<template>
  <div class="select-component">
    <div
      class="select-toggle"
      @click="toggleDropdown"
      v-click-outside="closeDropdown"
    >
      <component v-if="icon" :is="`icon-${icon}`" class="icon" />
      <div :class="['form-item', 'select-value', icon]">
        {{
          selectedOption ? selectedOption.label : options[0].label | capitalize
        }}
        <component
          :is="'icon-arrow'"
          :class="['select-arrow', { 'is-rotated': dropdown }]"
        />
      </div>
    </div>
    <div :class="['select-options', { 'is-visible': dropdown }]">
      <div
        v-for="option in options"
        :key="option.value"
        class="option"
        @click="selectOption(option)"
      >
        {{ option.label | capitalize }}
      </div>
    </div>
  </div>
</template>

<script>
import IconFilter from './Icon/IconFilter.vue'
import IconOrder from './Icon/IconOrder.vue'
import IconArrow from './Icon/IconArrow.vue'
import IconSearch from './Icon/IconSearch.vue'

export default {
  name: 'VmSelect',

  components: {
    IconFilter,
    IconOrder,
    IconArrow,
    IconSearch
  },

  props: {
    options: { type: Array, required: true },
    icon: String
  },

  methods: {
    toggleDropdown() {
      this.dropdown = !this.dropdown
    },

    closeDropdown() {
      this.dropdown = false
    },

    selectOption(option) {
      this.selectedOption = option
      this.$emit('select-change', option.value)
      this.closeDropdown()
    }
  },

  data() {
    return {
      dropdown: false,
      selectedOption: null
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/variables/_colors.scss';
@import '@/assets/sass/variables/_breakpoints.scss';

.select-component {
  position: relative;
  display: flex;

  .icon {
    margin-right: 10px;
    cursor: pointer;
  }

  .select-toggle {
    display: flex;
    width: 100%;

    .select-value {
      display: none;
      justify-content: space-between;
      min-width: 130px;
      flex: 1;
      padding: 6px 10px;
      border-radius: 5px;
      color: $dark-text;
      cursor: pointer;

      .select-arrow {
        transition: transform 0.15s ease-out;

        &.is-rotated {
          transition: transform 0.15s ease-in;
          transform: rotateZ(180deg);
        }
      }
    }
  }

  .select-options {
    position: absolute;
    max-height: 0;
    transition: max-height 0.15s ease-out;
    overflow: hidden;
    min-width: 120px;
    left: -40px;
    top: 35px;
    color: $dark-text;
    z-index: 1;
    border-radius: 5px;
    box-shadow: 0 4px 4px 0 $light-dark;

    &.is-visible {
      max-height: 300px;
      transition: max-height 0.15s ease-in;
    }

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

    .select-toggle {
      .select-value {
        display: flex;
        margin-right: 20px;
      }
    }

    .select-options {
      width: calc(100% - 65px);
      left: 44px;
    }
  }
}
</style>
