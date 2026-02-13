import { useQuery } from "@tanstack/react-query";
import { RecipeDetails } from "../types/recipe-details";
import { getRecipeDetailsByRecipeId } from "../services/get-recipe-details-by-id";

export function useRecipeDetails(recipeId: string){
    return useQuery<RecipeDetails>({
        queryKey: ["recipe-details", recipeId],
        queryFn: () => getRecipeDetailsByRecipeId(recipeId),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false
    })
}

