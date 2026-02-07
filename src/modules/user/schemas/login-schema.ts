import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(10),
  password: z.string(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
