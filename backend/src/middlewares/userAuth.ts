import { Request, Response, NextFunction } from "express";
import { validateToken } from "../utils/jwt";
import UserController from "../modules/user/user.controller";

const controller = new UserController()

const validateAdmin = async (req: Request, res: Response, next: NextFunction)=>{
    const token = req.signedCookies.token;
    
    if(!token){
        throw new Error("No tiene token de acceso")
    };

    const verifiedToken = validateToken(token);
    const userId = verifiedToken.id;

    const user = await controller.getUserById(userId);
    if (!user) {
        throw new Error("Usuario no encontrado");
        }
    
    if(user.role != 'admin'){  
        throw new Error("acceso Denegado, no sos admin")
    };

     next();
}

export {
    validateAdmin
}