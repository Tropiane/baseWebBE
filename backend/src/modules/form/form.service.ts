import FormDao from "./form.dao";
import formInterface from "./form.interface";
class formService{
    formDao = new FormDao();
    async getForms() {

        return await this.formDao.getForms();
    };
    async createForm(form: formInterface) {
        const allForms = await this.formDao.getForms();
        if (!allForms || allForms.length === 0) {
            form.formId = 1;
        } else {
            form.formId = (allForms[allForms.length - 1]?.formId ?? 0) + 1;
        }
        
        form.sendAt = new Date();
        return await this.formDao.createForm(form);
    };

    async deleteForm(formId: number) {
        return await this.formDao.deleteForm(formId);
    };

    async updateForm(formId: number, comment: string) {
        return await this.formDao.updateForm(formId, comment);
    };

    async changeFormStatus(formId: number, status:string){
        await this.formDao.changeFormStatus(formId, status);
    };
}

export default formService