<template>
  <div class="list-title-component">
    <div class="list-title">{{ titleUpperCase || '' }}</div>
    <span class="list-separator"></span>
  </div>
</template>

<script>
export default {
  name: 'VmListTitle',

  props: {
    title: String
  },

  computed: {
    titleUpperCase() {
      return this.title.toUpperCase()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/variables/_colors.scss';
@import '@/assets/sass/variables/_breakpoints.scss';

.list-title-component {
  display: flex;
  margin: 25px 0;

  .list-title {
    font-size: 30px;
    text-align: center;
    margin-right: 0;
    flex: 1;
  }

  .list-separator {
    display: none;
    height: 1px;
    background: $separator;
    margin-top: 11px;
    flex: 1;
  }

  @media ($small-device) {
    .list-title {
      font-size: 18px;
      text-align: initial;
      margin-right: 15px;
      flex: initial;
    }

    .list-separator {
      display: inline-block;
    }
  }
}
</style>
