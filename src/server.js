const express = require("express");
const cors = require("cors");
const config = require("./config/config");
const connectDB = require("./config/database");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Rotas de autenticação
app.use("/api/auth", authRoutes);

// Rotas de tarefas
app.use("/api", taskRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Bem-vindo à API de Gerenciamento de Tarefas!" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Erro interno do servidor",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

app.listen(config.port, () => {
  console.log(`Servidor rodando na porta ${config.port}`);
});
