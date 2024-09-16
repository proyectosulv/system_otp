const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/auth")

const { sendPasswordResetOTPEmailService, resetUserPassword } = require("./services")

router.post("/reset", verifyToken, async (req, res)=>{
    try {
        let { email, otp, newPassword } = req.body;
        if (!(email && otp && newPassword))
            throw Error("Empty credentials are not allowed");
        const newPasshash = await resetUserPassword({email, otp, newPassword});
        res.status(200).json({email, passeordreset: newPasshash });
    } catch (error) {
        res.status(400).send(error.message);
    }
});


//password reset request
router.post("/", verifyToken, async (req, res)=>{
    try {
        const { email } = req.body;
        if (!email) throw Error("An email is required");

        const createdPasswordResetOTP = await sendPasswordResetOTPEmailService(email);
        res.status(200).json(createdPasswordResetOTP);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;