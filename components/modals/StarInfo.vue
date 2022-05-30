<template>
  <div class="modal-container star-info">
    <div class="modal-content">
      <Icon
        src="circle-remove.svg"
        size="big"
        class="close-icon"
        @on-click="handleClose"
      ></Icon>
      <div class="modal-body">
        <p class="mt-0 mb-0 modal-body-description text-m text-center">
          {{ message }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "../ui/Icon";
export default {
  name: "StarInfo",
  components: {
    Icon,
  },
  props: {
    color: {
      type: String,
      default: "black",
    },
  },
  computed: {
    message() {
      return this.$store.getters.modal.data;
    },
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/modals/index";
</style>
