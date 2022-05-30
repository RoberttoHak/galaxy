<template>
  <div class="pagination">
    <span
      class="first-item"
      :class="{ disabled: disableLeft }"
      @click="paginate('first')"
    >
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.25 19.5L11.75 12L19.25 4.5"
          :stroke="isDisabledLeft"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.75 19.5L4.25 12L11.75 4.5"
          :stroke="isDisabledLeft"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <span
      class="prev-item"
      :class="{ disabled: disableLeft }"
      @click="paginate('prev')"
    >
      <svg
        width="10"
        height="18"
        viewBox="0 0 10 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.75 16.5L1.25 9L8.75 1.5"
          :stroke="isDisabledLeft"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <p class="count-wrapper mtb">
      <span class="current text-m">{{ showCount }} of </span>
      <span class="total text-m">{{ total }}</span>
    </p>
    <span
      class="next-item"
      :class="{ disabled: disableRight }"
      @click="paginate('next')"
    >
      <svg
        width="10"
        height="18"
        viewBox="0 0 10 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.75 16.5L1.25 9L8.75 1.5"
          :stroke="isDisabledRight"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <span
      class="last-item"
      :class="{ disabled: disableRight }"
      @click="paginate('last')"
    >
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.25 19.5L11.75 12L19.25 4.5"
          :stroke="isDisabledRight"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.75 19.5L4.25 12L11.75 4.5"
          :stroke="isDisabledRight"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      default: 0,
    },
    limit: {
      type: Number,
      default: 0,
    },
    currentPage: {
      type: Number,
      default: 0,
    },
    pageNumber: {
      type: Number,
      default: 0,
    },
    pagesCount: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      disableLeft: true,
      disableRight: false,
    };
  },
  computed: {
    isDisabledLeft() {
      return this.disableLeft ? "#ACA4B2" : "#FFF";
    },
    isDisabledRight() {
      return this.disableRight ? "#ACA4B2" : "#FFF";
    },
    showCount() {
      if (this.currentPage === 1 && this.total <= this.limit) {
        return this.total;
      }

      let count = (this.currentPage - 1) * this.limit;

      if (this.currentPage === 1) {
        return (count = 1 + "-" + (count + this.limit));
      }

      if (count + this.limit > this.total) {
        return count + "-" + this.total;
      }
      return count + "-" + (count + this.limit);
    },
  },
  watch: {
    list() {
      this.checkEnabled(this.currentPage);
    },
  },
  mounted() {
    this.checkEnabled(this.currentPage);
  },
  methods: {
    paginate(type) {
      if (type === "next" && !this.disableRight) {
        return this.$emit("update:page", this.currentPage + 1);
      }
      if (type === "prev" && !this.disableLeft) {
        return this.$emit("update:page", this.currentPage - 1);
      }
      if (type === "first" && !this.disableLeft) {
        return this.$emit("update:page", 1);
      }
      if (type === "last" && !this.disableRight) {
        return this.$emit("update:page", this.pagesCount);
      }
    },

    checkEnabled(val) {
      if (val > 1 && val < this.pagesCount) {
        this.disableLeft = false;
        this.disableRight = false;
        return;
      }

      if (this.pagesCount === 1) {
        this.disableLeft = true;
        this.disableRight = true;
        return;
      }

      if (val === this.pagesCount) {
        this.disableLeft = false;
        this.disableRight = true;
        return;
      }

      if (val === 1 && this.pagesCount !== 1) {
        this.disableLeft = true;
        this.disableRight = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/marketplace/pagination";
</style>
