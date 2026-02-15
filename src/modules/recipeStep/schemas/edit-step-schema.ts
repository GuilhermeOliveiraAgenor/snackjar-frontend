import z from "zod";
import { baseStepSchema } from "./base-step-schema";

export const editStepSchema = baseStepSchema.extend({
  id: z.string(),
});

export type EditStepFormData = z.infer<typeof editStepSchema>;
