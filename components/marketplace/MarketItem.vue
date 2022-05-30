<template>
  <div
    :class="isCollection ? 'market-item_collection' : 'market-item_default'"
    class="market-item"
    @click="$emit('on-click')"
  >
    <div class="img-block">
      <slot name="image"></slot>
      <span class="effect"></span>
    </div>
    <slot name="title"></slot>
    <slot name="profit"></slot>
    <slot name="finance"></slot>
  </div>
</template>

<script>
export default {
  name: "MarketItem",
  props: {
    isCollection: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/marketplace/market-item";
</style>
