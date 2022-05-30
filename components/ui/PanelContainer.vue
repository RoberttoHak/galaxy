<template>
  <div class="panel-container">
    <div class="img-block">
      <slot name="left"></slot>
    </div>
    <div class="main-content">
      <slot></slot>
    </div>
    <div class="actions">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Panel",
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/help/panel-container";
</style>
