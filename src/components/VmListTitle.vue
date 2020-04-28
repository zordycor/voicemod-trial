<template>
  <div class="list-title-component">
    <div class="title">{{ titleUpperCase || "" }}</div>
    <span class="line"></span>
  </div>
</template>

<script>
export default {
  name: "VmListTitle",

  props: {
    title: String
  },

  computed: {
    titleUpperCase() {
      return this.title.toUpperCase();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/variables/_colors.scss";

.list-title-component {
  display: flex;
  margin-bottom: 25px;

  .title {
    margin-right: 15px;
    font-size: 18px;
  }

  .line {
    height: 1px;
    background: $separator;
    margin-top: 11px;
    flex: 1;
  }
}
</style>
