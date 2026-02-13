import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MoreHorizontal } from "lucide-react";

type IngredientSheetProps = {
  children?: React.ReactNode;
};

export function IngredientSheet({ children }: IngredientSheetProps) {
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
          <SheetTitle className="text-xl text-center">Editar Ingrediente</SheetTitle>
        </SheetHeader>

        <form className="flex flex-col flex-1 mt-14">
          <div className="grid gap-16 px-5 py-6">
            <div className="grid gap-4">
              <Label htmlFor="ingredient">Ingrediente</Label>
              <Input id="ingredient" placeholder="Farinha de trigo" />
            </div>

            <div className="grid gap-4">
              <Label htmlFor="amount">Quantidade</Label>
              <Input id="amount" placeholder="1000" />
            </div>

            <div className="grid gap-4">
              <Label htmlFor="unit">Unidade de Medida</Label>
              <Input id="unit" placeholder="G" />
            </div>
          </div>

          <div className="px-4 pb-6 flex flex-col gap-3 mt-16">
            <Button type="submit">Salvar</Button>

            <Button type="button" variant="destructive">
              Excluir
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
