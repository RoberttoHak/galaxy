<template>
  <div class="checkbox-class">
    <div class="custom-checkbox" @click="setValue">
      <label slot="label" class="text-m">
        <img src="~/assets/img/icons/id-card.svg" alt="icon" />
        <span class="ml-8 text-m" :class="{ bold: checked }">{{ label }}</span>
      </label>

      <span class="circle" :class="{ current: checked, error }"> </span>

      <!--      <input-->
      <!--        v-model="propModel"-->
      <!--        type="radio"-->
      <!--        :value="value"-->
      <!--        :class="classes"-->
      <!--        :name="radioName"-->
      <!--      />-->
    </div>
    <!--    <div v-if="error" class="errors-list">-->
    <!--      <p class="text-s">{{ error }}</p>-->
    <!--    </div>-->
  </div>
</template>

<script>
export default {
  name: "RadioCircle",
  props: {
    disabled: {
      type: Boolean,
      required: false,
    },
    name: {
      type: [String, Boolean],
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: false,
      default: "",
    },
    error: {
      type: [String, Boolean],
      required: false,
      default: null,
    },
  },
  computed: {
    classes() {
      return {
        "custom-checkbox__disabled": this.disabled,
      };
    },

    checked() {
      return this.value === this.name;
    },
  },

  methods: {
    setValue() {
      this.$emit("update:name", this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/ui/radio-circle.scss";
</style>
