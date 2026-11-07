import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import type { Expense } from "@/types/expense";
import { formatAmount } from "@/utils/formatAmount";
import { formatDate } from "@/utils/formatDate";
import { DeleteButton } from "@/components/DeleteButton/DeleteButton";
import styles from "./ExpenseDetails.module.css";

type ExpenseDetailsProps = {
  expense: Expense;
};

export function ExpenseDetails({ expense }: ExpenseDetailsProps) {
  return (
    <div className={styles.wrapper}>
      <Link href="/expenses" className={styles.backLink}>
        <ChevronLeft size={18} aria-hidden />
        All expenses
      </Link>
      <article className={styles.card}>
        <div className={styles.header}>
          <Image
            className={styles.icon}
            src={expense.category.iconUrl}
            alt=""
            width={56}
            height={56}
          />
          <h1 className={styles.title}>{expense.title}</h1>
          <p className={styles.amount}>{formatAmount(expense.amount)}</p>
        </div>
        <dl className={styles.list}>
          <div>
            <dt className={styles.term}>Date</dt>
            <dd className={styles.value}>{formatDate(expense.date)}</dd>
          </div>
          <div>
            <dt className={styles.term}>Category</dt>
            <dd className={styles.value}>{expense.category.name}</dd>
          </div>
        </dl>
        <div className={styles.actions}>
          <DeleteButton expenseId={expense.id} />
        </div>
      </article>
    </div>
  );
}
