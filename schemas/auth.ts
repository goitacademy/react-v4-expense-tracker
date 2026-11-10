import { z } from "zod";

export const authFormSchema = z.object({
  email: z.email({ error: "Enter a valid email" }),
  password: z
    .string()
    .min(8, { error: "Use at least 8 characters" })
    .max(64, { error: "Use at most 64 characters" }),
});

export type AuthFormValues = z.infer<typeof authFormSchema>;
