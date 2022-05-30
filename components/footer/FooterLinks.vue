<template>
  <div class="footer-links">
    <a
      target="_blank"
      href="https://storage.googleapis.com/pfld-outdoor-production-documents-bucket/ISIAjobs_Terms_and_Conditions_2021_10_05_revMP_fin%20(1).pdf"
      class="no-color-dec-link text-btn"
      >{{ $t("auth.termCond") }}</a
    >
    <a
      target="_blank"
      href="https://storage.googleapis.com/pfld-outdoor-production-documents-bucket/ISIAjobs_Privacy_Policy_2021_10_05_v1_revMP_fin.pdf"
      class="no-color-dec-link text-btn"
      >{{ $t("auth.policy") }}</a
    >
  </div>
</template>

<script>
export default {
  name: "FooterLinks",
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/footer/footer-links";
</style>
