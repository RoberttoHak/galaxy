<template>
  <div class="modal-container_heading">
    <div>
      {{ title }}
    </div>
    <img
      class="close-icon"
      src="~/assets/img/icons/close-modal.svg"
      @click="close"
    />
  </div>
</template>

<script>
export default {
  name: "ModalHeadingRow",
  props: {
    title: {
      type: String,
      required: true,
      default: "",
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped lang="scss">
@import "~assets/scss/modals/nft/index";
</style>
