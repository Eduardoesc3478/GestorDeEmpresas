import User from "../admin/admin.model.js"
import Company from "../company/company.model.js"


export const emailExists = async (email = "") => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`The username ${username} is already registered`)
    }
}

export const userExists = async (uid = " ") => {
    const existe = await User.findById(uid)
    console.log(existe)
    if(!existe){
        throw new Error("No existe el usuario con el ID proporcionado")
    }
}

export const companyExists = async (id = " ") => {
    const existe = await Company.findById(id)
    console.log(existe)
    if(!existe){
        throw new Error("No existe el empresa con el ID proporcionado")
    }
}
