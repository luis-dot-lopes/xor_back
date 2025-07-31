// src/server.js
import 'dotenv/config';
import express from 'express';
import alunoRoutes from './routes/aluno.routes.js';
import userRoutes from './routes/user.routes.js';
import cursoRoutes from './routes/curso.routes.js'; // Importe as novas rotas
import gradeRoutes from './routes/grade.routes.js';
import disciplinaRoutes from './routes/disciplina.routes.js';

// Este trecho de código resolve o erro de serialização do BigInt
BigInt.prototype.toJSON = function () {
    return this.toString();
};

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Rotas
app.use('/alunos', alunoRoutes);
app.use('/users', userRoutes);
app.use('/cursos', cursoRoutes); // Use as novas rotas
app.use('/grades', gradeRoutes);
app.use('/disciplinas', disciplinaRoutes);

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});