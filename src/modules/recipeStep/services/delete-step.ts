import { api } from "@/lib/api";

export async function deleteStep(id: string) {
  const result = await api(`/recipe/steps/${id}`, {
    method: "DELETE",
  });

  return result;
}
