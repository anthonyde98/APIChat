const userSchema = require("../models/user");
const userShared = require("../sharedMethods/user")
const chat = require("./chat");
const message = require("./message");

const insertar = async (req, res) => {
    const usuario = req.body;
    const user = userSchema(usuario);

    try{
        const usuario = await user.save();

        return res.status(201).json(usuario);
    }
    catch(error){
        return res.status(400).json(error);
    }
}

const buscar = async (req, res) => {

    try{
        const usuarios = await userSchema.find();

        return res.status(200).json(usuarios);
    }
    catch(error){
        return res.status(500).json(error);
    }
}

const buscarPorId = async (req, res) => {
    const { id } = req.params;

    try{
        const usuario = await userSchema.findById(id);

        if(usuario){
            return res.status(200).json(usuario);
        }
        
        return res.status(404).json();
    }
    catch(error){
        return res.status(500).json(error);
    }
}

const editar = async (req, res) => {
    const { id } = req.params;
    const usuario = req.body;

    try{
        
        const user = await userShared.existeUsuario(id);
        if(!user){
            return res.status(404).json();
        }

        const response = await userSchema.updateOne({ _id: id }, { $set: usuario });

        if(response.modifiedCount === 1){
            return res.status(200).json();
        }

        return res.status(500).json();
    }
    catch(error){
        return res.status(400).json(error);
    }
}

const eliminar = async (req, res) => {
    const { id } = req.params;

    try{
        const usuario = await userShared.existeUsuario(id);
        if(!usuario){
            return res.status(404).json();
        }
    
        await userSchema.deleteOne({ _id: id });

        return res.status(200).json();
    }
    catch(error){
        return res.status(500).json(error);
    }
}

const buscarChats = async (req, res) => {
    const { id } = req.params;
    
    try {
        const usuario = await userShared.existeUsuario(id);
        if(!usuario){
            return res.status(404).json();
        }
    } 
    catch(error){
        return res.status(500).json(error);
    }

    return await chat.buscarPorUsuario(req, res);
}

const buscarMensajes = async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await userShared.existeUsuario(id);
        if(!usuario){
            return res.status(404).json();
        }
    } 
    catch(error){
        return res.status(500).json(error);
    }
    
    return await message.buscarPorUsuario(req, res);
}

const verificarCredenciales = async (req, res) => {
    const credenciales = req.body;

    if(!credenciales.correo || !credenciales.contrasena || credenciales.contrasena.length < 5){
        return res.status(400).json();
    }

    try {
        const isThere = await userSchema.find({ correo: credenciales.correo, contrasena: credenciales.contrasena });

        if(isThere.length > 0){
            return res.status(200).json({ response: isThere[0]._id });
        }
        else{
            return res.status(404).json();
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {
    insertar: insertar,
    buscar: buscar,
    buscarPorId: buscarPorId,
    editar: editar,
    eliminar: eliminar,
    buscarChats: buscarChats,
    buscarMensajes: buscarMensajes,
    verificarCredenciales: verificarCredenciales
}