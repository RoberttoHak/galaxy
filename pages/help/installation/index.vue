<template>
  <div class="help-panel main-container">
    <main>
      <Navigation
        :title="$t('helpPage.title')"
        :custom-link="'/help'"
        class="nav"
      />

      <h1 class="header-big-l mb-40 mt-0 header-new">
        {{ $t("helpPage.install.title") }}
      </h1>
      <p class="text-m-bold mt-0 mb-8">{{ $t("helpPage.install.p1") }}</p>
      <p class="text-m mt-0 mb-16">{{ $t("helpPage.install.p2") }}</p>

      <SimpleDropdown>
        <template slot="title">
          <div class="text-m c-grey">
            {{ $t("helpPage.install.dropdown1.title") }}
          </div>
        </template>
        <div>
          <GuideLineElement number="1">
            <template slot="title">
              <div v-html="$t('helpPage.install.dropdown1.step1.title')"></div>
            </template>
            <div>
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/install/dropdown1/step_1_screenshot_1.svg')
                "
                :img-alt="$t('helpPage.install.dropdown1.step1.img1Title')"
                :title="$t('helpPage.install.dropdown1.step1.img1Title')"
              />
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/install/dropdown1/step_1_screenshot_2.svg')
                "
                :img-alt="$t('helpPage.install.dropdown1.step1.img2Title')"
                :title="$t('helpPage.install.dropdown1.step1.img2Title')"
              />
            </div>
          </GuideLineElement>
          <GuideLineElement number="2">
            <template slot="title">
              <div>{{ $t("helpPage.install.dropdown1.step2.title") }}</div>
            </template>
            <div>
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/install/dropdown1/step_2_screenshot_1.svg')
                "
                :img-alt="$t('helpPage.install.dropdown1.step2.img1Title')"
                :title="$t('helpPage.install.dropdown1.step2.img1Title')"
              />
            </div>
          </GuideLineElement>
          <GuideLineElement number="3">
            <template slot="title">
              <div>{{ $t("helpPage.install.dropdown1.step3.title") }}</div>
            </template>
            <div>
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/install/dropdown1/step_3_screenshot_1.svg')
                "
                :img-alt="$t('helpPage.install.dropdown1.step3.img1Title')"
                :title="$t('helpPage.install.dropdown1.step3.img1Title')"
              />
            </div>
          </GuideLineElement>
        </div>
      </SimpleDropdown>

      <SimpleDropdown>
        <template slot="title">
          <div class="text-m c-grey">
            {{ $t("helpPage.install.dropdown2.title") }}
          </div>
        </template>
        <div>
          <GuideLineElement number="1">
            <template slot="title">
              <div v-html="$t('helpPage.install.dropdown2.step1.title')"></div>
            </template>
            <div>
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/install/dropdown2/step_1_screenshot_1.svg')
                "
                :img-alt="$t('helpPage.install.dropdown2.step1.img1Title')"
                :title="$t('helpPage.install.dropdown2.step1.img1Title')"
              />
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/install/dropdown2/step_1_screenshot_2.svg')
                "
                :img-alt="$t('helpPage.install.dropdown2.step1.img2Title')"
                :title="$t('helpPage.install.dropdown2.step1.img2Title')"
              />
            </div>
          </GuideLineElement>
          <GuideLineElement number="2">
            <template slot="title">
              <div v-html="$t('helpPage.install.dropdown2.step2.title')"></div>
            </template>
            <div>
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/install/dropdown2/step_2_screenshot_1.svg')
                "
                :img-alt="$t('helpPage.install.dropdown2.step2.img1Title')"
                :title="$t('helpPage.install.dropdown2.step2.img1Title')"
              />
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/install/dropdown2/step_2_screenshot_2.svg')
                "
                :img-alt="$t('helpPage.install.dropdown2.step2.img2Title')"
                :title="$t('helpPage.install.dropdown2.step2.img2Title')"
              />
            </div>
          </GuideLineElement>
          <GuideLineElement number="3">
            <template slot="title">
              <div v-html="$t('helpPage.install.dropdown2.step3.title')"></div>
            </template>
            <div>
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/install/dropdown2/step_3_screenshot_1.svg')
                "
                :img-alt="$t('helpPage.install.dropdown2.step3.img1Title')"
                :title="$t('helpPage.install.dropdown2.step3.img1Title')"
              />
            </div>
          </GuideLineElement>
          <GuideLineElement number="4">
            <template slot="title">
              <div v-html="$t('helpPage.install.dropdown2.step4.title')"></div>
            </template>
            <div>
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/install/dropdown2/step_4_screenshot_1.svg')
                "
                :img-alt="$t('helpPage.install.dropdown2.step4.img1Title')"
                :title="$t('helpPage.install.dropdown2.step4.img1Title')"
              />
              <br />
              <p>{{ $t("helpPage.install.dropdown2.step4.p1") }}</p>
              <br />
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/install/dropdown2/step_4_screenshot_2.svg')
                "
                :img-alt="$t('helpPage.install.dropdown2.step4.img2Title')"
                :title="$t('helpPage.install.dropdown2.step4.img2Title')"
              />
            </div>
          </GuideLineElement>
          <GuideLineElement number="5">
            <template slot="title">
              <div v-html="$t('helpPage.install.dropdown2.step5.title')"></div>
            </template>
            <div>
              <p>{{ $t("helpPage.install.dropdown2.step5.p1") }}</p>
              <br />
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/install/dropdown2/step_5_screenshot_1.svg')
                "
                :img-alt="$t('helpPage.install.dropdown2.step5.img1Title')"
                :title="$t('helpPage.install.dropdown2.step5.img1Title')"
              />
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/install/dropdown2/step_5_screenshot_2.svg')
                "
                :img-alt="$t('helpPage.install.dropdown2.step5.img2Title')"
                :title="$t('helpPage.install.dropdown2.step5.img2Title')"
              />
            </div>
          </GuideLineElement>
          <GuideLineElement number="6">
            <template slot="title">
              <div v-html="$t('helpPage.install.dropdown2.step6.title')"></div>
            </template>
            <div>
              <p>{{ $t("helpPage.install.dropdown2.step6.p1") }}</p>
              <br />
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/install/dropdown2/step_6_screenshot_1.svg')
                "
                :img-alt="$t('helpPage.install.dropdown2.step6.img1Title')"
                :title="$t('helpPage.install.dropdown2.step6.img1Title')"
              />
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/install/dropdown2/step_6_screenshot_2.svg')
                "
                :img-alt="$t('helpPage.install.dropdown2.step6.img2Title')"
                :title="$t('helpPage.install.dropdown2.step6.img2Title')"
              />
            </div>
          </GuideLineElement>
        </div>
      </SimpleDropdown>

      <p class="text-m-bold mt-40 mb-8">{{ $t("helpPage.install.p3") }}</p>
      <p class="text-m mt-0 mb-16">{{ $t("helpPage.install.p4") }}</p>

      <SimpleDropdown>
        <template slot="title">
          <div class="text-m c-grey">
            {{ $t("helpPage.install.dropdown3.title") }}
          </div>
        </template>
        <div>
          <GuideLineElement number="1">
            <template slot="title">
              <div v-html="$t('helpPage.install.dropdown3.step1.title')"></div>
            </template>
            <div>
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/install/dropdown3/step_1_screenshot_1.svg')
                "
                :img-alt="$t('helpPage.install.dropdown3.step1.img1Title')"
                :title="$t('helpPage.install.dropdown3.step1.img1Title')"
              />
            </div>
          </GuideLineElement>
          <GuideLineElement number="2">
            <template slot="title">
              <div v-html="$t('helpPage.install.dropdown3.step2.title')"></div>
            </template>
            <div>
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/install/dropdown3/step_2_screenshot_1.svg')
                "
                :img-alt="$t('helpPage.install.dropdown3.step2.img1Title')"
                :title="$t('helpPage.install.dropdown3.step2.img1Title')"
              />
            </div>
          </GuideLineElement>
          <GuideLineElement number="3">
            <template slot="title">
              <div v-html="$t('helpPage.install.dropdown3.step3.title')"></div>
            </template>
            <div>
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/install/dropdown3/step_3_screenshot_1.svg')
                "
                :img-alt="$t('helpPage.install.dropdown3.step3.img1Title')"
                :title="$t('helpPage.install.dropdown3.step3.img1Title')"
              />
            </div>
          </GuideLineElement>
          <GuideLineElement number="4">
            <template slot="title">
              <div v-html="$t('helpPage.install.dropdown3.step4.title')"></div>
            </template>
            <div>
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/install/dropdown3/step_4_screenshot_1.svg')
                "
                :img-alt="$t('helpPage.install.dropdown3.step4.img1Title')"
                :title="$t('helpPage.install.dropdown3.step4.img1Title')"
              />
            </div>
          </GuideLineElement>
          <GuideLineElement number="5">
            <template slot="title">
              <div v-html="$t('helpPage.install.dropdown3.step5.title')"></div>
            </template>
            <div>
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/install/dropdown3/step_5_screenshot_1.svg')
                "
                :img-alt="$t('helpPage.install.dropdown3.step5.img1Title')"
                :title="$t('helpPage.install.dropdown3.step5.img1Title')"
              />
            </div>
          </GuideLineElement>
        </div>
      </SimpleDropdown>

      <SimpleDropdown>
        <template slot="title">
          <div class="text-m c-grey">
            {{ $t("helpPage.install.dropdown4.title") }}
          </div>
        </template>
        <div>
          <GuideLineElement number="1">
            <template slot="title">
              <div v-html="$t('helpPage.install.dropdown4.step1.title')"></div>
            </template>
            <div>
              <p>{{ $t("helpPage.install.dropdown4.step1.p1") }}</p>
              <p>{{ $t("helpPage.install.dropdown4.step1.p2") }}</p>
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/install/dropdown4/step_1_screenshot_1.svg')
                "
                :img-alt="$t('helpPage.install.dropdown4.step1.img1Title')"
                :title="$t('helpPage.install.dropdown4.step1.img1Title')"
              />
            </div>
          </GuideLineElement>
          <GuideLineElement number="2">
            <template slot="title">
              <div v-html="$t('helpPage.install.dropdown4.step2.title')"></div>
            </template>
            <div>
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/install/dropdown4/step_2_screenshot_1.svg')
                "
                :img-alt="$t('helpPage.install.dropdown4.step2.img1Title')"
                :title="$t('helpPage.install.dropdown4.step2.img1Title')"
              />
            </div>
          </GuideLineElement>
          <GuideLineElement number="3">
            <template slot="title">
              <div v-html="$t('helpPage.install.dropdown4.step3.title')"></div>
            </template>
            <div>
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/install/dropdown4/step_3_screenshot_1.svg')
                "
                :img-alt="$t('helpPage.install.dropdown4.step3.img1Title')"
                :title="$t('helpPage.install.dropdown4.step3.img1Title')"
              />
            </div>
          </GuideLineElement>
          <GuideLineElement number="4">
            <template slot="title">
              <div v-html="$t('helpPage.install.dropdown4.step4.title')"></div>
            </template>
            <div>
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/install/dropdown4/step_4_screenshot_1.svg')
                "
                :img-alt="$t('helpPage.install.dropdown4.step4.img1Title')"
                :title="$t('helpPage.install.dropdown4.step4.img1Title')"
              />
            </div>
          </GuideLineElement>
          <GuideLineElement number="5">
            <template slot="title">
              <div v-html="$t('helpPage.install.dropdown4.step5.title')"></div>
            </template>
            <div>
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/install/dropdown4/step_5_screenshot_1.svg')
                "
                :img-alt="$t('helpPage.install.dropdown4.step5.img1Title')"
                :title="$t('helpPage.install.dropdown4.step5.img1Title')"
              />
            </div>
          </GuideLineElement>
          <GuideLineElement number="6">
            <template slot="title">
              <div v-html="$t('helpPage.install.dropdown4.step6.title')"></div>
            </template>
            <div>
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/install/dropdown4/step_6_screenshot_1.svg')
                "
                :img-alt="$t('helpPage.install.dropdown4.step6.img1Title')"
                :title="$t('helpPage.install.dropdown4.step6.img1Title')"
              />
            </div>
          </GuideLineElement>
          <GuideLineElement number="7">
            <template slot="title">
              <div v-html="$t('helpPage.install.dropdown4.step7.title')"></div>
            </template>
            <div>
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/install/dropdown4/step_7_screenshot_1.svg')
                "
                :img-alt="$t('helpPage.install.dropdown4.step7.img1Title')"
                :title="$t('helpPage.install.dropdown4.step7.img1Title')"
              />
            </div>
          </GuideLineElement>
          <GuideLineElement number="8">
            <template slot="title">
              <div v-html="$t('helpPage.install.dropdown4.step8.title')"></div>
            </template>
            <div>
              <ImageWithTitle
                :img-src="
                  require('assets/img/help/install/dropdown4/step_8_screenshot_1.svg')
                "
                :img-alt="$t('helpPage.install.dropdown4.step8.img1Title')"
                :title="$t('helpPage.install.dropdown4.step8.img1Title')"
              />
            </div>
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
  name: "Installation",
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
