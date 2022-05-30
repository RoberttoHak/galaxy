<template>
  <div class="filters-items">
    <div v-for="item in filters" :key="item.id" class="chip">
      <span class="text-m-bold chip-text"
        >{{ item.label }} ({{ item.value }})</span
      >
      <span class="chip-img" @click="removeValue(item)">
        <img src="~/assets/img/icons/chip-remove.svg" alt="" />
      </span>
    </div>
    <span
      v-if="filters.length"
      class="text-m-bold display-f"
      @click="clearFilter"
    >
      {{ $t("marketplace.clearAll") }}
      <Icon
        src="close-modal.svg"
        size="big"
        class="pointer"
        @on-click="clearFilter"
      />
    </span>
  </div>
</template>

<script>
import { functions } from "../../../utils";
import Icon from "../../ui/Icon";

const filterDefaultVars = {
  search: "",
  luminosity__in: [],
  quality_level__in: [],
  age__in: [],
  constellation: "",
};
export default {
  name: "FiltersItems",
  components: {
    Icon,
  },
  props: {
    filter: {
      type: Object,
      default: () => {},
    },
    formOptions: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      list: [
        { key: "search", value: "Search", form: "search" },
        { key: "luminosity__in", value: "Luminosity", form: "luminosity" },
        { key: "quality_level__in", value: "Quality", form: "quality" },
        { key: "age__in", value: "Age", form: "age" },
        {
          key: "constellation",
          value: "Constellation",
          form: "constellations",
        },
      ],
    };
  },
  computed: {
    filters() {
      delete this.filter.page;
      delete this.filter.page_size;

      let arr = [];
      const cleanObject = functions.cleanObject(this.filter);

      Object.keys(cleanObject).forEach((key) => {
        const item = this.list.find((item) => item.key === key);

        if (item && item.value) {
          let value = "";

          if (this.formOptions[item.form]) {
            let valueArr = [];
            const formOptions = this.formOptions[item.form];
            const splitString = cleanObject[key].toString().split(",");

            splitString.forEach((splI) => {
              const obj = formOptions.find((i) =>
                [i.value, i.label, i.value.toString(), +i.value].includes(splI)
              );
              valueArr = [...valueArr, obj.label];
            });

            value = valueArr.length ? valueArr.join(",") : cleanObject[key];
          } else value = cleanObject[key];

          const obj = {
            id: item.key,
            label: item.value,
            value,
          };

          arr = [...arr, obj];
        }
      });

      this.$emit("update:count", arr.length);
      return arr;
    },
  },
  methods: {
    clearFilter() {
      this.$nuxt.$emit("applyFilters", {});
    },
    removeValue(item) {
      const sendItems = { ...this.filter };
      const key = item.id;
      sendItems[key] = filterDefaultVars[item.id];

      this.$nuxt.$emit("applyFilters", sendItems);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/marketplace/filters-items";
</style>
