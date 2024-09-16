const app = require("./app");
const  PORT  = process.env.PORT || 3005

const startApp = ()=>{
    app.listen(PORT, ()=>{
        console.log(`Backend corriendo en el puerto ${PORT}`);
    });
};

startApp();