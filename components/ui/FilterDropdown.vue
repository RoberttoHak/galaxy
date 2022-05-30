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
      <div class="selector" @click="!disabled ? toggle($event) : null">
        <div class="label">
          <input
            ref="inputFilter"
            v-model="value"
            :placeholder="placeholder ? placeholder : 'Select...'"
            class="value"
            :disabled="disabled"
            :class="{ 'no-image-label': !src, 'disabled-input': disabled }"
            :style="{ cursor: disabled ? 'not-allowed' : 'pointer' }"
            @input="showList"
            @keydown="onKeyDown"
          />
          <img
            v-if="value && showRemove"
            src="~/assets/img/icons/circle-remove.svg"
            class="label-icon"
            @click.stop="removeValue"
          />
          <div v-if="!disabled" class="arrow" :class="{ expanded: visible }">
            <Icon src="caret-down.svg" size="big" />
          </div>
          <div v-else class="arrow" :class="{ expanded: visible }">
            <Icon src="caret-down-dark.svg" size="big" />
          </div>
        </div>
        <div
          v-if="!disabled"
          :class="{
            hidden: !visible,
            visible,
            'must-scroll': visible && mustScroll,
          }"
        >
          <ul
            v-show="visible"
            ref="scrollContainer"
            :class="{
              'custom-height': filterByAlphaList.length > 10,
              'moz-height': mozHeight,
            }"
            :style="styles"
          >
            <li v-if="!filterByAlphaList.length" class="text-m">
              {{ $t("settings.noResults") }}
            </li>
            <li
              v-for="(item, index) in filterByAlphaList"
              v-else
              ref="options"
              :key="index"
              :class="{
                current: selectedIndex === index,
                'hover-key': keyIndex === index,
              }"
              class="text-m"
              @click="select(item, index)"
            >
              <span class="label-text">{{
                itemLabel ? item[itemLabel] : item.label
              }}</span>
              <span v-if="selectedIndex === index">
                <img src="~/assets/img/icons/checkbox-mark.svg" alt="icon" />
              </span>
            </li>
          </ul>
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
// import SvgSelectedOption from "~/assets/img/selected-option.svg?inline";
import Icon from "./Icon";
export default {
  name: "FilterDropdown",
  components: {
    Icon,
    // SvgSelectedOption,
  },
  props: {
    list: {
      type: Array,
      required: true,
    },
    name: {
      type: [String, Number, Object],
      required: true,
    },
    returnObject: {
      type: Boolean,
      default: false,
    },
    mustScroll: {
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
    showRemove: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      value: "",
      visible: false,
      listNew: [],
      scrollCountArr: [],
      isFocus: false,
      selectedIndex: -1,
      keyIndex: -1,
    };
  },
  computed: {
    filterByAlphaList() {
      return [...this.listNew];
      // if (list.length && list[0].label && !this.notFilter) {
      //   if (this.showDefaultOrder) {
      //     return list;
      //   } else {
      //     return list.sort((a, b) => a.label.localeCompare(b.label));
      //   }
      // }
      // if (list.length && list[0].value && !this.notFilter) {
      //   return list.sort((a, b) => a.value.localeCompare(b.value));
      // }
      // return list;
    },
    mozHeight() {
      return this.listNew.length <= 6;
    },
    styles() {
      return {
        height: this.height
          ? this.height
          : this.listNew.length <= 6
          ? "fit-content"
          : "280px",
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
      if (val) {
        this.listNew = this.list.filter((item) => {
          const label = this.itemLabel ? this.itemLabel : "label";
          if (
            item[label] &&
            (item[label].includes(val) ||
              item[label].toUpperCase().includes(val) ||
              item[label].toLowerCase().includes(val))
          ) {
            return item;
          } else if (item.value === val) {
            this.value = item.label;
            return item;
          }
        });
      } else {
        this.selectedIndex = -1;
        this.$emit("update:name", "");
      }
    },
    name(val) {
      if (!val) this.value = "";
    },
    visible(val) {
      if (val) {
        this.keyIndex = this.selectedIndex > 0 ? this.selectedIndex : 0;
        this.getCountsArr();
        this.fixScrolling();
      }

      if (!val && !this.listNew.length) {
        this.value = "";
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.close);
    let val = this.name;
    if (this.itemValue && this.itemLabel) {
      const list = this.list?.length ? [...this.list] : [];
      // if (list.length && list[0].label && !this.notFilter) {
      //   list = list.sort((a, b) => a.label.localeCompare(b.label));
      // }

      const objIndex = list.findIndex((v) => v[this.itemValue] === this.name);
      if (objIndex > -1) {
        this.selectedIndex = objIndex;
        const obj = list[objIndex];
        val = obj[this.itemLabel];
      }
    }
    this.value = val;
  },
  beforeDestroy() {
    document.removeEventListener("click", this.close);
  },
  methods: {
    removeValue() {
      this.value = "";
    },
    mouseHover(index) {
      this.keyIndex = index;
    },
    getCountsArr() {
      let arr = [];

      if (this.listNew?.length) {
        const count = Math.round(this.listNew.length / 7);
        [...Array(count).keys()].forEach((item) => {
          arr = [...arr, (item + 1) * 7];
        });
      }

      this.scrollCountArr = arr;
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
    onKeyDown(e) {
      if (e.keyCode === 40 && this.keyIndex !== this.listNew.length - 1) {
        this.keyIndex = this.keyIndex + 1;
        if (this.listNew.length > 7) this.fixScrolling("down");
      }
      if (e.keyCode === 38 && this.keyIndex > 0) {
        this.keyIndex = this.keyIndex - 1;
        if (this.listNew.length > 7) this.fixScrolling();
      }
      if (e.keyCode === 13) {
        this.selectByKey(this.keyIndex);
      }
    },
    toggle() {
      this.isFocus = this.$refs.inputFilter === document.activeElement;

      this.visible = !this.visible;
      if (this.visible) {
        this.$refs.inputFilter.focus();
        this.listNew = this.list;
      } else {
        this.$emit("touched");
      }
    },
    showList() {
      this.visible = true;
    },
    selectByKey(keyIndex) {
      const item = this.listNew.filter((item, index) => index === keyIndex);
      const option = item[0];

      if (option) {
        this.value = this.itemLabel ? option[this.itemLabel] : option.label;
        this.selectedIndex = keyIndex;

        let data = this.itemValue ? option[this.itemValue] : option.id;

        if (this.returnObject) data = option;

        this.$emit("update:name", data);
        this.visible = false;
      }
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
@import "assets/scss/ui/filter-dropdown";
</style>
