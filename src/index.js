const app = require("./app");
const { PORT } = process.env

const startApp = ()=>{
    app.listen(PORT, ()=>{
        console.log(`Backend corriendo en el puerto ${PORT}`);
    });
};

startApp();