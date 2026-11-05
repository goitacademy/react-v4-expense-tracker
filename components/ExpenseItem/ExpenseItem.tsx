import Link from "next/link";
import Image from "next/image";
import type { Expense } from "@/types/expense";
import { formatAmount } from "@/utils/formatAmount";
import { formatDate } from "@/utils/formatDate";
import styles from "./ExpenseItem.module.css";

type ExpenseItemProps = {
  expense: Expense;
};

export function ExpenseItem({ expense }: ExpenseItemProps) {
  return (
    <Link href={`/expenses/${expense.id}`} className={styles.item}>
      <Image
        className={styles.icon}
        src={expense.category.iconUrl}
        alt=""
        width={40}
        height={40}
      />
      <span className={styles.body}>
        <span className={styles.title}>{expense.title}</span>
        <span className={styles.meta}>
          {expense.category.name} · {formatDate(expense.date)}
        </span>
      </span>
      <span className={styles.amount}>{formatAmount(expense.amount)}</span>
    </Link>
  );
}
