import jwt from "jsonwebtoken";
import { ENV } from "./env";

const ACCESS_SECRET = ENV.JWT_ACCESS_SECRET;
const REFRESH_SECRET = ENV.JWT_REFRESH_SECRET;

export const generateAccessToken = (userId: string): string => {
  return jwt.sign(
    { id: userId },
    ACCESS_SECRET,
    { expiresIn: "15m" }
  );
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign(
    { id: userId },
    REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ACCESS_SECRET);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_SECRET);
};
