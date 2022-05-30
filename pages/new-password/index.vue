<template>
  <div class="auth-container">
    <h1 class="header-big mt-0 mb-8">{{ $t("auth.recoverPassword") }}</h1>
    <p class="mb-24 text-m">{{ $t("auth.addCode") }}</p>
    <div class="form-group mb-24">
      <Input
        type="number"
        :model.sync="code"
        :label="$t('auth.code')"
        :error="$v.code"
        :rules="rules.code"
      />

      <Input
        :type="inputTypePassword"
        :model.sync="password"
        :label="$t('auth.newPassword')"
        :icon="inputIconPassword"
        :level="level"
        :with-indicator="true"
        :custom-error="customErrors"
        :error="$v.password"
        :rules="rules.password"
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

      <Button
        class="mb-24 mt-16"
        :label="$t('auth.setNewPass')"
        :background="'primary'"
        :size="'full'"
        :color="'c-white'"
        @on-click="setNewPassword"
      />
    </div>
  </div>
</template>

<script>
import { required, sameAs } from "vuelidate/lib/validators";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { catchErrors } from "../../utils/catchErrors";
import passwordValidate from "../../mixins/passwordValidate";
export default {
  name: "Index",
  components: {
    Button,
    Input,
  },
  mixins: [passwordValidate],
  validations: {
    code: {
      required,
    },
    password: {
      required,
    },
    repeatPassword: {
      required,
      sameAsPassword: sameAs("password"),
    },
  },
  data() {
    return {
      isSubmit: false,
      code: "",
      password: "",
      repeatPassword: "",
      rules: {
        code: [{ name: "required", text: this.$t("validations.notEmpty") }],
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
  methods: {
    async beforeUpdate() {
      await this.$v.$touch();
      this.isSubmit = true;
    },

    async setNewPassword() {
      await this.beforeUpdate();

      if (!this.$v.$invalid) {
        try {
          const data = {
            token: this.code,
            password: this.password,
          };
          await this.$store.dispatch("user/confirmRecoverPassword", data);
          await this.$store.commit("setSnackbar", {
            show: true,
            message: this.$t("snackbar.passwordChanged"),
            color: "success",
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
