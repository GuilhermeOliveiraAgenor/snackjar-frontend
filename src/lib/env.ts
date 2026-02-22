import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),

  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

const _env = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  NODE_ENV: process.env.NODE_ENV,
};

const parsed = envSchema.safeParse(_env);

if (!parsed.success) {
  throw new Error("Invalid environment variables");
}

export const env = parsed.data;
