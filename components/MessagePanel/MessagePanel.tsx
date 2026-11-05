import styles from "./MessagePanel.module.css";

type MessagePanelProps = {
  title?: string;
  text: string;
  role?: "status" | "alert";
  children?: React.ReactNode;
};

export function MessagePanel({
  title,
  text,
  role,
  children,
}: MessagePanelProps) {
  return (
    <div className={styles.panel} role={role}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <p className={styles.text}>{text}</p>
      {children && <div className={styles.actions}>{children}</div>}
    </div>
  );
}
