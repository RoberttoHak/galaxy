<template>
  <div class="ui-cont">
    <div></div>
    <p class="header-big">dfsadada</p>
    <p class="text-m">dfsadada</p>
    <p class="text-s-bold">dfsadada</p>
    <p class="link">dfsadada</p>
    <Icon src="ellipse.svg" size="big" />
    <Icon src="ellipse.svg" size="small" />
    <Button
      :label="'Register'"
      :background="'primary'"
      :size="'medium'"
      :color="'c-white'"
    />
    <Button
      :label="'Register'"
      :background="'primary'"
      :size="'medium'"
      :color="'c-white'"
      :disabled="true"
    />

    <!--    <SettingItem :type="'link'" :link="'/settings/change-password'">-->
    <!--      <img slot="icon" src="~/assets/img/icons/eye.svg" alt="icon" />-->
    <!--      <p slot="sub-title" class="text-m mtb subtitle">Change password</p>-->
    <!--    </SettingItem>-->

    <!--    <SettingItem :type="'action'">-->
    <!--      <img slot="icon" src="~/assets/img/icons/eye.svg" alt="icon" />-->
    <!--      <p slot="title" class="text-m-bold mtb">NFT alerts</p>-->
    <!--      <p slot="sub-title" class="text-m mtb">-->
    <!--        I want to receive NFT alerts to my email.-->
    <!--      </p>-->
    <!--      <Checkbox slot="action" :name.sync="showAlerts" />-->
    <!--    </SettingItem>-->

    <!--    <SettingItem :type="'action'">-->
    <!--      <p slot="title" class="text-m-bold mtb">NFT alerts</p>-->
    <!--      <p slot="sub-title" class="text-m mtb">-->
    <!--        I want to receive NFT alerts to my email.-->
    <!--      </p>-->
    <!--      <Checkbox slot="action" :name.sync="showAlerts" />-->
    <!--    </SettingItem>-->

    <!--    <SettingItem :type="'action'">-->
    <!--      <img slot="icon" src="~/assets/img/icons/eye.svg" alt="icon" />-->
    <!--      <p slot="sub-title" class="text-m mtb">Verify your email</p>-->
    <!--      <p slot="action" class="action-text text-m mtb subtitle">Resend</p>-->
    <!--    </SettingItem>-->

    <div class="controls">
      <Checkbox :name.sync="checkBox" class="mb-32">
        <label slot="label" class="text-m"> Test </label>
      </Checkbox>
      <Checkbox :name.sync="checkBox" class="mb-32" :disabled="true">
        <label slot="label" class="text-m"> Test </label>
      </Checkbox>
      <Checkbox :name.sync="checkBox" class="mb-32" :error="true">
        <label slot="label" class="text-m"> Test </label>
      </Checkbox>

      <Input
        :model.sync="username"
        :label="'Test'"
        :error="$v.username"
        :rules="rules.username"
      />

      <Input
        :model.sync="username"
        :label="'Test'"
        :error="$v.username"
        :rules="rules.username"
        :icon="require('assets/img/icons/ellipse.svg')"
      />

      <h2>Level - {{ level }}</h2>
      <Input
        :type="inputType"
        :model.sync="password"
        :label="'Password'"
        :icon="inputIcon"
        :level="level"
        :with-indicator="true"
        :custom-error="customErrors"
        :help-text="'Create a strong password using at least 8 characters, include at least one number and at least one special character (e.g. ! @ # ?), a mixture of uppercase and lowercase letters.'"
        @icon-click="iconClick"
      />

      <Input
        :model.sync="username"
        :label="'Test'"
        :error="$v.username"
        :rules="rules.username"
        :disabled="true"
      />

      <FilterDropdown
        :list="[
          { label: 'Option1', value: 1 },
          { label: 'Option2', value: 2 },
          { label: 'Option3', value: 3 },
          { label: 'Option4', value: 4 },
          { label: 'Option5', value: 5 },
        ]"
        :return-object="false"
        :item-value="'value'"
        :item-label="'label'"
        :name.sync="category"
        :placeholder="'Select...'"
        :disabled="true"
      />

      <FilterDropdown
        :list="[
          { label: 'Option1', value: 1 },
          { label: 'Option2', value: 2 },
          { label: 'Option3', value: 3 },
          { label: 'Option4', value: 4 },
          { label: 'Option5', value: 5 },
        ]"
        :return-object="false"
        :item-value="'value'"
        :item-label="'label'"
        :name.sync="category"
        :placeholder="'Select...'"
      />

      <MultiFilterDropdown
        :list="[
          { label: 'Option1', value: 1 },
          { label: 'Option2', value: 2 },
          { label: 'Option3', value: 3 },
          { label: 'Option4', value: 4 },
          { label: 'Option5', value: 5 },
        ]"
        :return-object="true"
        :item-value="'value'"
        :item-label="'label'"
        :name.sync="multi"
        :selected-items="multi"
        :placeholder="'Multi Select...'"
      />
    </div>

    <Button
      :label="'Snackbar'"
      :background="'primary'"
      :size="'medium'"
      :color="'c-white'"
      @on-click="openSnack"
    />
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import Icon from "../components/ui/Icon";
import Button from "../components/ui/Button";
import Checkbox from "../components/ui/Checkbox";
import Input from "../components/ui/Input";
import FilterDropdown from "../components/ui/FilterDropdown";
import MultiFilterDropdown from "../components/ui/MultiFilterDropdown";
import passwordValidate from "../mixins/passwordValidate";
export default {
  name: "Ui",
  components: {
    Icon,
    Button,
    Checkbox,
    Input,
    FilterDropdown,
    MultiFilterDropdown,
  },
  mixins: [passwordValidate],
  validations: {
    username: {
      required,
    },
  },
  data() {
    return {
      checkBox: true,
      username: "",
      password: "",
      category: "",
      multi: [],
      rules: {
        username: [{ name: "required", text: "No validated" }],
        password: [
          {
            name: "strongPassword",
            text: this.$t("validations.strongPassword"),
          },
        ],
      },
    };
  },

  methods: {
    openSnack() {
      this.$store.commit("setSnackbar", {
        show: true,
        message: "Test",
        color: "success",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.ui-cont {
  padding-top: 50px;
  background: $c-background;
  height: 100vh;

  .controls {
    background: #486e57;
    height: 1000px;
    padding-right: 16px;
    padding-left: 16px;
  }
}
</style>
