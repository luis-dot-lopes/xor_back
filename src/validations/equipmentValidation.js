import { z } from "zod";

export const equipmentSchema = z.object({
  nome: z
    .string()
    .min(1, { message: "O nome do equipamento é obrigatório." })
    .max(100, { message: "O nome deve ter no máximo 100 caracteres." }),
  marca: z
    .string()
    .min(1, { message: "A marca do equipamento é obrigatória." })
    .max(100, { message: "A marca deve ter no máximo 100 caracteres." }),
  modelo: z
    .string()
    .min(1, { message: "O modelo do equipamento é obrigatório." })
    .max(100, { message: "O modelo deve ter no máximo 100 caracteres." }),
  categoria: z
    .string()
    .min(1, { message: "A categoria do equipamento é obrigatória." })
    .max(100, { message: "A categoria deve ter no máximo 100 caracteres." }),
});
