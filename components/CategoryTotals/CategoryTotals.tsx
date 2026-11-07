import Image from "next/image";
import type { CategoryTotal } from "@/types/expense";
import { formatAmount } from "@/utils/formatAmount";
import styles from "./CategoryTotals.module.css";

type CategoryTotalsProps = {
  totals: CategoryTotal[];
};

export function CategoryTotals({ totals }: CategoryTotalsProps) {
  return (
    <ul className={styles.list} aria-label="Totals by category">
      {totals.map(({ category, total }) => (
        <li key={category.id} className={styles.item}>
          <Image
            className={styles.icon}
            src={category.iconUrl}
            alt=""
            width={32}
            height={32}
          />
          <span className={styles.name}>{category.name}</span>
          <span className={styles.amount}>{formatAmount(total)}</span>
        </li>
      ))}
    </ul>
  );
}
