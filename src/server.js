import express from "express";
import models from "./models/index.js";
import routes from "./routes/index.js";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import swagger from "./config/swagger.js";

dotenv.config();

const app = express();

// Middlewares e rotas
app.use(express.json());
app.use(cors());

app.use("/api", routes);
app.use("/imagens", express.static(path.resolve("src/resources/imagens")));

app.use("/api-docs", swagger.serve, swagger.setup);

const PORT = process.env.PORT || 3000;

models.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Banco sincronizado com sucesso");
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error("Erro ao sincronizar o banco:", err);
  });
