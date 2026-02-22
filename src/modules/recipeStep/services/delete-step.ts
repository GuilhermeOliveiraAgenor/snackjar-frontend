import { api } from "@/lib/api";

export async function deleteStep(id: string) {
  const result = await api(`/recipes/steps/${id}`, {
    method: "DELETE",
  });

  return result;
}
