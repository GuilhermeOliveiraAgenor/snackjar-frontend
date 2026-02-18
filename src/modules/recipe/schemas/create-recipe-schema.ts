import { MeasurementUnit } from "@/lib/enum/MeasurementUnit";
import { baseIngredientSchema } from "@/modules/recipeIngredients/schemas/base-ingredient-schema";
import { baseStepSchema } from "@/modules/recipeStep/schemas/base-step-schema";
import { z } from "zod";

export const createRecipeSchema = z.object({
  title: z.string().min(1, "Digite no mínimo 1 caractere").max(50, "Limite de 50 caracteres"),
  description: z.string().min(1, "Digite no mínimo 1 caractere").max(80, "Limite de 80 caracteres"),

  preparationTime: z.number("Digite um número"),

  categoryId: z.string().min(1, "Selecione uma categoria"),

  recipeIngredient: z.array(baseIngredientSchema),

  recipeStep: z.array(baseStepSchema),
});

export type CreateRecipeFormInput = z.input<typeof createRecipeSchema>;

export type CreateRecipeFormData = z.output<typeof createRecipeSchema>;
