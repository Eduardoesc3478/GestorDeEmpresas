import { model, Schema } from "mongoose";

const companySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    impactLevel: {
        type: String,
        required: true,
        enum: ["Alto","Medio","Bajo"]
    },
    foundedYear: {
        type: Number,
        required: true
    },
    Category: {
        type: String,
        required: true,
        enum: ["Grande empresa","Mediana empresa","Pequeña empresa"]
    },
    address: {
        type: String,
        required: false
    }
});

companySchema.virtual('yearsInBusiness').get(function() {
    const currentYear = new Date().getFullYear();
    return currentYear - this.foundedYear;
});

const Company = model('Company', companySchema);

export default Company;