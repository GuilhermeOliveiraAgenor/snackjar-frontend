import z from "zod";
import { baseStepSchema } from "./base-step-schema";

export const editStepSchema = baseStepSchema.extend({
  id: z.string(),
});

export type EditStepFormInput = z.input<typeof editStepSchema>;
export type EditStepFormData = z.output<typeof editStepSchema>;
