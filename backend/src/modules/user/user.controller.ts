import { Request, Response } from "express";
import type { UserInterface } from "./user.dao";
import UserService from "./user.service";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";

export interface userCreatedInterface{
    user: UserInterface[],
    token: string
}

class UserController{
    private Service = new UserService();

    async createUser(req: Request<{}, {}, UserInterface>, res: Response){
        try {
            const data = req.body;        
            await this.Service.createUser(data);

            const user = await this.Service.getUserByEmail(data.email);
            
            const accessToken = generateAccessToken(user._id.toString());
            const refreshToken = generateRefreshToken(user._id.toString());

            await this.Service.setRefreshToken(user._id.toString(), refreshToken);

            res.status(200).json({ accessToken });
        } catch (error) {
            res.send("error al crear el usuario");
            console.log(error);
            
        }
        
    }

    async login(req: Request<{}, {}, UserInterface>, res: Response) {
        try {
            const user = await this.Service.login(req.body);

            const accessToken = generateAccessToken(user._id.toString());
            const refreshToken = generateRefreshToken(user._id.toString());

            await this.Service.setRefreshToken(user._id.toString(), refreshToken);
            
            res
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            .status(200)
            .json({ accessToken });

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Error en el login" });
    }
}



    async getUserById(id:string){
        const user = this.Service.getUserById(id);
        return user
    }

    
};

export default UserController;