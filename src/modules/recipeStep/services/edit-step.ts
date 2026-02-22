import { api } from "@/lib/api";

interface EditStepRequest {
  id: string;
  step: number;
  description: string;
}

export async function editStep(data: EditStepRequest) {
  const result = await api(`/recipes/steps/${data.id}`, {
    method: "PUT",
    data,
  });

  return result.data.data;
}
