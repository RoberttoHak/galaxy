<template>
  <div id="road-map" class="road-map">
    <div class="full-container">
      <h2 class="text-xl mt-0">{{ $t("landing.ourRoadMap") }}</h2>
      <p
        class="mtb text-l text-center desc"
        v-html="$t('landing.roadDesc')"
      ></p>

      <div class="content">
        <!--      <div-->
        <!--        v-for="(chunks, chunkIndex) in roadMapChunked"-->
        <!--        :key="`${chunks.length}_${chunkIndex}`"-->
        <!--        class="row"-->
        <!--        :class="{-->
        <!--          'two-column': chunks.length === 2,-->
        <!--          'one-column': chunks.length === 2,-->
        <!--        }"-->
        <!--      >-->
        <!--        <div v-for="(item, index) in chunks" :key="index" class="left-side">-->
        <!--          <div class="star">-->
        <!--            <img src="~/assets/img/landing/star-shine.svg" alt="" />-->
        <!--          </div>-->
        <!--          <div class="star-info">-->
        <!--            <span class="star-text" :class="{ done: item.status === 'done' }">{{-->
        <!--              item.text-->
        <!--            }}</span>-->
        <!--            <span v-if="item.status === 'done'" class="check-block"-->
        <!--              ><img src="~/assets/img/landing/success-check.svg" alt="check"-->
        <!--            /></span>-->
        <!--          </div>-->
        <!--        </div>-->
        <!--      </div>-->

        <div class="row two-column">
          <div class="left-side">
            <div class="star" @click="openModal(0)">
              <img src="~/assets/img/landing/star-shine.svg" alt="" />
            </div>
            <div class="star-info">
              <span class="star-text done">{{ $t("landing.starTitle0") }}</span>
              <span class="check-block"
                ><img src="~/assets/img/landing/success-check.svg" alt="check"
              /></span>
            </div>
            <span class="hover-text text-m">{{ staticText[0] }}</span>
          </div>

          <div class="left-side">
            <div class="star" @click="openModal(1)">
              <img src="~/assets/img/landing/big-circle.svg" alt="" />
            </div>
            <div class="star-info">
              <span class="star-text progress">{{
                $t("landing.starTitle1")
              }}</span>
            </div>
            <span class="hover-text text-m line-2">{{ staticText[1] }}</span>
          </div>
        </div>

        <div class="row one-column">
          <div class="center-side">
            <div class="circle" @click="openModal(2)">
              <img src="~/assets/img/landing/small-circle.svg" alt="" />
            </div>
            <div class="star-info">
              <span class="star-text to-do">{{
                $t("landing.starTitle2")
              }}</span>
            </div>
            <span class="hover-text text-m">{{ staticText[2] }}</span>
          </div>
        </div>

        <div class="row two-column new-justify">
          <div class="left-side">
            <div class="star" @click="openModal(3)">
              <img src="~/assets/img/landing/small-circle.svg" alt="" />
            </div>
            <div class="star-info">
              <span class="star-text to-do">{{
                $t("landing.starTitle3")
              }}</span>
            </div>
            <span class="hover-text text-m">{{ staticText[3] }}</span>
          </div>

          <div class="left-side">
            <div class="star" @click="openModal(4)">
              <img src="~/assets/img/landing/small-circle.svg" alt="" />
            </div>
            <div class="star-info">
              <span class="star-text to-do">{{
                $t("landing.starTitle4")
              }}</span>
            </div>
            <span class="hover-text text-m line-2">{{ staticText[4] }}</span>
          </div>
        </div>

        <div class="row one-column">
          <div class="center-side">
            <div class="circle" @click="openModal(5)">
              <img src="~/assets/img/landing/small-circle.svg" alt="" />
            </div>
            <div class="star-info">
              <span class="star-text to-do">{{
                $t("landing.starTitle5")
              }}</span>
            </div>
            <span class="hover-text text-m">{{ staticText[5] }}</span>
          </div>
        </div>

        <div class="row two-column">
          <div class="left-side">
            <div class="star" @click="openModal(6)">
              <img src="~/assets/img/landing/small-circle.svg" alt="" />
            </div>
            <div class="star-info">
              <span class="star-text to-do">{{
                $t("landing.starTitle6")
              }}</span>
            </div>
            <span class="hover-text text-m line-2">{{ staticText[6] }}</span>
          </div>

          <div class="left-side">
            <div class="star" @click="openModal(7)">
              <img src="~/assets/img/landing/small-circle.svg" alt="" />
            </div>
            <div class="star-info">
              <span class="star-text to-do">{{
                $t("landing.starTitle7")
              }}</span>
            </div>
            <span class="hover-text text-m line-2">{{ staticText[7] }}</span>
          </div>
        </div>

        <div class="row two-column new-justify">
          <div class="left-side">
            <div class="star" @click="openModal(8)">
              <img src="~/assets/img/landing/small-circle.svg" alt="" />
            </div>
            <div class="star-info">
              <span class="star-text to-do line-2">{{
                $t("landing.starTitle8")
              }}</span>
            </div>
            <span class="hover-text text-m line-2">{{ staticText[8] }}</span>
          </div>

          <div class="left-side">
            <div class="star" @click="openModal(9)">
              <img src="~/assets/img/landing/small-circle.svg" alt="" />
            </div>
            <div class="star-info">
              <span class="star-text to-do">{{
                $t("landing.starTitle9")
              }}</span>
            </div>
            <span class="hover-text text-m line-2">{{ staticText[9] }}</span>
          </div>
        </div>

        <div class="big-star-container">
          <p class="mtb big-star-text" @click="openModal(10)">
            <img
              src="~/assets/img/landing/big-star.svg"
              alt="star"
              class="big-star"
            />
            <span class="hover-text-star text-m">{{ staticText[10] }}</span>
          </p>
          <p class="trip">{{ $t("landing.trip") }}</p>
        </div>

        <span class="rocket">
          <img src="~/assets/img/landing/rocket.png" alt="rocket" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoadMap",
  data() {
    return {
      staticText: [
        this.$t("landing.starText0"),
        this.$t("landing.starText1"),
        this.$t("landing.starText2"),
        this.$t("landing.starText3"),
        this.$t("landing.starText4"),
        this.$t("landing.starText5"),
        this.$t("landing.starText6"),
        this.$t("landing.starText7"),
        this.$t("landing.starText8"),
        this.$t("landing.starText9"),
        this.$t("landing.starText10"),
      ],
      // oneLine: [2, 4],
      // map: [
      //   { status: "done", text: "3D collection" },
      //   { status: "in-progress", text: "tester platform" },
      //   { status: "not-done", text: "Official launch" },
      //   { status: "not-done", text: "collaborations" },
      //   { status: "not-done", text: "Giveaways" },
      //   { status: "not-done", text: "Mobile app" },
      //   { status: "not-done", text: "Smartwatch integration" },
      //   { status: "not-done", text: "own metaverse" },
      //   { status: "not-done", text: "VR estates" },
      //   { status: "not-done", text: "VR events" },
      // ],
      // roadMapChunked: [],
    };
  },
  mounted() {
    // this.roadMapChunked = this.chunkArray(this.map);
  },
  methods: {
    openModal(index) {
      if (window.innerWidth <= 767) {
        this.$store.commit("setModal", {
          show: true,
          type: "star-info",
          data: this.staticText[index],
        });
      }
    },
    // chunkArray(myArray) {
    //   const results = [];
    //   let count = 1;
    //   let chunkSize = 1;
    //
    //   while (myArray.length) {
    //     if (this.oneLine.includes(count)) chunkSize = 1;
    //     else chunkSize = 2;
    //
    //     results.push(myArray.splice(0, chunkSize));
    //     count++;
    //   }
    //
    //   return results;
    // },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/road-map";
</style>
