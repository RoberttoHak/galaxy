<template>
  <div id="become-tester" class="become-tester">
    <div class="content full-container">
      <div class="mt-0 header-block">
        <span class="rocket-icon">🚀</span>
        <span class="header-h">{{ $t("landing.becomeTesterTitle") }}</span>
      </div>
      <div class="form-group">
        <div
          v-for="(collection, index) in collections"
          :key="`collection_${index}`"
          class="item"
          @click="$router.push(`/marketplace?constellation=${collection.id}`)"
        >
          <span class="item-img" :class="{ custom: !!collection.thumbnail }">
            <img :src="getConstellationImage(collection.thumbnail)" />
          </span>

          <p class="no-color-link header-title1 mb-16 mt-24 text-center">
            {{ collection.name }}
          </p>
          <div class="action center-block">
            <Button
              :label="$t('landing.availableNow')"
              :background="'primary'"
              :size="'small'"
              :color="'c-white'"
              @on-click="
                $router.push(`/marketplace?constellation=${collection.id}`)
              "
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../ui/Button";
export default {
  name: "BecomeTester",
  components: {
    Button,
  },
  props: {
    collections: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    getConstellationImage() {
      return (thumbnail) => {
        return thumbnail ?? require("~/assets/img/bear-front.png");
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/become-tester";
</style>
