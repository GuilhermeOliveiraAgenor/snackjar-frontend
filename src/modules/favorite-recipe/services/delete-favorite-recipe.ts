import { api } from "@/lib/api";

export async function deleteFavoriteRecipe(id: string) {
  await api("/favorites", {
    method: "DELETE",
    data: { id },
  });
}
