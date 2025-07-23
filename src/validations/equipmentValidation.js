import { z } from "zod";

export const equipmentSchema = z.object({
  nome: z.string().min(1),
  marca: z.string().min(1),
  modelo: z.string().min(1),
  categoria: z.string().min(1),
});
