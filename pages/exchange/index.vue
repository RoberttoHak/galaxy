<template>
  <div class="exchange-wrapper main-container help-panel">
    <Navigation
      :title="label ? label : $t('helpPage.title')"
      :custom-link="label ? `/marketplace/${$route.query.nft}` : '/help'"
      class="nav mb-4"
    />

    <h1 class="header-big-l mt-0 mb-40">{{ $t("exchange.title") }}</h1>

    <span class="default-img">
      <img src="~/assets/img/exchange-banner.png" alt="banner" />
    </span>

    <div class="text-section text-new-sec">
      <div class="full-container">
        <div class="left-side">
          <h2 class="mt-0 mb-32">
            {{ $t("exchange.textSecTitle") }}
          </h2>
          <p class="text-m mt-0 mb-32">{{ $t("exchange.textSecSubTitle") }}</p>
          <div class="bottom-block">
            <span>
              <img src="~/assets/img/landing/landing-img.svg" alt="image" />
            </span>
          </div>
        </div>

        <div class="right-side">
          <img src="~/assets/img/adamand.png" alt="adamand" class="right-img" />
        </div>
      </div>
    </div>

    <div class="exchange-info">
      <h2 class="mt-0 mb-40 no-color-link">{{ $t("exchange.infoTitle") }}</h2>

      <div class="content">
        <div class="item">
          <p class="mt-0 mb-16 text-m-bold">{{ $t("exchange.itemTitle1") }}</p>

          <p class="mtb text-m" v-html="$t('exchange.itemDesc1')"></p>
        </div>

        <div class="item">
          <p class="mt-0 mb-16 text-m-bold">{{ $t("exchange.itemTitle2") }}</p>

          <p class="mtb text-m">{{ $t("exchange.itemDesc2") }}</p>
        </div>

        <div class="item">
          <p class="mt-0 mb-16 text-m-bold">{{ $t("exchange.itemTitle3") }}</p>

          <p class="mtb text-m">{{ $t("exchange.itemDesc3") }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "../../components/header/Navigation";
export default {
  name: "Index",
  components: {
    Navigation,
  },

  layout(context) {
    if (context.$auth.$state.user) {
      return "auth";
    }
  },
  middleware: "auth",
  async asyncData({ app, store, route, redirect, error }) {
    let label = "";
    if (route.query.nft) {
      try {
        const nft = await store.dispatch("nfts/getNftsById", {
          uid: route.query.nft,
        });
        label = nft.name;

        if (!nft.owner || nft.owner.username !== app.$auth.user.username) {
          redirect("/marketplace");
        }
      } catch (e) {
        error({ statusCode: 404, message: "Page not found" });
      }
    }

    return { label };
  },
  data() {
    return {
      label: "",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/marketplace/exchange";
@import "assets/scss/components/landing/text-section";
</style>
