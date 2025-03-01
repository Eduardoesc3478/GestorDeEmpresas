import { Router } from "express";
import { registerAdmin, login } from "./auth.controller.js";
import { registerAdminValidator, loginValidator } from "../middlewares/admin-validators.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const router = Router();

/**
 * @swagger
 * /registerAdmin:
 *   post:
 *     summary: Register a new admin
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       201:
 *         description: Admin registered successfully
 *       400:
 *         description: Invalid input
 */
router.post("/registerAdmin", registerAdminValidator, registerAdmin);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login as an admin
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */
router.post("/login", loginValidator, login);

export default router;
