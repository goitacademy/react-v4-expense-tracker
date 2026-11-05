import type { Expense } from "@/types/expense";
import { ExpenseItem } from "@/components/ExpenseItem/ExpenseItem";

type ExpenseListProps = {
  expenses: Expense[];
};

export function ExpenseList({ expenses }: ExpenseListProps) {
  return (
    <ul>
      {expenses.map((expense) => (
        <li key={expense.id}>
          <ExpenseItem expense={expense} />
        </li>
      ))}
    </ul>
  );
}
