<template>
  <ScaffoldModal :heading="$t('nft_modal.featuresHeader')" @close="close()">
    <div class="verification-container">
      <img class="image img-width" src="~/assets/img/gift-list.png" />
      <div class="verification-container_textbox">
        <div class="verification-container_textbox_title">
          {{ $t("nft_modal.collectTitle") }}
        </div>
        <div class="verification-container_textbox_desc text-m-bold">
          {{ $t("nft_modal.collectDesc") }}
        </div>
        <Button
          :size="'full'"
          :color="'c-white'"
          :label="$t('nft_modal.collectBtn')"
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
  name: "UnlockedFeatures",
  components: {
    Button,
    ScaffoldModal,
  },
  methods: {
    handle(emit) {
      this.$emit("close");
      this.$router.push("/galactic-miles");
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
