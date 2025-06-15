const authService = require("../services/authService");

// Middleware para verificar autenticação
const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    const decoded = authService.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

// Middleware para verificar role de admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({
        message:
          "Acesso negado. Apenas administradores podem acessar este recurso.",
      });
  }
  next();
};

module.exports = {
  authenticate,
  isAdmin,
};
