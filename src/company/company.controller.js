import Company from '../company/company.model.js';

export const addCompany = async (req, res) => {
    try {
        const data = req.body;

       
        const company = new Company(data);

        
        await company.save();

        
        res.status(200).json({
            success: true,
            
        });
    } catch (error) {
        
        res.status(500).json({
            success: false,
            message: 'Error al guardar la empresa',
            error: error.message // Muestra un mensaje de error más claro
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
                msg: "Publicación no encontrada",
            });
        }

        res.status(200).json({
            success: true,
            msg: "Publicación actualizada correctamente",
            
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error al actualizar la publicación",
            error: err.message,
        });
    }
};