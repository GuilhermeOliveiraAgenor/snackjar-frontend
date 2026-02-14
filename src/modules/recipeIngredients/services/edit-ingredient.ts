import { api } from "@/lib/api";

interface EditIngredientRequest {
  id: string;
  ingredient: string;
  amount: string;
  unit: string;
  recipeId: string;
}

export async function editIngredient(data: EditIngredientRequest) {
  const result = await api("/recipes/:id", {
    method: "PUT",
    data,
  });

  return result.data;
}
