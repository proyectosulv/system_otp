const OTP = require("./model")
const generateOTP = require("./../../util/generateOTP");
const sendEmail = require("./../../util/sendEmail")
const { hashData, verifyHashedData } = require("./../../util/hashData");
const { AUTH_EMAIL } = process.env;

const verifyOTPService = async ({email, otp})=>{
    try {
        if(!(email && otp)){
            throw Error("Proporcionar valores para correo electrónico, otp")
        }
        //Asegúrarse de que exista un registro OTP
        const matchedOTPRecord = await OTP.findOne({email});

        if(!matchedOTPRecord){
            throw Error("No se encontraron registros otp.");
        }

        const { expiresAt } = matchedOTPRecord;

        //checking for expired code
        if(expiresAt < Date.now()){
            await OTP.deleteOne({email});
            throw Error("El código ha expirado. Solicita uno nuevo");
        }

        //Aún no ha vencido, verificar el valor
        const hashedOTP = matchedOTPRecord.otp
        const validOTP = await verifyHashedData(otp, hashedOTP);
        return validOTP;
    } catch (error) {
        throw error;
    }
}

const sendOTPService = async ({ email, subject, message, duration = 1 })=>{
    try {
        if(!(email && subject && message)){
            throw Error("Proporciona valores para email, asunto, mensaje")
        }
        //clear any old record
        await OTP.deleteOne({email});
        
        //generate PIN
        const generatedOTP = await generateOTP();

        //send email
        const mailOptions = {
            from: AUTH_EMAIL,
            to: email,
            subject,
            html: `<p>${message}</p><p style="color:tomato;
            font-size:25px;letter-spacing:2px;"><b>
            ${generatedOTP}</b></p><p>This code <b>expires in 
            ${duration} hour(s)</b>.</p>`,
        }
        await sendEmail(mailOptions);

        //save otp record in database
        const hashedOTP = await hashData(generatedOTP);
        const newOTP = await new OTP({
            email,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000 * +duration,
        });
        const createdOTPRecord = await newOTP.save();
        return createdOTPRecord;
    } catch (error) {
        throw error;
    }
};


const deleteOTPService = async (email)=>{
    try {
        await OTP.deleteOne({email})
    } catch (error) {
        throw error
    }
};

module.exports = {sendOTPService, verifyOTPService, deleteOTPService};