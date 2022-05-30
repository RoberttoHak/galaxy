<template>
  <div class="dropdown-list-wrapper" :class="{ disabled: disabled }">
    <div class="label-block" @click="openDropdown">
      <slot v-if="isLabel" name="label"></slot>
      <span v-else class="drop-img-block">
        <img v-if="src" :src="src" alt="profile-image" />
        <span v-else class="default-img"></span>
      </span>

      <span v-if="hasNotifications" class="red-circle"></span>
    </div>
    <ul v-if="show" class="dropdown-list q" :style="style">
      <li v-if="miles">
        <div
          class="container-li custom-li"
          @click="$router.push('/galactic-miles')"
        >
          <div class="left-side">
            <span class="img-block">
              <img src="~/assets/img/gift-box.png" alt="gift-box" />
            </span>
            <div class="ml-8">
              <p class="mtb text-s-bold no-color-link">
                {{ $t("marketplace.galacticMiles") }}
              </p>
              <p class="mtb text-m-bold no-color-link">{{ miles }}</p>
            </div>
          </div>
          <div class="right-side">
            <img
              :src="require(`assets/img/icons/caret-right.svg`)"
              class="user-tag-icon"
              alt="icon"
            />
          </div>
        </div>
      </li>

      <li v-for="(item, index) in items" :key="index">
        <div
          class="container-li"
          @click="
            item.type === 'action' ? actionHandler(item) : toLink(item.link)
          "
        >
          <div class="left-side">
            <img v-if="item.src" :src="item.src" alt="icon" class="icon-img" />
            <span class="text-m label-item">{{ item.label }}</span>
          </div>
          <div class="right-side">
            <span v-if="item.haveNot" class="new-not text-s-bold"></span>
          </div>
        </div>
        <div v-if="item.hasBorder" class="divider"></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DropdownList",
  props: {
    items: {
      type: [Array, Function],
      required: false,
      default: () => [],
    },
    src: {
      type: String,
      required: false,
      default: null,
    },
    isLabel: {
      type: Boolean,
      default: false,
    },
    indexNumber: {
      type: Number,
      required: false,
      default: null,
    },
    miles: {
      type: [Number, String],
      required: false,
      default: 0,
    },
    top: {
      type: String,
      required: false,
      default: null,
    },
    left: {
      type: String,
      required: false,
      default: null,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    haveNot: {
      type: Number,
      required: false,
      default: 0,
    },
    userAvatar: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    style() {
      return {
        top: this.top ? this.top : "13px",
        left: this.left ? this.left : "-192px",
      };
    },
    hasNotifications() {
      return !this.$auth.user.is_email_verified;
    },
  },
  watch: {
    $route(val) {
      this.show = false;
    },
  },
  mounted() {
    document.addEventListener("click", this.close);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.close);
  },
  methods: {
    openDropdown() {
      this.show = !this.show;
    },
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.show = false;
      }
    },
    actionHandler(item) {
      this.$emit("action", item, this.indexNumber);
      this.show = false;
    },
    toLink(link) {
      this.$router.push(link);
      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/ui/dropdown-list";
</style>
