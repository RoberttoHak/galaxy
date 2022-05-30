<template>
  <div class="join-us-wrapper">
    <div class="full-container">
      <div class="left-side">
        <h1 class="mt-0">{{ $t("landing.joinUs") }}</h1>
        <div class="action">
          <a
            href="https://discord.com/invite/galaxydiamonds"
            class="discord-btn"
            target="_blank"
          >
            <img src="~/assets/img/icons/discord-big.svg" alt="discord-icon" />
          </a>
        </div>
      </div>
      <div class="right-side">
        <p class="follow">{{ $t("landing.orFollow") }}</p>
        <ul class="mtb">
          <li>
            <a
              target="_blank"
              href="https://www.facebook.com/Galaxydiamonds-101350175672894"
              class="social-link"
            >
              <Icon src="facebook-negative.svg" size="big"></Icon>
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/GalaxyDiaNFT"
              class="social-link"
              target="_blank"
            >
              <Icon src="twitter-negative.svg" size="big"></Icon>
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/galaxydiamondsnft/"
              class="social-link"
              target="_blank"
            >
              <Icon src="instagram-negative.svg" size="big"></Icon>
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://t.me/joinchat/QExLizfchzg1ZTNk"
              class="social-link"
            >
              <Icon src="telegram-negative.svg" size="big"></Icon>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "../ui/Icon";
export default {
  name: "JoinUs",
  components: {
    Icon,
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/join-us";
</style>
