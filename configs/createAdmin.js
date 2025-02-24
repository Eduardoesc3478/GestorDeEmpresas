import Admin from "../src/admin/admin.model.js";
import { hash } from "argon2"

export const addAdmin = async() =>{
    try{
        const adminExists = await Admin.findOne({ rol: "ADMIN_ROLE" });

        if (adminExists) {
            console.log("Solo puede existir un Administrador");
            return;
        }

        const data = {
            name: "Admin",
            surname: "Admin",
            username: "admin",
            email: "admin@gmail.com",
            password: "Adm1n***",
            role: "ADMIN_ROLE",
            phone:"12345678"
        };

        const encryptedPassword = await hash(data.password)
        data.password = encryptedPassword

        const newAdmin = new Admin(data);
        await newAdmin.save();

        console.log("Administrador por defecto creado exitosamente.");
    }catch(err){
        console.error("Error al crear el administrador por defecto:", err.message);
    }
}