export default {
  data() {
    return {
      active: 0,
    };
  },

  created() {
    this.checkRoute(this.$route.name);
  },

  watch: {
    $route(val) {
      this.checkRoute(val.name);
    },
  },

  methods: {
    checkRoute(val) {
      if (["marketplace", "marketplace-id"].includes(val)) {
        this.active = 1;
      } else if (["galactic-miles", "road-map"].includes(val)) {
        this.active = 2;
      } else if (["help", "help-installation", "help-buy-eth"].includes(val)) {
        this.active = 3;
      } else if (["login"].includes(val)) {
        this.active = 4;
      } else this.active = 0;
    },
  },
};
