"use client";

import { useId } from "react";
import { Search } from "lucide-react";
import { debounce, parseAsString, useQueryState } from "nuqs";
import styles from "./SearchBox.module.css";

export function SearchBox() {
  const id = useId();
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("").withOptions({ shallow: false }),
  );
  const [, setPage] = useQueryState(
    "page",
    parseAsString.withOptions({ shallow: false }),
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value, { limitUrlUpdates: debounce(300) });
    setPage(null, { limitUrlUpdates: debounce(300) });
  };

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
          value={search}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
