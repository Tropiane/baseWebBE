import { Router, Request, Response } from "express";
import type { UserInterface } from "./user.dao";

import UserController from "./user.controller";

const router = Router();
const controller = new UserController();

router.post('/login', async (req: Request<{}, {}, UserInterface>, res: Response)=>{
    await controller.login(req, res)
})

export const userRouter = router