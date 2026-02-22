import { api } from "@/lib/api";

interface EditIngredientRequest {
  id: string;
  ingredient: string;
  amount: string;
  unit: string;
}

export async function editIngredient(data: EditIngredientRequest) {
  const result = await api(`/recipes/ingredients/${data.id}`, {
    method: "PUT",
    data,
  });

  return result.data;
}
