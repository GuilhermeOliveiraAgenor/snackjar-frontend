import { z } from "zod";

export const baseRecipeSchema = z.object({
  title: z.string().min(1, "Digite no mínimo um caractere").max(50, "Limite de 50 caracteres"),
  description: z
    .string()
    .min(1, "Digite no mínimo um caractere")
    .max(80, "Limite de 80 caracteres"),
  preparationTime: z.coerce.number("Digite um número"),
});
