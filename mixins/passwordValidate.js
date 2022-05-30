export default {
  data() {
    return {
      inputTypePassword: "password",
      inputTypeCurrentPassword: "password",
      inputTypeRepeat: "password",
      level: 0,
      customErrors: [],
      rulesPass: [
        { name: "length", text: "Must have more than 8 characters" },
        { name: "number", text: "Must have at least one number" },
        {
          name: "symbol",
          text: "Must have at least one special character (e.g. ! @ # ?)",
        },
        { name: "letter", text: "Must have uppercase and lowercase letters." },
      ],
    };
  },

  computed: {
    inputIconPassword() {
      return this.inputTypePassword === "password"
        ? require("assets/img/icons/eye.svg")
        : require("assets/img/icons/eye-slash.svg");
    },
    inputIconCurrentPassword() {
      return this.inputTypeCurrentPassword === "password"
        ? require("assets/img/icons/eye.svg")
        : require("assets/img/icons/eye-slash.svg");
    },
    inputIconRepeat() {
      return this.inputTypeRepeat === "password"
        ? require("assets/img/icons/eye.svg")
        : require("assets/img/icons/eye-slash.svg");
    },
  },

  watch: {
    password(val) {
      if (val) {
        let count = 0;
        let errors = [...this.rulesPass];

        if (val.length >= 8) {
          count += 1;
          errors = errors.filter((error) => error.name !== "length");
        }

        if (/[0-9]/.test(val)) {
          count += 1;
          errors = errors.filter((error) => error.name !== "number");
        }

        if (/[#?!@$%^&*-]/.test(val)) {
          count += 1;
          errors = errors.filter((error) => error.name !== "symbol");
        }

        if (/[a-z]/.test(val) && /[A-Z]/.test(val)) {
          count += 1;
          errors = errors.filter((error) => error.name !== "letter");
        }

        this.level = count;
        this.customErrors = errors;
      } else this.level = 0;
    },
  },

  methods: {
    iconClick(type) {
      if (type === "password") {
        this.inputTypePassword =
          this.inputTypePassword === "password" ? "text" : "password";
      } else if (type === "currentPassword") {
        this.inputTypeCurrentPassword =
          this.inputTypeCurrentPassword === "password" ? "text" : "password";
      } else {
        this.inputTypeRepeat =
          this.inputTypeRepeat === "password" ? "text" : "password";
      }
    },
  },
};
