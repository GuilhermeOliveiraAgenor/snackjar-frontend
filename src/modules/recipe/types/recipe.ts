interface Recipe {
  id: string;
  title: string;
  description: string;
  preparationTime: number;
  status: string;
  categoryId: string;
}

export type { Recipe };
