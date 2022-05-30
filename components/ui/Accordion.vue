<template>
  <div class="accordion">
    <div class="header" @click="toggle">
      <div class="wrapp">
        <slot name="count"></slot>
        <slot name="header"></slot>
      </div>
      <img
        src="~/assets/img/icons/caret-down.svg"
        alt="caret-down"
        class="header-icon"
        :class="{ rotate: show }"
      />
    </div>
    <transition
      name="accordion"
      @before-enter="beforeEnter"
      @enter="enter"
      @before-leave="beforeLeave"
      @leave="leave"
    >
      <div v-show="show" class="body">
        <slot name="list"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Accordion",
  data() {
    return {
      show: false,
    };
  },
  methods: {
    toggle() {
      this.show = !this.show;
    },
    // enter: function(el, done) {
    //   $(el).slideDown(150, done);
    // },
    // leave: function(el, done) {
    //   $(el).slideUp(150, done);
    // },
    beforeEnter(el) {
      el.style.height = "0";
    },
    enter(el) {
      el.style.height = el.scrollHeight + "px";
    },
    beforeLeave(el) {
      el.style.height = el.scrollHeight + "px";
    },
    leave(el) {
      el.style.height = "0";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/ui/accordion";
</style>
