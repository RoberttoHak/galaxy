<template>
  <div id="our-team" class="our-team">
    <img
      class="back-img"
      src="~/assets/img/landing/map.png"
      alt=""
      srcset="
        ~/assets/img/landing/map.png,
        ~/assets/img/landing/map.png 1.5x,
        ~/assets/img/landing/map.png 2x
      "
    />

    <div class="map-wrapper">
      <div class="content">
        <h2 class="text-xl mt-0">{{ $t("landing.ourTeam") }}</h2>
        <p class="mtb text-l text-center">{{ $t("landing.teamDesc") }}</p>

        <div class="teams">
          <div class="team mb-8 yellow">
            <div class="team-info">
              <p class="position mt-0 mb-4">Tech & Marketing</p>
              <p class="text-m mtb">United Kingdom</p>
            </div>
            <div class="country">
              <img
                src="~/assets/img/landing/flags/usa.svg"
                alt="flag"
                class="flag"
              />
            </div>
          </div>

          <div class="team mb-8 purple">
            <div class="team-info">
              <p class="position mt-0 mb-4">Tech, Design & Management</p>
              <p class="text-m mtb">Czech republic</p>
            </div>
            <div class="country">
              <img
                src="~/assets/img/landing/flags/cz.svg"
                alt="flag"
                class="flag"
              />
            </div>
          </div>

          <div class="team mb-8 light-blue">
            <div class="team-info">
              <p class="position mt-0 mb-4">Marketing team</p>
              <p class="text-m mtb">Slovakia</p>
            </div>
            <div class="country">
              <img
                src="~/assets/img/landing/flag.svg"
                alt="flag"
                class="flag"
              />
            </div>
          </div>

          <div class="team mb-8 yellow">
            <div class="team-info">
              <p class="position mt-0 mb-4">Diamond team</p>
              <p class="text-m mtb">United Arab Emirates</p>
            </div>
            <div class="country">
              <img
                src="~/assets/img/landing/flags/emirates.svg"
                alt="flag"
                class="flag"
              />
            </div>
          </div>
        </div>
      </div>

      <span id="cloud1" class="cloud1">
        <img src="~/assets/img/landing/cloud1.svg" alt="" />
      </span>

      <span id="cloud2" class="cloud2">
        <img src="~/assets/img/landing/cloud2.svg" alt="" />
      </span>

      <div class="footer">
        <div class="content">
          <p class="mt-0 mb-8 text-m-bold">{{ $t("landing.joinUs") }}</p>
          <div class="action">
            <a
              href="https://discord.com/invite/galaxydiamonds"
              class="discord-btn"
            >
              <img
                src="~/assets/img/icons/discord-big.svg"
                alt="discord-icon"
              />
            </a>
          </div>
        </div>

        <Button
          class="top-btn"
          :label="$t('landing.backTop')"
          :background="'primary'"
          :size="'medium'"
          :color="'c-white'"
          @on-click="scrollTop"
        >
          <span slot="icon" class="ml-4 emoji">👆</span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OurTeam",

  mounted() {
    window.addEventListener("scroll", this.scrollHandler);
  },

  methods: {
    scrollHandler(e) {
      const element = document.querySelector("#our-team");
      if (!element) {
        return;
      }
      const posParent = element.getBoundingClientRect();

      if (posParent.top + 250 < window.innerHeight && posParent.bottom >= 0) {
        const cloud1 = document.querySelector("#cloud1");
        const cloud2 = document.querySelector("#cloud2");
        const diff = window.scrollY - posParent.y;

        const cloud1Style = (diff - 3600) / 3.5;
        const cloud2Style = (diff - 3000) / 3.5;

        if (cloud1Style > 0) {
          cloud1.style.bottom = `${cloud1Style}px`;
        }
        if (cloud2Style > 0) {
          cloud2.style.bottom = `${cloud2Style}px`;
        }
      }
    },

    scrollTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/our-team";
</style>
