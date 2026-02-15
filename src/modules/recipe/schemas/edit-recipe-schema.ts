import z from "zod";
import { baseIngredientSchema } from "./base-recipe-schema";

export const editRecipeSchema = baseIngredientSchema.extend({
  id: z.string(),
});

export type EditRecipeFormData = z.infer<typeof editRecipeSchema>;
