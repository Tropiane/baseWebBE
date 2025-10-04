import mongoose from "mongoose";

const schema = new mongoose.Schema({
    formId: Number,
    name: String,
    email: String,
    phone: String,
    description: String,
    sendAt: Date,
    status:{
        type: String,
        enum:["pendiente", "finalizado", "en curso", "cancelado"],
        default:"pendiente",
    },
    comments:[String],
});

const FormSchema = mongoose.model("Form", schema);

export default FormSchema;