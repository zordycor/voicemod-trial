<template>
  <div class="select-component">
    <div class="selector">
      <component v-if="icon" :is="`icon-${icon}`" class="icon" />
      <div
        :class="['form-item', 'select', icon]"
        v-click-outside="closeDropdown"
        @click="toggleDropdown"
      >
        {{ selectedOption ? selectedOption.label : "All" }}
        <component
          :is="'icon-arrow'"
          :class="['select-arrow', { active: dropdown }]"
        />
      </div>
    </div>
    <div v-if="dropdown" class="options">
      <div
        v-for="option in options"
        :key="option.value"
        class="option"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script>
import IconFilter from "@/components/Icon/IconFilter.vue";
import IconOrder from "@/components/Icon/IconOrder.vue";
import IconArrow from "@/components/Icon/IconArrow.vue";
import IconSearch from "@/components/Icon/IconSearch.vue";

export default {
  name: "VmSelect",

  components: {
    IconFilter,
    IconOrder,
    IconArrow,
    IconSearch
  },

  props: {
    icon: String
  },

  methods: {
    toggleDropdown() {
      this.dropdown = !this.dropdown;
    },

    closeDropdown() {
      this.dropdown = false;
    },

    selectOption(option) {
      this.selectedOption = option;
      this.closeDropdown();
    }
  },

  data() {
    return {
      dropdown: false,
      selectedOption: null,
      options: [
        { label: "Category 1", value: 1 },
        { label: "Category 2", value: 2 },
        { label: "Category 3", value: 3 }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/variables/_colors.scss";

.select-component {
  position: relative;
  display: flex;

  .icon {
    margin-right: 10px;
  }

  .selector {
    display: flex;

    .select {
      display: flex;
      justify-content: space-between;
      min-width: 130px;
      padding: 6px 10px;
      margin-right: 45px;
      border-radius: 5px;
      color: $dark-text;
      user-select: none;
      cursor: pointer;

      &.order {
        margin-right: 20px;
      }

      .select-arrow.active {
        transform: rotateZ(180deg);
      }
    }
  }

  .options {
    position: absolute;
    min-width: 148px;
    left: 44px;
    top: 30px;
    color: $dark-text;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    box-shadow: 0 4px 4px 0 $light-dark;

    .option {
      background-color: $light-dark;
      padding: 7px 15px;
      border-top: 1px solid $separator;
      cursor: pointer;

      &:hover {
        color: $white;
      }

      &:last-child {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }
  }
}
</style>
