import { string, z } from "zod";

export const userSchema = z.object({
  name: z.string().max(30, "Limite de 30 caractares"),
  email: z.string().email().min(10, "Digite um email válido"),
  password: z.string().min(6, "Digite uma senha maior que 6 caracteres"),
});

export type UserFormData = z.infer<typeof userSchema>;
