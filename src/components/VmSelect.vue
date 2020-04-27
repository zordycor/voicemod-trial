<template>
  <div class="select-component">
    <div class="selector">
      <component v-if="icon" :is="`icon-${icon}`" class="icon" />
      <div :class="['form-item', 'select', icon]" @click="toggleOptions">
        {{ selectedOption ? selectedOption.label : "All" }}
        <component :is="'icon-arrow'" class="select-arrow" />
      </div>
    </div>
    <div v-if="showDropdown" class="options">
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
    toggleOptions() {
      this.showDropdown = !this.showDropdown;
    },

    selectOption(option) {
      this.selectedOption = option;
      this.toggleOptions();
    }
  },

  data() {
    return {
      showDropdown: false,
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
      padding: 5px 10px;
      margin-right: 45px;
      border-radius: 5px;
      color: $dark-text;
      user-select: none;

      &.filter {
        margin-right: 45px;
      }

      &.order {
        margin-right: 20px;
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

      &:last-child {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }
  }
}
</style>
