import { ExpenseForm } from "@/components/ExpenseForm/ExpenseForm";
import { getCategories } from "@/services/categories";

export default async function NewExpensePage() {
  const categories = await getCategories();

  return <ExpenseForm title="New expense" categories={categories} />;
}
