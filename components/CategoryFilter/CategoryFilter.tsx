"use client";

import { useId } from "react";
import { parseAsString, useQueryState } from "nuqs";
import type { Category } from "@/types/expense";
import styles from "./CategoryFilter.module.css";

type CategoryFilterProps = {
  categories: Category[];
};

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const id = useId();
  const [categoryParam, setCategoryParam] = useQueryState(
    "category",
    parseAsString.withDefault("").withOptions({ shallow: false }),
  );
  const [, setPage] = useQueryState(
    "page",
    parseAsString.withOptions({ shallow: false }),
  );

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryParam(event.target.value);
    setPage(null);
  };

  return (
    <div className={`field ${styles.filter}`}>
      <label className="label" htmlFor={id}>
        Category
      </label>
      <select
        className="input"
        id={id}
        value={categoryParam}
        onChange={handleChange}
      >
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
