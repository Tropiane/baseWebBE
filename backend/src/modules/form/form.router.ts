import { Router, Request, Response } from "express";
import formController from "./form.controller";
import { validateAdmin } from "../../middlewares/userAuth";
import formInterface from "./form.interface";

const router = Router();
const controller = new formController();

router.get("/", validateAdmin, (req: Request, res: Response) => {controller.getForms(req, res)});
router.post("/", async (req: Request, res: Response)=>{controller.createForm(req, res);});
router.patch("/", validateAdmin, async (req:Request<{},{}, {id: number, comment: string}>, res:Response)=>{await controller.updateForm(req, res)  });
router.delete('/', validateAdmin, async (req: Request<{},{},{id: number}>, res:Response)=>{ await controller.deleteForm(req, res)})
router.patch("/change-status", validateAdmin, async (req:Request<{},{},{formId:number, status:string}>, res:Response)=>{await controller.changeFormStatus(req,res)})
const formRouter = router;
export default formRouter;