<template>
  <div></div>
</template>

<script>
import { catchErrors } from "~/utils/catchErrors";

export default {
  name: "Code",
  async mounted() {
    try {
      const data = {
        token: this.$route.query.token,
      };
      await this.$store.dispatch("user/verifyEmail", data);
      await this.$auth.fetchUser();
      await this.$store.commit("setSnackbar", {
        show: true,
        message: this.$t("snackbar.successEmailVerify"),
        color: "success",
      });

      if (this.$auth.loggedIn) {
        await this.$router.push("/profile");
      } else await this.$router.push("/");
    } catch (e) {
      if (this.$auth.loggedIn) {
        await this.$auth.fetchUser();
        this.$router.push("/settings");
      } else {
        this.$router.push("/login");
      }
      await this.$store.commit("setSnackbar", {
        show: true,
        message: catchErrors(e),
        color: "error",
      });
    }
  },
};
</script>
