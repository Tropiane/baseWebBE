import { Router, Request, Response } from "express";
import type { UserInterface } from "./user.dao";

import UserController from "./user.controller";
import { validateAdmin } from "../../middlewares/userAuth";

const router = Router();
const controller = new UserController();

router.post('/create',validateAdmin, async (req: Request<{}, {}, UserInterface>, res: Response)=>{
    await controller.createUser(req, res)
});

router.post('/login', async (req: Request<{}, {}, UserInterface>, res: Response)=>{
    await controller.login(req, res)
})

export const userRouter = router