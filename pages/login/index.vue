<template>
  <div class="auth-container">
    <h1 class="header-big mt-0 mb-24">{{ $t("auth.login") }}</h1>
    <div class="form-group mb-24">
      <Input
        :id="'user-email'"
        ref="userEmail"
        :type="'email'"
        :model.sync="email"
        :label="$t('auth.email')"
        :error="$v.email"
        :rules="rules.email"
        :is-submit="isSubmit"
        :disabled-state="disabled"
      />

      <Input
        :id="'user-password'"
        :type="inputTypePassword"
        :model.sync="password"
        :label="$t('auth.password')"
        :icon="inputIconPassword"
        :level="level"
        :error="$v.password"
        :rules="rules.password"
        :is-submit="isSubmit"
        :disabled-state="disabled"
        @icon-click="iconClick('password')"
      />

      <nuxt-link
        to="/recover-password"
        class="no-color-dec-link right-block text-btn"
        >{{ $t("auth.recoverPassword") }}</nuxt-link
      >

      <Button
        class="mb-24 mt-24"
        :label="$t('auth.login')"
        :background="'primary'"
        :size="'full'"
        :color="'c-white'"
        @on-click="login"
      />

      <nuxt-link
        to="/register"
        class="no-color-dec-link center-block text-btn"
        >{{ $t("auth.newHere") }}</nuxt-link
      >
    </div>
    <FooterLinks />
  </div>
</template>

<script>
import { email, required } from "vuelidate/lib/validators";
import FooterLinks from "../../components/footer/FooterLinks";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import passwordValidate from "../../mixins/passwordValidate";
import { catchErrors } from "../../utils/catchErrors";
import isLoggedIn from "../../middleware/isLoggedIn";
export default {
  name: "Index",
  components: {
    FooterLinks,
    Input,
    Button,
  },
  mixins: [passwordValidate],
  middleware: [isLoggedIn],
  validations: {
    email: {
      required,
      email,
      checkEmailSymbol(email) {
        return email.includes("@");
      },
    },
    password: {
      required,
    },
  },
  data() {
    return {
      isSubmit: false,
      email: "",
      password: "",
      disabled: true,
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
        password: [{ name: "required", text: this.$t("validations.notEmpty") }],
      },
    };
  },
  computed: {
    redirectRoute() {
      return this.$route.query.back ?? "/profile";
    },
  },
  mounted() {
    setTimeout(() => {
      this.disabled = false;
    }, 100);
  },
  methods: {
    async beforeUpdate() {
      await this.$v.$touch();
      this.isSubmit = true;
    },

    async login() {
      await this.beforeUpdate();

      if (!this.$v.$invalid) {
        try {
          await this.$auth.loginWith("local", {
            data: {
              email: this.email,
              password: this.password,
            },
          });

          await this.$store.commit("setSnackbar", {
            show: true,
            message: this.$t("snackbar.successLoggedIn"),
            color: "success",
          });
          await this.$router.push(this.redirectRoute);
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
