<template>
  <button
    :type="buttonHtmlType"
    :class="classes"
    :disabled="disabled"
    class="custom-button"
    @click.stop="onClick"
  >
    <span v-if="tooltip" class="tooltip text-m">{{ tooltip }}</span>
    <slot name="input" class="input-upload"></slot>
    <slot name="left-icon" class="text"></slot>
    <span v-if="label" class="btn-label" :class="{ 'has-icon': hasIconSlot }">{{
      label
    }}</span>
    <slot name="icon" class="text"></slot>
  </button>
</template>

<script>
export default {
  name: "MyButton",

  props: {
    label: {
      type: String,
      required: false,
      default: null,
    },
    tooltip: {
      type: String,
      required: false,
      default: "",
    },
    src: {
      type: String,
      required: false,
      default: null,
    },
    background: {
      type: String,
      default: "primary",
    },
    color: {
      type: String,
      default: "black",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    circle: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    fixed: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "medium",
      validator(value) {
        return ["medium", "full", "small", "custom-medium"].includes(value);
      },
    },
    buttonHtmlType: {
      type: String,
      default: "button",
    },
  },

  computed: {
    hasIconSlot() {
      return !!this.$slots.icon;
    },
    classes() {
      return {
        [`custom-button__${this.background}`]: true,
        [`custom-button__${this.color}`]: true,
        [`custom-button__${this.size}`]: true,
        [`custom-button__disabled-${this.background}`]: this.disabled,
        "custom-button__fixed": this.fixed,
        "custom-button__circle": this.circle,
      };
    },
  },

  methods: {
    onClick() {
      this.$emit("on-click");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/ui/button";
</style>
