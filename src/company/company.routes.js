import { Router } from "express";
import { addCompany, updateCompany } from "./company.controller.js";
import { validateAddCompany, updateCompanyValidator } from "../middlewares/company-validators.js";

const router = Router();

router.post("/addCompany", validateAddCompany, addCompany)

router.put("/editCompany/:id", updateCompanyValidator ,updateCompany )


export default router;
