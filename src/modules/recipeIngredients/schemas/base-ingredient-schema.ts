import { MeasurementUnit } from "@/lib/enum/MeasurementUnit";
import z from "zod";

export const baseIngredientSchema = z.object({
  ingredient: z.string().min(1, "Digite no mínimo 1 caractere").max(50, "Máximo de 50 caracteres"),
  amount: z
    .string("Digite um número")
    .trim()
    .min(1, "Digite no mínimo 1 caractere")
    .max(4, " Máximo de 4 caracteres"),
  unit: z.enum(MeasurementUnit),
});
