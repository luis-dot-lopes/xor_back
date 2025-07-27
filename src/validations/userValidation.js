import { z } from "zod";

export const userSchema = z.object({
  nome: z
    .string()
    .min(1, { message: "O nome é obrigatório." })
    .max(100, { message: "O nome deve ter no máximo 100 caracteres." }),
  email: z.email({ message: "Digite um e-mail válido." }),
  telefone: z.string().min(1, { message: "O telefone é obrigatório." }),
  endereco: z.string().min(1, { message: "O endereço é obrigatório." }),
  cpf: z
    .string()
    .min(11, { message: "O CPF deve conter no mínimo 11 caracteres." })
    .max(14, { message: "O CPF deve conter no máximo 14 caracteres." })
    .refine((cpf) => /^\d{11}$|^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf), {
      message:
        "CPF inválido. Deve conter apenas números ou estar no formato 000.000.000-00.",
    }),
  logradouro: z.string().min(1, { message: "O logradouro é obrigatório." }),
  cidade: z.string().min(1, { message: "A cidade é obrigatório." }),
  estado: z.string().min(1, { message: "O estado é obrigatório." }),
  cep: z
    .string()
    .refine((cep) => cep === undefined || /^[0-9]{5}-?[0-9]{3}$/.test(cep), {
      message: "CEP inválido. Use o formato 00000-000.",
    }),
  numero: z.string().min(1, { message: "O número é obrigatório" }),
});
