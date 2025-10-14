import dotenv from "dotenv";

dotenv.config();

const requiereVariables = ["PORT", "MONGODB", "JWT_SECRET"] as const;

for(const key of requiereVariables){
    if(!process.env[key]){
        throw new Error(`No se ha encontrado la variable de entorno ${key}`)
    };
};

export const ENV = {
    PORT: process.env.PORT,
    MONGODB: process.env.MONGODB,
    JWT_SECRET: process.env.JWT_SECRET
};