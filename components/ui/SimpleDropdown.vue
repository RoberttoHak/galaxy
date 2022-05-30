<template>
  <div :class="{ 'simple-dropdown': true, opened: opened }">
    <div class="title" @click="toggle">
      <slot name="title"></slot>
      <div class="arrow">
        <img src="~/assets/img/icons/caret-down.svg" alt="\/" />
      </div>
    </div>
    <div class="content mb-16">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "SimpleDropdown",
  props: {
    openedByDefault: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      opened: this.openedByDefault,
    };
  },
  methods: {
    toggle(e) {
      this.opened = !this.opened;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/help/simple-dropdown";
</style>
