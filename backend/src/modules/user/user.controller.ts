import { Request, Response } from "express";
import type { UserInterface } from "./user.dao";
import UserService from "./user.service";
import { generateToken } from "../../utils/jwt";

export interface userCreatedInterface{
    user: UserInterface[],
    token: string
}

class UserController{
    private Service = new UserService();

    async createUser(req: Request<{}, {}, UserInterface>, res: Response){
        try {
            const data = req.body;        
            const user = await this.Service.createUser(data);
            res.cookie("token", user.token, {
                maxAge: 1000 * 60 * 60 * 24 * 3,
                httpOnly: true,
                signed: true,
                sameSite: "none",
                secure: true,
            })            
            res.send("usuario creado correctamente: ")
        } catch (error) {
            res.send("error al crear el usuario");
            console.log(error);
            
        }
        
    }

    async login(req: Request<{}, {}, UserInterface>, res: Response) {
        try {
        const data = req.body;
        const user = await this.Service.login(data);

        const token = generateToken(user._id.toString());
        
        const cookie = res.cookie("token", token, {
            maxAge: 1000 * 60 * 60 * 24 * 3,
            httpOnly: true,
            signed: true,
            secure: true,
            sameSite: "none",
        });

        if (!cookie) {
            throw new Error("Error al crear la cookie");
        }
        res.json({ message: "Login exitoso" });
        } catch (error) {
            console.log(error);
        }
    }

    async getUserById(id:string){
        const user = this.Service.getUserById(id);
        return user
    }

    
};

export default UserController;