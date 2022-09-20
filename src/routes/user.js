const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");


router.get("/user", async (req, res) => {

    return await userController.buscar(req, res);
})

router.get("/user/:id", async (req, res) => {

    return await userController.buscarPorId(req, res); 
})

router.post("/user", async (req, res) => {

    return await userController.insertar(req, res);
})

router.put("/user/:id", async (req, res) => {

    return await userController.editar(req, res);
})

router.delete("/user/:id", async (req, res) => {

    return await userController.eliminar(req, res)
})

router.post("/user/log", async (req, res) => {

    return await userController.verificarCredenciales(req, res);         
})

// ------------------Dependientes de otros controladores------------------------

router.get("/user/:id/message", async (req, res) => {

    return await userController.buscarMensajes(req, res);
})

router.get("/user/:id/chat", async (req, res) => {

    return await userController.buscarChats(req, res);        
})

module.exports = router;