const User = require("./../user/model");
const { sendOTPService, verifyOTPService, deleteOTPService } = require("./../otp/services")
const { hashData } = require("./../../util/hashData");

const resetUserPassword = async ({ email, otp, newPassword })=>{
    try {
        const validOTP = await verifyOTPService({email, otp});
        if(!validOTP){
            throw Error("Invalid code passed. Check your inbox.");s
        }

        //now update user record with new password.
        if(newPassword.length < 8){
            throw Error("Password is too short!!");
        }
        const hashedNewPassword = await hashData(newPassword);
        await User.updateOne({email}, {password: hashedNewPassword});
        await deleteOTPService(email);
        return;
    } catch (error) {
        throw error;
    }
};



const sendPasswordResetOTPEmailService = async (email) =>{
    try {
        //check if an account exits
        const existingUser = await User.findOne({email});
        if(!existingUser){
            throw Error("There´s no account for the provided email.");
        }
        if(!existingUser.verified){
            throw Error ("Email hasn't been verified yet. Check your inbox.");
        }
        const otpDetails = {
            email,
            subject: "Password Reset",
            message: "Ingresa el codigo de abajo para resetear tu password.",
            duration: 1,
        };
        const createdOTP = await sendOTPService(otpDetails);
        return createdOTP;
        
    } catch (error) {
        throw error;
    }
};

module.exports = {sendPasswordResetOTPEmailService, resetUserPassword};