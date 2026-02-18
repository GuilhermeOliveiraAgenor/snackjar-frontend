import { z } from "zod";
import { baseRecipeSchema } from "./base-recipe-schema";

export const editRecipeSchema = baseRecipeSchema.extend({
  id: z.string(),
});

export type EditRecipeFormInput = z.input<typeof editRecipeSchema>;
export type EditRecipeFormData = z.output<typeof editRecipeSchema>;
