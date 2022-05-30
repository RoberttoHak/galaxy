<template>
  <div class="main-container">
    <div class="content-container">
      <div class="header-title1 mb-16">
        {{ $t("marketplace.otherStars") }} {{ constellationName }}
        {{ $t("marketplace.constellation_l") }}
      </div>
      <div class="collection">
        <MarketItem
          v-for="(item, index) in relatedNfts.slice(0, 12)"
          :key="`item_${index}`"
          :is-collection="true"
          class="item"
          @on-click="$router.push(`/marketplace/${item.uid}`)"
        >
          <img
            slot="image"
            :src="
              item.image_cover
                ? item.image_cover
                : require('~/assets/img/bear-head.svg')
            "
            alt="image"
          />
          <p slot="title" class="text-m-bold mt-8 mb-8 text-center">
            {{ item.name }} <br />
          </p>
          <p slot="profit" class="profit mtb text-m text-center">
            {{ formatPrice(item.price_eth) }}Ξ
          </p>
          <p slot="finance" class="finance mtb text-m-bold text-center">
            {{ convertEthereum(item.price_eth) }}
          </p></MarketItem
        >
      </div>
    </div>
  </div>
</template>

<script>
import MarketItem from "../../components/marketplace/MarketItem";

export default {
  name: "MarketplaceCollection",
  components: {
    MarketItem,
  },
  props: {
    constellationName: {
      type: String,
      required: false,
      default: "",
    },
    relatedNfts: {
      type: Array,
      required: false,
      default: () => [],
    },
    ethPrice: {
      type: String,
      required: false,
      default: "0",
    },
  },
  computed: {
    formatPrice() {
      return (price) => {
        return Number(price).toFixed(3);
      };
    },
    convertEthereum() {
      return (price) => {
        return "est. $" + Number(this.ethPrice * price).toFixed(2);
      };
    },
  },
  mounted() {
    console.log(this.relatedNfts);
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/marketplace/collection";
</style>
