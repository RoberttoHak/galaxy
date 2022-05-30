<template>
  <header id="header" :class="{ fixed: $route.name === 'marketplace' }">
    <div class="content header-full-container">
      <div class="content-wrapper">
        <div class="header-menu">
          <div class="desktop-menu">
            <nuxt-link to="/marketplace"
              ><span
                class="text-m marketplace-link"
                :class="{ current: active === 1 }"
                >{{ $t("marketplace.marketplace") }}</span
              ></nuxt-link
            >
            <nuxt-link to="/galactic-miles" class="ml-24"
              ><span
                class="text-m marketplace-link"
                :class="{ current: active === 2 }"
                >{{ $t("marketplace.galacticMiles") }}</span
              ></nuxt-link
            >
            <nuxt-link to="/help" class="ml-24"
              ><span
                class="text-m marketplace-link"
                :class="{ current: active === 3 }"
                >{{ $t("marketplace.help") }}</span
              ></nuxt-link
            >
          </div>

          <div class="mobile-menu" @click="mobileMenu = true">
            <img src="~/assets/img/icons/burger-menu.svg" alt="burger-menu" />
          </div>
        </div>

        <div class="logo-block">
          <nuxt-link :to="logoLink"
            ><img
              class="marketplace-link"
              src="~/assets/img/header-logo.svg"
              alt="logo"
          /></nuxt-link>
        </div>

        <div class="waller-info">
          <span class="avatar">
            <DropdownWallet
              class="profile-dropdown"
              :have-leaders="haveLeaders"
            />
          </span>
        </div>

        <div class="user-info">
          <span class="avatar">
            <DropdownList
              :items="items"
              class="profile-dropdown"
              :src="userAvatar"
              :miles="userMiles"
              @action="actionHandler"
            />
          </span>
        </div>
      </div>

      <div class="mobile-menu-list" :class="{ 'open-menu': mobileMenu }">
        <div class="header-block mb-40">
          <div class="left-side">
            <span class="display-f mr-8">
              <img src="~/assets/img/icons/burger-menu.svg" alt="burger-menu"
            /></span>
            <span class="text-m-bold no-color-link">Menu</span>
          </div>

          <span @click="mobileMenu = false">
            <img src="~/assets/img/icons/close-modal.svg" alt="close-icon"
          /></span>
        </div>

        <p
          class="mt-0 mb-40 pointer"
          :class="{ 'active-link': $route.path === '/marketplace' }"
          @click="toLink('/marketplace')"
        >
          <nuxt-link
            to="/marketplace"
            class="ml-16"
            @click.native="mobileMenu = false"
            ><span class="header-title1 marketplace-link">{{
              $t("marketplace.marketplace")
            }}</span></nuxt-link
          >
        </p>
        <p
          class="mt-0 mb-40 pointer"
          :class="{ 'active-link': $route.path === '/galactic-miles' }"
          @click="toLink('/galactic-miles')"
        >
          <nuxt-link
            to="/galactic-miles"
            class="ml-16"
            @click.native="mobileMenu = false"
            ><span class="header-title1 marketplace-link">{{
              $t("marketplace.galacticMiles")
            }}</span></nuxt-link
          >
        </p>
        <p
          class="mt-0 mb-40 pointer"
          :class="{ 'active-link': $route.path === '/help' }"
          @click="toLink('/help')"
        >
          <nuxt-link to="/help" class="ml-16" @click.native="mobileMenu = false"
            ><span class="header-title1 marketplace-link">{{
              $t("marketplace.help")
            }}</span></nuxt-link
          >
        </p>
      </div>
    </div>
  </header>
</template>

<script>
import DropdownList from "../ui/DropdownList";
import DropdownWallet from "../ui/DropdownWallet";
import metamask from "../../mixins/metamask";
import menu from "../../mixins/menu";
export default {
  name: "Header",
  components: {
    DropdownList,
    DropdownWallet,
  },
  mixins: [metamask, menu],
  data() {
    return {
      mobileMenu: false,
      haveLeaders: false,
    };
  },
  async fetch() {
    const leaders = await this.$store.dispatch("nfts/getLeaderboard");
    this.haveLeaders = leaders.count;
  },

  computed: {
    logoLink() {
      return this.$auth.loggedIn && this.$auth.user ? "/profile" : "/landing";
    },
    userMiles() {
      return this.$auth.user.miles_amount;
    },
    userAvatar() {
      if (this.$auth.loggedIn && this.$auth.user.avatar)
        return this.$auth.user.avatar;

      return "";
    },
    count() {
      return this.$auth.loggedIn && !this.$auth.user.is_email_verified ? 1 : 0;
    },
    items() {
      return [
        {
          label: this.$t("settings.profile"),
          src: require("~/assets/img/icons/menu-profile.svg"),
          color: "#000",
          link: "/profile",
          type: "link",
        },
        {
          label: this.$t("settings.settings"),
          src: require("~/assets/img/icons/menu-settings.svg"),
          color: "#000",
          hasBorder: true,
          link: "/settings",
          type: "link",
          haveNot: this.count,
        },
        {
          label: this.$t("auth.logOut"),
          src: require("~/assets/img/icons/menu-logout.svg"),
          color: "#8C8C8C",
          hasBorder: false,
          type: "action",
          value: "logout",
        },
      ];
    },
  },
  mounted() {
    if (this.$auth.user) {
      if (
        this.$auth.user.wallet_address != null &&
        this.$auth.user.wallet_address !== ""
      ) {
        this.connectMetamask();
      }
    }
  },
  methods: {
    toLink(link) {
      this.$router.push(link);
      this.mobileMenu = false;
    },
    async actionHandler(item) {
      if (item.value === "logout") {
        await this.$auth.logout();
        await this.$router.push("/login");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/header/header";
</style>
