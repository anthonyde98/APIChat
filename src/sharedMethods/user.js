const userSchema = require("../models/user");

const existeUsuario = async (id) => {
    const usuario = await userSchema.findById(id);

    if(usuario){
        return true;
    }

    return false;
}

const buscarUsuario = async (id) => {
    const usuario = await userSchema.findById(id);

    return usuario;
}

module.exports = {
    existeUsuario: existeUsuario,
    buscarUsuario: buscarUsuario
}