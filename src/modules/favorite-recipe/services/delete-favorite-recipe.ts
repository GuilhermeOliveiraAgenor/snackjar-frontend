import { api } from "@/lib/api";

export async function deleteFavoriteRecipe(id: string) {
  const result = await api("/favorites", {
    method: "DELETE",
    data: { id },
  });

  return result;
}
