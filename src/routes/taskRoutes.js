const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// Rota para criar uma nova tarefa
router.post("/tasks", taskController.create);

// Rota para listar todas as tarefas
router.get("/tasks", taskController.list);

// Rota para atualizar uma tarefa
router.put("/tasks/:id", taskController.update);

// Rota para excluir uma tarefa
router.delete("/tasks/:id", taskController.delete);

module.exports = router;
