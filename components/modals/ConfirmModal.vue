<template>
  <div class="modal-container" :class="classes">
    <div class="modal-content">
      <Icon icon="close" class="modal-close" @click.native="handleClose" />
      <div class="modal-body">
        <h2 class="modal-body-question">{{ question }}</h2>
        <p class="text-body2 modal-body-description">
          {{ description }}
        </p>
        <Button
          type="ghost"
          size="m"
          :color="cancel.color"
          :label="cancel.label"
          class="modal-body-cancel"
          @on-click="handleClose"
        />
        <Button
          type="ghost"
          size="m"
          :color="confirm.color"
          :label="confirm.label"
          class="modal-body-confirm"
          @on-click="handleConfirm"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "~/components/ui/Icon.vue";
import Button from "~/components/ui/Button.vue";

export default {
  name: "ConfirmPopup",
  components: {
    Icon,
    Button,
  },
  props: {
    color: {
      type: String,
      default: "black",
    },
  },
  computed: {
    classes() {
      return {
        [this.color]: true,
      };
    },
    data() {
      return this.$store.getters.modal.data;
    },
    question() {
      return this.data.question;
    },
    description() {
      return this.data.description;
    },
    cancel() {
      return this.data.cancel;
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
