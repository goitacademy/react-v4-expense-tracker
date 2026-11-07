"use client";

import { useId } from "react";
import { parseAsString, useQueryState } from "nuqs";
import styles from "./MonthFilter.module.css";

type MonthFilterProps = {
  month: string;
  years: number[];
};

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function MonthFilter({ month, years }: MonthFilterProps) {
  const id = useId();
  const [monthParam, setMonthParam] = useQueryState(
    "month",
    parseAsString.withDefault("").withOptions({ shallow: false }),
  );
  const [, setPage] = useQueryState(
    "page",
    parseAsString.withOptions({ shallow: false }),
  );
  const selectedMonth = monthParam || month;
  const [year, monthNumber] = selectedMonth.split("-");

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMonthParam(`${year}-${event.target.value}`);
    setPage(null);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMonthParam(`${event.target.value}-${monthNumber}`);
    setPage(null);
  };

  return (
    <div className={`field ${styles.filter}`}>
      <label className="label" htmlFor={id}>
        Month
      </label>
      <div className={styles.selects}>
        <select
          className="input"
          id={id}
          value={monthNumber}
          onChange={handleMonthChange}
        >
          {MONTH_NAMES.map((name, index) => {
            const value = String(index + 1).padStart(2, "0");
            return (
              <option key={value} value={value}>
                {name}
              </option>
            );
          })}
        </select>
        <select
          className={`input ${styles.year}`}
          aria-label="Year"
          value={year}
          onChange={handleYearChange}
        >
          {years.map((yearOption) => (
            <option key={yearOption} value={yearOption}>
              {yearOption}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
