import { generateToken } from "../../utils/jwt"
import UserModel from "./userSchema"

export interface UserInterface{
    email:string,
    password: string,
    role?: string
}

class UserDao{
    async createUser(data: UserInterface){
        const newUser = await UserModel.create(data)
        newUser.save()

        const token = generateToken(newUser._id.toString())
        
        return({newUser, token})
    }

    async getUserByID(id:string){
        const user = await UserModel.findById(id).lean();
        return user
    }
    async getUserByEmail(email:string){
        const user = await UserModel.find({email: email}).lean()
        return user
    }
}

export default UserDao