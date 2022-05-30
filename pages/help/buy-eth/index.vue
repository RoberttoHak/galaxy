<template>
  <div class="help-panel main-container">
    <main>
      <Navigation
        :title="$t('helpPage.title')"
        :custom-link="'/help'"
        class="nav"
      />

      <h1 class="header-big-l mb-16 mt-0 header-new header-mobile">
        {{ $t("helpPage.buyEth.title") }}
      </h1>
      <p class="text-m mtb sub-title">{{ $t("helpPage.buyEth.p1") }}</p>
      <p class="text-m mt-0 mb-48 sub-title">{{ $t("helpPage.buyEth.p2") }}</p>

      <p class="text-m-bold mt-0 mb-8">{{ $t("helpPage.buyEth.p3") }}</p>
      <p class="text-m mt-0 mb-16">{{ $t("helpPage.buyEth.p4") }}</p>

      <SimpleDropdown>
        <template slot="title">
          <div class="text-m c-grey">
            {{ $t("helpPage.buyEth.dropdown1.title") }}
          </div>
        </template>
        <div>
          <GuideLineElement number="1">
            <template slot="title">
              <div v-html="$t('helpPage.buyEth.dropdown1.step1.title')"></div>
            </template>
            <div>
              <p>{{ $t("helpPage.buyEth.dropdown1.step1.p1") }}</p>
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/buy-eth/dropdown1/step_1_screenshot_1.svg')
                "
                :img-alt="$t('helpPage.buyEth.dropdown1.step1.img1Title')"
                :title="$t('helpPage.buyEth.dropdown1.step1.img1Title')"
              />
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/buy-eth/dropdown1/step_1_screenshot_2.svg')
                "
                :img-alt="$t('helpPage.buyEth.dropdown1.step1.img2Title')"
                :title="$t('helpPage.buyEth.dropdown1.step1.img2Title')"
              />
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/buy-eth/dropdown1/step_1_screenshot_3.svg')
                "
                :img-alt="$t('helpPage.buyEth.dropdown1.step1.img3Title')"
                :title="$t('helpPage.buyEth.dropdown1.step1.img3Title')"
              />
            </div>
          </GuideLineElement>
          <GuideLineElement number="2">
            <template slot="title">
              <div>{{ $t("helpPage.buyEth.dropdown1.step2.title") }}</div>
            </template>
            <div>
              <ul>
                <li>{{ $t("helpPage.buyEth.dropdown1.step2.li1") }}</li>
                <li>{{ $t("helpPage.buyEth.dropdown1.step2.li2") }}</li>
              </ul>
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/buy-eth/dropdown1/step_2_screenshot_1.svg')
                "
                :img-alt="$t('helpPage.buyEth.dropdown1.step2.img1Title')"
                :title="$t('helpPage.buyEth.dropdown1.step2.img1Title')"
              />
            </div>
          </GuideLineElement>
          <GuideLineElement number="3">
            <template slot="title">
              <div>{{ $t("helpPage.buyEth.dropdown1.step3.title") }}</div>
            </template>
            <div>
              <p class="bold">{{ $t("helpPage.buyEth.dropdown1.step3.p1") }}</p>
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/buy-eth/dropdown1/step_3_screenshot_1.svg')
                "
                :img-alt="$t('helpPage.buyEth.dropdown1.step3.img1Title')"
                :title="$t('helpPage.buyEth.dropdown1.step3.img1Title')"
              />
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/buy-eth/dropdown1/step_3_screenshot_2.svg')
                "
                :img-alt="$t('helpPage.buyEth.dropdown1.step3.img2Title')"
                :title="$t('helpPage.buyEth.dropdown1.step3.img2Title')"
              />
            </div>
          </GuideLineElement>
          <GuideLineElement number="4">
            <template slot="title">
              <div v-html="$t('helpPage.buyEth.dropdown1.step4.title')"></div>
            </template>
          </GuideLineElement>
        </div>
      </SimpleDropdown>

      <p class="text-m-bold mt-40 mb-8">{{ $t("helpPage.buyEth.p5") }}</p>
      <p class="text-m mt-0 mb-16">{{ $t("helpPage.buyEth.p6") }}</p>

      <SimpleDropdown>
        <template slot="title">
          <div class="text-m c-grey">
            {{ $t("helpPage.buyEth.dropdown2.title") }}
          </div>
        </template>
        <div>
          <GuideLineElement number="1">
            <template slot="title">
              <div v-html="$t('helpPage.buyEth.dropdown2.step1.title')"></div>
            </template>
            <div>
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/buy-eth/dropdown2/step_1_screenshot_1.svg')
                "
                :img-alt="$t('helpPage.buyEth.dropdown2.step1.img1Title')"
                :title="$t('helpPage.buyEth.dropdown2.step1.img1Title')"
              />
            </div>
          </GuideLineElement>
          <GuideLineElement number="2">
            <template slot="title">
              <div>{{ $t("helpPage.buyEth.dropdown2.step2.title") }}</div>
            </template>
            <div>
              <ul>
                <li>{{ $t("helpPage.buyEth.dropdown2.step2.li1") }}</li>
                <li>{{ $t("helpPage.buyEth.dropdown2.step2.li2") }}</li>
                <li>{{ $t("helpPage.buyEth.dropdown2.step2.li3") }}</li>
              </ul>
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/buy-eth/dropdown2/step_2_screenshot_1.svg')
                "
                :img-alt="$t('helpPage.buyEth.dropdown2.step2.img1Title')"
                :title="$t('helpPage.buyEth.dropdown2.step2.img1Title')"
              />
            </div>
          </GuideLineElement>
          <GuideLineElement number="3">
            <template slot="title">
              <div>{{ $t("helpPage.buyEth.dropdown2.step3.title") }}</div>
            </template>
            <div>
              <p class="bold">{{ $t("helpPage.buyEth.dropdown2.step3.p1") }}</p>
              <p class="bold">{{ $t("helpPage.buyEth.dropdown2.step3.p2") }}</p>
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/buy-eth/dropdown2/step_3_screenshot_1.svg')
                "
                :img-alt="$t('helpPage.buyEth.dropdown2.step3.img1Title')"
                :title="$t('helpPage.buyEth.dropdown2.step3.img1Title')"
              />
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/buy-eth/dropdown2/step_3_screenshot_2.svg')
                "
                :img-alt="$t('helpPage.buyEth.dropdown2.step3.img2Title')"
                :title="$t('helpPage.buyEth.dropdown2.step3.img2Title')"
              />
            </div>
          </GuideLineElement>
          <GuideLineElement number="4">
            <template slot="title">
              <div v-html="$t('helpPage.buyEth.dropdown2.step4.title')"></div>
            </template>
          </GuideLineElement>
        </div>
      </SimpleDropdown>
    </main>
  </div>
</template>

<script>
import SimpleDropdown from "../../../components/ui/SimpleDropdown.vue";
import GuideLineElement from "../../../components/help/GuideLineElement.vue";
import ImageWithTitle from "../../../components/help/ImageWithTitle.vue";
import Navigation from "../../../components/header/Navigation";

export default {
  name: "BuyETH",
  components: {
    SimpleDropdown,
    GuideLineElement,
    ImageWithTitle,
    Navigation,
  },
  layout(context) {
    if (context.$auth.$state.user) {
      return "auth";
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/help";
</style>
