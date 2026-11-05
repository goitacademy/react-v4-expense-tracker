import { notFound } from "next/navigation";
import { ExpenseDetails } from "@/components/ExpenseDetails/ExpenseDetails";
import { getExpenseById } from "@/services/expenses";

export default async function ExpensePage({
  params,
}: PageProps<"/expenses/[id]">) {
  const { id } = await params;
  const expense = await getExpenseById(id);

  if (!expense) {
    notFound();
  }

  return <ExpenseDetails expense={expense} />;
}
