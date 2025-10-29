import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import formRouter from "../modules/form/form.router";
import { userRouter } from "../modules/user/user.router";
import { ENV } from "../utils/env";

export default class Server{
    constructor(){};
    private app = express();

    connect(){
        const PORT = ENV.PORT;
        this.app.use(express.json());
        this.app.use(cookieParser(ENV.COOKIE_SECRET || 'cookie_secret_key'))
        this.app.use(express.urlencoded({ extended: true }));

        this.app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    };

    endPoint(){
        this.app.use('/api/form', formRouter);
        this.app.use('/api/user', userRouter)
    };

    cors(){
        this.app.use(cors({
            origin: [ENV.CORS_ORIGIN],
            credentials: true,
            methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization"]
        }));
    };
};