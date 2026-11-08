"use client";

import { useTheme } from "@/components/ThemeProvider/ThemeProvider";
import styles from "./ThemeWrapper.module.css";

type ThemeWrapperProps = {
  children: React.ReactNode;
};

export function ThemeWrapper({ children }: ThemeWrapperProps) {
  const { theme } = useTheme();

  return (
    <div className={styles.wrapper} data-theme={theme}>
      {children}
    </div>
  );
}
