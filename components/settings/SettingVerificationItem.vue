<template>
  <div class="verification-item">
    <img
      class="verification-item_left"
      src="~/assets/img/icons/checkbox-circle.svg"
    />
    <div class="verification-item_right">
      <div class="verification-item_title">
        {{ $t("settings.verificationInProgress") }}
      </div>
      <div class="verification-item_subtitle">
        {{ $t("settings.checkInbox") }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SettingVerificationItem",
};
</script>

<style scoped lang="scss">
@import "~/assets/scss/components/settings/setting-verification-item";
</style>
