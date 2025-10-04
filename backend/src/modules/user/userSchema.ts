import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: {
        type: String,
        roles:['user', 'admin'],
        default: 'user'
    }
})

const UserModel = mongoose.model("User", userSchema);
export default UserModel