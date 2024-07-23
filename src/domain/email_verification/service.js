const User = require("../user/model");
const { sendOTPService,  verifyOTPService, deleteOTPService } = require("./../otp/services");


const verifyUserEmailService = async ({email, otp})=>{
    try {
        const validOTP = await verifyOTPService ({email, otp});
        if (!validOTP){
            throw Error("Invalid code passed, check your inbox");
        }
        //now update user record to show verified
        await User.updateOne({email}, {verified: true});
        await deleteOTPService(email);
        return;
    } catch (error) {
        throw error;
    }
}

const sendVerificationOTPEmailService = async (email)=>{
    try {
        //check if an account exists
        //console.log("yeah", email);
        const existingUser = await User.findOne({ email });
        if(!existingUser){
            throw Error("There's no account for the provided email");
        }        
        
        //console.log("Entro2: ", existingUser);
        const otpDetails = {
            email,
            subject: "Verificaicon de Email",
            message: "Verifica tu email con el codigo de abajo",
            duration: 1
        };
        //console.log("Detalle:", otpDetails);
        const createdOTP = await sendOTPService(otpDetails);
        return createdOTP
    } catch (error) {
        throw error;
    }
}

module.exports = { sendVerificationOTPEmailService, verifyUserEmailService };
