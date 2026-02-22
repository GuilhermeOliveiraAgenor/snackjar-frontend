import { api } from "@/lib/api";

interface EditRecipeRequest {
  id: string;
  title: string;
  description: string;
  preparationTime: number;
}

export async function editRecipe(data: EditRecipeRequest) {
  const result = await api(`/recipes/${data.id}`, {
    method: "PUT",
    data,
  });

  return result.data;
}
