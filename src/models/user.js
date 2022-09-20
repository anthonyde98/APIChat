const mongoose = require("mongoose");

const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  };

const userSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    apellido: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    correo: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Por favor colocar un correo valido.'],
    },
    contrasena: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        select: false
    }
}, { timestamps: true});

module.exports = mongoose.model('User', userSchema);