export type RecipeDetails = {
  recipe: {
    id: string;
    title: string;
    description: string;
    preparationTime: number;
    status: string;
    categoryId: string;
  };

  ingredients: {
    id: string;
    ingredient: string;
    amount: string;
    unit: string;
    recipeId: string;
  }[];

  steps: {
    id: string;
    step: number;
    description: string;
    recipeId: string;
  }[];
};
