import dotenv from "dotenv";

dotenv.config();

export const ENV = {
    PORT: process.env.PORT || 3000,
    MONGODB: process.env.MONGODB || "mongodb://localhost:27017/base",
    JWT_REFRESH_SECRET: process.env.JWT_SECRET || "ClaveSecretaRefresh",
    JWT_ACCESS_SECRET: process.env.JWT_SECRET || "ClaveSecretaAccess",
    COOKIE_SECRET: process.env.COOKIE_SECRET || "cookie_secret_key",
    CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:5173"
};