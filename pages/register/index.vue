<template>
  <div class="auth-container">
    <h1 class="header-big mt-0 mb-24">{{ $t("auth.register") }}</h1>
    <div class="form-group mb-24">
      <Input
        :type="'text'"
        :model.sync="username"
        :label="$t('auth.username')"
        :error="$v.username"
        :rules="rules.username"
        :custom-error="customUsernameError"
        :is-submit="isSubmit"
      />

      <Input
        :type="'email'"
        :model.sync="email"
        :label="$t('auth.email')"
        :error="$v.email"
        :rules="rules.email"
        :custom-error="customEmailErrors"
        :is-submit="isSubmit"
      />

      <Input
        :type="inputTypePassword"
        :model.sync="password"
        :label="$t('auth.password')"
        :icon="inputIconPassword"
        :level="level"
        :with-indicator="true"
        :error="$v.password"
        :rules="rules.password"
        :custom-error="customErrors"
        :help-text="$t('auth.passwordRule')"
        :is-submit="isSubmit"
        @icon-click="iconClick('password')"
      />

      <Input
        :type="inputTypeRepeat"
        :model.sync="repeatPassword"
        :label="$t('auth.repeatPassword')"
        :error="$v.repeatPassword"
        :rules="rules.repeatPassword"
        :icon="inputIconRepeat"
        :is-submit="isSubmit"
        @icon-click="iconClick('repeat')"
      />
    </div>

    <div class="form-group">
      <Checkbox :name.sync="agree" class="mb-32" :error="checkError">
        <label slot="label" class="text-m">
          {{ $t("auth.agreeWith") }} &nbsp;
          <a
            href="https://storage.googleapis.com/pfld-outdoor-production-documents-bucket/ISIAjobs_Terms_and_Conditions_2021_10_05_revMP_fin%20(1).pdf"
            target="_blank"
            class="no-color-link"
            >{{ $t("auth.termCond") }}</a
          >
        </label>
      </Checkbox>

      <Button
        class="mb-24"
        :label="$t('auth.register')"
        :background="'primary'"
        :size="'full'"
        :color="'c-white'"
        @on-click="register"
      />

      <nuxt-link to="/login" class="no-color-dec-link center-block text-btn">{{
        $t("auth.alreadyLoggedIn")
      }}</nuxt-link>
    </div>

    <FooterLinks />
  </div>
</template>

<script>
import { required, sameAs, email, minLength } from "vuelidate/lib/validators";
import Input from "../../components/ui/Input";
import Checkbox from "../../components/ui/Checkbox";
import Button from "../../components/ui/Button";
import passwordValidate from "../../mixins/passwordValidate";
import FooterLinks from "../../components/footer/FooterLinks";
import isLoggedIn from "../../middleware/isLoggedIn";

const Errors = {
  usernameEmail: "Users with this email and username already registered",
  username: "User with this username is already registered",
  email: "User with this email is already registered",
};

export default {
  name: "Index",
  components: {
    Input,
    Checkbox,
    Button,
    FooterLinks,
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
    username: {
      required,
      minLength: minLength(5),
    },
    repeatPassword: {
      required,
      sameAsPassword: sameAs("password"),
    },
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
      agree: false,
      isSubmit: false,
      checkError: "",
      customEmailErrors: {},
      customUsernameError: {},
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
        username: [
          { name: "required", text: this.$t("validations.notEmpty") },
          {
            name: "minLength",
            text: this.$t("validations.usernameLength"),
          },
        ],
        password: [{ name: "required", text: this.$t("validations.notEmpty") }],
        repeatPassword: [
          { name: "required", text: this.$t("validations.notEmpty") },
          {
            name: "sameAsPassword",
            text: this.$t("validations.sameAsPassword"),
          },
        ],
      },
    };
  },

  computed: {
    isValid() {
      return (
        !this.$v.$invalid &&
        !this.customErrors.length &&
        !this.customEmailErrors.length &&
        !this.customUsernameError.length &&
        !this.checkError
      );
    },
  },

  watch: {
    agree(val) {
      if (val) this.checkError = "";
    },
    email(val) {
      if (!this.$v.email.$invalid) {
        this.customEmailErrors = {};
      }
    },
    username() {
      if (!this.$v.username.$invalid) {
        this.customUsernameError = {};
      }
    },
  },

  methods: {
    async beforeUpdate() {
      await this.$v.$touch();

      this.isSubmit = true;
      if (!this.agree) this.checkError = this.$t("validations.termAgree");
    },

    async register() {
      await this.beforeUpdate();

      if (this.isValid) {
        try {
          const data = {
            email: this.email,
            password: this.password,
            username: this.username,
          };
          await this.$store.dispatch("user/registerUser", data);
          await this.$auth.loginWith("local", {
            data: {
              email: this.email,
              password: this.password,
            },
          });

          await this.$store.commit("setSnackbar", {
            show: true,
            message: this.$t("snackbar.successRegister"),
            color: "success",
          });
          await this.$router.push("/profile");
        } catch (e) {
          const response = e.response.data.detail;
          const config = {
            usernameRegistered: response === Errors.username,
            emailRegistered: response === Errors.email,
            bothRegistered: response === Errors.usernameEmail,
          };
          if (config.emailRegistered || config.bothRegistered) {
            this.customEmailErrors = {
              errors: [`This email is already registered`],
              type: "object",
            };
          }
          if (config.usernameRegistered || config.bothRegistered) {
            this.customUsernameError = {
              errors: [`This username is already registered`],
              type: "object",
            };
          }
          await this.$store.commit("setSnackbar", {
            show: true,
            message: this.$t("validations.checkForm"),
            color: "error",
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/auth.scss";
</style>
