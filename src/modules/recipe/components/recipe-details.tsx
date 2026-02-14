"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreHorizontal, Plus } from "lucide-react";
import { IngredientSheet } from "@/modules/recipeIngredients/components/ingredient-sheet";
import { StepSheet } from "@/modules/recipeStep/components/step-sheet";
import { useParams } from "next/navigation";
import { useRecipeDetails } from "../hooks/useRecipeDetails";
import { SheetRecipe } from "./sheet-recipe";
import { formatMeasurementUnit } from "@/lib/formatMeasurementUnitLabels";
import { useState } from "react";

export default function RecipeDetails() {
  const params = useParams();
  const recipeId = params.recipeId as string; // id param
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useRecipeDetails(recipeId);

  if (isLoading) {
    return <p className="p-8">Carregando receita...</p>;
  }

  if (!data) {
    return <p className="p-8">Erro ao carregar receita.</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center gap-10 p-4 sm:p-8">
      <Card className="w-full max-w-5xl text-center shadow-lg">
        <CardHeader className="relative pt-6 pb-8 px-4 sm:px-8">
          <div className="absolute top-4 right-4">
            <SheetRecipe recipe={data.recipe}>
              <MoreHorizontal />
            </SheetRecipe>
          </div>

          <CardTitle className="text-2xl sm:text-4xl font-bold break-words">
            {data.recipe.title}
          </CardTitle>

          <p className="mt-2 break-words">Tempo de preparo: {data.recipe.preparationTime} min</p>

          <p className="text-base sm:text-xl text-muted-foreground break-words">
            {data.recipe.description}
          </p>
        </CardHeader>
      </Card>

      <div className="w-full max-w-screen-2xl grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-start">
        <Card className="relative shadow-lg">
          <CardHeader className="px-6 sm:px-8 pt-8">
            <CardTitle className="text-2xl sm:text-3xl">Ingredientes</CardTitle>
          </CardHeader>

          <CardContent className="px-8 pb-20">
            <ul className="list-disc pl-6 space-y-4 text-base sm:text-xl leading-relaxed">
              {data.ingredients.map((ingredient) => (
                <li key={ingredient.id} className="group">
                  <div className="flex items-start gap-4">
                    <span className="flex-1 min-w-0 break-all">
                      {ingredient.amount}{" "}
                      {formatMeasurementUnit(ingredient.unit, ingredient.amount)} de{" "}
                      {ingredient.ingredient}
                    </span>
                    <IngredientSheet ingredient={ingredient} mode="edit" />
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>

          <div className="absolute bottom-4 right-4">
            <IngredientSheet mode="create">
              <div className="flex items-center gap-2 cursor-pointer">
                <span className="text-sm font-medium">Adicionar</span>
                <Plus className="w-6 h-6 text-primary hover:scale-110 transition" />
              </div>
            </IngredientSheet>
          </div>
        </Card>

        <Card className="relative shadow-lg">
          <CardHeader className="px-6 sm:px-8 pt-8">
            <CardTitle className="text-2xl sm:text-3xl">Modo de preparo</CardTitle>
          </CardHeader>

          <CardContent className="px-6 sm:px-8 pb-20">
            <ul className="space-y-4 text-base sm:text-xl leading-relaxed">
              {data.steps.map((step) => (
                <li key={step.id} className="group">
                  <div className="flex items-start gap-4">
                    <span className="flex-1 min-w-0 break-all">
                      {step.step}. {step.description}
                    </span>
                    <StepSheet step={step} />
                  </div>
                </li>
              ))}
            </ul>
            <StepSheet>
              <div className="absolute bottom-4 right-4">
                <div className="flex items-center gap-2 cursor-pointer">
                  <span className="text-sm font-medium">Adicionar</span>
                  <Plus className="w-6 h-6 text-primary hover:scale-110 transition" />
                </div>
              </div>
            </StepSheet>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
