<template>
  <div class="auth-container">
    <h1 class="header-big mt-0 mb-8">{{ $t("auth.recoverPassword") }}</h1>
    <p class="mb-24 text-m">{{ $t("auth.recoverPassEmail") }}</p>
    <div class="form-group mb-24">
      <Input
        :type="'email'"
        :model.sync="email"
        :label="$t('auth.email')"
        :error="$v.email"
        :rules="rules.email"
        :is-submit="isSubmit"
      />
      <Button
        class="mb-24 mt-16"
        :label="$t('auth.resetPassword')"
        :background="'primary'"
        :size="'full'"
        :color="'c-white'"
        @on-click="recoverPassword"
      />

      <nuxt-link to="/login" class="no-color-dec-link center-block text-btn">{{
        $t("auth.backLogin")
      }}</nuxt-link>
    </div>
  </div>
</template>

<script>
import { email, required } from "vuelidate/lib/validators";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { catchErrors } from "../../utils/catchErrors";
import isLoggedIn from "../../middleware/isLoggedIn";
export default {
  name: "Index",
  components: {
    Button,
    Input,
  },
  middleware: [isLoggedIn],
  validations: {
    email: {
      required,
      email,
      checkEmailSymbol(email) {
        return email.includes("@");
      },
    },
  },
  data() {
    return {
      isSubmit: false,
      email: "",
      rules: {
        email: [
          { name: "required", text: this.$t("validations.notEmpty") },
          {
            name: "email",
            text: this.$t("validations.validEmail"),
          },
          {
            name: "checkEmailSymbol",
            text: this.$t("validations.addEmail"),
          },
        ],
      },
    };
  },
  methods: {
    async beforeUpdate() {
      await this.$v.$touch();
      this.isSubmit = true;
    },

    async recoverPassword() {
      await this.beforeUpdate();

      if (!this.$v.$invalid) {
        try {
          const data = {
            email: this.email,
          };
          await this.$store.dispatch("user/recoverPassword", data);
          await this.$store.commit("setSnackbar", {
            show: true,
            message: this.$t("snackbar.checkInbox"),
            color: "normal",
          });
          await this.$router.push("/login");
        } catch (e) {
          await this.$store.commit("setSnackbar", {
            show: true,
            message: catchErrors(e),
            color: "error",
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/auth";
</style>
