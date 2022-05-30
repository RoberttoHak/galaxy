import { convertCamelToSnack } from "~/utils/convertCamelToSnack";
import { toUnderscore } from "~/utils/toUnderscore";
export const functions = {
  refineHash(hash) {
    if (hash.length > 6) {
      const start = hash.substring(0, 5);
      const end = hash.substring(hash.length - 6, hash.length);
      return `${start}...${end}`;
    }
    return hash;
  },
  source() {
    const CancelToken = this.$axios.CancelToken;
    return CancelToken.source();
  },
  arrayToStr(values) {
    if (
      typeof values.luminosity__in !== "string" &&
      values.luminosity__in?.length
    ) {
      values.luminosity__in = values.luminosity__in.join(",");
    }
    if (typeof values.age__in !== "string" && values.age__in?.length) {
      values.age__in = values.age__in.join(",");
    }
    if (
      typeof values.quality_level__in !== "string" &&
      values.quality_level__in?.length
    ) {
      values.quality_level__in = values.quality_level__in.join(",");
    }
    return values;
  },
  formData(data, files) {
    const apiData = convertCamelToSnack(data);
    const formData = new FormData();
    if (apiData) {
      Object.keys(apiData).forEach((key) => {
        formData.append(key, apiData[key]);
      });
    }
    if (files) {
      Object.keys(files).forEach((item) => {
        formData.append(toUnderscore(item), files[item]);
      });
    }

    return formData;
  },
  filesHeaders() {
    return {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    };
  },

  readChunk(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(reader.result);
      };
      reader.readAsArrayBuffer(file);
    });
  },
  async prepareChunk(chunk, file) {
    const done = await this.readChunk(chunk);
    return new File([done], file.name);
  },
  formatMoney(money) {
    return Number(money).toLocaleString("ru-RU");
  },

  objectToQuery(obj) {
    return Object.entries(obj)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join("&");
  },
  cleanObject(obj) {
    return Object.entries(obj).reduce((a, [k, v]) => {
      return (typeof v === "object" && Object.keys(v).length) ||
        (v && typeof v !== "object")
        ? ((a[k] = v), a)
        : a;
    }, {});
  },
  objectToQuerySearch(obj) {
    const search = functions.cleanObject(obj);
    return Object.entries(search)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join("&");
  },
  capitalize(str) {
    const lower = str.toLowerCase();
    return str?.charAt(0).toUpperCase() + lower.slice(1);
  },
  getMonthList(locale = "en-us") {
    const objDate = new Date();
    const items = [];
    [...Array(12).keys()].map((monthNumber) => {
      objDate.setDate(1);
      objDate.setMonth(monthNumber);
      const month = objDate.toLocaleString(locale, { month: "long" });
      items.push(this.capitalize(month));
    });
    return items;
  },
};
