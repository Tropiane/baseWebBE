import mongoose from "mongoose";
import { ENV } from "./env";

export default class Mongo {
    async connect() {
        try {
            await mongoose.connect(ENV.MONGODB || "");
            console.log("Connected to DB");
            
        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    }
}