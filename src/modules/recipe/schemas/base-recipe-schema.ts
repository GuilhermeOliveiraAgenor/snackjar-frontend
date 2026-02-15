import z from "zod";

export const baseIngredientSchema = z.object({
  title: z.string().min(1, "Digite no mínimo 1 caractere").max(50, "Limite de 50 caracteres"),
  description: z.string().min(1, "Digite no mínimo 1 caractere").max(80, "Limite de 80 caracteres"),
  preparationTime: z.number("Digite caracteres numéricos").max(4, "Limite de 4 caracteres"),
});
