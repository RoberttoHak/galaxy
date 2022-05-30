<template>
  <ScaffoldModal
    :heading="$t('nft_modal.buyCardHeader')"
    :desc="$t('nft_modal.buyCardDesc')"
    @close="close()"
  >
    <div class="verification-container">
      <img class="image" src="~/assets/img/icons/pay-card.png" />
      <div class="verification-container_textbox">
        <div class="verification-container_textbox_title">
          {{ $t("nft_modal.howFund") }}
        </div>
        <div class="verification-container_textbox_desc text-m-bold">
          {{ $t("nft_modal.howFundDesc") }}
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
  name: "PayCard",
  components: {
    Button,
    ScaffoldModal,
  },
  data() {
    return {
      nft: this.$store.getters.modal.data,
    };
  },
  methods: {
    handle(emit) {
      this.$router.push("/help");
      this.$emit("close");
    },
    async close() {
      const nft = this.nft;
      this.$emit("close");
      if (nft) {
        await this.$store.commit("setModal", {
          show: true,
          type: "checkout",
          data: nft,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/modals/nft/verification";
</style>
