<template>
  <div class="discover-wrapper">
    <div class="sounds">
      <div class="left-side">
        <span class="start-block">
          <img src="~/assets/img/landing/sound-star.svg" alt="star" />
        </span>
        <div class="sound-block">
          <h2>{{ $t("landing.soundGood") }}</h2>
          <p class="mt-0 mb-24 text-m subtitle">
            {{ $t("landing.joinUsDiscord") }}
          </p>
          <div class="action">
            <a
              href="https://discord.com/invite/galaxydiamonds"
              class="discord-btn"
              target="_blank"
            >
              <img
                src="~/assets/img/icons/discord-big.svg"
                alt="discord-icon"
              />
            </a>
          </div>
          <p class="mb-24 mt-0 text-m join-us">{{ $t("landing.orJoin") }}</p>
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
                target="_blank"
                href="https://www.instagram.com/galaxydiamondsnft/"
                class="social-link"
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

      <div class="right-side">
        <div class="desktop-sound">
          <div class="first-column column">
            <span class="img-block1 odd">
              <img src="~/assets/img/landing/desktop-img1.png" alt="image1" />
            </span>
            <span class="img-block1">
              <img src="~/assets/img/landing/desktop-img3.png" alt="image3" />
            </span>
          </div>
          <div class="second-column column">
            <span class="img-block1 odd">
              <img src="~/assets/img/landing/desktop-img2.png" alt="image2" />
            </span>
            <span class="img-block1">
              <img src="~/assets/img/landing/desktop-img4.png" alt="image4" />
            </span>
          </div>
        </div>

        <div class="mobile-sound">
          <div class="first-column column">
            <span class="img-block1 odd">
              <img src="~/assets/img/landing/mobile-img1.png" alt="image1" />
            </span>
            <span class="img-block1">
              <img src="~/assets/img/landing/mobile-img3.png" alt="image3" />
            </span>
          </div>
          <div class="second-column column">
            <span class="img-block1 odd">
              <img src="~/assets/img/landing/mobile-img2.png" alt="image2" />
            </span>
            <span class="img-block1">
              <img src="~/assets/img/landing/mobile-img4.png" alt="image4" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sounds",
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/discover";
</style>
