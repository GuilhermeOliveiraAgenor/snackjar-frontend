import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),

  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

const _env = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
};

const parsed = envSchema.safeParse(_env);

if (!parsed.success) {
  throw new Error("Invalid environment variables");
}

export const env = parsed.data;
