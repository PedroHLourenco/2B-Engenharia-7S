const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const { authenticate, isAdmin } = require("../middlewares/auth");

// Rotas protegidas que requerem autenticação
router.use(authenticate);

// Rotas que podem ser acessadas por qualquer usuário autenticado
router.get("/tasks", taskController.list);
router.put("/tasks/:id", taskController.update);

// Rotas que só podem ser acessadas por administradores
router.post("/tasks", isAdmin, taskController.create);
router.delete("/tasks/:id", isAdmin, taskController.delete);

module.exports = router;
