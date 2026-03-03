export type RecipeDetails = {
  recipe: {
    id: string;
    title: string;
    description: string;
    preparationTime: number;
    status: string;
    categoryId: string;
  };

  recipeIngredients: {
    id: string;
    ingredient: string;
    amount: string;
    unit: string;
    recipeId: string;
  }[];

  recipeSteps: {
    id: string;
    step: number;
    description: string;
    recipeId: string;
  }[];
};
