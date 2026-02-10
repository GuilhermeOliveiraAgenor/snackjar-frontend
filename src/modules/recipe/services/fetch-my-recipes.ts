import { api } from "@/lib/api";
import { Recipe } from "../types/recipe";
import { PaginatedResponse } from "@/modules/types/pagination";

export async function fetchMyRecipes(page = 1, title?: string): Promise<PaginatedResponse<Recipe>> {
  const result = await api("/menu", {
    method: "GET",
    params: { page, title },
  });

  console.log(result.data.data);

  return result.data;
}
