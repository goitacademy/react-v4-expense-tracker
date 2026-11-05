import { Wallet } from "lucide-react";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <p className={styles.logo}>
          <span className={styles.logoIcon}>
            <Wallet size={20} aria-hidden />
          </span>
          Expense Tracker
        </p>
      </div>
    </header>
  );
}
