import z from "zod";
import { baseStepSchema } from "./base-step-schema";

export const createStepSchema = baseStepSchema;

export type CreateStepFormInput = z.input<typeof createStepSchema>;
export type CreateStepFormData = z.output<typeof createStepSchema>;