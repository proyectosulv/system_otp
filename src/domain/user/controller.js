
// const {createNewUserService, AuthenticateUserService} = require("./services");

// const createNewUserController = async (req, res)=>{
//     try {
//         let {name, email, password} = req.body;
//         console.log(name, email, password);
//         name = name.trim();
//         email = email.trim();
//         password = password.trim();

//         if (!(name && email && password)){
//             throw Error("Campos de entrada vacios!");
//         }else if (!/^[a-zA-Z ]*$/.test(name)){
//             throw Error("Nombre invalido ingresado");
//         }else if (!/^[\w-\.]+@([\w-]+\.)+[\w- ]{2,4}$/.test(email)){
//             throw Error("email invalido ingresado");
//         }else if(password.length < 8){
//             throw Error("Password es demaciado corto!");
//         }else{
//             //god credentials, create new user
//             const newUser = await createNewUserService({
//                 name,
//                 email,
//                 password,
//             });
//             res.status(200).json(newUser);
//         }
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }


// const AuthenticateUserController = async (req, res)=>{
//     try {
//         let {email, password} = req.body;
//         email = email.trim();
//         password = password.trim();

//         //check ifany value is not empty
//         if (!(email && password)){
//             throw Error("Campos de credenciales vacios");
//         }

//         const AuthenticateUser = await AuthenticateUserService({email, password});
//         res.status(200).json(AuthenticateUser);

//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// module.exports = {createNewUserController, AuthenticateUserController}