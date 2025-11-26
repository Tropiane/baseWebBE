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
                maxAge: 259200,
                httpOnly: true,
                signed: true
            })            
            res.send("usuario creado correctamente: ")
        } catch (error) {
            res.send("error al crear el usuario");
            console.log(error);
            
        }
        
    }

    async login(req: Request<{}, {}, UserInterface>, res: Response) {
        const data = req.body;
        console.log(data);
        const user = await this.Service.login(data);
        
        const token = generateToken(user._id.toString());

        res.cookie("token", token, {
            maxAge: 1000 * 60 * 60 * 24 * 3,
            httpOnly: true,
            signed: true,
            secure: true,
            sameSite: "lax"
        });

        res.json({ message: "Login exitoso" });
    }

    async getUserById(id:string){
        const user = this.Service.getUserById(id);
        return user
    }

    
};

export default UserController;