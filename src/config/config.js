require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/todo-list",
  jwtSecret: process.env.JWT_SECRET || "eliel_mestre_do_java",
};
