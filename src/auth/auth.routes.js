import { Router } from "express";
import { registerAdmin, registerClient, login } from "./auth.controller.js";
import { registerAdminValidator, loginValidator } from "../middlewares/admin-validators.js";
import { registerClientValidator } from "../middlewares/user-validators.js";


const router = Router();


router.post( "/registerAdmin", registerAdminValidator, registerAdmin);

router.post( "/registerClient", )

router.post( "/login", loginValidator, login);

export default router;
