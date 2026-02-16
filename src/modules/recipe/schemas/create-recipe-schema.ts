import { z } from "zod";
import { MeasurementUnit } from "@/lib/enum/MeasurementUnit";

export const baseIngredientSchema = z.object({
  ingredient: z.string().min(1).max(50),
  amount: z.string().trim().min(1).max(4),
  unit: z.enum(MeasurementUnit),
});

export const baseStepSchema = z.object({
  step: z.number(),
  description: z.string().min(1),
});

export const createRecipeSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1).max(80),
  preparationTime: z.number(),
  categoryId: z.string(),

  ingredients: z.array(baseIngredientSchema).min(1, "Adicione no mínimo um ingrediente"),

  steps: z.array(baseStepSchema).min(1, "Adicione no mínimo uma etapa"),
});

export type CreateRecipeFormData = z.infer<typeof createRecipeSchema>;
