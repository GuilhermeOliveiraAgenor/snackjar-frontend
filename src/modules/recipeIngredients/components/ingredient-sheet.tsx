import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useEditIngredient } from "../hooks/useEditIngredient";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateIngredient } from "../hooks/useCreateIngredient";
import {
  CreateIngredientFormData,
  createIngredientSchema,
} from "../schemas/create-ingredient-schema";
import { EditIngredientFormData, editIngredientSchema } from "../schemas/edit-ingredient-schema";
import { useParams } from "next/navigation";
import { MeasurementUnit } from "@/lib/enum/MeasurementUnit";
import { measurementUnitLabels } from "@/lib/measurementUnitLabels";
import { useDeleteIngredient } from "../hooks/useDeleteIngredient";
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

type IngredientSheetProps = {
  children?: React.ReactNode;
  ingredient?: {
    id: string;
    amount: string;
    unit: MeasurementUnit;
    ingredient: string;
  };
  mode?: "create" | "edit";
};

type FormData = CreateIngredientFormData | EditIngredientFormData;

export function IngredientSheet({ children, ingredient, mode }: IngredientSheetProps) {
  const params = useParams();
  const recipeId = params.recipeId as string;

  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(mode === "edit" ? editIngredientSchema : createIngredientSchema),
  });
  useEffect(() => {
    if (ingredient && open) {
      reset({
        id: ingredient.id,
        ingredient: ingredient.ingredient,
        amount: ingredient.amount,
        unit: ingredient.unit,
      });
    }
  }, [ingredient, open, reset]);

  const { createIngredient } = useCreateIngredient(recipeId);
  const { editIngredient } = useEditIngredient(recipeId);
  const { deleteIngredient } = useDeleteIngredient(recipeId);

  async function onSubmit(data: FormData) {
    if (mode === "edit") {
      await editIngredient(data as EditIngredientFormData);
    } else {
      await createIngredient({ recipeId, ...(data as CreateIngredientFormData) });
    }
    setOpen(false);
    reset();
  }
  async function handleDelete() {
    if (!ingredient?.id) return;

    await deleteIngredient(ingredient.id);

    setOpen(false);
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
          <SheetTitle className="text-xl text-center">
            {mode === "create" ? "Adicionar Ingrediente" : "Editar Ingrediente"}
          </SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 mt-14">
          <div className="grid gap-16 px-5 py-6">
            <div className="grid gap-4">
              <Label htmlFor="ingredient">Ingrediente</Label>
              <Input
                id="ingredient"
                {...register("ingredient")}
                maxLength={50}
                placeholder="Farinha de trigo"
              />
              {errors.ingredient && (
                <span className="text-sm text-red-500">{errors.ingredient.message}</span>
              )}
            </div>

            <div className="grid gap-4">
              <Label htmlFor="amount">Quantidade</Label>
              <Input
                id="amount"
                inputMode="numeric"
                maxLength={4}
                {...register("amount", {
                  onChange: (e) => {
                    e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4);
                  },
                })}
                placeholder="1000"
              />
              {errors.amount && (
                <span className="text-sm text-red-500">{errors.amount.message}</span>
              )}
            </div>

            <div className="grid gap-4">
              <Controller
                control={control}
                name="unit"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-48 sm:w-36">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Unidade de Medida</SelectLabel>

                        {Object.values(MeasurementUnit).map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {measurementUnitLabels[unit].singular}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.unit && <span className="text-sm text-red-500">{errors.unit.message}</span>}
            </div>
          </div>

          <div className="px-4 pb-6 flex flex-col gap-3 mt-16">
            <Button type="submit">Salvar</Button>

            {mode !== "create" && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button type="button" variant="destructive">
                    Excluir
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                      O ingrediente será deletado da receita
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Confirmar</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
