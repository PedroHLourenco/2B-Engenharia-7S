const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const { authenticate, isAdmin } = require("../middlewares/auth");

// Rotas que podem ser acessadas por qualquer usuário autenticado
router.get("/tasks", authenticate, taskController.list);
router.put("/tasks/:id", authenticate, taskController.update);

// Rotas que só podem ser acessadas por administradores
router.post("/tasks", authenticate, isAdmin, taskController.create);
router.delete("/tasks/:id", authenticate, isAdmin, taskController.delete);

module.exports = router;
