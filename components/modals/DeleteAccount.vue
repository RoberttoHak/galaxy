<template>
  <div class="modal-container">
    <div class="modal-content">
      <Icon
        src="close-modal.svg"
        size="big"
        class="close-icon"
        @on-click="handleClose"
      ></Icon>
      <div class="modal-body">
        <h2 class="modal-body-question mt-0 mb-16">Delete account?</h2>
        <p class="mt-0 mb-0 modal-body-description text-m">
          of the printing and typesetting industry. Lorem Ipsum has been the ind
        </p>
      </div>
      <div class="modal-footer mt-16">
        <div class="action">
          <Button
            class="first-btn"
            :label="$t('modals.modalClose')"
            :background="'ghost'"
            :size="'full'"
            :color="'c-white'"
            @on-click="handleClose"
          />
          <Button
            :label="$t('modals.deleteAccount')"
            :background="'full-warning'"
            :size="'full'"
            :color="'c-white'"
            @on-click="handleConfirm"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Button from "~/components/ui/Button.vue";
import Icon from "../ui/Icon";
import Button from "../ui/Button";
export default {
  name: "DeleteAccount",
  components: {
    Button,
    Icon,
  },
  props: {
    color: {
      type: String,
      default: "black",
    },
  },
  computed: {
    data() {
      return this.$store.getters.modal.data;
    },
    confirm() {
      return this.data.confirm;
    },
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
    handleConfirm() {
      this.confirm.function();
      this.handleClose();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/modals/index";
</style>
