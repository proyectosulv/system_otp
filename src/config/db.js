require("dotenv").config();
const mongoose = require("mongoose");

// URI de conexión
//const { MONGODB_URI } = process.env;
const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`;

const connectToDB = async ()=>{
    try {
        const db = await mongoose.connect(uri);   
        // Obtener información de la conexión
        const dbName = db.connection.name;
        const hostName = db.connection.host;
        const serverPort = db.connection.port;        
        // Imprimir detalles de la conexión en la consola
        console.log(`Conectado a la base de datos 👌 "${dbName}" en el host "${hostName}" en el puerto "${serverPort}" exitosamente`);
    } catch (error) {
        console.log(`**** Connect DB MongoDb Error 🔥 : ${error}`);
    }
}

connectToDB();