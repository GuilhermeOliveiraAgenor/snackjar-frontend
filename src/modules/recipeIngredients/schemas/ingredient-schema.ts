import z from "zod";

export const editIngredientSchema = z.object({
  ingredient: z.string().min(1, "Digite no mínimo 1 caractere"),
  amount: z.string().trim().min(1, "Digite no mínimo 1 caractere"),
  unit: z.string().transform((val) => val.toLocaleUpperCase()),
});

export type EditIngredientFormData = z.infer<typeof editIngredientSchema>;
