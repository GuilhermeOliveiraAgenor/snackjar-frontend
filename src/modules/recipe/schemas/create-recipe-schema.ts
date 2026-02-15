import z from "zod";
import { baseIngredientSchema } from "./base-recipe-schema";

export const createRecipeSchema = baseIngredientSchema.extend({
  categoryId: z.string(),
});

export type CreateRecipeFormData = z.infer<typeof createRecipeSchema>;
