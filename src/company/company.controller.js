import Company from '../company/company.model.js';
import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const addCompany = async (req, res) => {
    try {
        const data = req.body;

       
        const company = new Company(data);

        
        await company.save();

        
        res.status(200).json({
            success: true,
            company
        });
    } catch (error) {
        
        res.status(500).json({
            success: false,
            message: 'Error al guardar la empresa',
            error: error.message 
        });
    }
};


export const updateCompany = async (req, res) =>{
    try {
        const { id } = req.params;  
        const data = req.body;      

        
        const updatedCompany = await Company.findByIdAndUpdate(id, data, { new: true });

       
        if (!updatedCompany) {
            return res.status(404).json({
                success: false,
                msg: "Empresa no encontrada",
            });
        }

        res.status(200).json({
            success: true,
            msg: "Empresa actualizada correctamente",
            
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error al actualizar la empresa",
            error: err.message,
        });
    }
};


export const filterCompanies = async (req, res) => {
    try {
        const { minYears, maxYears, category, ordenAscendente, ordenDescendente } = req.body;
        let filtro = {};

        // Validar y construir el filtro
        if (category !== undefined) {
            filtro.Category = category;
        }

        if (minYears !== undefined) {
            filtro.foundedYear = { $lte: new Date().getFullYear() - parseInt(minYears) };
        }
        if (maxYears !== undefined) {
            filtro.foundedYear = { ...filtro.foundedYear, $gte: new Date().getFullYear() - parseInt(maxYears) };
        }

        // Construir el orden
        let orden = {};
        if (ordenAscendente) {
            orden.name = 1;
        } else if (ordenDescendente) {
            orden.name = -1;
        } else {
            orden.name = 1;
        }
        orden.foundedYear = 1;

        
        const companies = await Company.find(filtro).sort(orden);

        
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Empresas');

        
        worksheet.columns = [
            { header: 'Nombre de Empresa', key: 'name', width: 30 },
            { header: 'Nivel de Impacto', key: 'impactLevel', width: 20 },
            { header: 'Año Fundación', key: 'foundedYear', width: 15 },
            { header: 'Categoría', key: 'Category', width: 25 },
            { header: 'Dirección', key: 'address', width: 30 },
            { header: 'Años en el Negocio', key: 'yearsInBusiness', width: 20 }
        ];

       
        companies.forEach((company) => {
            worksheet.addRow({
                name: company.name,
                impactLevel: company.impactLevel,
                foundedYear: company.foundedYear,
                Category: company.Category,
                address: company.address || 'N/A', 
                yearsInBusiness: new Date().getFullYear() - company.foundedYear 
            });
        });

        const buffer = await workbook.xlsx.writeBuffer();

        
        const reportPath = path.join(__dirname, '../../public/reportsExcel');
        if (!fs.existsSync(reportPath)) {
            fs.mkdirSync(reportPath, { recursive: true });
        }

        
        const now = new Date();
        const timestamp = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;
        const filePath = path.join(reportPath, `reporteEmpresas_${timestamp}.xlsx`);

        
        fs.writeFileSync(filePath, buffer);
        console.log(`Se guardó el archivo ${filePath} en la carpeta reportesExcel.`);

        
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=reporteEmpresas_${timestamp}.xlsx`);
        res.send(buffer);

        res.status(200).json({
            success: true,
            message: "Empresas filtradas con éxito",
            data: companies,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Error general',
            error: error.message
        });
    }
};



        
       

  
