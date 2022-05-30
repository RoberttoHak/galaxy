<template>
  <div class="image-with-title">
    <img
      :src="imgSrc"
      :alt="imgAlt"
      :style="{
        width: '100%',
        height: imgHeight,
      }"
    />
    <div v-if="title.length > 0" class="title text-s mt-4">
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageWithTitle",
  props: {
    imgAlt: {
      type: String,
      required: false,
      default: "",
    },
    title: {
      type: String,
      required: false,
      default: "",
    },
    imgWidth: {
      type: String,
      required: false,
      default: "auto",
    },
    imgHeight: {
      type: String,
      required: false,
      default: "auto",
    },
    imgSrc: {
      type: String,
      required: true,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/help/image-title";
</style>
