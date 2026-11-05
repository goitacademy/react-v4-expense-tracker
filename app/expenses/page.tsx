import { ExpenseList } from "@/components/ExpenseList/ExpenseList";
import { expenses } from "@/data/expenses";
import styles from "./page.module.css";

export default function ExpensesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.headingRow}>
        <h1>Expenses</h1>
      </div>
      <ExpenseList expenses={expenses} />
    </div>
  );
}
