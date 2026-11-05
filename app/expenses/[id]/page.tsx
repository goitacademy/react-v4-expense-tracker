import { ExpenseDetails } from "@/components/ExpenseDetails/ExpenseDetails";
import { getExpenseById } from "@/services/expenses";

export default async function ExpensePage({
  params,
}: PageProps<"/expenses/[id]">) {
  const { id } = await params;
  const expense = await getExpenseById(id);

  if (!expense) {
    return <p>Expense not found</p>;
  }

  return <ExpenseDetails expense={expense} />;
}
