import { api } from "@/lib/api";

export async function deleteRecipe(id: string) {
  await api(`/recipes/${id}`, {
    method: "DELETE",
  });
}
