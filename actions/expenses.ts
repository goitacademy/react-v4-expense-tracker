"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createExpense,
  deleteExpense,
  updateExpense,
} from "@/services/expenses";
import type { ExpenseFormValues } from "@/schemas/expenses";

export async function deleteExpenseAction(id: string) {
  await deleteExpense(id);
  revalidatePath("/expenses");
  revalidatePath(`/expenses/${id}`);
  redirect("/expenses");
}

export async function createExpenseAction(values: ExpenseFormValues) {
  await createExpense({ ...values, amount: Math.round(values.amount * 100) });
  revalidatePath("/expenses");
  redirect("/expenses");
}

export async function updateExpenseAction(
  id: string,
  values: ExpenseFormValues,
) {
  await updateExpense(id, {
    ...values,
    amount: Math.round(values.amount * 100),
  });
  revalidatePath("/expenses");
  revalidatePath(`/expenses/${id}`);
  redirect(`/expenses/${id}`);
}
