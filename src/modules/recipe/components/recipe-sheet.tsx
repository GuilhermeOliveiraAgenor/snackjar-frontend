import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoreHorizontal } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { EditRecipeFormData, editRecipeSchema } from "../schemas/edit-recipe-schema";
import { useEditRecipe } from "../hooks/useEditRecipe";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteRecipe } from "../hooks/useDeleteRecipe";

type RecipeSheetProps = {
  children?: React.ReactNode;
  recipe?: {
    id: string;
    title: string;
    description: string;
    preparationTime: number;
  };
};

type FormData = EditRecipeFormData;

export function RecipeSheet({ children, recipe }: RecipeSheetProps) {
  const params = useParams();
  const recipeId = params.recipeId as string;

  const [open, setOpen] = useState(false);

  const { editRecipe } = useEditRecipe(recipeId);
  const { deleteRecipe } = useDeleteRecipe();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(editRecipeSchema),
  });
  useEffect(() => {
    if (recipe && open) {
      reset({
        id: recipe.id,
        title: recipe.title,
        description: recipe.description,
        preparationTime: recipe.preparationTime,
      });
    }
  }, [recipe, open, reset]);

  async function onSubmit(data: FormData) {
    await editRecipe(data as EditRecipeFormData);
    setOpen(false);
    reset();
  }
  async function handleDelete() {
    if (!recipe?.id) return;

    await deleteRecipe(recipeId);

    await setOpen(false);
    reset();
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children ? (
          children
        ) : (
          <Button
            variant="outline"
            size="icon"
            className="
              h-8 w-8
              bg-background hover:bg-muted
              md:opacity-0 md:group-hover:opacity-100
              transition-opacity duration-200
            "
          >
            <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
          </Button>
        )}
      </SheetTrigger>

      <SheetContent className="flex flex-col w-full sm:max-w-xl">
        <SheetHeader className="items-center mt-6">
          <SheetTitle className="text-xl text-center">Editar Receita</SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 mt-14">
          <div className="grid gap-16 px-5 py-6">
            <div className="grid gap-4">
              <Label htmlFor="Titulo">Titulo</Label>
              <Input id="Titulo" {...register("title")} placeholder="Bolo de cenoura" />
              {errors.title && <span className="text-sm text-red-500">{errors.title.message}</span>}
            </div>

            <div className="grid gap-4">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                placeholder="A receita da Vovó"
                {...register("description")}
                maxLength={80}
                className="resize-none"
              />
              {errors.description && (
                <span className="text-sm text-red-500">{errors.description.message}</span>
              )}
            </div>

            <div className="grid gap-4">
              <Label htmlFor="preparationTime">Tempo de preparo</Label>

              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  className="w-18"
                  {...register("preparationTime", { valueAsNumber: true })}
                  placeholder="60"
                  inputMode="numeric"
                />
                {errors.preparationTime && (
                  <span className="text-sm text-red-500">{errors.preparationTime.message}</span>
                )}

                <span className="text-sm">minutos</span>
              </div>
            </div>
          </div>

          <div className="px-4 pb-6 flex flex-col gap-3 mt-16">
            <div className="px-4 pb-6 flex flex-col gap-3 mt-16">
              <Button type="submit">Salvar</Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button type="button" variant="destructive">
                    Excluir
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>A receita será deletada</AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Confirmar</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
