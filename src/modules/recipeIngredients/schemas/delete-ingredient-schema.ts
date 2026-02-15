import z from "zod";
import { baseIngredientSchema } from "./base-ingredient-schema";

export const deleteIngredientSchema = baseIngredientSchema.extend({
  id: z.string(),
});

export type DeleteIngredientFormData = z.infer<typeof deleteIngredientSchema>;
