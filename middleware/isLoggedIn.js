export default ({ app, redirect, route }) => {
  if (app.$auth.loggedIn) {
    redirect("/profile");
  }
};
