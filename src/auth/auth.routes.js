import { Router } from "express";
import { registerAdmin, login } from "./auth.controller.js";
import { registerAdminValidator, loginValidator } from "../middlewares/admin-validators.js";


const router = Router();


router.post( "/registerAdmin", registerAdminValidator, registerAdmin);



router.post( "/login", loginValidator, login);

export default router;
