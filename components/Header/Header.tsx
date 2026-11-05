import Link from "next/link";
import { Wallet } from "lucide-react";
import { NavLink } from "@/components/NavLink/NavLink";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>
            <Wallet size={20} aria-hidden />
          </span>
          Expense Tracker
        </Link>
        <nav className={styles.nav} aria-label="Main">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/expenses">Expenses</NavLink>
        </nav>
      </div>
    </header>
  );
}
