export default {
  data() {
    return {
      type: "desktop",
    };
  },

  watch: {
    type(val) {
      if (val === "mobile" && this.showPanel) this.addFixed();
      else this.removeFixed();

      // if (val === "mobile" && this.show) this.addFixed();
      // else this.removeFixed();
    },
    show(val) {
      if (this.type === "mobile" && val) this.addFixedHtml();
      else this.removeFixed();
    },
  },

  mounted() {
    window.addEventListener("resize", this.reportWindowSize);
    this.reportWindowSize();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.reportWindowSize);
  },

  methods: {
    reportWindowSize() {
      if (window.innerWidth < 770) this.type = "mobile";
      else this.type = "desktop";
    },

    removeFixed() {
      const header = document.getElementById("header");
      const html = document.getElementsByTagName("html")[0];
      header.style.position = "static";
      html.style.position = "static";
    },
    addFixed() {
      const header = document.getElementById("header");
      header.style.position = "fixed";
      const html = document.getElementsByTagName("html")[0];
      html.style.position = "fixed";
    },
    addFixedHtml() {
      const html = document.getElementsByTagName("html")[0];
      html.style.position = "fixed";
    },
  },
};
