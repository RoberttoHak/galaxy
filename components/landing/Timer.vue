<template>
  <div v-if="show" class="timer-wrapper">
    <div class="info">
      <span class="count header-big days-color">{{ days }}</span>
      <span class="text-m days-color">{{ $t("landing.days") }}</span>
    </div>
    <div class="info">
      <span class="count header-big hours-color">{{ hours }}</span>
      <span class="text-m hours-color">{{ $t("landing.hours") }}</span>
    </div>
    <div class="info">
      <span class="count header-big minutes-color">{{ minutes }}</span>
      <span class="text-m minutes-color">{{ $t("landing.minutes") }}</span>
    </div>
    <div class="info">
      <span class="count header-big seconds-color">{{ seconds }}</span>
      <span class="text-m seconds-color">{{ $t("landing.seconds") }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Timer",

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
  },

  created() {
    const vm = this;

    this.updateInterval = setInterval(function () {
      const comingDate = new Date("Jan 10, 2022 00:00:00");
      const now = new Date();
      const des = comingDate.getTime() - now.getTime();
      const days = Math.floor(des / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (des % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const mins = Math.floor((des % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((des % (1000 * 60)) / 1000);

      vm.days = vm.getTrueNumber(days);
      vm.hours = vm.getTrueNumber(hours);
      vm.minutes = vm.getTrueNumber(mins);
      vm.seconds = vm.getTrueNumber(secs);

      if (des <= 0) clearInterval(vm.updateInterval);
    }, 1000);

    setTimeout(() => {
      this.show = true;
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/timer";
</style>
