<template>
  <div v-if="show" class="timer-wrapper">
    <div class="info">
      <span
        class="count header-big hours-color"
        :class="{ 'ending-timer': endingTimer }"
        >{{ hours }}:</span
      >
    </div>
    <div class="info">
      <span
        class="count header-big minutes-color"
        :class="{ 'ending-timer': endingTimer }"
        >{{ minutes }}:</span
      >
    </div>
    <div class="info">
      <span
        class="count header-big seconds-color"
        :class="{ 'ending-timer': endingTimer }"
        >{{ seconds }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Timer",
  props: {
    time: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      updateInterval: null,
      show: false,
    };
  },

  computed: {
    getTrueNumber() {
      return (date) => (date < 10 ? "0" + date : date);
    },
    endingTimer() {
      return (
        this.hours === "00" && this.minutes === "00" && this.seconds <= "59"
      );
    },
  },

  mounted() {
    const vm = this;
    const comingDate = new Date(vm.time);

    if (comingDate) {
      this.updateInterval = setInterval(function () {
        const now = new Date();
        const des = comingDate.getTime() - now.getTime();
        const hours = Math.floor(des / (1000 * 60 * 60));
        const mins = Math.floor((des % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((des % (1000 * 60)) / 1000);

        vm.hours = vm.getTrueNumber(hours);
        vm.minutes = vm.getTrueNumber(mins);
        vm.seconds = vm.getTrueNumber(secs);
        if (des <= 0) {
          clearInterval(vm.updateInterval);
        }
        if (des <= 1) {
          vm.$emit("finished");
        }
      }, 1000);
    }

    setTimeout(() => {
      this.show = true;
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/marketplace/auction-timer";
</style>
