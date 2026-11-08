import type { Metadata } from "next";
import { ExpenseForm } from "@/components/ExpenseForm/ExpenseForm";
import { getCategories } from "@/services/categories";

export const metadata: Metadata = {
  title: "New expense",
};

export default async function NewExpensePage() {
  const categories = await getCategories();

  return <ExpenseForm title="New expense" categories={categories} />;
}
