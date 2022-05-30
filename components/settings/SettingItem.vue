<template>
  <div
    class="setting-item"
    :class="{
      'no-margin': noMargin,
      cursor: type === 'link',
    }"
    @click="toLink"
  >
    <div class="left-side">
      <span :class="{ 'icon-exists': hasLeftIconSlot }">
        <slot name="icon"></slot>
      </span>
      <div>
        <slot name="title"></slot>
        <slot name="sub-title"></slot>
      </div>
    </div>
    <div class="right-side">
      <span v-if="type === 'link'" class="action">
        <img src="~/assets/img/icons/caret-left.svg" alt="caret" />
      </span>
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "SettingItem",
  props: {
    noMargin: {
      type: Boolean,
      default: false,
    },
    status: {
      type: [String, Boolean],
      default: "normal",
    },
    type: {
      type: String,
      default: "link",
    },
    link: {
      type: String,
      default: "",
    },
    leftIcon: {
      type: String,
      default: "",
    },
  },

  computed: {
    hasLeftIconSlot() {
      return !!this.$slots.icon;
    },
  },

  methods: {
    toLink() {
      if (this.type === "link") this.$router.push(this.link);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/settings/setting-item";
</style>
