<template>
  <div>
    <span v-if="header" class="text-m mb-4">{{ header }}</span>
    <div class="custom-input" :class="{ 'no-margin': noMargin }">
      <label
        :for="id ? id : uniqueId"
        class="label"
        :class="labelClasses"
        @click="focusHandler"
      >
        {{ label }}
      </label>
      <!--    <Icon-->
      <!--      v-if="icon"-->
      <!--      :icon="icon"-->
      <!--      :circle="iconCircle"-->
      <!--      class="icon"-->
      <!--      @click.native="$emit('icon-click')"-->
      <!--    />-->
      <input
        :id="id ? id : uniqueId"
        ref="customInput"
        v-model.trim="propModel"
        :type="type"
        class="floating-input"
        :class="inputClasses"
        :max-length="maxLength"
        :disabled="disabled || disabledState"
        autocomplete="on"
        :placeholder="placeholder"
        @keypress="keyPressHandler"
        @keyup="keyUpHandler"
        @blur="handleBlur"
        @focus="focusHandler"
      />
      <span v-if="icon" class="icon" @click.stop="$emit('icon-click')">
        <img :src="icon" alt="icon" />
      </span>
      <div v-if="withIndicator && checkError" class="indicators">
        <div class="indicator-list">
          <span
            v-for="(item, index) in 4"
            :key="item"
            class="indicator"
            :class="{ 'active-level': index < level }"
          ></span>
        </div>
        <span class="indicator-status text-s-bold">{{
          indicators[level]
        }}</span>
      </div>
      <p v-if="helpText" class="text-s help-text">{{ helpText }}</p>
      <InputErrorList
        v-if="checkError"
        :rules="rules"
        :error="error"
        :has-error="hasError"
        :custom-error="customError"
      />
    </div>
  </div>
</template>

<script>
import InputErrorList from "../ui/InputErrorList";

export default {
  name: "Input",
  components: {
    InputErrorList,
  },
  props: {
    type: {
      type: String,
      default: "text",
      validator(value) {
        return ["text", "email", "number", "password"].includes(value);
      },
    },
    label: {
      type: String,
      required: false,
      default: "",
    },
    id: {
      type: String,
      required: false,
      default: "",
    },
    helpText: {
      type: String,
      default: null,
    },
    remove: {
      type: Boolean,
      required: false,
    },
    noMargin: {
      type: Boolean,
      required: false,
    },
    isSubmit: {
      type: Boolean,
      required: false,
    },
    errorBorder: {
      type: Boolean,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    disabledState: {
      type: Boolean,
      required: false,
      default: false,
    },
    model: {
      type: [String, Number, Array],
      required: true,
    },
    error: {
      type: Object,
      required: false,
      default: null,
    },
    rules: {
      type: Array,
      required: false,
      default: null,
    },
    customError: {
      type: [Object, Array],
      required: false,
      default: null,
    },
    level: {
      type: Number,
      required: false,
      default: 0,
    },
    maxLength: {
      type: Number,
      required: false,
      default: null,
    },
    isFocus: {
      type: [Boolean, Number],
      required: false,
      default: false,
    },
    withIndicator: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: null,
    },
    header: {
      type: String,
      default: "",
    },
    iconCircle: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: null,
    },
    setFocus: {
      type: Boolean,
      default: false,
    },
    noFloat: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      click: false,
      isFocusTrue: false,
      indicators: ["Very weak", "Weak", "So-so", "Good", "Great!"],
    };
  },
  computed: {
    propModel: {
      get() {
        return this.model;
      },
      set(value) {
        this.$emit("update:model", value);
        this.$emit("update:error-border", false);
      },
    },
    checkError() {
      return (
        this.hasError ||
        (this.customError && this.customError.type) ||
        this.customError?.length
      );
    },
    hasIcon() {
      return this.icon;
    },
    hasError() {
      if (this.error && this.rules) {
        if (this.click && !this.error.$model.length && this.error.$invalid) {
          return true;
        }
        return this.error.$model.length && this.error.$invalid;
      }
      return false;
    },
    uniqueId() {
      if (!this.propModel) {
        return Math.random(1, 50);
      }

      return (
        "_" +
        this.propModel.toString().substr(2, 6) +
        this.type +
        Math.random(1, 50)
      );
    },

    regroup() {
      return !this.noFloat && (this.isFocusTrue || this.propModel.length);
    },

    labelClasses() {
      return {
        "text-s": this.regroup,
        "text-m": !this.regroup,
        "disabled-label": this.disabled,
        regroup: this.regroup,
        focus: this.isFocusTrue,
        "has-error": this.errorBorder || this.checkError,
      };
    },

    inputClasses() {
      return {
        "icon-padding": this.hasIcon,
        "disabled-cursor": this.disabled,
        "has-error": this.errorBorder || this.checkError,
        "focus-border": this.isFocusTrue,
        regroup: this.regroup,
        "text-m": this.regroup,
      };
    },
  },
  watch: {
    isSubmit(val) {
      if (val) this.handleClick();
    },
    hasError(val) {
      if (!val && this.isFocusTrue) this.isFocusTrue = true;
    },
    isFocus(val) {
      if (val) {
        this.$refs.customInput.focus();
        this.isFocusTrue = true;
      }
    },
    click(val) {
      if (val) this.$emit("touched");
    },
    setFocus(val) {
      const input = this.$refs.customInput;
      if (val) {
        input.focus();
      } else {
        input.blur();
      }
    },
  },
  methods: {
    handleBlur() {
      this.$emit("handle-blur");
      this.handleClick();
      this.isFocusTrue = false;
      this.$emit("update:setFocus", false);
    },
    focusHandler() {
      this.isFocusTrue = !this.hasError;
      this.isFocusTrue = true;
      this.$emit("update:setFocus", true);
    },
    handleClick() {
      if (this.remove && this.model.length <= 8) {
        this.$emit("update:model", "");
      }
      this.click = true;
    },
    keyUpHandler() {
      setTimeout(() => {
        this.$emit("key-up");
      }, 350);
    },
    keyPressHandler(e) {
      if (this.type === "number") {
        const char = String.fromCharCode(e.keyCode);
        if (/^[0-9]+$/.test(char)) {
          return true;
        } else {
          e.preventDefault();
        }
      }
      if (e.keyCode === 13) {
        this.$emit("keypress-enter");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/ui/input";
</style>
