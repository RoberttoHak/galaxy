<template>
  <div class="navigation">
    <Icon
      v-if="showBack"
      src="arrow-left.svg"
      size="big"
      class="pointer mr-8"
      @on-click="back"
    ></Icon>
    <span class="text-m-bold">{{ title }}</span>
  </div>
</template>

<script>
import Icon from "../ui/Icon";
export default {
  name: "Navigation",
  components: {
    Icon,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    customLink: {
      type: String,
      default: "",
    },
    withQuery: {
      type: Boolean,
      default: false,
    },
    showBack: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    back() {
      if (this.withQuery) {
        const query = this.$store.getters.query;
        return this.$router.push({ path: this.customLink, query });
      }

      if (this.customLink) {
        return this.$router.push(this.customLink);
      }

      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/header/navigation";
</style>
