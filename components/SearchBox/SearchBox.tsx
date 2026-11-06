"use client";

import { useId } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import styles from "./SearchBox.module.css";

export function SearchBox() {
  const id = useId();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newParams = new URLSearchParams(searchParams);

    if (event.target.value) {
      newParams.set("search", event.target.value);
    } else {
      newParams.delete("search");
    }

    const queryString = newParams.toString();
    router.replace(queryString ? `/expenses?${queryString}` : "/expenses", {
      scroll: false,
    });
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
          defaultValue={searchParams.get("search") ?? ""}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
