const User = require("./model");
const { hashData, verifyHashedData } = require("./../../util/hashData");
const createToken = require("./../../util/createToken");

const createNewUserService = async (data)=>{
 try {
    const {name, email, password} = data;
    
    //Cheking if user already exist
    const existingUser = await User.findOne({email});
    if (existingUser){
        throw Error("El usuario con el correo electrónico proporcionado ya existe")
    }

    //hash password
   const hashedPassword = await hashData(password);

   //Instance new user
   const newUser = new User({
    name,
    email,
    password: hashedPassword
   })
   //save user
   const createdUser = await newUser.save();
   return createdUser;

 } catch (error) {
    throw error;    
 }
}


const AuthenticateUserService = async(data)=>{
   try {
      const {email, password} = data;

      const fechedUser = await User.findOne({ email });
      
      if(!fechedUser){
         throw Error("Creadenciales invalidas");
      }
      if (!fechedUser.verified) {
         throw Error("Email hasn't been verified yet. Check your inbox");
      }

      const hashedPassword = fechedUser.password;  
      const passwordMatch = await verifyHashedData(password, hashedPassword);

      if(!passwordMatch){
         throw Error("Password ingresado incorrecto")
      }

      //create user token
      const tokenData = { userid: fechedUser._id, email};
      const token = await createToken(tokenData)

      //assign user token
      fechedUser.token = token;
      return fechedUser

   } catch (error) {
      throw error
   }
}

module.exports = {createNewUserService, AuthenticateUserService}