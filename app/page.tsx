import styles from "./page.module.css";

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
      </div>
    </section>
  );
}
