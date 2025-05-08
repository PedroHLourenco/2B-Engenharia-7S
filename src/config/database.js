const mongoose = require("mongoose");
const config = require("./config");

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB conectado com sucesso");
  } catch (error) {
    console.error("Erro ao conectar com MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
