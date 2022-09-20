const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message");

router.get("/message", async (req, res) => {
    return await messageController.buscar(req, res);
})

router.get("/message/:id", async (req, res) => {
    return await messageController.buscarPorId(req, res);
})

router.post("/message", async (req, res) => {
    return await messageController.insertar(req, res);
})

router.put("/message/:id", async (req, res) => {
    return await messageController.editar(req, res);
})

router.delete("/message/:id", async (req, res) => {
    return await messageController.eliminar(req, res);
})

module.exports = router;