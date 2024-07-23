const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = process.env;

const verifyToken = async (req, res, next) =>{
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    //check for provider token 
    if (!token){
        return res.status(403).send("Un token de autorizacion es requerido");
    } 
    //verify token
    try {
        const decodeToken = await jwt.verify(token, TOKEN_KEY);
        req.currentUser = decodeToken;
    } catch (error) {
        return res.status(401).send("Token invalido")
    }

    //proceed with request 
    return next();
};

module.exports = verifyToken;
