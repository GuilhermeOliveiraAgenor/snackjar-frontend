import z from "zod";
import { baseRecipeSchema } from "./base-recipe-schema";

export const editRecipeSchema = baseRecipeSchema.extend({
  id: z.string(),
});

export type EditRecipeFormData = z.infer<typeof editRecipeSchema>;
