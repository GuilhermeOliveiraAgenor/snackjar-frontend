import { MeasurementUnit } from "@/lib/enum/MeasurementUnit";

export interface RecipeIngredient {
  id: string;
  ingredient: string;
  amount: string;
  unit: MeasurementUnit;
  recipeId: string;
}
