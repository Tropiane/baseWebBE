import { generateRefreshToken } from "../../utils/jwt"
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

        const token = generateRefreshToken(newUser._id.toString())
        
        return({newUser, token})
    }

    async getUserByID(id:string){
        const user = await UserModel.findById(id).lean();
        return user
    }
    async getUserByEmail(email:string){
        const user = await UserModel.find({email: email}).lean()
        return user[0]
    }

    async setRefreshToken(id: string, token: string){
        await UserModel.findOneAndUpdate({ _id: id }, { refreshToken: token });
    }
}

export default UserDao