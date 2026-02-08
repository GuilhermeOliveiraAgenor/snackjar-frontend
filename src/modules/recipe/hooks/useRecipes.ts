"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMyRecipes } from "../services/fetch-my-recipes";
import { Recipe } from "../types/recipe";
import { PaginatedResponse } from "@/modules/types/pagination";

export function useRecipes(page: number) {
  return useQuery<PaginatedResponse<Recipe>>({
    queryKey: ["recipes", "me", page], // hook id

    queryFn: () => fetchMyRecipes(page),

    staleTime: 1000 * 60 * 5, // cache
  });
}
