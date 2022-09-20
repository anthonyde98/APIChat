const messageSchema = require("../models/message");
const messageShared = require("../sharedMethods/message");
const chatShared = require("../sharedMethods/chat");
const userShared = require("../sharedMethods/user");

const insertar = async (req, res) => {
    const mensaje = req.body;

    try{
        let error = { estado: false, mensaje: "" }

        const chatExiste = await chatShared.existeChat(mensaje.chat); 
        if(!chatExiste){
            error.estado = true;
            error.mensaje = "Este chat no existe.";
        }

        const usuarioExiste = await userShared.existeUsuario(mensaje.de);
        if(!usuarioExiste){
            error.estado = true;
            error.mensaje = "Este usuario no existe.";
        }

        const chatUsuario = await chatShared.existeUsuarioChat(mensaje.de, mensaje.chat)
        if(!chatUsuario){
            error.estado = true;
            error.mensaje = "Este usuario no pertenece a ese chat.";
        }

        if(error.estado){
            return res.status(400).json({ mensaje: error.mensaje })
        }
        
        const message = messageSchema(mensaje);

        const response = await message.save();

        return res.status(201).json(response);
    }
    catch(error){
        console.log(error)
        return res.status(400).json(error);
    }
}

const buscar = async (req, res) => {

    try{
        const chats = await messageSchema.find();
        
        return res.status(200).json(chats);
    }
    catch(error){
        return res.status(500).json(error);
    }
}

const buscarPorId = async (req, res) => {
    const { id } = req.params;

    try{
        const chat = await messageSchema.findById(id);

        if(chat){
            return res.status(200).json(chat);
        }
            
        return res.status(404).json();
    }
    catch(error){
        return res.status(500).json(error);
    }
}

const editar = async (req, res) => {
    const { id } = req.params;
    const mensaje = req.body;

    try{
        
        const message = await messageShared.existeMensaje(id);
        if(!message){
            return res.status(404).json();
        }

        const response = await messageSchema.updateOne({ _id: id }, { $set: mensaje });

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
        const message = await messageShared.existeMensaje(id);
        if(!message){
            return res.status(404).json();
        }

        await messageSchema.deleteOne({ _id: id });

        return res.status(200).json();
    }
    catch(error){
        return res.status(500).json(error);
    }
}

const buscarPorUsuario = async (req, res) => {
    const { id } = req.params;

    try{
        const messages = await messageSchema.find({ de: id });
        
        return res.status(200).json(messages);
    }
    catch(error){
        return res.status(500).json(error);
    }
}

const buscarPorChat = async (req, res) => {
    const { id } = req.params;

    try{
        const messages = await messageSchema.find({ chat: id });
        
        return res.status(200).json(messages);
    }
    catch(error){
        return res.status(500).json(error);
    }
}

module.exports = {
    insertar: insertar,
    buscar: buscar,
    buscarPorId: buscarPorId,
    editar: editar,
    eliminar: eliminar,
    buscarPorUsuario: buscarPorUsuario,
    buscarPorChat: buscarPorChat
}