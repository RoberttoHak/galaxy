export default {
  async mounted() {
    await this.fetchEthPrice();
  },
  methods: {
    async fetchEthPrice() {
      if (!this.$store.state.ethPrice) {
        await this.$store.dispatch("fetchEthPrice");
      }
      return this.$store.state.ethPrice;
    },
    ethToUsd(ethAmount) {
      return this.ethRate * ethAmount;
    },
  },
  computed: {
    ethRate() {
      return this.$store.state.ethPrice;
    },
    calculateEthToUsd() {
      return (ethAmount) => {
        return "est. $" + this.ethToUsd(ethAmount) + "K";
      };
    },
  },
};
