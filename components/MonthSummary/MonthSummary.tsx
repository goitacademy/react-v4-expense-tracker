import type { ExpenseSummary } from "@/types/expense";
import { formatAmount } from "@/utils/formatAmount";
import { formatMonth } from "@/utils/formatMonth";
import styles from "./MonthSummary.module.css";

type MonthSummaryProps = {
  summary: ExpenseSummary;
};

export function MonthSummary({ summary }: MonthSummaryProps) {
  return (
    <div className={styles.summary}>
      <h2 className={styles.caption}>Spent in {formatMonth(summary.month)}</h2>
      <p className={styles.total}>{formatAmount(summary.total)}</p>
    </div>
  );
}
