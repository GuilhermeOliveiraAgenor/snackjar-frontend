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
import { useEffect } from "react";
import { useEditIngredient } from "../hooks/useEditIngredient";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditIngredientFormData, editIngredientSchema } from "../schemas/ingredient-schema";

type IngredientSheetProps = {
  children?: React.ReactNode;
  ingredient?: {
    id: string;
    amount: string;
    unit: string;
    ingredient: string;
  };
  mode?: "create" | "edit";
};

export function IngredientSheet({ children, ingredient, mode }: IngredientSheetProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EditIngredientFormData>({
    resolver: zodResolver(editIngredientSchema),
    // defaultValues: {
    //   ingredient: "",
    //   amount: "",
    //   unit: "",
    // },
  });
  useEffect(() => {
    if (ingredient) {
      reset({
        ingredient: ingredient.ingredient,
        amount: ingredient.amount,
        unit: ingredient.unit,
      });
    }
  }, [ingredient, reset]);
  const { ingredients, loading, error } = useEditIngredient();

  return (
    <Sheet>
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

        <form className="flex flex-col flex-1 mt-14">
          <div className="grid gap-16 px-5 py-6">
            <div className="grid gap-4">
              <Label htmlFor="ingredient">Ingrediente</Label>
              <Input id="ingredient" {...register("ingredient")} placeholder="Farinha de trigo" />
            </div>

            <div className="grid gap-4">
              <Label htmlFor="amount">Quantidade</Label>
              <Input id="amount" {...register("amount")} placeholder="1000" />
            </div>

            <div className="grid gap-4">
              <Controller
                control={control}
                name="unit"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    {" "}
                    <SelectTrigger className="w-40 sm:w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Unidade de Medida</SelectLabel>
                        <SelectItem value="G">g</SelectItem>
                        <SelectItem value="KG">kg</SelectItem>
                        <SelectItem value="ML">ml</SelectItem>
                        <SelectItem value="L">l</SelectItem>
                        <SelectItem value="COLHER_SOPA">Colher de Sopa</SelectItem>
                        <SelectItem value="COLHER_CHA">Colher de Chá</SelectItem>
                        <SelectItem value="COLHER">Colher</SelectItem>
                        <SelectItem value="XICARA">Xícara</SelectItem>
                        <SelectItem value="UN">un</SelectItem>
                        <SelectItem value="PITADA">Pitada</SelectItem>
                        <SelectItem value="MG">mg</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="px-4 pb-6 flex flex-col gap-3 mt-16">
            <Button type="submit">Salvar</Button>

            {mode !== "create" && (
              <Button type="button" variant="destructive">
                Excluir
              </Button>
            )}
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
