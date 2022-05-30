<template>
  <footer>
    <div class="full-container">
      <div class="content">
        <div class="img-block display-f">
          <img src="~/assets/img/header-logo.svg" alt="footer-logo" />
        </div>

        <ul>
          <li>
            <nuxt-link to="/marketplace" class="text-m no-color-dec-link">{{
              $t("marketplace.marketplace")
            }}</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/galactic-miles" class="text-m no-color-dec-link">{{
              $t("marketplace.galacticMiles")
            }}</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/help" class="text-m no-color-dec-link">
              {{ $t("marketplace.help") }}
            </nuxt-link>
          </li>
          <li>
            <a
              target="_blank"
              href="https://storage.googleapis.com/pfld-outdoor-production-documents-bucket/ISIAjobs_Terms_and_Conditions_2021_10_05_revMP_fin%20(1).pdf"
              class="text-m no-color-dec-link"
              >{{ $t("auth.termCond") }}</a
            >
          </li>
        </ul>

        <span class="text-s no-color-link">{{
          $t("marketplace.copyright")
        }}</span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "LandingFooter",
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/footer";
</style>
