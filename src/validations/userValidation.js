import { z } from "zod";

export const userSchema = z.object({
  nome: z.string().min(1),
  email: z.email(),
  telefone: z.string().optional(),
  endereco: z.string().optional(),
  cpf: z.string().min(11).max(14),
  logradouro: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  cep: z.string().optional(),
  numero: z.string().optional(),
});
