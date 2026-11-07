import { ExpenseList } from "@/components/ExpenseList/ExpenseList";
import { getExpenses, getExpenseSummary } from "@/services/expenses";
import { MonthSummary } from "@/components/MonthSummary/MonthSummary";
import { SearchBox } from "@/components/SearchBox/SearchBox";
import { getSearchParam } from "@/utils/getSearchParam";
import { getCategories } from "@/services/categories";
import { CategoryFilter } from "@/components/CategoryFilter/CategoryFilter";
import { CategoryTotals } from "@/components/CategoryTotals/CategoryTotals";
import { MessagePanel } from "@/components/MessagePanel/MessagePanel";
import styles from "./page.module.css";

export default async function ExpensesPage({
  searchParams,
}: PageProps<"/expenses">) {
  const query = await searchParams;
  const search = getSearchParam(query.search);
  const category = getSearchParam(query.category);

  const [{ expenses }, summary, categories] = await Promise.all([
    getExpenses({ search, category }),
    getExpenseSummary(),
    getCategories(),
  ]);

  return (
    <div className={styles.page}>
      <div className={styles.headingRow}>
        <h1>Expenses</h1>
      </div>
      <section className={styles.summary}>
        <MonthSummary summary={summary} />
        {summary.byCategory.length > 0 && (
          <CategoryTotals totals={summary.byCategory} />
        )}
      </section>
      <div className={styles.filters}>
        <SearchBox />
        <CategoryFilter categories={categories} />
      </div>
      {expenses.length > 0 ? (
        <ExpenseList expenses={expenses} />
      ) : (
        <MessagePanel
          title="No expenses found"
          text="No expenses for these filters. Try another month or search, or add an expense."
          role="status"
        />
      )}
    </div>
  );
}
