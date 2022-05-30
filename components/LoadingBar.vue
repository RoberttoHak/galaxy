<template>
  <div v-if="loading" class="loading-page">
    <div class="loading" :class="{ 'can-show': canShow }">
      <span id="loading-color" class="color"></span>
      <span class="img-block">
        <img src="~/assets/img/rocket-preloader.svg" alt="" />
      </span>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    loading: false,
    canShow: false,
  }),
  watch: {
    loading(val) {
      if (val) {
        setTimeout(() => {
          this.canShow = true;
        }, 500);
      }
    },
  },
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      const colorSpan = document.querySelector("#loading-color");
      if (colorSpan) {
        colorSpan.style.width = "100%";
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "assets/scss/components/loading-bar";
</style>
