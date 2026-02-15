import z from "zod";
import { baseStepSchema } from "./base-step-schema";

export const createStepSchema = baseStepSchema;

export type CreateStepFormData = z.infer<typeof createStepSchema>;
