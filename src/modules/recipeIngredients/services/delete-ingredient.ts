import { api } from "@/lib/api";

export async function deleteIngredient(id: string) {
  await api(`/recipes/ingredients/${id}`, {
    method: "DELETE",
  });
}
