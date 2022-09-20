const chatSchema = require("../models/chat");

const existeChat = async (id) => {
    const chat = await chatSchema.findById(id);

    if(chat){
        return true;
    }

    return false;
}

const existeUsuarioChat = async (usuarioId, chatId) => {

    const chat = await chatSchema.find({
        "_id": chatId,
        "usuarios": usuarioId
    })

    if(chat.length > 0){
        return true;
    }

    return false;

}

module.exports = {
    existeChat: existeChat,
    existeUsuarioChat: existeUsuarioChat
}