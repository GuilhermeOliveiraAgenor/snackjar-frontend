import z from "zod";

export const baseStepSchema = z.object({
  step: z.number(),
  description: z.string().trim().min(1, "Digite no mínimo 1 caractere"),
});
