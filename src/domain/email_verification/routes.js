const express = require("express");
const router = express.Router();
//const { sendVerificationOTPEmailController } = require("./controller")
const {sendVerificationOTPEmailService, verifyUserEmailService, verifyUserOTPService} = require("./service");

router.post("/verify", async(req,res)=>{
    try {
        let { email, otp} = req.body;
        if(!(email && otp))
            throw Error("Empty otp details not allowed");

        await verifyUserEmailService({email, otp});
        res.status(200).json({email, verified: true});
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post("/verifyOTP", async(req,res)=>{
    try {
        let { email, otp} = req.body;
        if(!(email && otp))
            throw Error("Empty otp details not allowed");

        await verifyUserOTPService({email, otp});
        res.status(200).json({email, verified: true});
    } catch (error) {
        res.status(400).send(error.message);
    }
});


//request new verification otp
router.post("/", async(req, res)=>{
    try {
        //console.log(req.body.email);
        const { email }= req.body;
        if(!email)
            throw Error("El email es requerido!");
        
        const createdEmailVerificationOTP = await sendVerificationOTPEmailService(email);
        res.status(200).json(createdEmailVerificationOTP)    
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;