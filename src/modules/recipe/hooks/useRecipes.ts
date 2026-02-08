"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMyRecipes } from "../services/fetch-my-recipes";
import { Recipe } from "../types/recipe";

export function useRecipes() {
  return useQuery<Recipe[]>({
    queryKey: ["recipes", "me"], // hook id

    queryFn: fetchMyRecipes,

    staleTime: 1000 * 60 * 1, // cache
  });
}
