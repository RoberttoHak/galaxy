<template>
  <ScaffoldModal
    :heading="$t('nft_modal.verifyIdentity')"
    @close="close('close')"
  >
    <div class="verification-container">
      <img class="small-margin" src="~/assets/img/verify-logo.svg" />
      <div class="verification-container_textbox">
        <div class="verification-container_textbox_title">
          {{ $t("nft_modal.completeIdentity") }}
        </div>
        <div class="verification-container_textbox_desc">
          {{ $t("nft_modal.continueIdentity") }}
        </div>
        <Button
          :size="'full'"
          :color="'c-white'"
          :label="$t('nft_modal.continue')"
          @on-click="handle"
        />
      </div>
    </div>
  </ScaffoldModal>
</template>

<script>
import Button from "../../ui/Button";
import ScaffoldModal from "~/components/modals/nft/ScaffoldModal.vue";

export default {
  name: "VerifyId",
  components: {
    Button,
    ScaffoldModal,
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
    close(emit) {
      this.$store.commit("setModal", {
        show: false,
        type: null,
      });
    },
    handle() {
      this.confirm.function();
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/modals/nft/verification";
</style>
