const taskService = require("../services/taskService");

class TaskController {
  // Criar uma nova tarefa
  async create(req, res) {
    try {
      const task = await taskService.createTask(req.body);
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Listar todas as tarefas
  async list(req, res) {
    try {
      const tasks = await taskService.getAllTasks();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new TaskController();
