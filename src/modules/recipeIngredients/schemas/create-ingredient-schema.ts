import { z } from "zod";
import { baseIngredientSchema } from "./base-ingredient-schema";

export const createIngredientSchema = baseIngredientSchema;

export type CreateIngredientFormInput = z.input<typeof createIngredientSchema>;
export type CreateIngredientFormData = z.output<typeof createIngredientSchema>;
