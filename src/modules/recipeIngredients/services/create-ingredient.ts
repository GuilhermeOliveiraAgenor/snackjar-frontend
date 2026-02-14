import { api } from "@/lib/api";

interface CreateIngredientRequest {
  recipeId: string;
  ingredient: string;
  amount: string;
  unit: string;
}

export async function createIngredient(data: CreateIngredientRequest) {
  const result = await api(`/recipes/ingredients/${data.recipeId}`, {
    method: "POST",
    data,
  });

  return result.data;
}
