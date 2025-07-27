import { z } from "zod";

export const registerSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  cpf: z.string().min(11).max(14),
  telefone: z.string().min(1, { message: "O telefone é obrigatório." }),
});
