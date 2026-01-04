import jwt from "jsonwebtoken";
import { ENV } from "./env";

const JWT_SECRET = ENV.JWT_SECRET;

const generateAccessToken = (userId: string): string=>{
    return jwt.sign({id: userId}, JWT_SECRET, {expiresIn: "15m"});
}

const generateRefreshToken = (userId: string): string=>{
    return jwt.sign({id: userId}, JWT_SECRET, {expiresIn: "7D"});
}

const validateToken = (token:string): any =>{
    return jwt.verify(token, JWT_SECRET);
};

export {
    generateAccessToken,
    generateRefreshToken,
    validateToken
}