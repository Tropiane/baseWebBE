import { Router, Request, Response } from "express";
import formController from "./form.controller";
import { validateAdmin } from "../../middlewares/userAuth";

const router = Router();
const controller = new formController();

router.get("/", validateAdmin, async (req: Request, res: Response) => {await controller.getForms(req, res)});
router.post("/", async (req: Request, res: Response)=>{controller.createForm(req, res);});
router.patch("/", async (req:Request<{},{}, {id: number, comment: string}>, res:Response)=>{await controller.updateForm(req, res)  });
router.delete('/:id', async (req: Request<{id: number},{},{}>, res:Response)=>{ await controller.deleteForm(req, res)})
router.patch("/change-status", async (req:Request<{},{},{formId:number, status:string}>, res:Response)=>{await controller.changeFormStatus(req,res)})
const formRouter = router;
export default formRouter;