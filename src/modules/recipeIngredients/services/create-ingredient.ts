import { api } from "@/lib/api";
import { MeasurementUnit } from "@/lib/enum/MeasurementUnit";

interface CreateIngredientRequest {
  recipeId: string;
  ingredient: string;
  amount: string;
  unit: MeasurementUnit;
}

export async function createIngredient(data: CreateIngredientRequest) {
  const result = await api(`/recipes/ingredients/${data.recipeId}`, {
    method: "POST",
    data,
  });

  return result.data;
}
