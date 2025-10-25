import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import Mongo from "./src/utils/mongo";

import formRouter from "./src/modules/form/form.router";
import { userRouter } from "./src/modules/user/user.router";


const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET || 'cookie_secret_key'))
app.use(express.urlencoded({ extended: true }));
app.use(cors(
    {
        origin: "*",
        credentials: true
    }
));
const connection = new Mongo();

app.use('/api/form', formRouter);
app.use('/api/user', userRouter)

//Connect to DB
connection.connect();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));