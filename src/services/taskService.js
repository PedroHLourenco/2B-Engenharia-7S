const Task = require("../models/Task");

class TaskService {
  // Criar uma nova tarefa
  async createTask(taskData) {
    try {
      const task = new Task(taskData);
      return await task.save();
    } catch (error) {
      throw new Error(`Erro ao criar tarefa: ${error.message}`);
    }
  }

  // Buscar todas as tarefas
  async getAllTasks() {
    try {
      return await Task.find().sort({ createdAt: -1 });
    } catch (error) {
      throw new Error(`Erro ao buscar tarefas: ${error.message}`);
    }
  }

  // Buscar uma tarefa por Id
  async getTaskById(id) {
    try {
      const task = await Task.findById(id);
      if (!task) {
        throw new Error("Tarefa não encontrada");
      }
      return task;
    } catch (error) {
      throw new Error(`Erro ao buscar tarefa: ${error.message}`);
    }
  }
}

module.exports = new TaskService();
