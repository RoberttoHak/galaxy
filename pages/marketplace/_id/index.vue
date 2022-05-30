<template>
  <div class="marketplace-detail">
    <div id="header-img" class="header">
      <div class="main-container header-nav">
        <Navigation
          :title="$t('marketplace.marketplace')"
          :custom-link="'/marketplace'"
          :with-query="true"
          class="nav"
        />
        <Button
          class="single-btn"
          :label="$t('marketplace.interact')"
          :background="'ghost'"
          :color="'c-white'"
          :size="'medium'"
          @on-click="interactHandler"
        >
          <span slot="left-icon" class="icon-button display-f"
            ><img src="~/assets/img/icons/click-tap.svg"
          /></span>
        </Button>
      </div>
      <WebGl :nft="nft" :can-interact="canInteract"></WebGl>
    </div>

    <div class="main-container detail-info">
      <div class="detail">
        <div class="main-info block-margin">
          <div class="left-side">
            <h1 class="mb-8 mt-0 detail-title">{{ nft.name }}</h1>
            <span class="header-title1"
              >Current price: {{ currentPriceOrSoldPrice }}Ξ</span
            >
            <span class="header-title1 ml-16">{{
              convertEthereum(currentPriceOrSoldPrice)
            }}</span>
          </div>

          <div class="right-side">
            <div v-if="nft.is_sold" class="sold-action">
              <div class="left-side-s">
                <span class="img-block-s">
                  <img
                    :src="
                      nft.owner && nft.owner.avatar
                        ? nft.owner.avatar
                        : require('assets/img/auction.png')
                    "
                    alt="auction"
                    class="img-s"
                  />
                </span>

                <div>
                  <p class="mtb text-m-bold">Current owner</p>
                  <p class="mtb text-m-bold">{{ nft.owner.username }}</p>
                </div>
              </div>

              <div class="right-side-s">
                <Button
                  class="single-btn"
                  :label="$t('marketplace.buyNow')"
                  :background="'disabled-new'"
                  :size="'medium'"
                  :tooltip="'Community re-listing coming soon!'"
                />
              </div>
            </div>

            <div v-else-if="isTokenTransfer" class="sold-action">
              <div class="left-side-s">
                <span class="img-block-s">
                  <img :src="tokenTransferAvatar" alt="auction" class="img-s" />
                </span>

                <div>
                  <p class="mtb text-m-bold">
                    {{ $t("marketplace.transferringToken") }}
                  </p>
                  <p class="mtb text-m-bold">
                    {{ tokenTransferInfo.username }}
                  </p>
                </div>
              </div>

              <div class="right-side-s">
                <Button
                  class="single-btn"
                  :label="$t('marketplace.buyNow')"
                  :background="'disabled-new'"
                  :size="'medium'"
                  :tooltip="'Community re-listing coming soon!'"
                />
              </div>
            </div>

            <div v-else class="action">
              <Button
                class="first-btn"
                :label="$t('marketplace.payCard')"
                :background="'ghost'"
                :size="'medium'"
                :color="'c-white'"
                @on-click="payCard"
              >
                <span slot="left-icon" class="mr-8 display-f">
                  <img
                    src="~/assets/img/icons/credit-card.svg"
                    alt="credit-card"
                  />
                </span>
              </Button>
              <Button
                class="second-btn"
                :label="$t('marketplace.buyNow')"
                :background="'primary'"
                :size="'medium'"
                :color="'c-white'"
                @on-click="buyNow"
              >
                <span slot="left-icon" class="mr-8 display-f">
                  <img src="~/assets/img/icons/wallet.svg" alt="credit-card" />
                </span>
              </Button>
            </div>
          </div>
        </div>

        <div v-if="showAuction" class="auction block-margin">
          <div class="left-side">
            <div class="img-block">
              <img src="~/assets/img/auction.png" alt="auction" />
            </div>
            <div class="info">
              <p class="mt-0 mb-4 header-title1">Dutch auction</p>
              <p class="mtb text-m-bold">
                This NFT is sold through a dutch auction, which means that
                whoever buys it first for the current price becomes the owner.
              </p>
            </div>
          </div>

          <div class="right-side">
            <div class="text">
              <span class="display-f">
                <img src="~/assets/img/icons/bell.svg" alt="bell" />
              </span>
              <span class="text-m-bold valid-text"
                >The current price is valid for</span
              >
            </div>
            <div class="timer text-l">
              <AuctionTimer
                :time="nft.last_offer.price_changes_at"
                :show-auction.sync="showAuction"
                @finished="timerFinished"
              />
            </div>
          </div>
        </div>

        <div class="content block-margin">
          <div class="header-title">{{ $t("marketplace.story") }}</div>
          <p class="mtb text-m">
            {{ nft.description }}
          </p>
          <ul class="tags">
            <li v-if="nft.luminosity">
              <span class="tag text-s-bold"
                >Luminosity (+{{ nft.luminosity }})</span
              >
            </li>
            <li v-if="nft.quality_level">
              <span class="tag text-s-bold"
                >Quality ({{ nft.quality_level }})</span
              >
            </li>
            <li v-if="nft.age">
              <span class="tag text-s-bold">Age ({{ nft.age }})</span>
            </li>
            <li v-if="nft.nft_type">
              <span class="tag text-s-bold"
                >Type ({{ formatNftType(nft.nft_type) }})</span
              >
            </li>
            <li v-if="nft.is_constellation">
              <span class="tag text-s-bold">Path of constellation (Yes)</span>
            </li>
            <li v-if="nft.constellation">
              <span class="tag text-s-bold"
                >Constellation ({{ nft.constellation.name }})</span
              >
            </li>
          </ul>
        </div>

        <a
          :href="transactionsListLink"
          target="_blank"
          class="history block-margin"
        >
          <div class="left-side">
            <span class="display-f mr-8">
              <img src="~/assets/img/icons/clock-counter.svg" alt="counter" />
            </span>
            <span class="text-m-bold">Transactions history</span>
          </div>

          <div class="right-side">
            <span class="no-color-dec-link text-m-bold show-history"
              >Show history</span
            >
          </div>
        </a>

        <div class="auction satisfaction">
          <div class="left-side">
            <div class="img-block">
              <img src="~/assets/img/satisfaction.png" alt="satisfaction" />
            </div>
            <div class="info">
              <p class="mt-0 mb-4 header-title1">100% satisfaction!</p>
              <p class="mtb text-m-bold">
                Time to swap your Galaxy NFTs for hard assets? All our NFTs are
                backed up with real diamonds.
              </p>
            </div>
          </div>

          <div class="right-side">
            <Button
              class="second-btn"
              :label="$t('marketplace.exchangeToken')"
              :background="isOwner ? 'primary' : 'grey'"
              :size="'medium'"
              :disabled="!isOwner"
              :color="isOwner ? 'c-white' : 'c-grey'"
              @on-click="exchangeToken"
            />
          </div>
        </div>
      </div>
    </div>
    <Collection
      v-if="nft.constellation && nft.related_nfts.length"
      :constellation-name="nft.constellation.name"
      :related-nfts="nft.related_nfts"
      :eth-price="ethPrice"
      class="mt-40"
    />
  </div>
</template>

<script>
import Navigation from "../../../components/header/Navigation";
import Button from "../../../components/ui/Button";
import AuctionTimer from "../../../components/marketplace/AuctionTimer";
import converter from "../../../mixins/converter";
import metamask from "../../../mixins/metamask";
import WebGl from "../../../components/marketplace/WebGl";
import Collection from "~/components/marketplace/Collection.vue";

export default {
  name: "Index",
  components: {
    Navigation,
    Button,
    AuctionTimer,
    Collection,
    WebGl,
  },
  mixins: [converter, metamask],
  layout(context) {
    if (context.$auth.$state.user) {
      return "auth";
    }
  },
  auth: false,
  middleware: "auth",
  async asyncData({ app, store, params, error }) {
    try {
      const nft = await store.dispatch("nfts/getNftsById", { uid: params.id });
      const ethPrice = (await store.dispatch("fetchEthPrice")).rate;

      let showAuction = false;
      if (nft.last_offer && nft.last_offer.category === "timed") {
        showAuction = true;
      }

      return { nft, ethPrice, showAuction };
    } catch (e) {
      error({ statusCode: 404, message: "Page not found" });
    }
  },
  data() {
    return {
      showCard: false,
      showAuction: false,
      ethPrice: null,
      nft: null,
      canInteract: false,
    };
  },
  computed: {
    isTokenTransfer() {
      return this.nft.last_offer.token_transfers_process.length;
    },
    tokenTransferInfo() {
      return this.nft.last_offer.token_transfers_process[0];
    },
    tokenTransferAvatar() {
      return this.tokenTransferInfo.avatar
        ? this.tokenTransferInfo.avatar
        : require("assets/img/default-transfer-avatar.png");
    },
    formatNftType() {
      return (type) => {
        return type.charAt(0).toUpperCase() + type.slice(1);
      };
    },
    convertEthereum() {
      return (price) => {
        return "est. $" + Number(this.ethPrice * price).toFixed(2);
      };
    },
    transactionsListLink() {
      const token = this.nft.nft_token;
      return `${process.env.NETWORK_ETHERSCAN}token/${token.contract_address}?a=${token.token_id}`;
    },
    user() {
      return this.$auth.user;
    },
    isEmailVerified() {
      return this.user && this.user.is_email_verified;
    },
    isOwner() {
      return (
        this.user &&
        this.nft &&
        this.nft.owner &&
        this.nft.owner.username === this.user.username
      );
    },
    isUserVerified() {
      return this.user && this.user.is_verified;
    },
    currentPriceOrSoldPrice() {
      const lastOffer = this.nft.last_offer;
      return this.nft.is_sold
        ? +this.nft.eth_sold_for
        : lastOffer
        ? lastOffer.eth_current_price
        : 0;
    },
  },
  mounted() {
    this.$nuxt.$on("fetchNftData", async () => {
      this.nft = await this.$store.dispatch("nfts/getNftsById", {
        uid: this.$route.params.id,
      });
    });
  },
  beforeDestroy() {
    this.$nuxt.$off("fetchNftData");
  },
  methods: {
    interactHandler() {
      this.canInteract = !this.canInteract;
    },
    async payCard() {
      const availToPayOrState = this.availToPay();
      if (availToPayOrState !== true) {
        return await this[availToPayOrState.action]();
      }

      await this.$store.commit("setModal", {
        show: true,
        type: "pay-card",
      });
    },

    async buyNow() {
      const availToPayOrState = this.availToPay();
      if (availToPayOrState !== true) {
        return await this[availToPayOrState.action]();
      }
      return await this.checkout();
    },

    availToPay() {
      const states = {
        not_auth: !!this.user,
        metamask_not_installed: this.metamask.isEnabled,
        email_not_verified: this.isEmailVerified,
        user_not_verified: this.isUserVerified,
        wallet_is_not_connected: this.user && !!this.user.wallet_address,
      };
      if (Object.values(states).every((item) => item === true)) {
        return true;
      }
      const state = Object.keys(states)
        .filter((item) => states[item] === false)
        .shift();
      const actions = {
        not_auth: "guestTryToPay",
        metamask_not_installed: "metamaskNotInstalled",
        email_not_verified: "emailNotVerifiedTryToPay",
        user_not_verified: "userNotVerifiedTryToPay",
        wallet_is_not_connected: "walletNotConnected",
      };
      return {
        state,
        action: actions[state],
      };
    },
    async guestTryToPay() {
      await this.$store.commit("setSnackbar", {
        show: true,
        message: this.$t("snackbar.payments.loginRequired"),
        color: "error",
      });
      const link = `/login?back=${this.$route.path}`;
      await this.$router.push(link);
    },
    async emailNotVerifiedTryToPay() {
      await this.$store.commit("setModal", {
        show: true,
        type: "verification-required",
        data: {
          title: this.$t("nft_modal.emailVerificationTitle"),
          description: this.$t("nft_modal.emailVerificationDescription"),
        },
      });
    },
    async userNotVerifiedTryToPay() {
      await this.$store.commit("setModal", {
        show: true,
        type: "verification-required",
      });
    },
    async metamaskNotInstalled() {
      await this.$store.commit("setModal", {
        show: true,
        type: "checkout-metamask",
      });
    },
    async exchangeToken() {
      const query = {
        nft: this.nft.uid,
      };

      await this.$router.push({ path: "/exchange", query });
    },

    timerFinished() {
      this.$router.app.refresh();
    },
    async checkout() {
      await this.$store.commit("setModal", {
        show: true,
        type: "checkout",
        data: this.nft,
      });
    },
    async walletNotConnected() {
      await this.$store.commit("setModal", {
        show: true,
        type: "checkout-wallet",
        data: this.nft,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/marketplace-detail";
</style>
