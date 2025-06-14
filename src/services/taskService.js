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

  // Atualizar uma tarefa
  async updateTask(id, taskData) {
    try {
      const task = await Task.findByIdAndUpdate(
        id,
        { ...taskData, updatedAt: Date.now() },
        { new: true, runValidators: true }
      );
      if (!task) {
        throw new Error("Tarefa não encontrada");
      }
      return task;
    } catch (error) {
      throw new Error(`Erro ao atualizar tarefa: ${error.message}`);
    }
  }

  // Excluir uma tarefa
  async deleteTask(id) {
    try {
      const task = await Task.findByIdAndDelete(id);
      if (!task) {
        throw new Error("Tarefa não encontrada");
      }
      return { message: "Tarefa excluída com sucesso" };
    } catch (error) {
      throw new Error(`Erro ao excluir tarefa: ${error.message}`);
    }
  }
}

module.exports = new TaskService();
