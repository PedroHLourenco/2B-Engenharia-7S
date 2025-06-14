const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Rota para registro de usuário comum
router.post("/register", authController.register);

// Rota para registro de administrador
router.post("/register/admin", authController.register);

// Rota para login
router.post("/login", authController.login);

module.exports = router;
