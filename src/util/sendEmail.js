const nodemailer = require("nodemailer");

const { AUTH_EMAIL, AUTH_PASS, AUTH_PASS_APP } = process.env
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure:true,
    auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASS_APP,
    },
});

// test transporter
transporter.verify((error, success)=>{
    if(error){
        console.log(error);
    }else{
        console.log("Ready for message");
        console.log(success);
    }
});

const sendEmail = async (mailOptions)=>{
    try {
        await transporter.sendMail(mailOptions);
        return;
    } catch (error) {
        throw error;
    }
};

module.exports = sendEmail;