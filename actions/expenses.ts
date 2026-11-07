"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteExpense } from "@/services/expenses";

export async function deleteExpenseAction(id: string) {
  await deleteExpense(id);
  revalidatePath("/expenses");
  revalidatePath(`/expenses/${id}`);
  redirect("/expenses");
}
