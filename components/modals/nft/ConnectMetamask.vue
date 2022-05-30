<template>
  <ScaffoldModal :heading="$t('nft_modal.installMetamask')" @close="close">
    <div class="verification-container">
      <img src="~/assets/img/icons/large-metamask-wallet-image.svg" />
      <div class="verification-container_textbox">
        <div class="verification-container_textbox_title">
          {{ $t("nft_modal.installMetamaskUnsure") }}
        </div>
        <div class="verification-container_textbox_desc text-m-bold">
          {{ $t("nft_modal.installMetamaskText") }}
        </div>
        <Button
          :size="'full'"
          :color="'c-white'"
          :label="$t('nft_modal.learnMore')"
          @on-click="handle('learn-more')"
        />
      </div>
    </div>
  </ScaffoldModal>
</template>

<script>
import Button from "../../ui/Button";
import ScaffoldModal from "~/components/modals/nft/ScaffoldModal.vue";

export default {
  name: "ConnectMetamask",
  components: {
    Button,
    ScaffoldModal,
  },
  methods: {
    handle(emit) {
      this.$router.push("/help");
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/modals/nft/verification";
</style>
