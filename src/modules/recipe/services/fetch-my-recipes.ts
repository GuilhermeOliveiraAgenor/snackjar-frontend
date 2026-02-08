import { api } from "@/lib/api";
import { Recipe } from "../types/recipe";

export async function fetchMyRecipes(): Promise<Recipe[]> {
  const result = await api("/menu", {
    method: "GET",
  });

  return result.data.data;
}
