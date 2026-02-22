import { api } from "@/lib/api";

export async function deleteRecipe(id: string) {
  const result = await api(`/recipes/${id}`, {
    method: "DELETE",
  });

  return result;
}
