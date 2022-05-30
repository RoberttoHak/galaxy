<template>
  <div class="landing-wrapper">
    <main>
      <BlackWhole />

      <ComingSoon />

      <Discover />

      <BecomeTester :collections="feed.constellations.slice(0, 3)" />

      <NftsUnique />

      <RoadMap />

      <Sounds />

      <Blog :blogs="feed.blogs" />

      <Faq :faqs="feed.faq" />

      <TextSection />

      <OurTeam />

      <LandingFooter />
    </main>
  </div>
</template>

<script>
import NftsUnique from "../components/landing/NftsUnique";
import Sounds from "../components/landing/Sounds";
import Discover from "../components/landing/Discover";
import BecomeTester from "../components/landing/BecomeTester";
import OurTeam from "../components/landing/OurTeam";
import ComingSoon from "../components/landing/ComingSoon";
import RoadMap from "../components/landing/RoadMap";
import TextSection from "../components/landing/TextSection";
import BlackWhole from "../components/landing/BlackWhole";
import LandingFooter from "../components/footer/LandingFooter";
import Blog from "../components/landing/Blog";
import Faq from "../components/landing/Faq";
export default {
  components: {
    Faq,
    RoadMap,
    NftsUnique,
    Sounds,
    LandingFooter,
    Discover,
    BecomeTester,
    ComingSoon,
    OurTeam,
    TextSection,
    BlackWhole,
    Blog,
  },
  layout: "landing",
  middleware: ["isLoggedIn"],
  async asyncData({ store }) {
    const feed = await store.dispatch("landing/feed");
    return { feed };
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/landing";
</style>
