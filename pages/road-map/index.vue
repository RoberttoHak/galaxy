<template>
  <div class="road-map-wrapper main-container">
    <Navigation
      :title="$t('marketplace.galacticMiles')"
      class="mb-8"
      :show-back="$auth.loggedIn"
    />

    <div class="header-block mb-40">
      <div class="left-side">
        <h1 class="no-color-link mt-0 mb-16 header-big-l">
          {{ $t("roadmap.roadmap") }}
        </h1>
        <p class="text-m no-color-link desc">{{ $t("roadmap.roadmapDesc") }}</p>
      </div>

      <div class="right-side">
        <img
          :src="require(`assets/img/small-gift.png`)"
          class="user-tag-gift"
          alt="icon"
        />
        <span class="text-m-bold user-tag-text"
          >{{ count }}GM ({{ count }} votes)</span
        >
      </div>
    </div>

    <div v-if="nfts.results && nfts.results.length" class="content">
      <RoadmapItem
        v-for="item in nfts.results"
        :key="item.uid"
        :status="item.status"
        :loading="item.loading"
        @add-count="addCount(item.uid)"
      >
        <span
          slot="count"
          class="header-title1 no-color-link"
          :class="{
            'view-loading': item.loading,
            votes: item.status !== 'new',
          }"
          >{{ convertVotes(item.votes) }}</span
        >
        <p slot="title" class="mt-0 mb-4 no-color-link text-m-bold">
          {{ item.title }}
        </p>
        <p slot="description" class="mtb no-color-link text-m">
          {{ item.description }}
        </p>
      </RoadmapItem>

      <!-- <RoadmapItem :status="'progress'">
        <span slot="count" class="header-title1 no-color-link">22</span>
        <p slot="title" class="mt-0 mb-4 no-color-link text-m-bold">Title</p>
        <p slot="description" class="mtb no-color-link text-m">
          when an unknown printer took a galley of type and scrambled it to make
          a type specimen book. It has survived not only five centuries, but
          also the leap into electronic typesetting, remaining essentially
        </p>
      </RoadmapItem>

      <RoadmapItem :status="'completed'">
        <span slot="count" class="header-title1 no-color-link">22</span>
        <p slot="title" class="mt-0 mb-4 no-color-link text-m-bold">Title</p>
        <p slot="description" class="mtb no-color-link text-m">
          when an unknown printer took a galley of type and scrambled it to make
          a type specimen book. It has survived not only five centuries, but
          also the leap into electronic typesetting, remaining essentially
        </p>
      </RoadmapItem> -->
      <div class="pagination-wrapper">
        <Pagination
          :list="nfts.results"
          :total="nfts.count"
          :page.sync="filter.page"
          :page-number="filter.page"
          :current-page="nfts.current"
          :pages-count="nfts.pages_count"
          :limit="filter.page_size || nfts.page_size"
          @update:page="updatePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "../../components/header/Navigation";
import RoadmapItem from "../../components/marketplace/RoadmapItem";
import Pagination from "../../components/marketplace/Pagination";
import { functions } from "../../utils";
import { catchErrors } from "../../utils/catchErrors";
const filterDefaultVars = {
  page: 1,
  page_size: 10,
};

export default {
  name: "Index",
  components: {
    Navigation,
    RoadmapItem,
    Pagination,
  },
  auth: false,
  layout(context) {
    if (context.$auth.$state.user) {
      return "auth";
    }
  },
  async asyncData({ store, route, error }) {
    try {
      const query = route.query;
      const filter = { ...filterDefaultVars };
      Object.keys(filter).forEach((key) => {
        filter[key] = query[key] || filterDefaultVars[key];
      });

      const nfts = await store.dispatch("nfts/getRoadmap", filter);
      return { nfts, filter };
    } catch (e) {
      const status = e.response.status;
      if (status === 404) {
        error({ statusCode: 404, message: "Not found" });
      }
    }
  },
  data() {
    return {
      nfts: {},
    };
  },
  computed: {
    convertVotes() {
      return (votes) => {
        if (+votes > 9999) {
          const value = +votes / 1000;
          return value.toString().substring(0, 4) + "k";
        }

        if (+votes > 999) {
          const value = +votes / 1000;
          return value.toString().substring(0, 3) + "k";
        }

        return votes;
      };
    },
    count() {
      if (this.$auth.loggedIn) return this.$auth.user.miles_amount;
      return 0;
    },
  },
  methods: {
    updatePage(val) {
      const cleanObject = functions.cleanObject(this.$route.query);
      this.filter.page = val;
      cleanObject.page = val;
      this.setQuery(cleanObject);
    },
    async setQuery(query) {
      const cleanObject = await functions.cleanObject(query);
      await this.fetchNfts(cleanObject);

      delete cleanObject.page_size;
      await this.$router.push({ query: cleanObject });

      setTimeout(() => {
        this.filterHeader = cleanObject;
        this.filter = query;
      }, 0);
    },
    async fetchNfts(query) {
      try {
        this.nfts = await this.$store.dispatch("nfts/getRoadmap", query);
      } catch (e) {
        await this.$store.commit("setSnackbar", {
          show: true,
          message: catchErrors(e),
          color: "error",
        });
      }
    },
    async addCount(uuid) {
      if (!this.$auth.loggedIn) {
        this.$router.push("/login");
        return;
      }
      if (this.count === 0) {
        return this.$store.commit("setModal", {
          show: true,
          type: "galactic-miles",
        });
      }

      if (!this.$auth.loggedIn) return this.$router.push("/login");
      try {
        await this.$store.dispatch("nfts/voteRoadmap", uuid);
        const voitNft = this.nfts.results.filter(
          (item) => item.uid === uuid
        )[0];
        voitNft.votes++;
        voitNft.loading = true;
        await this.$auth.fetchUser();
        setTimeout(() => {
          this.updatePage(this.filter.page);
        }, 5000);
      } catch (error) {
        await this.$store.commit("setSnackbar", {
          show: true,
          message: this.$t("snackbar.voteFail"),
          color: "error",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/road-map";
</style>
