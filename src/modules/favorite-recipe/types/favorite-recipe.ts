interface FavoriteRecipe {
  id: string;
  recipeId: string;
  createdBy: string;
  recipe: {
    id: string;
    title: string;
    description: string;
    preparationTime: number;
    status: string;
    categoryId: string;
  };
}
