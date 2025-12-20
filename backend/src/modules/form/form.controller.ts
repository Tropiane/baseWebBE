import { Request, Response } from "express";
import formService from "./form.service";
import formInterface from "./form.interface";

class formController {
    private service = new formService();
    async getForms(req: Request, res: Response) {
        try {
            const forms = await this.service.getForms();
            res.json(forms);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
    
    async createForm(req: Request<{}, {}, formInterface>, res: Response) {
        try {
            const form = req.body;
            
           return (await this.service.createForm(form), res.status(201));
            
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

    async deleteForm(req: Request<{id: number},{}, {}>, res: Response) {
        try {
            const formID = req.params.id
            return (await this.service.deleteForm(formID), res.status(200));
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

    async updateForm(req:Request<{},{}, {id: number, comment: string}>, res:Response){
        try {
            const formId = req.body.id;
            const comment = req.body.comment;
            
            
            return( await this.service.updateForm(formId, comment), res.status(200).send(JSON.stringify({message: "formulario actualizado"})))
        } catch (error) {
            
            console.log(error);
            throw new Error("Error al crear el formulario")
            
        }   
    }

    async changeFormStatus(req:Request<{},{},{formId:number, status:string}>, res:Response){
        try {
            const formId = req.body.formId;
            const status = req.body.status;
            
            return(await this.service.changeFormStatus(formId, status))
        } catch (error) {
            console.log(error);
            throw new Error("Error al cambiar el estado del formulario")
            
        }
    }
}

export default formController;