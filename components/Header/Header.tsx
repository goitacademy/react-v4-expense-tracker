import { Suspense } from "react";
import Link from "next/link";
import { Wallet } from "lucide-react";
import { NavLink } from "@/components/NavLink/NavLink";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import { UserMenu } from "@/components/UserMenu/UserMenu";
import styles from "./Header.module.css";

export function Header() {
  const navFallback = (
    <nav className={styles.nav} aria-label="Main">
      <span className={styles.navFallback}>Home</span>
      <span className={styles.navFallback}>Expenses</span>
    </nav>
  );

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>
            <Wallet size={20} aria-hidden />
          </span>
          Expense Tracker
        </Link>
        <Suspense fallback={navFallback}>
          <nav className={styles.nav} aria-label="Main">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/expenses">Expenses</NavLink>
          </nav>
        </Suspense>
        <div className={styles.actions}>
          <ThemeToggle />
          <Suspense fallback={<div className={styles.userMenuFallback} />}>
            <UserMenu />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
