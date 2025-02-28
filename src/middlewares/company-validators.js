import { body, param } from "express-validator";
import { companyExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle-errors.js";
import { hasRoles } from "./validate-roles.js"
import { validateJWT } from "./validate-jwt.js";

export const validateAddCompany = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("El nombre de la empresa es requerido"),
    body("name").isLength({ max: 50 }).withMessage("El nombre no puede exceder los 50 caracteres"),
    body("impactLevel").notEmpty().withMessage("El nivel de impacto es requerido"),
    body("impactLevel").isIn(["Alto", "Medio", "Bajo"]).withMessage("El nivel de impacto debe ser uno de los siguientes: Alto, Medio, Bajo"),
    body("foundedYear").notEmpty().withMessage("El año de fundación es requerido"),
    body("foundedYear").isNumeric().withMessage("El año de fundación debe ser un número válido"),
    body("foundedYear").isLength({ min: 4, max: 4 }).withMessage("El año de fundación debe tener 4 dígitos"),
    body("Category").notEmpty().withMessage("La categoría de la empresa es requerida"),
    body("Category").isIn(["Grande empresa", "Mediana empresa", "Pequeña empresa"]).withMessage("La categoría debe ser una de las siguientes: Grande empresa, Mediana empresa, Pequeña empresa"),
    body("address").optional().notEmpty().withMessage("La dirección no puede estar vacía si se proporciona"),
    validarCampos,
    deleteFileOnError,
    handleErrors
];


export const updateCompanyValidator = [
    validateJWT,  
    hasRoles("ADMIN_ROLE"),  
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(companyExists),
    body("name").notEmpty().withMessage("El nombre de la empresa es requerido"),
    body("name").isLength({ max: 50 }).withMessage("El nombre de la empresa no puede exceder los 50 caracteres"),
    body("impactLevel").notEmpty().withMessage("El nivel de impacto es requerido"),
    body("impactLevel").isIn(["Alto", "Medio", "Bajo"]).withMessage("El nivel de impacto debe ser uno de 'Alto', 'Medio' o 'Bajo'"),
    body("foundedYear").notEmpty().withMessage("El año de fundación es requerido"),
    body("foundedYear").isNumeric().withMessage("El año de fundación debe ser un número"),
    body("foundedYear").isLength({ min: 4, max: 4 }).withMessage("El año de fundación debe tener 4 dígitos"),
    body("Category").notEmpty().withMessage("La categoría es requerida"),
    body("Category").isIn(["Grande empresa", "Mediana empresa", "Pequeña empresa"]).withMessage("La categoría debe ser uno de 'Grande empresa', 'Mediana empresa' o 'Pequeña empresa'"),
    body("address").optional().isString().withMessage("La dirección debe ser una cadena de texto"),

    validarCampos,
    handleErrors
];