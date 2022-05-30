<template>
  <div class="dropdown-list-wrapper">
    <div class="label-block" @click="openDropdown">
      <span class="drop-img-block view-wallet">
        <img src="~/assets/img/icons/wallet.svg" alt="wallet" />
        <span
          class="drop-img-block-state"
          :style="{ backgroundColor: connectedWallet ? '#1DD1A1' : '#FF7051' }"
        ></span>
      </span>
    </div>
    <div v-if="show">
      <div
        v-if="connectedWallet"
        class="dropdown-wallet"
        :class="{ 'custom-top': haveLeaders }"
      >
        <p class="text-s-bold mb-16 mt-0">
          {{ $t("modals.wallet") }}
          <span class="dropdown-wallet-close pointer" @click="openDropdown">
            <img src="~/assets/img/icons/close-modal.svg" alt="close" />
          </span>
        </p>
        <p class="text-m-bold mb-16 mt-0">{{ $t("modals.walletStatus") }}</p>
        <div class="dropdown-wallet-connect mb-24 view-active">
          <div class="dropdown-wallet-connect-state">
            <span class="dropdown-wallet-connect-state-circle"></span>
          </div>
          <div class="dropdown-wallet-connect-text">
            <p class="text-m-bold mb-0 mt-0">{{ $t("modals.walletActive") }}</p>
          </div>
          <div
            class="
              dropdown-wallet-connect-button
              view-disconnect
              text-btn
              pointer
            "
            @click="disconnectMetamask()"
          >
            {{ $t("modals.disconnect") }}
          </div>
        </div>
        <p class="text-m-bold mb-16 mt-0">{{ $t("modals.walletId") }}</p>
        <div class="dropdown-wallet-connect mb-24 view-active">
          <div class="dropdown-wallet-connect-text view-link">
            <p class="text-m mb-0 mt-0">{{ myWallet }}</p>
          </div>
          <div
            class="dropdown-wallet-connect-button view-icon text-btn pointer"
            @click="copyToClip"
          >
            <img src="~/assets/img/icons/clipboard.svg" alt="clipboard" />
          </div>
        </div>
        <p class="text-m-bold mb-16 mt-0">{{ $t("modals.walletLinks") }}</p>
        <div class="dropdown-wallet-connect mb-16 view-active pointer">
          <div class="dropdown-wallet-connect-text view-nopadding">
            <p
              class="text-m-bold mb-0 mt-0"
              @click="$router.push('/help/installation')"
            >
              How to connect wallet
            </p>
          </div>
          <div class="dropdown-wallet-connect-button view-icon text-btn">
            <img src="~/assets/img/icons/caret-right.svg" alt="link" />
          </div>
        </div>
        <div class="dropdown-wallet-connect view-active pointer">
          <div class="dropdown-wallet-connect-text view-nopadding">
            <p
              class="text-m-bold mb-0 mt-0"
              @click="$router.push('/help/buy-eth')"
            >
              How to buy ETH
            </p>
          </div>
          <div class="dropdown-wallet-connect-button view-icon text-btn">
            <img src="~/assets/img/icons/caret-right.svg" alt="link" />
          </div>
        </div>
      </div>
      <div v-else class="dropdown-wallet">
        <p class="text-s-bold mb-16 mt-0">
          {{ $t("modals.walletNot") }}
          <span class="dropdown-wallet-close pointer" @click="openDropdown">
            <img src="~/assets/img/icons/close-modal.svg" alt="close" />
          </span>
        </p>
        <div class="dropdown-wallet-connect mb-16">
          <div class="dropdown-wallet-connect-image">
            <img
              src="~/assets/img/icons/metamask-wallet-image.svg"
              alt="wallet"
            />
          </div>
          <div class="dropdown-wallet-connect-text">
            <p class="text-m-bold mb-0 mt-0">MetaMask</p>
          </div>
          <div
            class="dropdown-wallet-connect-button text-btn pointer"
            @click="connectWaller"
          >
            {{ $t("modals.connect") }}
          </div>
        </div>
        <div class="dropdown-wallet-connect-info">
          <p class="text-m-bold mb-4 mt-0">
            {{ $t("modals.walletInfoTitle") }}
          </p>
          <p class="text-s mb-24 mt-0">
            {{ $t("modals.walletInfo") }}
          </p>
          <Button
            class="primary-btn full-width"
            :background="'primary'"
            :size="'small'"
            :color="'c-white'"
            :label="$t('modals.walletMore')"
            @on-click="$router.push('/help')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../../components/ui/Button";
import metamask from "../../mixins/metamask";
import fixed from "../../mixins/fixed";
export default {
  name: "DropdownWallet",
  components: {
    Button,
  },
  mixins: [metamask, fixed],
  props: {
    indexNumber: {
      type: Number,
      required: false,
      default: null,
    },
    haveLeaders: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      show: false,
      hasWallet: true,
    };
  },
  computed: {
    connectedWallet() {
      return this.$auth.user.wallet_address;
    },
    myWallet() {
      const account = this.$auth.user.wallet_address;
      if (account != null && account !== "") {
        const firstPart = account.substr(0, 7);
        const lastPart = account.substr(account.length - 7, account.length - 1);

        return `${firstPart}...${lastPart}`;
      }
      return account;
    },
  },
  watch: {
    $route(val) {
      this.show = false;
    },
  },
  mounted() {
    document.addEventListener("click", this.close);
    this.$nuxt.$on("openWallet", (values) => {
      this.show = true;
    });
  },
  beforeDestroy() {
    document.removeEventListener("click", this.close);
    this.$nuxt.$off("openWallet");
  },
  methods: {
    connectWaller() {
      this.connectMetamask();
    },
    openDropdown() {
      this.show = !this.show;
    },
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.show = false;
      }
    },
    actionHandler(item) {
      this.$emit("action", item, this.indexNumber);
      this.show = false;
    },
    toLink(link) {
      this.$router.push(link);
      this.show = false;
    },
    async copyToClip() {
      const copyText =
        this.$store.getters.walletAccount || this.$auth.user.wallet_address;
      navigator.clipboard.writeText(copyText);
      await this.$store.commit("setSnackbar", {
        show: true,
        message: this.$t("nft_modal.copiedToClip"),
        color: "success",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/ui/dropdown-list";
</style>
