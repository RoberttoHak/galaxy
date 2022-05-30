<template>
  <span
    class="icon-wrapper"
    :class="{ 'big-size': size === 'big', 'small-size': size === 'small' }"
    @click="$emit('on-click')"
  >
    <img :src="require(`assets/img/icons/${src}`)" alt="icon" />
  </span>
</template>

<script>
export default {
  name: "Icon",
  props: {
    src: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/ui/icon";
</style>
