import { api } from "@/lib/api";

export async function deleteIngredient(id: string) {
  const result = await api(`/recipes/ingredients/${id}`, {
    method: "DELETE",
  });

  return result;
}
