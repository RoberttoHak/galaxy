<template>
  <ScaffoldModal :heading="$t('nft_modal.galacticHeader')" @close="close()">
    <div class="verification-container">
      <img class="image img-width" src="~/assets/img/rocket-box.png" />
      <div class="verification-container_textbox">
        <div class="verification-container_textbox_title">
          {{ $t("nft_modal.galacticTitle") }}
        </div>
        <div class="verification-container_textbox_desc text-m-bold">
          {{ $t("nft_modal.galacticDesc") }}
        </div>
        <Button
          :size="'full'"
          :color="'c-white'"
          :label="$t('nft_modal.galacticBtn')"
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
  name: "GalacticMiles",
  components: {
    Button,
    ScaffoldModal,
  },
  methods: {
    handle(emit) {
      this.$emit("close");
      this.$router.push("/marketplace");
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
