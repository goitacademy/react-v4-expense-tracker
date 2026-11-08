import styles from "./ThemeWrapper.module.css";

type ThemeWrapperProps = {
  children: React.ReactNode;
};

export function ThemeWrapper({ children }: ThemeWrapperProps) {
  return <div className={styles.wrapper}>{children}</div>;
}
