<template>
  <div class="form-container full-h">
    <h1 class="header-title mb-0">{{ $t("settings.changePassword") }}</h1>
    <p class="mb-24 mt-24 text-m">{{ $t("settings.changeDesc") }}</p>
    <div class="form-group mb-24">
      <Input
        :type="inputTypeCurrentPassword"
        :model.sync="currentPassword"
        :label="$t('settings.currentPassword')"
        :icon="inputIconCurrentPassword"
        :is-submit="isSubmit"
        @icon-click="iconClick('currentPassword')"
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
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import passwordValidate from "../../../mixins/passwordValidate";
import { catchErrors } from "../../../utils/catchErrors";
export default {
  name: "Index",
  components: {
    Button,
    Input,
  },
  mixins: [passwordValidate],
  layout: "auth",
  middleware: "auth",
  validations: {
    currentPassword: {
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
      currentPassword: "",
      password: "",
      repeatPassword: "",
      rules: {
        password: [{ name: "required", text: this.$t("validations.notEmpty") }],
        currentPassword: [
          { name: "required", text: this.$t("validations.notEmpty") },
        ],
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
            old_password: this.currentPassword,
            new_password: this.password,
          };
          await this.$store.dispatch("user/newPassword", data);
          await this.$store.commit("setSnackbar", {
            show: true,
            message: this.$t("snackbar.changePassword"),
            color: "success",
          });
          await this.$router.push("/settings");
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
