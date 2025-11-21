import { Request, Response, NextFunction } from "express";
import { validateToken } from "../utils/jwt";
import UserController from "../modules/user/user.controller";

const controller = new UserController()

const validateAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.signedCookies.token;

    if (!token) {
      return res.status(401).json({ error: "No tiene token de acceso" });
    }

    const verifiedToken = validateToken(token);
    const userId = verifiedToken.id;

    const user = await controller.getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ error: "Acceso denegado, no sos admin" });
    }

    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error al validar permisos" });
  }
};


export {
    validateAdmin
}