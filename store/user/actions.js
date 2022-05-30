import { functions } from "../../utils";

export const actions = {
  /**
   *
   * @param context
   * @param payload {Object<{email: String, password: String}>}
   * @returns {Promise<AxiosResponse<any>>}
   */
  registerUser(context, payload) {
    return this.$axios.$post("/users/register/", payload);
  },

  /**
   *
   * @param context
   * @param payload {Object<{email: String, password: String}>}
   * @returns {Promise<AxiosResponse<any>>}
   */
  loginUser(context, payload) {
    return this.$axios.$post("/users/auth/", payload);
  },

  /**
   *
   * @param context
   * @param payload {Object<{email: String}>}
   * @returns {Promise<AxiosResponse<any>>}
   */
  recoverPassword(context, payload) {
    return this.$axios.$post("/users/password/reset/", payload);
  },

  /**
   *
   * @param context
   * @param payload {Object<{password: String, token: Number}>}
   * @returns {Promise<AxiosResponse<any>>}
   */
  confirmRecoverPassword(context, payload) {
    return this.$axios.$post("/users/password/reset/confirm/", payload);
  },

  /**
   *
   * @param context
   * @param payload {Object<{name: String, email: String}>}
   * @returns {Promise<AxiosResponse<any>>}
   */
  submitTester(context, payload) {
    return this.$axios.$post("/nfts/submit/tester/", payload);
  },

  /**
   *
   * @param context
   * @param payload {Object<{file: File}>}
   * @returns {Promise<AxiosResponse<any>>}
   */
  updateAvatar(context, payload) {
    const formData = functions.formData(null, payload);
    const headers = functions.filesHeaders();
    return this.$axios.$put("/users/avatar/", formData, {
      headers,
    });
  },

  /**
   *
   * @param context
   * @param payload {Object<{old_password: String, new_password: String}>}
   * @returns {Promise<AxiosResponse<any>>}
   */
  newPassword(context, payload) {
    return this.$axios.$post("/users/password/change/", payload);
  },

  /**
   *
   * @param context
   * @returns {Promise<AxiosResponse<any>>}
   */
  deleteAccount(context, payload) {
    return this.$axios.$delete("/users/delete/");
  },

  /**
   *
   * @param context
   * @param payload {Object<{token: String}>}
   * @returns {Promise<AxiosResponse<any>>}
   */
  verifyEmail(context, payload) {
    return this.$axios.$post("/users/email/verify/", payload);
  },

  /**
   *
   * @param context
   * @param payload {Object<{email: String, nft_notifications: Boolean}>}
   * @returns {Promise<AxiosResponse<any>>}
   */
  updateProfile(context, payload) {
    return this.$axios.$put("/users/update/", payload);
  },

  /**
   *
   * @param context
   * @param payload {}
   * @returns {Promise<AxiosResponse<any>>}
   */
  saveWallet(context, payload) {
    return this.$axios.$post("/users/wallet/", payload);
  },

  /**
   *
   * @param context
   * @returns {Promise<AxiosResponse<any>>}
   */
  resendVerificationEmail(context) {
    return this.$axios.$post("/users/email/resend/");
  },

  /**
   *
   * @param context
   * @param payload {Object<{token: String}>}
   * @returns {Promise<AxiosResponse<any>>}
   */
  refreshTokens(context, payload) {
    return this.$axios.$post(
      "/users/auth/refresh/",
      {},
      {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }
    );
  },
};
