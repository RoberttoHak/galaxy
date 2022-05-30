<template>
  <div class="coming-soon">
    <LandingHeader />

    <div class="content full-container">
      <span :class="{ show: show }" class="web-span">
        <img
          id="header-logo"
          src="~/assets/img/landing/Bear_front.png"
          alt="header-logo"
          @load="isLoaded = true"
        />
      </span>
      <h1 :class="{ show: show1 }">
        {{ $t("landing.mainTitle") }}
      </h1>
      <div class="action" :class="{ show: show2 }">
        <Button
          :label="$t('landing.learnMore')"
          :background="'primary'"
          :size="'medium'"
          :color="'c-white'"
          @on-click="anchorLink"
        />
      </div>
    </div>
  </div>
</template>

<script>
import LandingHeader from "../header/LandingHeader";
import Button from "../ui/Button";
export default {
  name: "ComingSoon",
  components: {
    LandingHeader,
    Button,
  },
  data() {
    return {
      show: false,
      show1: false,
      show2: false,
      isLoaded: false,
    };
  },
  watch: {
    isLoaded(val) {
      if (val) this.showAnimation();
    },
  },
  mounted() {
    if (this.$route.hash.includes("discover")) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      this.anchorLink();
    }
  },
  methods: {
    anchorLink() {
      document.location = "#discover";
      const discover = document.getElementById("learn-more");
      discover.scrollIntoView();
    },
    showAnimation() {
      const vm = this;

      setTimeout(function () {
        vm.show = true;
      }, 500);

      setTimeout(function () {
        vm.show1 = true;
      }, 750);

      setTimeout(function () {
        vm.show2 = true;
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/coming-soon";
</style>
