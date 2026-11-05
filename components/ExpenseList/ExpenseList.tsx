import type { Expense } from "@/types/expense";
import { ExpenseItem } from "@/components/ExpenseItem/ExpenseItem";
import styles from "./ExpenseList.module.css";

type ExpenseListProps = {
  expenses: Expense[];
};

export function ExpenseList({ expenses }: ExpenseListProps) {
  return (
    <ul className={styles.list} aria-label="Expenses">
      {expenses.map((expense) => (
        <li key={expense.id}>
          <ExpenseItem expense={expense} />
        </li>
      ))}
    </ul>
  );
}
