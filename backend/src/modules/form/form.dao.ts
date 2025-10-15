import FormSchema from "./formSchema";
import formInterface from "./form.interface";
class FormDao {
    async getForms() {
        return await FormSchema.find();
    }
    async createForm(form: formInterface) {
        const newForm = new FormSchema(form);
        return await newForm.save();
    }
    async deleteForm(formId: number) {
        return await FormSchema.deleteOne({ formId: formId });
    }

    async updateForm(formId: number, comment: string) {
        return await FormSchema.findOneAndUpdate({ formId: formId }, {$push: {comments: comment}});
    }

    async changeFormStatus(formId:number, status: string){
        return await FormSchema.findOneAndUpdate({formId: formId}, {status: status})
    }
}

export default FormDao;