import { Request, Response, NextFunction } from "express";
import { verifyAccessToken, verifyRefreshToken } from "../utils/jwt";
import UserController from "../modules/user/user.controller";
import { JwtPayload } from "jsonwebtoken";

const controller = new UserController()

const validateAdmin = async (req: Request<{}, {}, {token: string}>, res: Response, next: NextFunction)=>{
    const token = req.headers.authorization
    console.log(token);
    
    if(!token){
        throw new Error("No tiene token de acceso")
    };

    const verified = verifyAccessToken(token);
    if (typeof verified === "string") {
        throw new Error("Token inválido");
    }
    const verifiedAccessToken: JwtPayload = verified;
    const userId = verifiedAccessToken.id;

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