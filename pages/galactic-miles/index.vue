<template>
  <div class="galactic-wrapper main-container">
    <h1 class="header-big-l no-color-link mb-0">
      {{ $t("marketplace.galacticMiles") }}
    </h1>
    <p class="mt-16 mb-16 no-color-link text-m">
      {{ $t("marketplace.galacticMilesSubTitle") }}
    </p>
    <div class="content">
      <div class="left-side">
        <span class="img-block">
          <img src="~/assets/img/galaxy-rocket.png" alt="rocket" />
        </span>
        <div class="info">
          <h3 class="header-title1 mb-4 mt-0 no-color-link">
            {{ $t("marketplace.voteTitle") }}
          </h3>
          <p class="mtb no-color-link text-m-bold">
            {{ $t("marketplace.voteDesc") }}
          </p>
        </div>
      </div>

      <div class="right-side">
        <Button
          :label="$t('marketplace.openMap')"
          :background="'primary'"
          :size="'medium'"
          :color="'c-white'"
          @on-click="$router.push('/road-map')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../../components/ui/Button";
export default {
  name: "Index",
  components: {
    Button,
  },
  layout(context) {
    if (context.$auth.$state.user) {
      return "auth";
    }
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/galactic-miles";
</style>
