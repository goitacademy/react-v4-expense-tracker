"use client";

import { useId } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import styles from "./SearchBox.module.css";

export function SearchBox() {
  const id = useId();
  const searchParams = useSearchParams();

  return (
    <div className={`field ${styles.box}`}>
      <label className="label" htmlFor={id}>
        Search
      </label>
      <div className={styles.inputWrapper}>
        <Search className={styles.icon} size={18} aria-hidden />
        <input
          className="input"
          id={id}
          type="search"
          placeholder="Search by title"
          defaultValue={searchParams.get("search") ?? ""}
        />
      </div>
    </div>
  );
}
