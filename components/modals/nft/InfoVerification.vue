<template>
  <ScaffoldModal :heading="$t('nft_modal.verificationTitle')" @close="close">
    <div
      v-if="status === 'abandoned'"
      class="buying-header no-color-link mb-32"
    >
      {{ $t("nft_modal.errorDoAgain") }}
    </div>

    <div v-else>
      <div class="buying-header no-color-link">
        {{ $t("nft_modal.verifyHeader") }}
      </div>
      <div class="divider" />
      <div class="summary">
        <div>{{ reason }}</div>
      </div>
      <div class="divider" />
      <p class="text-m no-color-link mb-32">{{ $t("nft_modal.doAgain") }}</p>
    </div>

    <div class="button-wrap">
      <Button
        :background="'primary'"
        :size="'full'"
        :color="'c-white'"
        :label="$t('nft_modal.tryAgain')"
        @on-click="tryAgain"
      />
    </div>
  </ScaffoldModal>
</template>

<script>
import Button from "../../ui/Button";
import ScaffoldModal from "~/components/modals/nft/ScaffoldModal.vue";

export default {
  name: "InfoVerification",
  components: {
    ScaffoldModal,
    Button,
  },
  computed: {
    reason() {
      return this.$store.getters.modal.data.reason;
    },
    status() {
      return this.$store.getters.modal.data.status;
    },
  },
  methods: {
    tryAgain() {
      this.$emit("close");
      this.$router.push("/settings/advanced-verification");
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped lang="scss">
@import "~assets/scss/modals/nft/checkout";
</style>
