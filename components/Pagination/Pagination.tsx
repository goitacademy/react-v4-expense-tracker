import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ExpensesQuery } from "@/types/expense";
import styles from "./Pagination.module.css";

type PaginationProps = {
  page: number;
  totalPages: number;
  filters: ExpensesQuery;
};

export function Pagination({ page, totalPages, filters }: PaginationProps) {
  const getPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        params.set(key, value);
      }
    }

    if (pageNumber > 1) {
      params.set("page", String(pageNumber));
    }

    const queryString = params.toString();

    return queryString ? `/expenses?${queryString}` : "/expenses";
  };

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      {page > 1 ? (
        <Link className="button buttonSecondary" href={getPageUrl(page - 1)}>
          <ChevronLeft size={18} aria-hidden />
          Previous
        </Link>
      ) : (
        <a className="button buttonSecondary" role="link" aria-disabled="true">
          <ChevronLeft size={18} aria-hidden />
          Previous
        </a>
      )}
      <p className={styles.info}>
        Page <strong>{page}</strong> of {totalPages}
      </p>
      {page < totalPages ? (
        <Link className="button buttonSecondary" href={getPageUrl(page + 1)}>
          Next
          <ChevronRight size={18} aria-hidden />
        </Link>
      ) : (
        <a className="button buttonSecondary" role="link" aria-disabled="true">
          Next
          <ChevronRight size={18} aria-hidden />
        </a>
      )}
    </nav>
  );
}
