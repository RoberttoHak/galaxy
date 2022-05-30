<template>
  <div class="checkbox-class">
    <div class="custom-checkbox" :class="{ checked: propModel === value }">
      <input
        v-model="propModel"
        type="radio"
        :value="value"
        :class="classes"
        :name="radioName"
      />
      <slot name="label"></slot>
    </div>
    <div v-if="error" class="errors-list">
      <p class="text-s">{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Radio",
  props: {
    disabled: {
      type: Boolean,
      required: false,
    },
    name: {
      type: [String, Boolean],
      required: true,
    },
    radioName: {
      type: [String],
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    error: {
      type: String,
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
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/ui/radio.scss";
</style>
