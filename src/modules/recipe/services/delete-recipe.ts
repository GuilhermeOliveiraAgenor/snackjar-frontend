import { api } from "@/lib/api";

export async function deleteRecipe(id: string) {
  const result = await api(`/recipes/${id}`, {
    method: "DELETE",
  });
  console.log(result.data.data);
  return result.data.data;
}
