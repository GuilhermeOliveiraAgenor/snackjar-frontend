import z from "zod";

export const IngredientSchema = z.object({
  id: z.string(),
  ingredient: z.string().min(1, "Digite no mínimo 1 caractere"),
  amount: z.string().trim().min(1, "Digite no mínimo 1 caractere"),
  unit: z.string().transform((val) => val.toLocaleUpperCase()),
});

export type IngredientFormData = z.infer<typeof IngredientSchema>;
