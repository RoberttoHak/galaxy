<template>
  <div class="profile-container">
    <div class="user-info">
      <div class="user main-container">
        <div class="left-side">
          <div class="avatar-block">
            <img v-if="imgSrc" :src="imgSrc" alt="avatar" class="avatar-img" />
            <input type="file" class="avatar-input" @change="fileUpload" />

            <span class="hover-img display-f">
              <img src="~/assets/img/icons/plus-circle.svg" alt="plus-icon" />
            </span>
          </div>

          <div class="user-block">
            <p class="mt-0 mb-8 header-title">
              {{ username }}
              <span v-if="isVerified" class="img-block">
                <img
                  :src="require(`assets/img/icons/verified-account.svg`)"
                  alt="icon"
                />
              </span>
            </p>
            <ul class="user-states mt-0 mb-0">
              <li
                class="user-tag pointer"
                :class="{ 'view-offline': !connectedWallet }"
                @click="openWallet()"
              >
                <span class="user-tag-state"></span>
                <span
                  v-if="connectedWallet"
                  class="text-m-bold user-tag-text"
                  >{{ myWallet }}</span
                >
                <span
                  v-else
                  class="text-m-bold user-tag-text"
                  @click="connectMetamask"
                  >{{ $t("nft_modal.connect_wallet") }}</span
                >
                <img
                  :src="require(`assets/img/icons/caret-right.svg`)"
                  class="user-tag-icon"
                  alt="icon"
                />
              </li>
              <li class="user-tag" @click="$router.push('/galactic-miles')">
                <img
                  :src="require(`assets/img/gift.svg`)"
                  class="user-tag-gift"
                  alt="icon"
                />
                <span class="text-m-bold user-tag-text"
                  >{{ balance }} {{ $t("profile.miles") }}</span
                >
                <img
                  :src="require(`assets/img/icons/caret-right.svg`)"
                  class="user-tag-icon"
                  alt="icon"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="main-container">
      <div class="user-content">
        <div v-if="!isVerified" class="user-action-block">
          <div class="user-action-block-icon">
            <img :src="require(`assets/img/verify-profile.svg`)" alt="icon" />
          </div>
          <div class="user-action-block-text">
            <p class="mt-0 mb-4 header-title">
              {{ $t("profile.verifyTitle") }}
            </p>
            <p class="mt-0 mb-0 text-m-bold">{{ $t("profile.verifyDesc1") }}</p>
            <p class="mt-0 mb-0 text-m-bold">{{ $t("profile.verifyDesc2") }}</p>
          </div>
          <div class="user-action-block-button">
            <Button
              class="primary-btn"
              :background="'primary'"
              :size="'medium'"
              :color="'c-white'"
              :label="$t('profile.verifyBtn')"
              @on-click="$router.push('/settings')"
            />
          </div>
        </div>
        <div v-if="!connectedWallet" class="user-action-block view-wallet">
          <div class="user-action-block-icon">
            <img :src="require(`assets/img/wallet-profile.svg`)" alt="icon" />
          </div>
          <div class="user-action-block-text">
            <p class="mt-0 mb-4 header-title">
              {{ $t("profile.walletTitle") }}
            </p>
            <p class="mt-0 mb-0 text-m-bold">{{ $t("profile.walletDesc1") }}</p>
            <p class="mt-0 mb-0 link pointer" @click="$router.push('/help')">
              {{ $t("profile.walletDesc2") }}
            </p>
          </div>
          <div class="user-action-block-button">
            <Button
              class="primary-btn"
              :background="'primary'"
              :size="'medium'"
              :color="'c-white'"
              :label="$t('profile.walletBtn')"
              @on-click="openWallet"
            />
          </div>
        </div>
        <div
          v-if="nfts.results && nfts.results.length"
          class="marketplace-wrapper"
        >
          <div class="main-list-container">
            <div class="content">
              <MarketItem
                v-for="item in nfts.results"
                :key="item.uid"
                @on-click="toDetail(item)"
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
                  {{ item.price_eth }}Ξ
                </p>
                <p slot="finance" class="finance mtb text-m-bold text-center">
                  {{ convertEthereum(item.price_eth) }}
                </p>
              </MarketItem>
            </div>
            <div v-if="nfts.count" class="pagination-wrapper">
              <Pagination
                :list="nfts.results"
                :total="nfts.count"
                :page.sync="filter.page"
                :page-number="filter.page"
                :current-page="nfts.current"
                :pages-count="nfts.pages_count"
                :limit="filter.page_size || nfts.page_size"
              />
            </div>
          </div>
        </div>
        <div
          v-if="
            connectedWallet &&
            (nfts.results == null || nfts.results.length == 0)
          "
          class="user-action-block view-wallet"
        >
          <div class="user-action-block-icon">
            <img
              :src="require(`assets/img/collection-profile.svg`)"
              alt="icon"
            />
          </div>
          <div class="user-action-block-text">
            <p class="mt-0 mb-4 header-title">
              {{ $t("profile.collectionTitle") }}
            </p>
            <p class="mt-0 mb-0 text-m-bold">
              {{ $t("profile.collectionDesc1") }}
            </p>
            <p class="mt-0 mb-0 text-m-bold">
              {{ $t("profile.collectionDesc2") }}
            </p>
          </div>
          <div class="user-action-block-button">
            <Button
              class="primary-btn"
              :background="'primary'"
              :size="'medium'"
              :color="'c-white'"
              :label="$t('profile.collectionBtn')"
              @on-click="$router.push('/marketplace')"
            />
          </div>
        </div>
        <div class="user-action-block view-wallet">
          <div class="user-action-block-icon">
            <img :src="require(`assets/img/gift.png`)" alt="icon" />
          </div>
          <div class="user-action-block-text">
            <p class="mt-0 mb-4 header-title">
              {{ $t("profile.giftTitle") }}
            </p>
            <p class="mtb text-m-bold">
              {{ $t("profile.giftDesc1") }}
            </p>
            <p class="mtb text-m-bold">
              {{ $t("profile.giftDesc2") }}
            </p>
          </div>
          <div class="user-action-block-button">
            <Button
              class="primary-btn"
              :background="'primary'"
              :size="'medium'"
              :color="'c-white'"
              :label="$t('nft_modal.learnMore')"
              @on-click="openModal"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../../components/ui/Button";
import MarketItem from "../../components/marketplace/MarketItem";
import Pagination from "../../components/marketplace/Pagination";
import { catchErrors } from "../../utils/catchErrors";
import metamask from "../../mixins/metamask";
export default {
  name: "Index",
  components: {
    Button,
    MarketItem,
    Pagination,
  },
  mixins: [metamask],
  layout: "auth",
  middleware: "auth",
  async asyncData({ store, route, error }) {
    try {
      const nfts = await store.dispatch("nfts/getMyNfts");
      return { nfts };
    } catch (e) {
      const status = e.response.status;
      if (status === 404) {
        error({ statusCode: 404, message: "Not found" });
      }
    }
  },
  data() {
    return {
      imgSrc: "",
      username: "",
      balance: 0,
      count: 0,
      nfts: {},
      filter: {
        page: 1,
      },
      ethPrice: null,
      balanceLoaded: false,
      isVerified: false,
    };
  },
  computed: {
    connectedWallet() {
      return this.$auth.user.wallet_address;
    },
    myWallet() {
      const account = this.$auth.user.wallet_address;
      if (account != null && account !== "") {
        const firstPart = account.substr(0, 7);
        const lastPart = account.substr(account.length - 7, account.length - 1);

        return `${firstPart}...${lastPart}`;
      }
      return account;
    },
    convertEthereum() {
      return (price) => {
        return this.ethPrice
          ? "est. $" +
              Number((this.ethPrice * 100 * price) / 100).toFixed(2) +
              "K"
          : "...";
      };
    },
  },
  created() {
    if (this.$auth.user.avatar) {
      this.imgSrc = this.$auth.user.avatar;
    }
    if (this.$auth.user.miles_amount) {
      this.balance = this.$auth.user.miles_amount;
    }
    if (this.$auth.user.username) {
      this.username = this.$auth.user.username;
    } else {
      this.username = this.$auth.user.email;
    }
    if (this.$auth.user.is_verified && this.$auth.user.is_email_verified) {
      this.isVerified = true;
    }
  },
  async mounted() {
    this.ethPrice = (await this.$store.dispatch("fetchEthPrice")).rate;
  },
  methods: {
    openModal() {
      this.$store.commit("setModal", {
        show: true,
        type: "unlocked-features",
      });
    },

    openWallet() {
      this.$nuxt.$emit("openWallet");
      window.scrollTo(0, 0);
    },
    async fileUpload(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      const reader = new FileReader();
      const vm = this;

      reader.onload = (e) => {
        vm.imgSrc = e.target.result;
      };

      reader.readAsDataURL(files[0]);
      await this.updateAvatar(files[0]);
    },

    async updateAvatar(file) {
      try {
        await this.$store.dispatch("user/updateAvatar", { avatar: file });
        await this.$auth.fetchUser();
        await this.$store.commit("setSnackbar", {
          show: true,
          message: this.$t("snackbar.successAvatar"),
          color: "success",
        });
      } catch (e) {
        await this.$store.commit("setSnackbar", {
          show: true,
          message: catchErrors(e),
          color: "error",
        });
      }
    },
    toDetail(item) {
      this.$store.commit("setQuery", this.$route.query);
      this.$router.push(`/marketplace/${item.uid}`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/profile";
@import "assets/scss/pages/marketplace";
</style>
