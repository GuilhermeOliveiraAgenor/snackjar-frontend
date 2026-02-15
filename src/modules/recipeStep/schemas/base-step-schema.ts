import z from "zod";

export const baseStepSchema = z.object({
  step: z.number("Digite um número").max(4, "Máximo de 4 caracteres"),
  description: z
    .string()
    .trim()
    .min(1, "Digite no mínimo 1 caractere")
    .max(50, "Máximo de 50 caracteres "),
});
