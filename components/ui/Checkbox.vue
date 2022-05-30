<template>
  <div class="checkbox-class">
    <div class="custom-checkbox">
      <input
        id="checkbox"
        v-model="propModel"
        type="checkbox"
        :class="classes"
        :disabled="disabled"
      />
      <span class="toggle-label" @click="toggle">
        <slot name="label"></slot>
      </span>
    </div>
    <div v-if="error" class="errors-list">
      <p class="text-s">{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Checkbox",
  props: {
    disabled: {
      type: Boolean,
      required: false,
    },
    name: {
      type: [String, Boolean],
      required: true,
    },
    error: {
      type: [String, Boolean],
      required: false,
      default: null,
    },
  },
  computed: {
    propModel: {
      get() {
        return this.name;
      },
      set(value) {
        this.$emit("update:name", value);
      },
    },
    classes() {
      return {
        "custom-checkbox__disabled": this.disabled,
        "custom-checkbox__error": this.error,
      };
    },
  },
  methods: {
    toggle() {
      this.$emit("update:name", !this.name);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/ui/checkbox.scss";
</style>
