import { ExpenseList } from "@/components/ExpenseList/ExpenseList";
import { getExpenses, getExpenseSummary } from "@/services/expenses";
import { MonthSummary } from "@/components/MonthSummary/MonthSummary";
import { SearchBox } from "@/components/SearchBox/SearchBox";
import styles from "./page.module.css";

export default async function ExpensesPage({
  searchParams,
}: PageProps<"/expenses">) {
  const query = await searchParams;
  const search = typeof query.search === "string" ? query.search : undefined;

  const [{ expenses }, summary] = await Promise.all([
    getExpenses({ search }),
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
      <div className={styles.filters}>
        <SearchBox />
      </div>
      <ExpenseList expenses={expenses} />
    </div>
  );
}
