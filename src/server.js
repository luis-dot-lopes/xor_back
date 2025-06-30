import express from 'express';
import models from './models/index.js';
import routes from './routes/index.js'; 
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());


app.use('/api', routes); 

const PORT = process.env.PORT || 3000;

models.sequelize.sync({ alter: true }).then(() => {
  console.log('Banco sincronizado com sucesso');
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch(err => {
  console.error('Erro ao sincronizar o banco:', err);
});
