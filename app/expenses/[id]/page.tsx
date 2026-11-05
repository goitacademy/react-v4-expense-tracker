import { ExpenseDetails } from "@/components/ExpenseDetails/ExpenseDetails";
import { getExpenseById } from "@/data/expenses";

export default async function ExpensePage({
  params,
}: PageProps<"/expenses/[id]">) {
  const { id } = await params;
  const expense = getExpenseById(id);

  if (!expense) {
    return <p>Expense not found</p>;
  }

  return <ExpenseDetails expense={expense} />;
}
