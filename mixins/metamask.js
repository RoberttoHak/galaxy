export default {
  data() {
    return {
      metamaskAccount: "",
      balance: 0,
      balanceLoaded: false,
      hasWallet: false,
    };
  },
  computed: {
    metamask() {
      return this.$metamask();
    },
    displayBalance() {
      return this.balance.toFixed(4);
    },
  },
  methods: {
    async getBalance() {
      if (this.metamaskAccount) {
        const balanceWei = await this.metamask.getBalance(this.metamaskAccount);
        this.balance = +this.metamask.fromWeiToEth(balanceWei);
        this.balanceLoaded = true;
      }
      return false;
    },
    async setConnected() {
      const payload = { wallet_address: this.metamaskAccount };
      await this.$store.dispatch("user/saveWallet", payload);
      await this.$auth.fetchUser();
      this.$nuxt.$emit("metamask:connected");
    },
    async setDisconnected() {
      const payload = { wallet_address: null };
      await this.$store.dispatch("user/saveWallet", payload);
      await this.$auth.fetchUser();
      this.$nuxt.$emit("metamask:disconnected");
    },
    async disconnectMetamask() {
      await this.setDisconnected();
    },
    async connectMetamask() {
      // const provider = await detectEthereumProvider({ mustBeMetaMask: true });
      // console.log("provider Ethereum", provider);
      if (!this.metamask.isEnabled) {
        await this.$store.commit("setSnackbar", {
          show: true,
          message: this.$t("snackbar.metaMask.extensionNotInstalled"),
          color: "error",
        });
        await this.setDisconnected();
        window
          .open(
            `https://metamask.app.link/dapp/${window.location.host}/profile`,
            "_blank"
          )
          .focus();
        return false;
      }
      try {
        const accounts = await this.metamask.getAccounts();
        if (!accounts.length) {
          await this.$store.commit("setSnackbar", {
            show: true,
            message: this.$t("snackbar.metaMask.accountsIsNotConnected"),
            color: "error",
          });
          await this.setDisconnected();
          return false;
        }
        this.metamaskAccount = accounts.shift();
        await this.setConnected();
        return true;
      } catch (e) {
        await this.$store.commit("setSnackbar", {
          show: true,
          message: this.$t("snackbar.metaMask.accountsIsNotConnected"),
          color: "error",
        });
        await this.setDisconnected();
        return false;
      }
    },
  },
};
