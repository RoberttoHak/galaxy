<template>
  <div class="road-item">
    <div class="left-side">
      <div class="count-block">
        <slot name="count"></slot>
        <span
          v-if="status === 'new'"
          class="vote-action"
          :class="{ 'view-loading': loading }"
          @click="$emit('add-count')"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 10L8 5L13 10"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <span v-if="loading">+1</span>
        </span>
        <span v-else class="text-s-bold votes">{{ $t("roadmap.votes") }}</span>
      </div>

      <div class="info">
        <slot name="title"></slot>
        <slot name="description"></slot>
      </div>
    </div>

    <div class="right-side">
      <div class="status" :class="{ [`${status}-bg`]: true }">
        <span
          class="status-text text-m-bold"
          :class="{ [`${status}-text`]: true }"
          >{{ statusLabel }}</span
        >
        <span v-if="status === 'completed'" class="checked">
          <img src="~/assets/img/landing/success-check.svg" alt="checkmark" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoadmapItem",
  props: {
    status: {
      type: String,
      default: "new",
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      pressed: false,
      statuses: {
        new: "New",
        in_progress: "In progress",
        completed: "Completed",
      },
    };
  },

  computed: {
    statusLabel() {
      return this.statuses[this.status];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/marketplace/road-item";
</style>
