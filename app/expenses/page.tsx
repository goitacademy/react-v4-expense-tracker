import { ExpenseList } from "@/components/ExpenseList/ExpenseList";
import { getExpenses, getExpenseSummary } from "@/services/expenses";
import { MonthSummary } from "@/components/MonthSummary/MonthSummary";
import styles from "./page.module.css";

export default async function ExpensesPage() {
  const [{ expenses }, summary] = await Promise.all([
    getExpenses(),
    getExpenseSummary(),
  ]);

  return (
    <div className={styles.page}>
      <div className={styles.headingRow}>
        <h1>Expenses</h1>
      </div>
      <section className={styles.summary}>
        <MonthSummary summary={summary} />
      </section>
      <ExpenseList expenses={expenses} />
    </div>
  );
}
