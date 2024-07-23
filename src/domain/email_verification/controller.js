// const {sendVerificationOTPEmailService} = require("./service")

// const sendVerificationOTPEmailController = async(req, res)=>{
//     try {
//         //console.log(req.body.email);
//         const { email }= req.body;
//         if(!email)
//             throw Error("An email in required!");
        
//         const createdEmailVerificationOTP = await sendVerificationOTPEmailService(email);
//         res.status(200).json(createdEmailVerificationOTP)    
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// module.exports = { sendVerificationOTPEmailController }