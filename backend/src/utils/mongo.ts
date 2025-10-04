import mongoose from "mongoose";

export default class Mongo {
    async connect() {
        try {
            await mongoose.connect("mongodb://localhost:27017/base");
            console.log("Connected to DB");
            
        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    }
}