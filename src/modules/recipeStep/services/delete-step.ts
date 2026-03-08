import { api } from "@/lib/api";

export async function deleteStep(id: string) {
  await api(`/recipes/steps/${id}`, {
    method: "DELETE",
  });
}
