export const catchErrors = function (e) {
  console.log(e.response, "e.response");
  if (e.response && e.response.status === 422) {
    // eslint-disable-next-line valid-typeof
    if (e.response.data.detail && e.response.data.detail.length) {
      let errors = [];
      e.response.data.detail.map((item) => {
        let str;
        if (item.loc[1] && item.loc[1] === "password") {
          str = "Password " + item.msg;
        } else {
          str = item.msg;
        }
        errors = [...errors, str];
      });
      return errors ? errors[0] : "";
    } else if (e.response.data.detail) {
      return e.response.data.detail;
    }
  } else if (
    e.response &&
    e.response.status === 404 &&
    !e.response.data.detail
  ) {
    return "404 Not found";
  } else if (e.response && e.response.data.detail) {
    return e.response.data.detail;
  } else if (e.response && e.response.data.status) {
    return e.response.data.status;
  } else if (
    e.response &&
    typeof e.response.data !== "string" &&
    e.response.data.length
  ) {
    let errorsList = [];
    e.response.data.map((item) => {
      errorsList = [...errorsList, item];
    });
    return errorsList ? errorsList[0] : "";
  } else return e.message;
};
