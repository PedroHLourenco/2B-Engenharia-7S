const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config/config");

class AuthService {
  // Gerar token JWT
  generateToken(user) {
    return jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      config.jwtSecret,
      { expiresIn: "24h" }
    );
  }

  // Registrar novo usuário
  async register(userData) {
    try {
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        throw new Error("Email já cadastrado");
      }

      const user = new User(userData);
      await user.save();

      const token = this.generateToken(user);
      return { user, token };
    } catch (error) {
      throw new Error(`Erro ao registrar usuário: ${error.message}`);
    }
  }

  // Login de usuário
  async login(email, password) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        throw new Error("Senha inválida");
      }

      const token = this.generateToken(user);
      return { user, token };
    } catch (error) {
      throw new Error(`Erro ao fazer login: ${error.message}`);
    }
  }

  // Verificar token
  verifyToken(token) {
    try {
      return jwt.verify(token, config.jwtSecret);
    } catch (error) {
      throw new Error("Token inválido");
    }
  }
}

module.exports = new AuthService();
