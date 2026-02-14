import z from "zod";
import { baseIngredientSchema } from "./base-ingredient-schema";

export const editIngredientSchema = baseIngredientSchema.extend({
  id: z.string(),
});

export type EditIngredientFormData = z.infer<typeof editIngredientSchema>;
