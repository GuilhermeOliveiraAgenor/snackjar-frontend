import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MoreHorizontal } from "lucide-react";
import { CreateStepFormData, createStepSchema } from "../schemas/create-step-schema";
import { EditStepFormData, editStepSchema } from "../schemas/edit-step-schema";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateStep } from "../hooks/useCreateStep";
import { useEditStep } from "../hooks/useEditStep";
import { useDeleteStep } from "../hooks/useDeleteStep";

type StepSheetProps = {
  children?: React.ReactNode;
  step?: {
    id: string;
    step: number;
    description: string;
  };
  mode: "create" | "edit";
};

type FormData = CreateStepFormData | EditStepFormData;

export function StepSheet({ children, step, mode }: StepSheetProps) {
  const params = useParams();
  const recipeId = params.recipeId as string;

  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(mode === "edit" ? editStepSchema : createStepSchema),
  });
  useEffect(() => {
    if (step && open) {
      reset({
        id: step.id,
        step: step.step,
        description: step.description,
      });
    }
  }, [step, open, reset]);

  const { createStep } = useCreateStep(recipeId);
  const { editStep } = useEditStep(recipeId);
  const { deleteStep } = useDeleteStep(recipeId);

  async function onSubmit(data: FormData) {
    if (mode === "edit") {
      await editStep(data as EditStepFormData);
    } else if (mode === "create") {
      await createStep({ recipeId, ...(data as CreateStepFormData) });
    } else {
      if (!step?.id) return;

      await deleteStep(step.id);
    }
    setOpen(false);
    reset();
  }
  async function handleDelete() {
    if (!step?.id) return;

    await deleteStep(step.id);

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
          <SheetTitle className="text-xl text-center">Editar Etapa</SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 mt-14">
          <div className="grid gap-16 px-5 py-6">
            <div className="grid gap-4">
              <Label htmlFor="step">Etapa</Label>
              <Input
                id="step"
                {...register("step", { valueAsNumber: true })}
                placeholder="1"
                className="w-12"
              />
              {errors.step && <span className="text-sm text-red-500">{errors.step.message}</span>}
            </div>

            <div className="grid gap-4">
              <Label htmlFor="description">Descrição</Label>
              <Input id="description" {...register("description")} placeholder="Jogue na bandeja" />
              {errors.step && <span className="text-sm text-red-500">{errors.step.message}</span>}
            </div>
          </div>

          <div className="px-4 pb-6 flex flex-col gap-3 mt-16">
            <Button type="submit">Salvar</Button>

            <Button type="button" variant="destructive" onClick={handleDelete}>
              Excluir
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
