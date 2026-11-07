"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createExpense,
  deleteExpense,
  updateExpense,
} from "@/services/expenses";
import { expenseFormSchema } from "@/schemas/expenses";

export async function deleteExpenseAction(id: string) {
  await deleteExpense(id);
  revalidatePath("/expenses");
  revalidatePath(`/expenses/${id}`);
  redirect("/expenses");
}

export async function createExpenseAction(values: unknown) {
  const result = expenseFormSchema.safeParse(values);

  if (!result.success) {
    return { error: "Check the expense fields and try again." };
  }

  try {
    await createExpense({
      ...result.data,
      amount: Math.round(result.data.amount * 100),
    });
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Something went wrong. Try again.",
    };
  }

  revalidatePath("/expenses");
  redirect("/expenses");
}

export async function updateExpenseAction(id: string, values: unknown) {
  const result = expenseFormSchema.safeParse(values);

  if (!result.success) {
    return { error: "Check the expense fields and try again." };
  }

  try {
    await updateExpense(id, {
      ...result.data,
      amount: Math.round(result.data.amount * 100),
    });
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Something went wrong. Try again.",
    };
  }

  revalidatePath("/expenses");
  revalidatePath(`/expenses/${id}`);
  redirect(`/expenses/${id}`);
}
