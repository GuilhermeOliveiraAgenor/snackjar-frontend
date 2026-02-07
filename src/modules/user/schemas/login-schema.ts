import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(10),
  password: z.string().min(6),
});

export type LoginFormData = z.infer<typeof loginSchema>;
