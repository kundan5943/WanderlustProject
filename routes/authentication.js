const express = require("express");
const router = express.Router();
const User = require("../Model/user.js");
const wrapAsync = require("../util/wrapAsync.js");
const passport = require("passport");
const { savedUrl } = require("../middleware/checklogin.js");

const userController = require("../Controller/users.js");

// signup form route
// router.get("/signup",userController.signupForm);

// // signup route
// router.post('/signup',userController.signUp);

router
  .route("/signup")
  .get(userController.signupForm)
  .post(userController.signUp);

router
  .route("/login")
  .get(userController.loginForm)
  .post(
    savedUrl,
    passport.authenticate("local", {
      failureRedirect: "/wanderlust/authenticate/login",
      failureFlash: true,
    }),
    userController.login,
  );

// Logout
router.get("/logout", userController.logout);

module.exports = router;
