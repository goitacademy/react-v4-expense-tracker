import { ExpenseList } from "@/components/ExpenseList/ExpenseList";
import { expenses } from "@/data/expenses";

export default function ExpensesPage() {
  return (
    <>
      <h1>Expenses</h1>
      <ExpenseList expenses={expenses} />
    </>
  );
}
