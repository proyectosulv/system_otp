const express = require("express");
const router = express.Router();

const userRoutes = require("./../domain/user");
const OTPRoutes = require("./../domain/otp");
const OTPAppRoutes = require("./../domain/otp_app");
const EmailVerificationRoutes = require("./../domain/email_verification");
const ForgotPasswordRoutes = require("./../domain/forgot_password");
const ForgotPasswordAppsRoutes = require("./../domain/forgot_password_app");

router.use("/user", userRoutes);
router.use("/otp", OTPRoutes);
router.use("/otp_app",OTPAppRoutes);
router.use("/email_verification", EmailVerificationRoutes);
router.use("/forgot_password", ForgotPasswordRoutes);
router.use("/forgot_password_app",  ForgotPasswordAppsRoutes);


module.exports = router;