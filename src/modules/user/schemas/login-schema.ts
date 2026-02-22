import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().min(10, "Digite um email válido"),
  password: z.string().min(6, "Digite uma senha maior que 6 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
