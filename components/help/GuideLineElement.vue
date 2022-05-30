<template>
  <div class="guideline-element">
    <div class="title">
      <div class="number">
        {{ number }}
      </div>
      <div class="title-text">
        <slot name="title"></slot>
      </div>
    </div>
    <div v-if="hasDefaultSlot" class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "GuideLineElement",
  props: {
    number: {
      type: [String, Number],
      required: false,
      default: "",
    },
  },
  computed: {
    hasDefaultSlot() {
      return this.$slots.default;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/help/guide-line-element";
</style>
