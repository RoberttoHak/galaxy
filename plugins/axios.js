export default function ({ $axios, app, store, redirect }) {
  // $axios.onRequest((config) => {
  //   const token = app.$user.getToken("local");
  //
  //   if (token) {
  //     config.headers.common.Authorization = `vxvxvx`;
  //     // config.headers.common.Accept = "application/json, text/plain, */*";
  //   }
  // });
  // $axios.onError(async (error) => {
  //   const code = parseInt(error.response && error.response.status);
  //
  //   if ([401, 403].includes(code)) {
  //     await app.$users.logout();
  //     redirect("/login");
  //     store.commit("setSnackbar", {
  //       show: false,
  //       message: "",
  //       color: "success",
  //     });
  //   }
  //
  //   return Promise.reject(error);
  // });
}
