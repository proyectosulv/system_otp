const express = require("express");
const router = express.Router();
//const { sendOTPController } = require("./controller");
const {sendOTPService, verifyOTPService, deleteOTPServie} = require("./services");


router.post("/verify", async(req,res)=>{
    try {
        let {email, otp} = req.body;

        const validOTP = await verifyOTPService({email, otp});
        res.status(200).json({valid: validOTP});
    } catch (error) {
        res.status(400).send(error.message);
    }
});


router.post("/", async(req, res)=>{    
    try {        
        const {email, subject, message, duration} = req.body;        
        
        const createOTP = await sendOTPService({
            email,
            subject,
            message,
            duration
        });
        res.status(200).json(createOTP);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;