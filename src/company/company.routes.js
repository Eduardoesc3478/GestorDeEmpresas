import { Router } from "express";
import { addCompany, updateCompany, filterCompanies } from "./company.controller.js";
import { validateAddCompany, updateCompanyValidator, reportValidator  } from "../middlewares/company-validators.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const router = Router();

/**
 * @swagger
 * /addCompany:
 *   post:
 *     summary: Add a new company
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *             required:
 *               - name
 *               - address
 *               - phone
 *     responses:
 *       201:
 *         description: Company added successfully
 *       400:
 *         description: Invalid input
 */
router.post("/addCompany", validateAddCompany, addCompany);

/**
 * @swagger
 * /editCompany/{id}:
 *   put:
 *     summary: Update an existing company
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The company ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Company updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Company not found
 */
router.put("/editCompany/:id", updateCompanyValidator, updateCompany);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Filter companies
 *     tags: [Company]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Company name to filter by
 *       - in: query
 *         name: address
 *         schema:
 *           type: string
 *         description: Company address to filter by
 *     responses:
 *       200:
 *         description: List of filtered companies
 *       400:
 *         description: Invalid input
 */
router.get("/", reportValidator, filterCompanies);

export default router;
