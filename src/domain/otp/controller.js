// const {sendOTPService} = require("./services");

// const sendOTPController = async(req, res)=>{    
//     try {        
//         const {email, subject, message, duration} = req.body;        
//         const createOTP = await sendOTPService({
//             email,
//             subject,
//             message,
//             duration
//         });
//         res.status(200).json(createOTP)
//     } catch (error) {
//         throw error.message;
//     }
// };

// module.exports = { sendOTPController };