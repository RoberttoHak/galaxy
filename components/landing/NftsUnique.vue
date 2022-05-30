<template>
  <div class="nft-wrapper">
    <div class="full-container">
      <h2 class="header-h">{{ $t("landing.nftUniqueTitle") }}</h2>

      <div class="content">
        <div class="row">
          <div class="left-side item">
            <img
              src="~/assets/img/landing/unique1.png"
              alt="unique-item"
              class="img"
            />
            <h4 class="header-title1 mt-16 mb-8">
              {{ $t("landing.uniqueTitle1") }}
            </h4>
            <p class="text-m mtb">{{ $t("landing.uniqueDesc1") }}</p>
          </div>

          <div class="right-side item">
            <img
              src="~/assets/img/landing/unique2.png"
              alt="unique-item"
              class="img"
            />
            <h4 class="header-title1 mt-16 mb-8">
              {{ $t("landing.uniqueTitle2") }}
            </h4>
            <p class="text-m mtb">{{ $t("landing.uniqueDesc2") }}</p>
          </div>
        </div>

        <div class="bottom-row">
          <div class="left-side change-right item item-big">
            <img
              src="~/assets/img/landing/unique3.png"
              alt="unique-item"
              class="img"
            />
            <h4 class="header-title1 mt-16 mb-8">
              {{ $t("landing.uniqueTitle3") }}
            </h4>
            <p class="text-m mtb">{{ $t("landing.uniqueDesc3") }}</p>
          </div>
          <div class="big-image">
            <img src="~/assets/img/landing/unique4.png" alt="unique-image" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NftsUnique",
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/nfts-unique";
</style>
