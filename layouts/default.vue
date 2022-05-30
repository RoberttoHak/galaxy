<template>
  <div
    class="auth-wrapper"
    :class="{ 'register-wrapper': $route.name === 'register' }"
  >
    <Leaderboard v-if="showLeaderboard" />
    <AuthHeader />
    <nuxt />
    <Snackbar
      class="custom-snackbar"
      :type="'snackbar'"
      :active="snackbar.show"
      :position="'bottom-center'"
      :timeout="5000"
      :message="snackbar.message"
      :background-color="snackbar.color"
      @close="closeSnackbar"
    />
  </div>
</template>
<script>
import Snackbar from "../components/ui/Snackbar";
import AuthHeader from "../components/header/AuthHeader";
import Leaderboard from "../components/header/Leaderboard";
export default {
  components: {
    Snackbar,
    AuthHeader,
    Leaderboard,
  },
  data() {
    return {
      allowedRoutesForLeaderBoard: [
        "login",
        "register",
        "recover-password",
        "new-password",
      ],
    };
  },
  computed: {
    snackbar() {
      return this.$store.getters.snackbar;
    },
    showLeaderboard() {
      return !this.allowedRoutesForLeaderBoard.includes(this.$route.name);
    },
  },
  methods: {
    closeSnackbar() {
      this.$store.commit("setSnackbar", {
        show: false,
        message: "",
        color: "success",
      });
    },
  },
};
</script>
