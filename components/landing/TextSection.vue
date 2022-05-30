<template>
  <div class="text-section">
    <div class="full-container">
      <div class="left-side">
        <h2 class="mt-0 mb-32">
          {{ $t("landing.textSecTitle") }}
        </h2>
        <div class="bottom-block">
          <span>
            <img src="~/assets/img/landing/landing-img.svg" alt="image" />
          </span>
        </div>
      </div>

      <div class="right-side">
        <p class="mt-0 mb-4 text-m">
          {{ $t("landing.textSecDesc1") }}
        </p>
        <p class="mtb text-m">
          {{ $t("landing.textSecDesc2") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TextSection",
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/text-section";
</style>
