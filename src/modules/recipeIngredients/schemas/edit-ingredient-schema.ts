import z from "zod";
import { baseIngredientSchema } from "./base-ingredient-schema";

export const editIngredientSchema = baseIngredientSchema.extend({
  id: z.string(),
});

export type EditIngredientFormInput = z.input<typeof editIngredientSchema>;
export type EditIngredientFormData = z.output<typeof editIngredientSchema>;
