const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat")

router.get("/chat", async (req, res) => {
    return await chatController.buscar(req, res);
})

router.get("/chat/:id", async (req, res) => {
    return await chatController.buscarPorId(req, res);
})

router.post("/chat", async (req, res) => {
    return await chatController.insertar(req, res);
})

router.put("/chat/:id/addUsers", async (req, res) => {

    return await chatController.agregarUsuarios(req, res);
})

router.put("/chat/:id/deleteUsers", async (req, res) => {

    return await chatController.eliminarUsuarios(req, res);
})

router.delete("/chat/:id", async (req, res) => {
    return await chatController.eliminar(req, res);
})

// ------------------Dependientes de otros controladores------------------------

router.get("/chat/:id/message", async (req, res) => {

    return await chatController.buscarMensajes(req, res);
})

router.get("/chat/info/:id", async (req, res) => {
    return await chatController.buscarChatsPorUsuario(req, res);
})

module.exports = router;