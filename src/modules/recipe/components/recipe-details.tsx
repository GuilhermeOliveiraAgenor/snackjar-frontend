"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreHorizontal, Plus } from "lucide-react";
import { IngredientSheet } from "@/modules/recipeIngredients/components/ingredient-sheet";
import { StepSheet } from "@/modules/recipeStep/components/step-sheet";
import { useParams } from "next/navigation";
import { useRecipeDetails } from "../hooks/useRecipeDetails";
import { formatMeasurementUnit } from "@/lib/formatMeasurementUnitLabels";
import { RecipeSheet } from "./recipe-sheet";
import { Skeleton } from "@/components/ui/skeleton";

export default function RecipeDetails() {
  const params = useParams();
  const recipeId = params.recipeId as string; // id param

  const { data, isLoading } = useRecipeDetails(recipeId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center gap-10 pt-2 pb-8 px-4 sm:px-8">
        <Card className="w-full max-w-5xl shadow-lg">
          <CardHeader className="space-y-3">
            <Skeleton className="h-8 w-64 mx-auto" />
            <Skeleton className="h-4 w-40 mx-auto" />
            <Skeleton className="h-4 w-80 mx-auto" />
          </CardHeader>
        </Card>

        <div className="w-full max-w-screen-2xl grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
          <Card className="shadow-lg">
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>

            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>

            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!data) {
    return <p className="p-8">Receita não encontrada</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center gap-10 pt-2 pb-8 px-4 sm:px-8">
      <Card className="w-full max-w-5xl text-center shadow-lg">
        <CardHeader className="relative pt-6 pb-8 px-4 sm:px-8">
          <div className="absolute top-2 right-3 sm:top-4 sm:right-4">
            <RecipeSheet recipe={data.recipe}>
              <div className="cursor-pointer">
                <MoreHorizontal className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </RecipeSheet>
          </div>

          <CardTitle className="text-2xl sm:text-3xl font-bold break-all">
            {data.recipe.title}
          </CardTitle>

          <p className="mt-2 break-all">Tempo de preparo: {data.recipe.preparationTime} min</p>

          <p className="text-base sm:text-xl text-muted-foreground break-all">
            {data.recipe.description}
          </p>
        </CardHeader>
      </Card>

      <div className="w-full max-w-screen-2xl grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-start">
        <Card className="relative shadow-lg">
          <CardHeader className="px-6 sm:px-8 pt-2">
            <CardTitle className="text-lg sm:text-xl font-semibold">Ingredientes</CardTitle>{" "}
          </CardHeader>

          <CardContent className="px-8 pb-10">
            <ul className="list-disc pl-6 space-y-3 text-base leading-relaxed">
              {data.recipeIngredients.map((ingredient) => (
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
          <CardHeader className="px-6 sm:px-8 pt-2">
            <CardTitle className="text-lg sm:text-xl font-semibold">Modo de preparo</CardTitle>
          </CardHeader>

          <CardContent className="px-6 sm:px-8 pb-10">
            <ul className="list-disc pl-6 space-y-3 text-base leading-relaxed">
              {data.recipeSteps.map((step) => (
                <li key={step.id} className="group">
                  <div className="flex items-start gap-4">
                    <span className="flex-1 min-w-0 nom run-all">
                      {step.step}. {step.description}
                    </span>
                    <StepSheet step={step} mode="edit" />
                  </div>
                </li>
              ))}
            </ul>
            <StepSheet mode="create">
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
