import { baseIngredientSchema } from "@/modules/recipeIngredients/schemas/base-ingredient-schema";
import z from "zod";

export const editStepSchema = baseIngredientSchema.extend({
  id: z.string(),
});

export type EditStepSchema = z.infer<typeof editStepSchema>;
