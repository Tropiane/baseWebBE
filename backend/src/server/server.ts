import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import formRouter from "../modules/form/form.router";
import { userRouter } from "../modules/user/user.router";

export default class Server{
    constructor(){};
    private app = express();

    connect(){
        const PORT = process.env.PORT || 3000;
        this.app.use(express.json());
        this.app.use(cookieParser(process.env.COOKIE_SECRET || 'cookie_secret_key'))
        this.app.use(express.urlencoded({ extended: true }));

        this.app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    };

    endPoint(){
        this.app.use('/api/form', formRouter);
        this.app.use('/api/user', userRouter)
    };

    cors(){
        this.app.use(cors({
            origin: ["http://localhost:5173"],
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization"]
        }));
    };
};