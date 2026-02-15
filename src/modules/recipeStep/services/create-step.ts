import { api } from "@/lib/api";

interface CreateStepRequest {
  step: number;
  description: string;
  recipeId: string;
}

export async function createStep(data: CreateStepRequest) {
  const result = await api(`/recipe/steps/${data.recipeId}`, {
    method: "POST",
    data,
  });

  return result.data.data;
}
