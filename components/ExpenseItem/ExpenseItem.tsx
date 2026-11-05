import type { Expense } from "@/types/expense";
import { formatAmount } from "@/utils/formatAmount";
import { formatDate } from "@/utils/formatDate";

type ExpenseItemProps = {
  expense: Expense;
};

export function ExpenseItem({ expense }: ExpenseItemProps) {
  return (
    <div>
      <p>{expense.title}</p>
      <p>
        {expense.category.name} · {formatDate(expense.date)}
      </p>
      <p>{formatAmount(expense.amount)}</p>
    </div>
  );
}
