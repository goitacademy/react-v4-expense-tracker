import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  openGraph: {
    title: "Know where your money goes",
    description:
      "Write down every expense, sort it by category and see how much you spent this month.",
  },
};

export default function HomePage() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>Personal finance</p>
        <h1 className={styles.title}>Know where your money goes</h1>
        <p className={styles.text}>
          Write down every expense, sort it by category and see how much you
          spent this month.
        </p>
        <div className={styles.actions}>
          <Link href="/expenses" className="button buttonPrimary">
            View expenses
            <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
