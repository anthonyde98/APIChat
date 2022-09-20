const chatSchema = require("../models/chat");
const chatShared = require("../sharedMethods/chat");
const userShared = require("../sharedMethods/user");
const message = require("./message");

const validacionUsuarios = async (error, usuarios) => {
    for(let i = 0; i < usuarios.length; i++){
        const response = await userShared.existeUsuario(usuarios[i]);
        if(!response){
            error.estado = true;
            error.mensaje =  "Uno de los usuarios no se encuentra.";

            return error;
        }
    }

    const verificarDuplicados = (index, usuario) => {
        const users = usuarios.slice(0);
        users.splice(index, 1);
        return users.includes(usuario);
    }

    for(let i = 0; i < usuarios.length; i++){
        const response = verificarDuplicados(i, usuarios[i])
        if(response){
            error.estado = true;
            error.mensaje = "Hay un usuario que esta duplicado.";

            return error;
        }
    }

    return error;
}

const insertar = async (req, res) => {
    const chatData = req.body;
    
    try{
        let error = { estado: false, mensaje: "" }
        if(chatData.usuarios.length < 2){
            error.estado = true;
            error.mensaje = "Debe de colocar por lo menos dos usuarios.";
        }

        error = await validacionUsuarios(error, chatData.usuarios);

        if(error.estado){
            return res.status(400).json({ mensaje: error.mensaje })
        }
        
        const chat = chatSchema(chatData);

        const response = await chat.save();

        return res.status(201).json(response);
    }
    catch(error){
        return res.status(500).json(error);
    }
}

const buscar = async (req, res) => {

    try{
        const chats = await chatSchema.find();
        
        return res.status(200).json(chats);
    }
    catch(error){
        return res.status(500).json(error);
    }
}

const buscarPorId = async (req, res) => {
    const { id } = req.params;

    try{
        const chat = await chatSchema.findById(id);

        if(chat){
            return res.status(200).json(chat);
        }
            
        return res.status(404).json();
    }
    catch(error){
        return res.status(500).json(error);
    }
}

const agregarUsuarios = async (req, res) => {
    const { id } = req.params;
    const chatData = req.body;

    try{
        
        const chat = await chatShared.existeChat(id);
        if(!chat){
            return res.status(404).json();
        }
        
        let error = { estado: false, mensaje: "" }

        error = await validacionUsuarios(error, chatData.usuarios);

        if(error.estado){
            return res.status(400).json({ mensaje: error.mensaje })
        }

        for(let i = 0; i < chatData.usuarios.length; i++){
            const response = await chatShared.existeUsuarioChat(chatData.usuarios[i], id);

            if(response){
                return res.status(400).json({ mensaje: "Uno de los usuarios ya esta en el chat." })
            }
        }

        let cantidad = {
            ingresados: [],
            noIngresados: []
        };

        for(let i = 0; i < chatData.usuarios.length; i++){
            const response = await chatSchema.updateOne({ _id: id }, { $push: { usuarios: chatData.usuarios[i] }});
            if(response.modifiedCount === 1){
                cantidad.ingresados.push(chatData.usuarios[i])
            }
            else{
                cantidad.noIngresados.push(chatData.usuarios[i])
            }
        }

        return res.status(200).json({ data: cantidad });
    }
    catch(error){
        return res.status(500).json(error);
    }
}

const eliminarUsuarios = async (req, res) => {
    const { id } = req.params;
    const chatData = req.body;

    try{
        
        const chat = await chatShared.existeChat(id);
        if(!chat){
            return res.status(404).json();
        }
        
        let error = { estado: false, mensaje: "" }

        error = await validacionUsuarios(error, chatData.usuarios);

        if(error.estado){
            return res.status(400).json({ mensaje: error.mensaje })
        }

        for(let i = 0; i < chatData.usuarios.length; i++){
            const response = await chatShared.existeUsuarioChat(chatData.usuarios[i], id);

            if(!response){
                return res.status(400).json({ mensaje: "Uno de los usuarios no esta en el chat." })
            }
        }

        let cantidad = {
            eliminados: [],
            noEliminados: []
        };

        for(let i = 0; i < chatData.usuarios.length; i++){
            const response = await chatSchema.updateOne({ _id: id }, { $pull: { usuarios: chatData.usuarios[i] }});
            if(response.modifiedCount === 1){
                cantidad.eliminados.push(chatData.usuarios[i])
            }
            else{
                cantidad.noEliminados.push(chatData.usuarios[i])
            }
        }

        return res.status(200).json({ data: cantidad });
    }
    catch(error){
        return res.status(500).json(error);
    }
}

const eliminar = async (req, res) => {
    const { id } = req.params;

    try{
        const chat = await chatShared.existeChat(id);
        if(!chat){
            return res.status(404).json();
        }

        await chatSchema.deleteOne({ _id: id });

        return res.status(200).json();
    }
    catch(error){
        return res.status(500).json(error);
    }
}

const buscarPorUsuario = async (req, res) => {
    const { id } = req.params;

    try{
        const chats = await chatSchema.find({ usuarios: id });
        
        return res.status(200).json(chats);
    }
    catch(error){
        return res.status(500).json(error);
    }
}

const buscarMensajes = async (req, res) => {
    const { id } = req.params;
    
    try {
        const chat = await chatShared.existeChat(id);
        if(!chat){
            return res.status(404).json();
        }
    } 
    catch(error){
        return res.status(500).json(error);
    }

    return await message.buscarPorChat(req, res);
} 

const buscarChatsPorUsuario = async (req, res) => {
    const { id } = req.params;

    
    try{
        const chats = await chatSchema.find({ usuarios: id });
        let chatsInfo = [];
        for(let i = 0; i < chats.length; i++){
            let chat = {
                id: "",
                nombres: []
            };
            chat.id = chats[i].id;
            for(let j = 0; j < chats[i].usuarios.length; j++){
                if(chats[i].usuarios[j] !== id){
                    const data = await userShared.buscarUsuario(chats[i].usuarios[j]);
                    chat.nombres.push(data.nombre + " " + data.apellido);
                }
            }
            
            chatsInfo.push(chat);
        }

        return res.status(200).json(chatsInfo);
    }
    catch(error){
        console.log(error)
        return res.status(500).json(error);
    }
}

module.exports = {
    insertar: insertar,
    buscar: buscar,
    buscarPorId: buscarPorId,
    agregarUsuarios: agregarUsuarios,
    eliminarUsuarios: eliminarUsuarios,
    eliminar: eliminar,
    buscarPorUsuario: buscarPorUsuario,
    buscarMensajes: buscarMensajes,
    buscarChatsPorUsuario: buscarChatsPorUsuario
}