<template>
  <div class="help-panel main-container">
    <main>
      <h1 class="header-big-l mb-16">{{ $t("helpPage.title") }}</h1>
      <p class="text-m-bold mt-0 mb-8">{{ $t("helpPage.p1") }}</p>
      <p class="text-m mt-0">{{ $t("helpPage.p2") }}</p>
      <PanelContainer>
        <template slot="left">
          <img src="~/assets/img/help/wallet-1.svg" alt="Install" />
        </template>
        <template slot="right">
          <Button
            :label="$t('landing.learnMore')"
            :background="'primary'"
            :size="'medium'"
            :color="'c-white'"
            @on-click="$router.push('/help/installation')"
          />
        </template>
        <div class="in-panel-div">
          <h2 class="mb-4 mt-0 header-title1">
            {{ $t("helpPage.panel1.header") }}
          </h2>
          <p class="text-m-bold mtb description">
            {{ $t("helpPage.panel1.content") }}
          </p>
        </div>
      </PanelContainer>
      <PanelContainer>
        <template slot="left">
          <img src="~/assets/img/help/wallet-2.svg" alt="Buy ETH" />
        </template>
        <template slot="right">
          <Button
            :label="$t('landing.learnMore')"
            :background="'primary'"
            :size="'medium'"
            :color="'c-white'"
            @on-click="$router.push('/help/buy-eth')"
          />
        </template>
        <div class="in-panel-div">
          <h2 class="mb-4 mt-0 header-title1">
            {{ $t("helpPage.panel2.header") }}
          </h2>
          <p class="text-m-bold mtb description">
            {{ $t("helpPage.panel2.content") }}
          </p>
        </div>
      </PanelContainer>
    </main>
  </div>
</template>

<script>
import PanelContainer from "../../components/ui/PanelContainer.vue";
import Button from "../../components/ui/Button";

export default {
  name: "Help",
  components: { PanelContainer, Button },
  layout(context) {
    if (context.$auth.$state.user) {
      return "auth";
    }
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/help";
</style>
