import { z } from "zod";

export const expenseFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { error: "Enter a title" })
    .max(100, { error: "Use at most 100 characters" }),
  amount: z.coerce
    .number()
    .positive({ error: "Enter an amount greater than 0" }),
  date: z.string().min(1, { error: "Choose a date" }),
  categoryId: z.string().min(1, { error: "Choose a category" }),
});

export type ExpenseFormValues = z.infer<typeof expenseFormSchema>;
