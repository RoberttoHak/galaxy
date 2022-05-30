<template>
  <div class="custom-filter-dropdown">
    <span v-if="label" class="label-float text-semi-s">
      <span class="text-s-bold">{{ label }}</span>
    </span>
    <div
      class="aselect"
      :class="{ 'disabled-cursor': disabled }"
      :style="selectorStyles"
    >
      <p v-if="subHeader.length" class="text-small">{{ subHeader }}</p>
      <div class="selector" @click="addFocus">
        <div class="label">
          <input
            ref="inputFilter"
            v-model="value"
            :placeholder="placeholder ? placeholder : 'Select...'"
            class="value"
            :disabled="disabled"
            :class="{ 'no-image-label': !src, 'disabled-input': disabled }"
            :style="{ cursor: disabled ? 'not-allowed' : 'pointer' }"
          />
          <img
            v-if="value"
            src="~/assets/img/icons/circle-remove.svg"
            class="label-icon"
            @click.stop="removeValue"
          />
          <div class="arrow">
            <Icon src="search.svg" size="big" />
          </div>
        </div>
      </div>
      <span v-if="error" class="error-wrapper"
        >{{ label ? label : placeholder }}
        {{ $t("validations.isRequired") }}</span
      >
    </div>
  </div>
</template>

<script>
import Icon from "./Icon";
export default {
  name: "SearchFilter",
  components: {
    Icon,
  },
  props: {
    name: {
      type: [String, Number, Object],
      required: true,
    },
    returnObject: {
      type: Boolean,
      default: false,
    },
    notFilter: {
      type: Boolean,
      default: false,
    },
    errorBorder: {
      type: Boolean,
      required: false,
    },
    error: {
      type: [Boolean, String, Object],
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    itemValue: {
      type: String,
      required: false,
      default: null,
    },
    itemLabel: {
      type: String,
      required: false,
      default: null,
    },
    placeholder: {
      type: String,
      required: false,
      default: null,
    },
    label: {
      type: String,
      required: false,
      default: null,
    },
    src: {
      type: String,
      required: false,
      default: null,
    },
    height: {
      type: String,
      required: false,
      default: "",
    },
    subHeader: {
      type: String,
      default: "",
    },
    showIcon: {
      type: String,
      default: "",
    },
    showDefaultOrder: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      value: "",
      visible: false,
      scrollCountArr: [],
      isFocus: false,
      selectedIndex: -1,
      keyIndex: -1,
    };
  },
  computed: {
    styles() {
      return {
        height: this.height ? this.height : "280px",
      };
    },
    selectorStyles() {
      return {
        borderColor: this.visible
          ? "#6B00C1"
          : this.error || this.errorBorder
          ? "#FC4E4E"
          : "#261632",
        borderWidth: "1px",
        borderStyle: "solid",
      };
    },
  },
  watch: {
    value(val) {
      this.$emit("update:name", val);
    },
  },
  mounted() {
    const val = this.name;
    if (val) this.value = val;

    document.addEventListener("click", this.close);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.close);
  },
  methods: {
    addFocus() {
      this.$refs.inputFilter.focus();
    },
    removeValue() {
      this.value = "";
    },
    mouseHover(index) {
      this.keyIndex = index;
    },
    fixScrolling(type) {
      if (this.keyIndex > 0 && this.$refs.options[this.keyIndex]) {
        const liH = this.$refs.options[this.keyIndex].clientHeight;
        const h = liH * this.keyIndex;

        if (type === "down") {
          if (this.scrollCountArr.includes(this.keyIndex)) {
            this.$refs.scrollContainer.scrollTop = h;
          }
          return;
        }

        this.$refs.scrollContainer.scrollTop = h;
      } else this.$refs.scrollContainer.scrollTop = 0;
    },
    select(option, index) {
      this.value = this.itemLabel ? option[this.itemLabel] : option.label;
      this.selectedIndex = index;

      let data = this.itemValue ? option[this.itemValue] : option.id;

      if (this.returnObject) data = option;

      this.$emit("update:name", data);
    },
    close(e) {
      if (
        !this.$el.contains(e.target) ||
        e.target.classList.contains("text-s-bold") ||
        e.target.classList.contains("label-float")
      ) {
        if (this.visible) {
          this.$emit("touched");
        }
        this.visible = false;
        this.isFocus = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/ui/search-filter";
</style>
