<template>
  <div class="form-container full-h">
    <h1 class="header-title mb-24">
      {{ $t("settings.advancedVerification") }}
    </h1>

    <div class="content">
      <div class="form-group mb-24">
        <p class="mt-0 mb-16 text-m-bold">
          {{ $t("settings.accountSettings") }}
        </p>

        <Input
          class="mb-16"
          :type="'text'"
          :model.sync="firstName"
          :label="$t('settings.firstName')"
          :error="$v.firstName"
          :rules="rules.firstName"
          :is-submit="isSubmit"
        />

        <Input
          class="mb-16"
          :type="'text'"
          :model.sync="lastName"
          :label="$t('settings.lastName')"
          :error="$v.lastName"
          :rules="rules.lastName"
          :is-submit="isSubmit"
        />
      </div>

      <div class="form-group mb-24">
        <p class="mt-0 mb-16 text-m-bold">
          {{ $t("settings.countryRes") }}
        </p>

        <p v-if="countryError" class="text-s mt-0 mb-16 red">
          {{ $t("validations.selectOption") }}
        </p>

        <FilterDropdown
          :list="countries"
          :return-object="false"
          :item-value="'value'"
          :item-label="'label'"
          :name.sync="country"
          :placeholder="$t('settings.selectCountry')"
          class="mb-0"
        />
      </div>

      <div v-if="country" class="form-group mb-24">
        <p class="mt-0 mb-16 text-m-bold">
          {{ $t("settings.selectId") }}
        </p>

        <p v-if="idError" class="text-s mt-0 mb-16 red">
          {{ $t("validations.selectOption") }}
        </p>

        <RadioCircle
          v-if="idList.ID_CARD"
          class="mb-16"
          :name.sync="idType"
          :value="'ID_CARD'"
          :label="'ID card'"
          :error="idError"
        />
        <RadioCircle
          v-if="idList.DRIVERS_LICENSE"
          class="mb-16"
          :name.sync="idType"
          :value="'DRIVERS_LICENSE'"
          :label="'Driver license'"
          :error="idError"
        />
        <RadioCircle
          v-if="idList.PASSPORT"
          class="mb-16"
          :name.sync="idType"
          :value="'PASSPORT'"
          :label="'Passport'"
          :error="idError"
        />
        <RadioCircle
          v-if="idList.RESIDENCE_PERMIT"
          :name.sync="idType"
          :value="'RESIDENCE_PERMIT'"
          :label="'Passport'"
          :error="idError"
        />
      </div>

      <div class="form-group">
        <Button
          class="mb-24"
          :label="$t('settings.saveContinue')"
          :background="'primary'"
          :size="'full'"
          :color="'c-white'"
          @on-click="openModal"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import FilterDropdown from "../../../components/ui/FilterDropdown";
import RadioCircle from "../../../components/ui/RadioCircle";
import { catchErrors } from "../../../utils/catchErrors";
import Input from "./../../../components/ui/Input";
import Button from "./../../../components/ui/Button";
export default {
  name: "Index",
  components: {
    Input,
    Button,
    FilterDropdown,
    RadioCircle,
  },
  validations: {
    firstName: {
      required,
    },
    lastName: {
      required,
    },
  },
  layout: "auth",
  middleware: "auth",
  async asyncData({ store, error }) {
    try {
      const resp = await store.dispatch("nfts/getCountries");
      let countries = [];
      resp.forEach((item) => {
        const objC = {
          label: item.Country,
          value: item.ISO_2,
        };

        countries = [...countries, objC];
      });

      return { countries, options: resp };
    } catch (e) {
      error({ statusCode: 404, message: "Page not found" });
    }
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      country: "",
      idType: "",
      idList: {},
      isSubmit: false,
      countryError: false,
      idError: false,
      countries: [],
      options: [],
      rules: {
        firstName: [
          { name: "required", text: this.$t("validations.notEmpty") },
        ],
        lastName: [{ name: "required", text: this.$t("validations.notEmpty") }],
      },
    };
  },

  computed: {
    isValid() {
      return !this.$v.$invalid && !this.countryError && !this.idError;
    },
  },

  watch: {
    country(val) {
      if (val) {
        this.countryError = false;
        this.idList = this.options.find((item) => val === item.ISO_2);
      }
    },
    idType(val) {
      if (val) this.idError = false;
    },
  },

  methods: {
    beforeUpdate() {
      this.isSubmit = true;

      if (!this.country) this.countryError = true;
      if (!this.idType) this.idError = true;
    },

    async openModal() {
      await this.beforeUpdate();

      if (this.isValid) {
        this.$store.commit("setModal", {
          show: true,
          type: "verify-id",
          data: {
            confirm: {
              function: () => {
                this.saveContinue();
              },
            },
          },
        });
      }
    },

    async saveContinue() {
      try {
        const data = {
          first_name: this.firstName,
          last_name: this.lastName,
          document_type: this.idType,
          document_country: this.country,
        };

        const resp = await this.$store.dispatch("nfts/verifyUser", data);
        window.location.replace(resp.url);
      } catch (e) {
        await this.$store.commit("setSnackbar", {
          show: true,
          message: catchErrors(e),
          color: "error",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/settings";
</style>
