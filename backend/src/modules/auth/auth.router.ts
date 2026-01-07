import { Router } from "express";
import { Request, Response } from "express";

import AuthController from "./auth.controller";


const router = Router();
const controller = new AuthController();

router.post('/refresh', async (req: Request<{},{},{refreshToken: string}>, res: Response)=>{ controller.refresh(req, res)})

export const authRouter = router;