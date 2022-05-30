<template>
  <div v-if="leaders && leaders.length" class="leaderboard">
    <div id="track" class="leaderboard-track">
      <marquee>
        <div class="display-f">
          <div id="start-item" class="leaderboard-single">
            <span>🚀 {{ $t("profile.leaderboard") }}</span>
          </div>
          <div
            v-for="(leader, index) in leaders.slice(0, 9)"
            :key="leader.username + index"
            class="leaderboard-single"
          >
            <span v-if="index == 0"
              >🏆🏆🏆 {{ leader.username }} ({{ leader.nft_tokens }})</span
            >
            <span v-if="index == 1"
              >🏆🏆 {{ leader.username }} ({{ leader.nft_tokens }})</span
            >
            <span v-if="index == 2"
              >🏆 {{ leader.username }} ({{ leader.nft_tokens }})</span
            >
            <span v-if="index > 2"
              >✨ {{ leader.username }} ({{ leader.nft_tokens }})</span
            >
          </div>
        </div>
      </marquee>
    </div>
  </div>
</template>

<script>
export default {
  name: "Leaderboard",
  data() {
    return {
      mountains: [],
      leaders: [],
      repeat: 5,
    };
  },
  async fetch() {
    const leaders = await this.$store.dispatch("nfts/getLeaderboard");
    this.leaders = leaders.results;
  },
  computed: {
    userAvatar() {
      return require("~/assets/img/header-logo.svg");
    },
  },
  mounted() {
    // console.log("screen width", screen.width * 2);
    // console.log("screen width division", (screen.width / 220) * 2);
    // console.log("screen width to check", Math.ceil(screen.width / 220) * 2);
    // console.log(
    //   "remaining spaces",
    //   Math.ceil(screen.width / 220) * 2 - this.leaders.length
    // );
    // const numberOfItems =
    //   Math.ceil(screen.width / 220) * 2 - this.leaders.length;
    // const startItem = document.getElementById("start-item");
    // const track = document.getElementById("track");
    // for (
    //   let i = 0;
    //   i < Math.ceil(screen.width / 220) * 2 - this.leaders.length;
    //   i++
    // ) {
    //   console.log(i);
    //   const item = startItem.cloneNode(true);
    //   item.setAttribute("class", "leaderboard-single");
    //   track.append(item);
    // }
    // document.getElementById("track").animate(
    //   [
    //     // keyframes
    //     { transform: `translateX(100%)` },
    //     { transform: `translateX(calc(-220px * ${this.leaders.length + 1}))` },
    //   ],
    //   {
    //     // timing options
    //     duration: 5000,
    //     iterations: Infinity,
    //   }
    // );
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/header/leaderboard";
</style>
