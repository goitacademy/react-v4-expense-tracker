import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ExpenseList } from "@/components/ExpenseList/ExpenseList";
import {
  getExpenses,
  getExpenseSummary,
  getExpenseYears,
} from "@/services/expenses";
import { MonthSummary } from "@/components/MonthSummary/MonthSummary";
import { SearchBox } from "@/components/SearchBox/SearchBox";
import { getSearchParam } from "@/utils/getSearchParam";
import { getCategories } from "@/services/categories";
import { CategoryFilter } from "@/components/CategoryFilter/CategoryFilter";
import { MonthFilter } from "@/components/MonthFilter/MonthFilter";
import { CategoryTotals } from "@/components/CategoryTotals/CategoryTotals";
import { MessagePanel } from "@/components/MessagePanel/MessagePanel";
import { Pagination } from "@/components/Pagination/Pagination";
import styles from "./page.module.css";

export default function ExpensesPage({ searchParams }: PageProps<"/expenses">) {
  return (
    <div className={styles.page}>
      <div className={styles.headingRow}>
        <h1>Expenses</h1>
        <Link className="button buttonPrimary" href="/expenses/new">
          <Plus size={18} aria-hidden />
          Add expense
        </Link>
      </div>
      <Suspense fallback={<MessagePanel text="Loading…" role="status" />}>
        <ExpensesContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

type ExpensesContentProps = Pick<PageProps<"/expenses">, "searchParams">;

async function ExpensesContent({ searchParams }: ExpensesContentProps) {
  const query = await searchParams;
  const search = getSearchParam(query.search);
  const category = getSearchParam(query.category);
  const month = getSearchParam(query.month);
  const requestedPage = getSearchParam(query.page);
  const filters = { search, category, month };

  const [{ expenses, page, totalPages }, summary, categories, years] =
    await Promise.all([
      getExpenses({ ...filters, page: requestedPage }),
      getExpenseSummary(month),
      getCategories(),
      getExpenseYears(),
    ]);

  return (
    <>
      <section className={styles.summary}>
        <MonthSummary summary={summary} />
        {summary.byCategory.length > 0 && (
          <CategoryTotals totals={summary.byCategory} />
        )}
      </section>
      <div className={styles.filters}>
        <SearchBox />
        <CategoryFilter categories={categories} />
        <MonthFilter month={summary.month} years={years} />
      </div>
      {expenses.length > 0 ? (
        <ExpenseList expenses={expenses} />
      ) : (
        <MessagePanel
          title="No expenses found"
          text="No expenses for these filters. Try another month or search, or add an expense."
          role="status"
        >
          <Link className="button buttonPrimary" href="/expenses/new">
            Add expense
          </Link>
        </MessagePanel>
      )}
      {expenses.length > 0 && totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} filters={filters} />
      )}
    </>
  );
}
