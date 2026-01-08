import { Request, Response } from "express";
import { generateAccessToken, verifyRefreshToken } from "../../utils/jwt";

export default class AuthController {
  async refresh(req: Request, res: Response) {
    try {
      const refreshToken = req.signedCookies.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({ error: "Refresh token requerido" });
      }

      const payload = verifyRefreshToken(refreshToken) as { id: string };

      const newAccessToken = generateAccessToken(payload.id);

      return res.status(200).json({
        accessToken: newAccessToken,
      });

    } catch (error) {
      return res.status(401).json({ error: "Refresh token inválido o expirado" });
    }
  }
}
