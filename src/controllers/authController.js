const authService = require("../services/authService");

class AuthController {
  // Registrar novo usuário comum
  async register(req, res) {
    try {
      if (!req.body.name || !req.body.email || !req.body.password) {
        throw new Error("Nome, email e senha são obrigatórios");
      }

      const { user, token } = await authService.registerUser(req.body);

      res.status(201).json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Registrar novo administrador
  async registerAdmin(req, res) {
    try {
      if (!req.body.name || !req.body.email || !req.body.password) {
        throw new Error("Nome, email e senha são obrigatórios");
      }

      const { user, token } = await authService.registerAdmin(req.body);

      res.status(201).json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Login de usuário
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { user, token } = await authService.login(email, password);
      res.json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }
}

module.exports = new AuthController();
