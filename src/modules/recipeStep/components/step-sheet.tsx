import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MoreHorizontal } from "lucide-react";

type StepSheetProps = {
  children?: React.ReactNode;
  step?: {
    id: string;
    step: number;
    description: string;
  };
};

export function StepSheet({ children, step }: StepSheetProps) {
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
          <SheetTitle className="text-xl text-center">Editar Etapa</SheetTitle>
        </SheetHeader>

        <form className="flex flex-col flex-1 mt-14">
          <div className="grid gap-16 px-5 py-6">
            <div className="grid gap-4">
              <Label htmlFor="step">Etapa</Label>
              <Input id="step" value={step?.step} placeholder="1" className="w-12" />
            </div>

            <div className="grid gap-4">
              <Label htmlFor="description">Descrição</Label>
              <Input id="description" value={step?.description} placeholder="Jogue na bandeja" />
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
