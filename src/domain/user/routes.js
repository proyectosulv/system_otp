const express = require("express");
const router = express.Router();
const {createNewUserService, AuthenticateUserService} = require("./services");
const auth = require("./../../middleware/auth");
const { sendVerificationOTPEmailService }= require("./../email_verification/service");

//protected route
router.get("/private_data", auth, (req, res)=>{
    res.status(200).send(`You're in the private territory of ${req.currentUser.email}`);
});

//Singup
router.post("/signup", async (req, res)=>{
    try {
        let {name, email, password} = req.body;
        //console.log(name, email, password);
        name = name.trim();
        email = email.trim();
        password = password.trim();

        if (!(name && email && password)){
            throw Error("Campos de entrada vacios!");
        }else if (!/^[a-zA-Z ]*$/.test(name)){
            throw Error("Nombre invalido ingresado");
        }else if (!/^[\w-\.]+@([\w-]+\.)+[\w- ]{2,4}$/.test(email)){
            throw Error("email invalido ingresado");
        }else if(password.length < 8){
            throw Error("Password es demaciado corto!");
        }else{
            //god credentials, create new user
            const newUser = await createNewUserService({
                name,
                email,
                password,
            });
            await sendVerificationOTPEmailService(email);
            res.status(200).json(newUser);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

//Signin
router.post("/login", async (req, res)=>{
    try {
        let {email, password} = req.body;
        email = email.trim();
        password = password.trim();

        //check ifany value is not empty
        if (!(email && password)){
            throw Error("Campos de credenciales vacios");
        }

        const authenticateUser = await AuthenticateUserService({email, password});
        res.status(200).json(authenticateUser);

    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;