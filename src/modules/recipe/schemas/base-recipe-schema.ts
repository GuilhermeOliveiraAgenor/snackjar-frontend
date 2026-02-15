import z from "zod";

export const baseIngredientSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  preparationTime: z.number("Digite caracteres numéricos"),
});
