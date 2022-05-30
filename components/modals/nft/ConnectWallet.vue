<template>
  <ScaffoldModal :heading="$t('nft_modal.connect_wallet')" @close="close">
    <div
      v-for="(wallet, index) in wallets"
      :key="`wallet_${index}`"
      class="modal-container_wallet-item"
      @click="addWallet(wallet)"
    >
      <img :src="wallet.image" />
      <div>{{ wallet.name }}</div>
      <div v-if="loading" class="loading-block">
        <Spinner></Spinner>
      </div>
    </div>
  </ScaffoldModal>
</template>

<script>
import ScaffoldModal from "~/components/modals/nft/ScaffoldModal.vue";
import Spinner from "~/components/ui/Spinner.vue";
import metamask from "~/mixins/metamask";
export default {
  name: "NftWalletModal",
  components: {
    ScaffoldModal,
    Spinner,
  },
  mixins: [metamask],
  props: {
    wallets: {
      type: Array,
      required: false,
      default: () => [
        {
          name: "MetaMask",
          image: require("assets/img/icons/metamask-wallet-image.svg"),
        },
      ],
    },
  },
  data() {
    return {
      loading: false,
      nftData: this.$store.getters.modal.data,
    };
  },
  methods: {
    async addWallet(wallet) {
      this.loading = true;
      await this.connectMetamask();
      this.loading = false;
      this.close();
    },

    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped lang="scss">
@import "~assets/scss/modals/nft/index";
</style>
