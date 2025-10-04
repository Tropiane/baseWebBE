import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "ClaveSecreta";
const EXPIRES_IN = "1D";

const generateToken = (userId: string): string=>{
    return jwt.sign({id: userId}, JWT_SECRET, {expiresIn: EXPIRES_IN});
}

const validateToken = (token:string): any =>{
    return jwt.verify(token, JWT_SECRET);
};

export {
    generateToken,
    validateToken
}