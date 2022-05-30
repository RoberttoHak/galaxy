<template>
  <transition name="snackbar" class="custom-snackbar">
    <div v-if="active" class="snackbar text-m" :class="classes">
      <div class="snackbar__wrap">
        <div class="snackbar__body body-custom">
          <span
            v-if="typeof message === 'string'"
            class="text-m-bold"
            :class="textClass"
            >{{ message }}</span
          >
          <ul v-else class="errors-list">
            <li v-for="(item, index) in message" :key="index">◦ {{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "SnackBar",
  props: {
    type: {
      type: String,
      default: "message",
    },
    active: {
      type: Boolean,
      default: false,
    },
    isClose: {
      type: Boolean,
      default: false,
    },
    timeout: {
      type: Number,
      default: 5000,
    },
    message: {
      type: [String, Array],
      required: true,
    },
    backgroundColor: {
      type: String,
      default: "default",
      validator(value) {
        return ["normal", "success", "error", "default"].includes(value);
      },
    },
    position: {
      type: String,
      default: "top-right",
      validator(value) {
        return [
          "bottom-right",
          "bottom-center",
          "bottom-left",
          "top-right",
          "top-center",
          "top-left",
        ].includes(value);
      },
    },
  },
  data() {
    return {
      timer: null,
    };
  },
  computed: {
    classes() {
      return {
        [`snackbar--${this.position}`]: true,
        [`snackbar--${this.backgroundColor}`]: true,
      };
    },
    textClass() {
      return {
        [`snackbar--text-color-${this.backgroundColor}`]: true,
      };
    },
  },
  watch: {
    active() {
      this.setTimer();
    },
  },
  methods: {
    setTimer() {
      if (this.timer) clearTimeout(this.timer);

      this.timer = setTimeout(() => {
        this.$store.commit("setSnackbar", {
          show: false,
          message: "",
          color: "success",
        });
      }, this.timeout);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/ui/snackbar";
</style>
