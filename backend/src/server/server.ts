import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import formRouter from "../modules/form/form.router";
import { userRouter } from "../modules/user/user.router";
import { ENV } from "../utils/env";

export default class Server {
    private app = express();

    constructor() {
        this.middlewares();
        this.routes();
    }

    private middlewares() {
        this.app.use(cors({
            origin: [ENV.CORS_ORIGIN, "http://localhost:5173"],
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization"]
        }));
        this.app.use(express.json());
        this.app.use(cookieParser(ENV.COOKIE_SECRET || 'cookie_secret_key'));


        this.app.use(express.urlencoded({ extended: true }));
    }

    private routes() {
        this.app.use('/api/form', formRouter);
        this.app.use('/api/user', userRouter);
    }

    public connect() {
        const PORT = ENV.PORT || 3000;
        this.app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
}
