const OTP = require("./../otp/model");
const { sendOTPService, verifyOTPService, deleteOTPService } = require("./../otp/services")
const { hashData } = require("./../../util/hashData");

const resetUserPassword = async ({ email, otp, newPassword })=>{
    try {
        const validOTP = await verifyOTPService({email, otp});
        if(!validOTP){
            throw Error("Se ha introducido un código no válido. Revisa tu bandeja de entrada.");s
        }
        //Ahora actualice el registro de usuario con la nueva contraseña.
        if(newPassword.length < 8){
            throw Error("¡¡La contraseña es demasiado corta!!");
        }
        const hashedNewPassword = await hashData(newPassword);
        //await User.updateOne({email}, {password: hashedNewPassword});
        await deleteOTPService(email);
        return hashedNewPassword;
    } catch (error) {
        throw error;
    }
};



const sendPasswordResetOTPEmailService = async (email) =>{
    try {
        //check if an account exits
        // const existingUser = await OTP.findOne({email});
        // if(!existingUser){
        //     throw Error("No hay ninguna cuenta para el correo electrónico proporcionado.");
        // }
        // if(!existingUser.verified){
        //     throw Error ("El correo electrónico no ha sido verificado todavía. Revisa tu bandeja de entrada.");
        // }
        const otpDetails = {
            email,
            subject: "Restablecer contraseña",
            message: "Ingresa el codigo proporcionado para resetear tu password.",
            duration: 1,
        };
        const createdOTP = await sendOTPService(otpDetails);
        return createdOTP;
        
    } catch (error) {
        throw error;
    }
};

module.exports = {sendPasswordResetOTPEmailService, resetUserPassword};