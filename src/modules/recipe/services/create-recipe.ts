import { api } from "@/lib/api";
import { CreateRecipeFormData } from "../schemas/create-recipe-schema";

export interface CreateRecipeRequest {
  title: string;
  description: string;
  preparationTime: number;
  categoryId: string;

  recipeIngredient: {
    ingredient: string;
    amount: string;
    unit: string;
  }[];

  recipeStep: {
    step: number;
    description: string;
  }[];
}

export async function createRecipe(data: CreateRecipeRequest) {
  return api("/recipes", {
    method: "POST",
    data,
  });
}

