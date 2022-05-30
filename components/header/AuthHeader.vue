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

        <div class="user-info not-auth">
          <nuxt-link
            to="/login"
            class="no-color-link display-f"
            :class="{ current: active === 4 }"
            >{{ $t("auth.login") }}</nuxt-link
          >
          <Button
            class="top-btn ml-24"
            :label="$t('auth.register')"
            :background="'primary'"
            :size="'small'"
            :color="'c-white'"
            @on-click="$router.push('/register')"
          />
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

        <span class="divider"></span>
        <p
          class="mt-0 mb-40 pointer"
          :class="{ 'active-link': $route.path === '/login' }"
          @click="toLink('/login')"
        >
          <nuxt-link
            to="/login"
            class="ml-16"
            @click.native="mobileMenu = false"
            ><span class="text-m-bold marketplace-link">{{
              $t("auth.login")
            }}</span></nuxt-link
          >
        </p>
        <p
          class="mt-0 mb-40 pointer"
          :class="{ 'active-link': $route.path === '/register' }"
          @click="toLink('/register')"
        >
          <nuxt-link
            to="/register"
            class="ml-16"
            @click.native="mobileMenu = false"
            ><span class="text-m-bold marketplace-link">{{
              $t("auth.register")
            }}</span></nuxt-link
          >
        </p>
      </div>
    </div>
  </header>
</template>

<script>
import metamask from "../../mixins/metamask";
import Button from "../ui/Button";
import menu from "../../mixins/menu";
export default {
  name: "Header",
  components: {
    Button,
  },
  mixins: [metamask, menu],
  data() {
    return {
      mobileMenu: false,
    };
  },

  computed: {
    logoLink() {
      return "/";
    },
    userAvatar() {
      if (this.$auth.loggedIn && this.$auth.user.avatar)
        return this.$auth.user.avatar;

      return "";
    },
  },

  methods: {
    toLink(link) {
      this.$router.push(link);
      this.mobileMenu = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/header/header";
</style>
