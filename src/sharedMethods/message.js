const messageSchema = require("../models/message");

const existeMensaje = async (id) => {
    const message = await messageSchema.findById(id);

    if(message){
        return true;
    }

    return false;
}

module.exports = {
    existeMensaje: existeMensaje
}