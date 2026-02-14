import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { MoreHorizontal } from "lucide-react";

type RecipeSheetProps = {
  children?: React.ReactNode;
  recipe?: {
    id: string;
    title: string;
    description: string;
    preparationTime: number;
  };
};

export function SheetRecipe({ children, recipe }: RecipeSheetProps) {
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
          <SheetTitle className="text-xl text-center">Editar Receita</SheetTitle>
        </SheetHeader>

        <form className="flex flex-col flex-1 mt-14">
          <div className="grid gap-16 px-5 py-6">
            <div className="grid gap-4">
              <Label htmlFor="Titulo">Titulo</Label>
              <Input id="Titulo" value={recipe?.title} placeholder="Bolo de cenoura" />
            </div>

            <div className="grid gap-4">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                placeholder="A receita da Vovó"
                value={recipe?.description}
                maxLength={80}
                className="resize-none"
              />
            </div>

            <div className="grid gap-4">
              <Label htmlFor="preparationTime">Tempo de preparo</Label>

              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  className="w-18"
                  value={recipe?.preparationTime}
                  placeholder="60"
                  inputMode="numeric"
                />
                <span className="text-sm">minutos</span>
              </div>
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
