import { MeasurementUnit } from "@/lib/enum/MeasurementUnit";
import z from "zod";

export const baseIngredientSchema = z.object({
  ingredient: z.string().min(1, "Digite no mínimo 1 caractere"),
  amount: z.string().trim().min(1, "Digite no mínimo 1 caractere"),
  unit: z.enum(MeasurementUnit),
});
