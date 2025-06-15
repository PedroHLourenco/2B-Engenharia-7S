const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Definir o schema do usuário
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nome é obrigatório"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email é obrigatório"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Senha é obrigatória"],
      minlength: [6, "A senha deve ter no mínimo 6 caracteres"],
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "Role deve ser 'user' ou 'admin'",
      },
      required: [true, "Role é obrigatório"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Middleware para hash da senha
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar senhas
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Método para criar usuário
userSchema.statics.createUser = async function (userData) {
  try {
    const user = new this(userData);
    await user.save();
    return user;
  } catch (error) {
    throw new Error(`Erro ao criar usuário: ${error.message}`);
  }
};

// Criar e exportar o modelo
const User = mongoose.model("User", userSchema);

module.exports = User;
