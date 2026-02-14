import z from "zod";
import { baseIngredientSchema } from "./base-ingredient-schema";

export const createIngredientSchema = baseIngredientSchema;

export type CreateIngredientFormData = z.infer<typeof createIngredientSchema>;
