import { z } from "zod";

export const userSchema = z
  .object({
    name: z.string().min(1, "Digite no mínimo um caractere").max(30, "Limite de 30 caractares"),
    email: z.string().email("Digite um email válido").min(10, "Mínimo de 10 caracteres"),
    password: z.string().min(6, "Digite uma senha maior que 6 caracteres"),
    confirmPassword: z.string().min(1, "Digite no mínimo um caractere"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type UserFormData = z.infer<typeof userSchema>;
