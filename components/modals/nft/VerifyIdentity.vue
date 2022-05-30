<template>
  <ScaffoldModal :heading="data.title" @close="close('close')">
    <div class="verification-container">
      <img src="~/assets/img/icons/verification-symbol.svg" />
      <div class="verification-container_textbox">
        <div class="verification-container_textbox_title">
          {{ data.title }}
        </div>
        <div class="verification-container_textbox_desc">
          {{ data.description }}
        </div>
        <Button
          :size="'full'"
          :color="'c-white'"
          :label="$t('nft_modal.startVerification')"
          @on-click="verify()"
        />
      </div>
    </div>
  </ScaffoldModal>
</template>

<script>
import Button from "../../ui/Button";
import ScaffoldModal from "~/components/modals/nft/ScaffoldModal.vue";

export default {
  name: "VerifyIdentityModal",
  components: {
    Button,
    ScaffoldModal,
  },
  computed: {
    data() {
      const data = this.$store.getters.modal.data;
      return {
        title: data?.title ?? this.$t("nft_modal.verifyIdentity"),
        description: data?.description ?? this.$t("nft_modal.verificationText"),
      };
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    async verify() {
      this.close();
      await this.$router.push("/settings");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/modals/nft/verification";
</style>
